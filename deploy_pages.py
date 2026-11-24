"""Incremental deploy of frontend/build to the live webspace.

deploy.py re-uploads all ~1500 files every time, including ~650 content-hashed
bundles that are byte-identical to what is already on the server. That takes tens
of minutes.

This uploads only what actually differs:
  * every *.html (prerendered markup changes on every build)
  * root config files (.htaccess, robots.txt, sitemap.xml, llms.txt, _redirects)
  * any other file missing from the server or whose size differs

The "other file" pass matters: changing a component changes its content hash, so
the HTML starts referencing /assets/index-<newhash>.js. Shipping the HTML without
that bundle leaves visitors on a blank page.

Usage:
    python deploy_pages.py
"""
import os
import posixpath
import stat
import sys
import json
import zipfile
import hashlib
import re
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path

import paramiko


def _load_env_file(path='.env.deploy'):
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as fh:
        for line in fh:
            line = line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue
            key, _, value = line.partition('=')
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


_load_env_file()

HOST = os.environ.get('PAC_SFTP_HOST', 'access829313022.webspace-data.io')
PORT = int(os.environ.get('PAC_SFTP_PORT', '22'))
USERNAME = os.environ.get('PAC_SFTP_USERNAME', 'acc748041528')
PASSWORD = os.environ.get('PAC_SFTP_PASSWORD')
LOCAL_DIR = os.environ.get('PAC_DEPLOY_LOCAL_DIR', 'frontend/build')
BASE_MANIFEST = os.environ.get('PAC_DEPLOY_BASE_MANIFEST')
WORKERS = int(os.environ.get('PAC_DEPLOY_WORKERS', '1'))
if not 1 <= WORKERS <= 4:
    raise ValueError('PAC_DEPLOY_WORKERS must be between 1 and 4')
ALWAYS = {'.htaccess', 'robots.txt', 'sitemap.xml', 'llms.txt', 'llms-full.txt', '_redirects', '3a598c19b4e1423ca87889e414578bca.txt'}

if not PASSWORD:
    print("Error: PAC_SFTP_PASSWORD is not set (expected in .env.deploy).")
    sys.exit(1)

if not Path(LOCAL_DIR, 'index.html').is_file() or not Path(LOCAL_DIR, 'sitemap.xml').is_file():
    raise RuntimeError('Release directory must contain index.html and sitemap.xml')

# An immediately preceding, verified release can provide the inventory for a
# follow-up upload. Fail closed if the public homepage no longer matches it.
base_files = None
if BASE_MANIFEST:
    base_files = json.loads(Path(BASE_MANIFEST).read_text(encoding='utf-8'))['files']
    if not isinstance(base_files, dict) or 'index.html' not in base_files:
        raise ValueError('Invalid base release manifest')
    for rel, digest in base_files.items():
        if (not isinstance(rel, str) or rel.startswith('/') or '\\' in rel
                or any(part in ('', '.', '..') for part in rel.split('/'))
                or not isinstance(digest, str) or not re.fullmatch('[0-9a-f]{64}', digest)):
            raise ValueError('Invalid path or digest in base release manifest')

# Local inventory: relative posix path -> size
local = {}
for root, _dirs, files in os.walk(LOCAL_DIR):
    _dirs[:] = [name for name in _dirs if name != '_backup']
    rel_dir = os.path.relpath(root, LOCAL_DIR).replace(os.sep, '/')
    rel_dir = '' if rel_dir == '.' else rel_dir
    for name in files:
        rel = posixpath.join(rel_dir, name) if rel_dir else name
        local[rel] = os.path.getsize(os.path.join(root, name))

