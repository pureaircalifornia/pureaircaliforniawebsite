"""
Comprehensive accessibility fix for all remaining admin files.
Replaces generic title="Action" / title="Input field" / title="Select option" with meaningful labels.
"""
import os
import glob

ADMIN_DIR = r'frontend\src\pages\admin'

# All replacements: (filename, old_string, new_string)
all_fixes = [
    # --- CustomersList.tsx ---
    ('CustomersList.tsx',
     'title="Select option" aria-label="Select option"\n        value={selectedStatus}',
     'title="Filter by customer status" aria-label="Filter by customer status"\n        value={selectedStatus}'),
    ('CustomersList.tsx',
     'title="Input field" aria-label="Input field" placeholder=" "\n                                            type="checkbox"\n                                            checked={selectedCustomers.length === customers.length',
     'title="Select all customers" aria-label="Select all customers"\n                                            type="checkbox"\n                                            checked={selectedCustomers.length === customers.length'),
    ('CustomersList.tsx',
     'title="Input field" aria-label="Input field" placeholder=" "\n                                                    type="checkbox"\n                                                    checked={selectedCustomers.includes(cid)}',
     'title="Select customer" aria-label="Select customer"\n                                                    type="checkbox"\n                                                    checked={selectedCustomers.includes(cid)}'),

    # --- Documents.tsx ---
    ('Documents.tsx',
     'title="Action" aria-label="Action"',
     'title="Upload document" aria-label="Upload document"'),
    ('Documents.tsx',
     'title="Select option" aria-label="Select option"',
     'title="Filter documents by type" aria-label="Filter documents by type"'),
    ('Documents.tsx',
     'title="Input field" aria-label="Input field" placeholder=" "',
     'title="Search documents" aria-label="Search documents" placeholder="Search documents..."'),

    # --- EstimateDetail.tsx ---
    ('EstimateDetail.tsx',
     'title="Select option" aria-label="Select option"',
     'title="Select estimate status" aria-label="Select estimate status"'),
    ('EstimateDetail.tsx',
     'title="Input field" aria-label="Input field" placeholder=" "',
     'title="Enter value" aria-label="Enter value" placeholder=" "'),

    # --- Inbox.tsx ---
    ('Inbox.tsx',
     'title="Action" aria-label="Action"',
     'title="Message action" aria-label="Message action"'),

    # --- InvoiceDetail.tsx ---
    ('InvoiceDetail.tsx',
     'title="Action" aria-label="Action"',
     'title="Go back" aria-label="Go back"'),

    # --- InvoicesList.tsx ---
    ('InvoicesList.tsx',
     'title="Select option" aria-label="Select option"',
     'title="Filter invoices by status" aria-label="Filter invoices by status"'),

    # --- LeadScanner.tsx ---
    ('LeadScanner.tsx',
     'title="Select option" aria-label="Select option"',
     'title="Select lead category" aria-label="Select lead category"'),
    ('LeadScanner.tsx',
     'title="Input field" aria-label="Input field" placeholder=" "',
     'title="Search leads" aria-label="Search leads" placeholder="Search leads..."'),

    # --- Payments.tsx ---
    ('Payments.tsx',
     'title="Select option" aria-label="Select option"',
     'title="Filter payments by status" aria-label="Filter payments by status"'),

    # --- Prospects.tsx ---
    ('Prospects.tsx',
     'title="Action" aria-label="Action"',
     'title="Add new prospect" aria-label="Add new prospect"'),
    ('Prospects.tsx',
     'title="Input field" aria-label="Input field" placeholder=" "',
     'title="Enter prospect details" aria-label="Enter prospect details" placeholder=" "'),

    # --- Settings.tsx ---
    ('Settings.tsx',
     'title="Input field" aria-label="Input field" placeholder=" "\n                                        type="text"\n                                        value={settings.company_name}',
     'title="Company name" aria-label="Company name" placeholder="Company name"\n                                        type="text"\n                                        value={settings.company_name}'),
    ('Settings.tsx',
     'title="Input field" aria-label="Input field" placeholder=" "\n                                        type="email"',
     'title="Contact email address" aria-label="Contact email address" placeholder="email@company.com"\n                                        type="email"'),
    ('Settings.tsx',
     'title="Input field" aria-label="Input field" placeholder=" "\n                                        type="tel"',
     'title="Support phone number" aria-label="Support phone number" placeholder="(555) 555-5555"\n                                        type="tel"'),

    # --- Team.tsx ---
    ('Team.tsx',
     'title="Action" aria-label="Action"',
     'title="Add team member" aria-label="Add team member"'),
    ('Team.tsx',
     'title="Select option" aria-label="Select option"',
     'title="Select team member role" aria-label="Select team member role"'),
    ('Team.tsx',
     'title="Input field" aria-label="Input field" placeholder=" "',
     'title="Enter team member details" aria-label="Enter team member details" placeholder=" "'),
]

for filename, old, new in all_fixes:
    filepath = os.path.join(ADMIN_DIR, filename)
    if not os.path.exists(filepath):
        print(f'WARNING: File not found: {filepath}')
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if old in content:
        content = content.replace(old, new)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed: {filename}')
    else:
        print(f'No match found in {filename} for: {old[:60]}...')

print("\nDone. Remaining checks:")
import re
for filepath in glob.glob(os.path.join(ADMIN_DIR, '**', '*.tsx'), recursive=True):
    with open(filepath, encoding='utf-8') as fh:
        content = fh.read()
    matches = re.findall(r'title="(Action|Input field|Select option)"', content)
    if matches:
        print(f'  Still needs work - {os.path.basename(filepath)}: {matches}')
