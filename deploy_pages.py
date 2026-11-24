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
LOCAL_DIR = 'frontend/build'
ALWAYS = {'.htaccess', 'robots.txt', 'sitemap.xml', 'llms.txt', '_redirects'}

if not PASSWORD:
    print("Error: PAC_SFTP_PASSWORD is not set (expected in .env.deploy).")
    sys.exit(1)

# Local inventory: relative posix path -> size
local = {}
for root, _dirs, files in os.walk(LOCAL_DIR):
    rel_dir = os.path.relpath(root, LOCAL_DIR).replace(os.sep, '/')
    rel_dir = '' if rel_dir == '.' else rel_dir
    for name in files:
        rel = posixpath.join(rel_dir, name) if rel_dir else name
        local[rel] = os.path.getsize(os.path.join(root, name))

transport = paramiko.Transport((HOST, PORT))
made = set()
sent = 0
try:
    transport.connect(username=USERNAME, password=PASSWORD)
    sftp = paramiko.SFTPClient.from_transport(transport)

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

    print("Indexing remote files...")
    walk_remote('/')
    print("  remote files: %d" % len(remote))

    todo = sorted(
        rel for rel, size in local.items()
        if rel.endswith('.html')
        or rel in ALWAYS
        or remote.get(rel) != size
    )
    print("Uploading %d of %d files (skipping %d unchanged)..."
          % (len(todo), len(local), len(local) - len(todo)))

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
        sftp.put(os.path.join(LOCAL_DIR, rel.replace('/', os.sep)), remote_path)
        sent += 1
        if sent % 20 == 0:
            print("  %d/%d..." % (sent, len(todo)), flush=True)

    sftp.close()
    print("Done. Uploaded %d files." % sent)
except Exception as exc:
    print("Upload failed after %d files: %s" % (sent, exc))
    sys.exit(1)
finally:
    transport.close()
