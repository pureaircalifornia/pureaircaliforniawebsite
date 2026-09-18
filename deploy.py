import os
import paramiko
import sys

# SFTP Details. Credentials come from environment variables so they are NEVER
# committed to source control. Set them before running, e.g.:
#   export PAC_SFTP_PASSWORD='your-password'   (PowerShell: $env:PAC_SFTP_PASSWORD='...')
# Host/username can be overridden via env too but default to the known values.
def _load_env_file(path='.env.deploy'):
    """Load KEY=VALUE pairs from a git-ignored secrets file into os.environ.
    Keeps the SFTP password out of source control AND off the command line."""
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
REMOTE_DIR = '/'  # Typically user says it goes straight to public_html

if not PASSWORD:
    print(
        "Error: PAC_SFTP_PASSWORD environment variable is not set.\n"
        "Set it before deploying, e.g. (PowerShell):  $env:PAC_SFTP_PASSWORD='...'\n"
        "                          (bash):  export PAC_SFTP_PASSWORD='...'"
    )
    sys.exit(1)

def upload_dir(sftp, local_dir, remote_dir):
    try:
        sftp.chdir(remote_dir)
    except IOError:
        sftp.mkdir(remote_dir)
        sftp.chdir(remote_dir)

    for item in os.listdir(local_dir):
        local_path = os.path.join(local_dir, item)
        remote_path = f"{remote_dir.rstrip('/')}/{item}" if remote_dir != '/' else f"/{item}"
        
        if os.path.isfile(local_path):
            print(f"Uploading {local_path} to {remote_path}...")
            sftp.put(local_path, remote_path)
        elif os.path.isdir(local_path):
            print(f"Creating directory {remote_path}...")
            try:
                sftp.mkdir(remote_path)
            except IOError:
                pass # directory probably exists
            upload_dir(sftp, local_path, remote_path)
            # return to parent
            sftp.chdir(remote_dir)

def main():
    if not os.path.exists(LOCAL_DIR):
        print(f"Error: Build directory '{LOCAL_DIR}' does not exist.")
        sys.exit(1)

    print(f"Connecting to {HOST}...")
    
    # Establish SSH connection
    transport = paramiko.Transport((HOST, PORT))
    try:
        transport.connect(username=USERNAME, password=PASSWORD)
        sftp = paramiko.SFTPClient.from_transport(transport)
        
        print("Connected! Starting upload...")
        upload_dir(sftp, LOCAL_DIR, REMOTE_DIR)
        
        print("Deploy complete!")
    except Exception as e:
        print(f"Deployment failed: {e}")
    finally:
        if 'sftp' in locals():
            sftp.close()
        transport.close()

if __name__ == '__main__':
    main()
