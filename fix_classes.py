import os
import glob
import re

count = 0
for filepath in glob.glob('frontend/src/**/*.tsx', recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    def merge_classes(match):
        class1 = match.group(1)
        class2 = match.group(2)
        return f'className="{class1} {class2}"'

    new_content = re.sub(r'className="([^"]+)"\s+className="([^"]+)"', merge_classes, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Fixed dual className in {filepath}')
        count += 1

print(f"Fixed {count} files.")
