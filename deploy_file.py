"""Upload a single file from frontend/build to the live webspace.

deploy.py walks and re-uploads the whole tree (~1500 SFTP round trips, tens of
minutes). When only one file changed — most often .htaccess, robots.txt or
sitemap.xml — that is wasteful and risky. This uploads just the named path.

Usage:
    python deploy_file.py .htaccess
    python deploy_file.py sitemap.xml robots.txt
Paths are relative to frontend/build.
"""
import os
import posixpath
import sys

import paramiko


def _load_env_file(path='.env.deploy'):
    """Load KEY=VALUE pairs from the git-ignored secrets file into os.environ."""
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

if not PASSWORD:
    print("Error: PAC_SFTP_PASSWORD is not set (expected in .env.deploy).")
    sys.exit(1)

targets = sys.argv[1:]
if not targets:
    print(__doc__)
    sys.exit(1)

missing = [t for t in targets if not os.path.isfile(os.path.join(LOCAL_DIR, t))]
if missing:
    print("Error: not found under %s: %s" % (LOCAL_DIR, ', '.join(missing)))
    sys.exit(1)

transport = paramiko.Transport((HOST, PORT))
try:
    transport.connect(username=USERNAME, password=PASSWORD)
    sftp = paramiko.SFTPClient.from_transport(transport)
    for rel in targets:
        local_path = os.path.join(LOCAL_DIR, rel)
        remote_path = '/' + posixpath.normpath(rel.replace(os.sep, '/'))
        sftp.put(local_path, remote_path)
        size = os.path.getsize(local_path)
        print("uploaded %s -> %s (%d bytes)" % (local_path, remote_path, size))
    sftp.close()
    print("Done.")
except Exception as exc:
    print("Upload failed: %s" % exc)
    sys.exit(1)
finally:
    transport.close()
