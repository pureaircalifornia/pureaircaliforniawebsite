"""Read-only public release checks. Never submit a form or use a real private token."""
import argparse
import json
import re
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin

import requests


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--build-dir', required=True, type=Path)
    parser.add_argument('--output', required=True, type=Path)
    args = parser.parse_args()
    origin = 'https://www.pureaircalifornia.com'
    home = (args.build_dir / 'index.html').read_text(encoding='utf-8')
    stylesheet = re.search(r'href="(/assets/[^" ]+\.css)"', home).group(1)
    stable_image = re.search(r'<img[^>]+src="(/images/[^" ]+)"', home).group(1)
    checks = [
        ('/', 200, None),
        ('https://pureaircalifornia.com/', 301, origin + '/'),
        ('http://pureaircalifornia.com/', 301, origin + '/'),
        ('http://www.pureaircalifornia.com/', 301, origin + '/'),
        ('/index.html', 301, origin + '/'),
        ('/residential-air-duct-cleaning/', 301, origin + '/services/residential-air-duct-cleaning/'),
        ('/services/residential-air-duct-cleaning', 301, origin + '/services/residential-air-duct-cleaning/'),
        ('/Parete-Da-Arrampicata-Per-Gatti-In-Legno-Set-Di-3-Scale-Per-p-931328', 410, None),
        ('/wp-login.php', 410, None),
        ('/cartoleria-scuola/policy-check/', 410, None),
        ('/policy-release-nonexistent-2026-10-12/', 404, None),
        ('/.env', (403, 404), None),
        ('/.git/config', (403, 404), None),
        ('/feedback/policy-release-invalid-token', 200, None),
        ('/admin/login', 200, None),
        ('/Admin/login', 200, None),
        ('/robots.txt', 200, None),
        ('/sitemap.xml', 200, None),
        (stylesheet, 200, None),
        (stable_image, 200, None),
    ]

    def check(item):
        path, expected, location = item
        url = urljoin(origin, path)
        try:
            response = requests.get(url, allow_redirects=False, timeout=35,
                                    headers={'User-Agent': 'PAC-Release-Audit/1.0', 'Cache-Control': 'no-cache'})
            errors = []
            acceptable = expected if isinstance(expected, tuple) else (expected,)
            if response.status_code not in acceptable:
                errors.append(f'Expected {expected}; received {response.status_code}')
            if location and urljoin(url, response.headers.get('Location', '')) != location:
                errors.append('Unexpected redirect target')
            if path.lower().startswith(('/feedback/', '/admin/')):
                if 'noindex' not in response.headers.get('X-Robots-Tag', ''):
                    errors.append('Missing private-route noindex header')
                if response.headers.get('Referrer-Policy', '').split(',')[-1].strip() != 'no-referrer':
                    errors.append('Missing private-route referrer protection')
            cache = response.headers.get('Cache-Control', '')
            if path == stylesheet and ('immutable' not in cache or '31536000' not in cache):
                errors.append('Hashed bundle not cached immutably')
            if path == stable_image and '86400' not in cache:
                errors.append('Stable image cache does not refresh daily')
            if path in ('/robots.txt', '/sitemap.xml') and 'max-age=0' not in cache:
                errors.append('Search discovery file does not revalidate')
            return {'url': url, 'status': response.status_code,
                    'headers': {key: value for key, value in response.headers.items()
                                if key.lower() in ('location', 'cache-control', 'x-robots-tag', 'referrer-policy', 'x-content-type-options')},
                    'errors': errors}
        except requests.RequestException as error:
            return {'url': url, 'errors': [type(error).__name__]}

    with ThreadPoolExecutor(max_workers=4) as executor:
        results = list(executor.map(check, checks))
    report = {'checkedAt': datetime.now(timezone.utc).isoformat(), 'checks': results,
              'errors': [row['url'] + ': ' + error for row in results for error in row['errors']]}
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2), encoding='utf-8')
    print(json.dumps({'checks': len(results), 'errors': report['errors']}, indent=2))
    return bool(report['errors'])


if __name__ == '__main__':
    raise SystemExit(main())
