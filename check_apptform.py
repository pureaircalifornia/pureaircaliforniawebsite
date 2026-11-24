"""
Multi-line aware accessibility check for AppointmentForm.tsx.
Reads the whole file as a string and checks each JSX element block.
"""
import re

files = [
    'frontend/src/pages/admin/AppointmentForm.tsx',
]

def check_file(path):
    with open(path, encoding='utf-8') as f:
        content = f.read()
    lines = content.splitlines()

    issues = []

    # Find all <button, <select, <input opening tags (possibly multi-line)
    # We'll scan character by character tracking open tags
    i = 0
    while i < len(content):
        # Find next opening tag
        m = re.search(r'<(button|select|input)\b', content[i:])
        if not m:
            break
        pos = i + m.start()
        tag_type = m.group(1)

        # Find the end of this tag (> or />)
        end = content.find('>', pos)
        if end == -1:
            break
        tag_content = content[pos:end+1]
        line_num = content[:pos].count('\n') + 1

        # Skip if it's a closing tag reference
        if content[pos:pos+2] == '</':
            i = pos + 1
            continue

        has_title = 'title=' in tag_content
        has_placeholder = 'placeholder=' in tag_content
        has_hidden = 'type="hidden"' in tag_content or "type='hidden'" in tag_content
        
        if not has_hidden:
            if tag_type == 'button' and not has_title:
                # Check if it has text content (next few chars after >)
                after = content[end+1:end+80].strip()
                if not after.startswith('<') or 'lucide' not in tag_content.lower():
                    issues.append(f'L{line_num} <{tag_type}> missing title: {tag_content[:80].strip()}')
            elif tag_type == 'select' and not has_title:
                issues.append(f'L{line_num} <{tag_type}> missing title: {tag_content[:80].strip()}')
            elif tag_type == 'input' and not has_title and not has_placeholder:
                issues.append(f'L{line_num} <{tag_type}> missing title+placeholder: {tag_content[:80].strip()}')

        i = end + 1

    return issues

for path in files:
    import os
    issues = check_file(path)
    print(f'\n=== {os.path.basename(path)}: {len(issues)} issues ===')
    for issue in issues:
        print(f'  {issue}')