transport = paramiko.Transport((HOST, PORT))
made = set()
sent = 0
release_id = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
report_dir = Path(os.environ.get("PAC_DEPLOY_REPORT_DIR", "docs/deployments"))
report_dir.mkdir(parents=True, exist_ok=True)
backup_dir = Path(os.environ.get("PAC_DEPLOY_BACKUP_DIR", "docs/deploy-backups"))
backup_dir.mkdir(parents=True, exist_ok=True)
backup_path = backup_dir / (release_id + ".zip")
backup = zipfile.ZipFile(backup_path, "w", compression=zipfile.ZIP_DEFLATED)
uploaded = []
try:
    transport.connect(username=USERNAME, password=PASSWORD)
    sftp = paramiko.SFTPClient.from_transport(transport)

    # Confirm the configured web root before replacing public files.
    with sftp.open("/index.html", "rb") as current_home:
        home_bytes = current_home.read()
        if b"Pure Air California" not in home_bytes:
            raise RuntimeError("Remote web root did not identify as Pure Air California")
        if base_files and hashlib.sha256(home_bytes).hexdigest() != base_files['index.html']:
            raise RuntimeError('Live homepage differs from the base release; use a fresh remote inventory')

    # Remote inventory
    remote = {}

    def walk_remote(path, depth=0):
        if depth > 8:
            return
        try:
            entries = sftp.listdir_attr(path)
        except IOError:
            return
        for e in entries:
            full = posixpath.join(path, e.filename).replace('//', '/')
            if stat.S_ISDIR(e.st_mode):
                made.add(full)
                walk_remote(full, depth + 1)
            else:
                remote[full.lstrip('/')] = e.st_size

    if base_files:
        remote = {rel: None for rel in base_files}
        for rel in base_files:
            parent = posixpath.dirname('/' + rel)
            while parent and parent != '/':
                made.add(parent)
                parent = posixpath.dirname(parent)
        todo = sorted(rel for rel in local
                      if rel in ALWAYS or hashlib.sha256(Path(LOCAL_DIR, rel).read_bytes()).hexdigest() != base_files.get(rel))
        print('Live homepage matches the base release; uploading content changes only.', flush=True)
    else:
        print("Indexing remote files...", flush=True)
        walk_remote('/')
        print("  remote files: %d" % len(remote))
        todo = sorted(
            rel for rel, size in local.items()
            if rel.endswith('.html')
            or rel in ALWAYS
            or remote.get(rel) != size
        )
    # Assets first: new HTML must never reference bundles not uploaded yet.
    def upload_phase(rel):
        if rel in ALWAYS:
            return 3
        if rel == "index.html":
            return 2
        return 1 if rel.endswith(".html") else 0

    todo.sort(key=lambda rel: (upload_phase(rel), rel))
    print("Uploading %d of %d files (skipping %d unchanged)..."
          % (len(todo), len(local), len(local) - len(todo)))

    # Create any new parent directories before independent file uploads.
    for rel in todo:
        remote_path = '/' + rel
        parent = posixpath.dirname(remote_path)
        if parent and parent != '/':
            cur = ''
            for part in [p for p in parent.strip('/').split('/') if p]:
                cur += '/' + part
                if cur in made:
                    continue
                try:
                    sftp.stat(cur)
                except IOError:
                    sftp.mkdir(cur)
                made.add(cur)

    worker_state = threading.local()
    worker_clients = []
    backup_lock = threading.Lock()

    def upload_one(rel):
        # Each worker owns an SFTP channel; no SFTPClient is shared by threads.
        if not hasattr(worker_state, 'sftp'):
            client = paramiko.SFTPClient.from_transport(transport)
            client.get_channel().settimeout(60)
            worker_state.sftp = client
            with backup_lock:
                worker_clients.append(client)
        client = worker_state.sftp
        remote_path = '/' + rel
        if rel in remote and not rel.startswith('assets/'):
            with client.open(remote_path, 'rb') as previous:
                previous_bytes = previous.read()
            with backup_lock:
                backup.writestr(rel, previous_bytes)
        temporary_path = remote_path + '.pac-upload-' + release_id
        client.put(os.path.join(LOCAL_DIR, rel.replace('/', os.sep)), temporary_path)
        client.posix_rename(temporary_path, remote_path)
        return rel

    try:
        with ThreadPoolExecutor(max_workers=WORKERS) as executor:
            # Complete each phase before publishing files which depend on it.
            for phase in range(4):
                futures = [executor.submit(upload_one, rel) for rel in todo if upload_phase(rel) == phase]
                failures = []
                for future in as_completed(futures):
                    try:
                        uploaded.append(future.result())
                        sent += 1
                        if sent % 20 == 0:
                            print("  %d/%d..." % (sent, len(todo)), flush=True)
                    except Exception as exc:
                        failures.append(str(exc))
                if failures:
                    raise RuntimeError('Upload phase failed: ' + '; '.join(failures))
    finally:
        for client in worker_clients:
            client.close()

    sftp.close()
    print("Done. Uploaded %d files." % sent)
except Exception as exc:
    print("Upload failed after %d files: %s" % (sent, exc))
    sys.exit(1)
finally:
    backup.close()
    (report_dir / "deployment.json").write_text(json.dumps({"release": release_id, "uploaded": uploaded, "backup": str(backup_path), "complete": sent == len(todo) if "todo" in globals() else False}, indent=2), encoding="utf-8")
    transport.close()
