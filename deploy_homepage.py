"""Surgical homepage deploy: upload ONLY frontend/build/index.html to /index.html.

Fixes the stale standalone AggregateRating on the live homepage without touching
any other page or asset. Reuses the SFTP credentials in .env.deploy (git-ignored).

Run from this directory:
    python deploy_homepage.py
"""
import os
import sys

import paramiko


def load_env(path: str = ".env.deploy") -> None:
    """Load KEY=VALUE pairs from the git-ignored secrets file into os.environ."""
    if not os.path.exists(path):
        return
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def main() -> None:
    load_env()
    host = os.environ.get("PAC_SFTP_HOST", "access829313022.webspace-data.io")
    port = int(os.environ.get("PAC_SFTP_PORT", "22"))
    username = os.environ.get("PAC_SFTP_USERNAME", "acc748041528")
    password = os.environ.get("PAC_SFTP_PASSWORD")
    if not password:
        print("Error: PAC_SFTP_PASSWORD not set (expected in .env.deploy).")
        sys.exit(1)

    local = "frontend/build/index.html"
    remote = "/index.html"
    if not os.path.exists(local):
        print(f"Error: {local} not found. Build first or check path.")
        sys.exit(1)

    print(f"Connecting to {host}...")
    transport = paramiko.Transport((host, port))
    try:
        transport.connect(username=username, password=password)
        sftp = paramiko.SFTPClient.from_transport(transport)
        before = sftp.stat(remote).st_size
        sftp.put(local, remote)
        after = sftp.stat(remote).st_size
        print(f"Uploaded {local} -> {remote}  (remote size {before} -> {after} bytes)")
        sftp.close()
        print("DONE")
    except Exception as exc:  # noqa: BLE001 - surface the real error to the operator
        print(f"Deploy failed: {exc}")
        sys.exit(1)
    finally:
        transport.close()


if __name__ == "__main__":
    main()
