"""Exercise release ordering and backups using an in-memory SFTP server."""
import contextlib
import hashlib
import io
import json
import os
from pathlib import Path
import runpy
import shutil
import sys
import tempfile
import types
import unittest
from unittest.mock import patch
import zipfile

ROOT = Path(__file__).resolve().parents[2]


class ReleaseTests(unittest.TestCase):
    def run_release(self, *, stale=False, fail_page=False):
        workspace_output = (ROOT / 'output').resolve()
        temporary = Path(tempfile.mkdtemp(prefix='deploy-test-', dir=workspace_output)).resolve()
        if not temporary.is_relative_to(workspace_output):
            raise RuntimeError('Test cleanup target is outside the workspace output directory')
        try:
            previous = {'index.html': b'Pure Air California previous',
                        'services/index.html': b'previous service',
                        'assets/old-12345678.js': b'previous bundle',
                        'sitemap.xml': b'previous sitemap', '.htaccess': b'previous config'}
            current = {**previous, 'index.html': b'Pure Air California next',
                       'services/index.html': b'next service',
                       'assets/new-12345678.js': b'next bundle', '.htaccess': b'next config'}
            release = temporary / 'release'
            for name, content in current.items():
                target = release / name
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(content)
            manifest = temporary / 'base.json'
            manifest.write_text(json.dumps({'files': {name: hashlib.sha256(content).hexdigest()
                                                     for name, content in previous.items()}}))
            remote = {'/' + name: content for name, content in previous.items()}
            if stale:
                remote['/index.html'] = b'Pure Air California changed independently'
            published = []

            class Client:
                def open(self, name, mode):
                    return io.BytesIO(remote[name])

                def put(self, local, target):
                    if fail_page and target.startswith('/services/index.html.'):
                        raise OSError('simulated transfer failure')
                    remote[target] = Path(local).read_bytes()

                def posix_rename(self, temporary_path, target):
                    remote[target] = remote.pop(temporary_path)
                    published.append(target)

                def get_channel(self):
                    return types.SimpleNamespace(settimeout=lambda value: None)

                def close(self):
                    pass

            transport = types.SimpleNamespace(connect=lambda **kwargs: None, close=lambda: None)
            fake_paramiko = types.SimpleNamespace(Transport=lambda *args: transport,
                SFTPClient=types.SimpleNamespace(from_transport=lambda value: Client()))
            environment = {'PAC_SFTP_PASSWORD': 'local-test-only', 'PAC_DEPLOY_LOCAL_DIR': str(release),
                           'PAC_DEPLOY_BASE_MANIFEST': str(manifest), 'PAC_DEPLOY_WORKERS': '3',
                           'PAC_DEPLOY_REPORT_DIR': str(temporary / 'reports'),
                           'PAC_DEPLOY_BACKUP_DIR': str(temporary / 'backups')}
            exit_code = 0
            with patch.dict(sys.modules, {'paramiko': fake_paramiko}), patch.dict(os.environ, environment), contextlib.redirect_stdout(io.StringIO()):
                try:
                    runpy.run_path(str(ROOT / 'deploy_pages.py'), run_name='__main__')
                except SystemExit as error:
                    exit_code = error.code
            report = json.loads((temporary / 'reports/deployment.json').read_text())
            with zipfile.ZipFile(report['backup']) as archive:
                saved = {name: archive.read(name) for name in archive.namelist()}
            return exit_code, remote, published, report, saved
        finally:
            # The resolved, newly-created test path was checked above.
            shutil.rmtree(temporary)

    def test_assets_then_pages_then_home_then_config_with_backups(self):
        status, remote, published, report, saved = self.run_release()
        self.assertEqual(status, 0)
        self.assertEqual(published, ['/assets/new-12345678.js', '/services/index.html', '/index.html', '/.htaccess'])
        self.assertTrue(report['complete'])
        self.assertEqual(saved['index.html'], b'Pure Air California previous')
        self.assertEqual(saved['services/index.html'], b'previous service')
        self.assertEqual(saved['.htaccess'], b'previous config')
        self.assertEqual(remote['/assets/old-12345678.js'], b'previous bundle')

    def test_changed_remote_home_refuses_the_base_manifest(self):
        status, _, published, report, _ = self.run_release(stale=True)
        self.assertEqual(status, 1)
        self.assertEqual(published, [])
        self.assertFalse(report['complete'])

    def test_failed_page_prevents_home_and_config_publication(self):
        status, remote, published, report, _ = self.run_release(fail_page=True)
        self.assertEqual(status, 1)
        self.assertEqual(published, ['/assets/new-12345678.js'])
        self.assertEqual(remote['/index.html'], b'Pure Air California previous')
        self.assertEqual(remote['/.htaccess'], b'previous config')
        self.assertFalse(report['complete'])


if __name__ == '__main__':
    unittest.main()
