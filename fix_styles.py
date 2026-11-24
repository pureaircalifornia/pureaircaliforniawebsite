import os
import glob
import re

for filepath in glob.glob('frontend/src/**/*.tsx', recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Drop textShadow styles
    new_content = re.sub(r'\s*style=\{\s*\{\s*textShadow:\s*\'[^\']+\'\s*\}\s*\}', ' className="drop-shadow-lg"', content)
    
    # EnhancedLanding specifically has a huge textShadow 
    new_content = re.sub(r'\s*style=\{\{\s*textShadow:\s*\'[^\}]+\}\}', ' className="drop-shadow-2xl"', new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Fixed textShadow in {filepath}')
