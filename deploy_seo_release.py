"""Resume the September 24 release with prefetched backups and bounded SFTP workers."""
import concurrent.futures
import json
import os
from pathlib import Path
import posixpath
import struct
import threading
import time
import zipfile
import zlib

import paramiko

ROOT = Path(__file__).resolve().parent
BUILD = ROOT / 'frontend/build'
REPORT = ROOT / 'docs/SEO/optimization-2026-09-24'
BACKUP = Path('F:/Pure Air California/deploy-backups/seo-2026-09-24/resume')
BACKUP.mkdir(parents=True, exist_ok=True)
for line in (ROOT / '.env.deploy').read_text().splitlines():
    if line.strip() and not line.lstrip().startswith('#') and '=' in line:
        key, value = line.split('=', 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))

# The interrupted writer had no central directory. Recover only complete ZIP
# records, checking their CRC before retaining them in a finalized archive.
# Each prior file was backed up in full before its replacement was uploaded.
old_archive = BACKUP.parent / '20260924T192745Z.zip'
recovered = BACKUP / 'prior-release-backup.zip'
if old_archive.exists() and not recovered.exists():
    data = old_archive.read_bytes()
    offset = 0
    with zipfile.ZipFile(recovered, 'w', zipfile.ZIP_DEFLATED) as archive:
        while data[offset:offset + 4] == b'PK\x03\x04' and offset + 30 <= len(data):
            fields = struct.unpack_from('<4s5H3I2H', data, offset)
            flags, method = fields[2:4]
            crc, size, unpacked, name_len, extra_len = fields[6:11]
            if flags & 8:
                raise RuntimeError('Unexpected ZIP data descriptor')
            start = offset + 30 + name_len + extra_len
            if start + size > len(data):
                break
            name = data[offset + 30:offset + 30 + name_len].decode('utf-8')
            content = zlib.decompress(data[start:start + size], -15) if method == 8 else data[start:start + size]
            if len(content) != unpacked or zlib.crc32(content) != crc:
                raise RuntimeError('Prior backup integrity failure')
            archive.writestr(name, content)
            offset = start + size
    with zipfile.ZipFile(recovered) as archive:
        assert archive.testzip() is None
        print(f'Recovered and validated {len(archive.namelist())} original backups.', flush=True)

state = threading.local()
connections = []
lock = threading.Lock()
uploaded = []
release = str(int(time.time()))
always = {'.htaccess', 'robots.txt', 'sitemap.xml', 'llms.txt', '_redirects', '3a598c19b4e1423ca87889e414578bca.txt'}

def client():
    if not hasattr(state, 'sftp'):
        transport = paramiko.Transport((os.environ.get('PAC_SFTP_HOST', 'access829313022.webspace-data.io'), int(os.environ.get('PAC_SFTP_PORT', '22'))))
        transport.connect(username=os.environ.get('PAC_SFTP_USERNAME', 'acc748041528'), password=os.environ['PAC_SFTP_PASSWORD'])
        sftp = paramiko.SFTPClient.from_transport(transport)
        sftp.get_channel().settimeout(90)
        state.sftp = sftp
        state.directories = {'/'}
        with lock:
            connections.append(transport)
    return state.sftp

def inventory(folder):
    try:
        return {posixpath.join(folder, item.filename).lstrip('/'): item.st_size for item in client().listdir_attr('/' + folder)}
    except FileNotFoundError:
        return {}

def upload(rel):
    sftp = client()
    remote = '/' + rel
    parent = posixpath.dirname(remote)
    if parent not in state.directories:
        current = ''
        for part in parent.strip('/').split('/'):
            if not part:
                continue
            current += '/' + part
            if current not in state.directories:
                try:
                    sftp.stat(current)
                except FileNotFoundError:
                    try:
                        sftp.mkdir(current)
                    except OSError:
                        sftp.stat(current)  # Another worker may have created it.
                state.directories.add(current)
    backup = BACKUP / 'remote' / rel
    if not rel.startswith('assets/') and not backup.exists():
        backup.parent.mkdir(parents=True, exist_ok=True)
        try:
            sftp.get(remote, str(backup) + '.partial', prefetch=True, max_concurrent_prefetch_requests=32)
            Path(str(backup) + '.partial').replace(backup)
        except FileNotFoundError:
            pass
    temporary = remote + '.pac-upload-' + release
    sftp.put(str(BUILD / rel), temporary)
    sftp.posix_rename(temporary, remote)
    with lock:
        uploaded.append(rel)
        if len(uploaded) % 40 == 0:
            print(f'Uploaded {len(uploaded)}/{len(todo)} files.', flush=True)

complete = False
try:
    with client().open('/index.html', 'rb') as page:
        page.prefetch()
        if b'Pure Air California' not in page.read():
            raise RuntimeError('Wrong remote web root')
    local = {p.relative_to(BUILD).as_posix(): p.stat().st_size for p in BUILD.rglob('*') if p.is_file() and '_backup' not in p.parts}
    # HTML is always replaced; inventory only asset directories instead of
    # traversing hundreds of HTML-only route directories over the network.
    folders = sorted({posixpath.dirname(rel) for rel in local if not rel.endswith('.html')})
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        remote = {}
        for result in executor.map(inventory, folders):
            remote.update(result)
        todo = [rel for rel, size in local.items() if rel.endswith('.html') or rel in always or remote.get(rel) != size]
        print(f'Resuming {len(todo)} files; assets before HTML, homepage and config last.', flush=True)
        phases = [
            [rel for rel in todo if not rel.endswith('.html') and rel not in always],
            [rel for rel in todo if rel.endswith('.html') and rel != 'index.html'],
            ['index.html'],
            [rel for rel in todo if rel in always],
        ]
        for phase in phases:
            list(executor.map(upload, sorted(phase)))
    complete = True
    print(f'Deployment complete: {len(uploaded)} files.', flush=True)
finally:
    (REPORT / 'deployment-resume.json').write_text(json.dumps({'complete': complete, 'uploaded': uploaded, 'backup': str(BACKUP), 'priorBackup': str(recovered)}, indent=2))
    for transport in connections:
        transport.close()
