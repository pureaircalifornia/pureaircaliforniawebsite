import re, glob, os

files = glob.glob(r'frontend/src/pages/admin/**/*.tsx', recursive=True)

for f in files:
    with open(f, encoding='utf-8') as fh:
        content = fh.read()
    matches = list(re.finditer(r'title="(Action|Input field|Select option|Enter value)"', content))
    if matches:
        fname = os.path.basename(f)
        for m in matches:
            # Get surrounding context (40 chars before/after)
            start = max(0, m.start()-80)
            end = min(len(content), m.end()+80)
            print(f'\n{fname} [{m.start()}]: ...{content[start:end]}...')
