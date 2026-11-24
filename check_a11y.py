import re, glob, os

files = glob.glob(r'frontend/src/pages/admin/**/*.tsx', recursive=True)

for f in files:
    with open(f, encoding='utf-8') as fh:
        content = fh.read()
    matches = re.findall(r'title="(Action|Input field|Select option)"', content)
    if matches:
        print(f'{os.path.basename(f)}: {matches}')
