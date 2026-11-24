"""Check deployed public assets; hash changed assets without downloading the legacy gallery."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import threading
from urllib.parse import quote

import requests


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--manifest', required=True, type=Path)
    parser.add_argument('--deployment', action='append', default=[], type=Path)
    parser.add_argument('--output', required=True, type=Path)
    args = parser.parse_args()
    files = json.loads(args.manifest.read_text())['files']
    changed = set()
    for report in args.deployment:
        changed.update(json.loads(report.read_text())['uploaded'])
    targets = {name: digest for name, digest in files.items()
               if not name.endswith('.html') and not any(part.startswith('.') for part in name.split('/'))}
    local_state = threading.local()

    def check(item):
        name, expected_hash = item
        if not hasattr(local_state, 'session'):
            local_state.session = requests.Session()
        method = 'GET' if name in changed else 'HEAD'
        url = 'https://www.pureaircalifornia.com/' + quote(name, safe='/')
        errors = []
        response = None
        for attempt in range(2):
            try:
                response = local_state.session.request(method, url, allow_redirects=False, timeout=30,
                    headers={'User-Agent': 'PAC-Release-Audit/1.0', 'Cache-Control': 'no-cache', 'Accept-Encoding': 'identity'})
                if response.status_code < 500:
                    break
            except requests.RequestException as error:
                if attempt == 1:
                    return {'path': name, 'errors': [type(error).__name__]}
        if response.status_code != 200:
            errors.append(f'HTTP {response.status_code}')
        matches = hashlib.sha256(response.content).hexdigest() == expected_hash if method == 'GET' else None
        if matches is False:
            errors.append('Response bytes differ from the release manifest')
        return {'path': name, 'method': method, 'status': response.status_code,
                'contentType': response.headers.get('Content-Type'), 'matchesRelease': matches, 'errors': errors}

    with ThreadPoolExecutor(max_workers=5) as executor:
        rows = list(executor.map(check, targets.items()))
    report = {'checkedAt': datetime.now(timezone.utc).isoformat(), 'assetCount': len(rows),
              'byteVerifiedCount': sum(row.get('matchesRelease') is True for row in rows),
              'errors': [row['path'] + ': ' + error for row in rows for error in row['errors']], 'assets': rows}
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2), encoding='utf-8')
    print(json.dumps({key: value for key, value in report.items() if key != 'assets'}, indent=2))
    return bool(report['errors'])


if __name__ == '__main__':
    raise SystemExit(main())
