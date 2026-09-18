import re

files = {
    'AppointmentsList.tsx': 'frontend/src/pages/admin/AppointmentsList.tsx',
    'CustomersList.tsx': 'frontend/src/pages/admin/CustomersList.tsx',
}

for name, path in files.items():
    with open(path, encoding='utf-8') as f:
        lines = f.readlines()
    print(f'\n=== {name} ===')
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//'):
            continue
        if '<button' in stripped and 'title=' not in stripped:
            print(f'  L{i} BUTTON NO TITLE: {stripped[:120]}')
        if '<select' in stripped and 'title=' not in stripped:
            print(f'  L{i} SELECT NO TITLE: {stripped[:120]}')
        if '<input' in stripped and 'title=' not in stripped and 'placeholder=' not in stripped:
            print(f'  L{i} INPUT NO TITLE/PLACEHOLDER: {stripped[:120]}')
