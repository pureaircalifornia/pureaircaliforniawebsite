"""
Fix accessibility attributes in admin files.
Replace generic title/aria-label with meaningful values based on surrounding context.
"""
import re
import os

ADMIN_DIR = r'frontend\src\pages\admin'

# Maps: (file, line_range) -> descriptive fix
# We'll do targeted replacements per file instead of generic regex.

fixes = {
    'AdminLayout.tsx': [
        # Line 111: Close sidebar button
        ('title="Action" aria-label="Action"\n                        className="lg:hidden text-gray-400 hover:text-white"',
         'title="Close sidebar" aria-label="Close sidebar"\n                        className="lg:hidden text-gray-400 hover:text-white"'),
        # Line 150: Open sidebar button
        ('title="Action" aria-label="Action"\n                        className="lg:hidden text-gray-600 hover:text-gray-900"',
         'title="Open navigation menu" aria-label="Open navigation menu"\n                        className="lg:hidden text-gray-600 hover:text-gray-900"'),
        # Line 161: Notifications button
        ('title="Action" aria-label="Action" className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"',
         'title="View notifications" aria-label="View notifications" className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"'),
    ],
    'AppointmentForm.tsx': [
        # Line 142: Back button
        ('title="Action" aria-label="Action"\n                        onClick={() => navigate(-1)}\n                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"',
         'title="Go back" aria-label="Go back"\n                        onClick={() => navigate(-1)}\n                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"'),
        # Select: Customer
        ('title="Select option" aria-label="Select option"\n                                            name="customer_id"',
         'title="Select customer" aria-label="Select customer"\n                                            name="customer_id"'),
        # Select: Property
        ('title="Select option" aria-label="Select option"\n                                                name="property_id"',
         'title="Select service location" aria-label="Select service location"\n                                                name="property_id"'),
        # Input: scheduled_start
        ('title="Input field" aria-label="Input field" placeholder=" "\n                                                type="datetime-local"',
         'title="Appointment date and time" aria-label="Appointment date and time" placeholder=" "\n                                                type="datetime-local"'),
        # Input: estimated_duration
        ('title="Input field" aria-label="Input field" placeholder=" "\n                                            type="number"\n                                            min="30"',
         'title="Estimated duration in minutes" aria-label="Estimated duration in minutes" placeholder=" "\n                                            type="number"\n                                            min="30"'),
        # Select: technician
        ('title="Select option" aria-label="Select option"\n                                            name="technician_id"',
         'title="Assign technician" aria-label="Assign technician"\n                                            name="technician_id"'),
    ],
    'CustomerForm.tsx': [
        # Back button
        ('title="Action" aria-label="Action"\n                        onClick={() => navigate(-1)}\n                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"',
         'title="Go back" aria-label="Go back"\n                        onClick={() => navigate(-1)}\n                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"'),
        # First name
        ('title="Input field" aria-label="Input field" placeholder=" "\n                                    type="text"\n                                    name="first_name"',
         'title="First name" aria-label="First name" placeholder="First name"\n                                    type="text"\n                                    name="first_name"'),
        # Last name
        ('title="Input field" aria-label="Input field" placeholder=" "\n                                    type="text"\n                                    name="last_name"',
         'title="Last name" aria-label="Last name" placeholder="Last name"\n                                    type="text"\n                                    name="last_name"'),
        # Email
        ('title="Input field" aria-label="Input field" placeholder=" "\n                                        type="email"\n                                        name="email"',
         'title="Email address" aria-label="Email address" placeholder="email@example.com"\n                                        type="email"\n                                        name="email"'),
        # Phone
        ('title="Input field" aria-label="Input field" placeholder=" "\n                                        type="tel"\n                                        name="phone"',
         'title="Phone number" aria-label="Phone number" placeholder="(555) 555-5555"\n                                        type="tel"\n                                        name="phone"'),
        # Company
        ('title="Input field" aria-label="Input field" placeholder=" "\n                                        type="text"\n                                        name="company"',
         'title="Company name" aria-label="Company name" placeholder="Company name (optional)"\n                                        type="text"\n                                        name="company"'),
        # Lead status select
        ('title="Select option" aria-label="Select option"\n                                    name="lead_status"',
         'title="Customer status" aria-label="Customer status"\n                                    name="lead_status"'),
        # Street address
        ('title="Input field" aria-label="Input field" placeholder=" "\n                                    type="text"\n                                    name="address_line1"',
         'title="Street address" aria-label="Street address" placeholder="123 Main St"\n                                    type="text"\n                                    name="address_line1"'),
        # Address line 2
        ('title="Input field" aria-label="Input field" placeholder=" "\n                                    type="text"\n                                    name="address_line2"',
         'title="Suite or apartment number" aria-label="Suite or apartment number" placeholder="Suite, Apt, etc. (optional)"\n                                    type="text"\n                                    name="address_line2"'),
        # City
        ('title="Input field" aria-label="Input field" placeholder=" "\n                                    type="text"\n                                    name="city"',
         'title="City" aria-label="City" placeholder="City"\n                                    type="text"\n                                    name="city"'),
        # State
        ('title="Input field" aria-label="Input field" placeholder=" "\n                                        type="text"\n                                        name="state"',
         'title="State" aria-label="State" placeholder="CA"\n                                        type="text"\n                                        name="state"'),
        # ZIP
        ('title="Input field" aria-label="Input field" placeholder=" "\n                                        type="text"\n                                        name="zip_code"',
         'title="ZIP code" aria-label="ZIP code" placeholder="90001"\n                                        type="text"\n                                        name="zip_code"'),
        # Property type select
        ('title="Select option" aria-label="Select option"\n                                    name="property_type"',
         'title="Property type" aria-label="Property type"\n                                    name="property_type"'),
    ],
}

# Generic fallback replacements for all admin files
generic_fixes = [
    # generic button title "Action" -> more context-aware ones; we'll handle per-icon context
    (r'title="Action" aria-label="Action"(\s+className="[^"]*hover:text-gray-600[^"]*rounded[^"]*")', 
     r'title="More options" aria-label="More options"\1'),
    (r'title="Action" aria-label="Action"(\s+className="[^"]*ChevronLeft[^"]*")',
     r'title="Previous" aria-label="Previous"\1'),
    (r'title="Action" aria-label="Action"(\s+className="[^"]*ChevronRight[^"]*")',
     r'title="Next" aria-label="Next"\1'),
    # Generic select/input fallbacks
    (r'title="Select option" aria-label="Select option"', 
     r'title="Select an option" aria-label="Select an option"'),
    (r'title="Input field" aria-label="Input field" placeholder=" "',
     r'title="Enter value" aria-label="Enter value" placeholder=" "'),
    (r'title="Action" aria-label="Action"',
     r'title="Perform action" aria-label="Perform action"'),
]

import glob

for filepath in glob.glob(os.path.join(ADMIN_DIR, '**', '*.tsx'), recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    filename = os.path.basename(filepath)
    
    # Apply targeted file-specific fixes first
    if filename in fixes:
        for old, new in fixes[filename]:
            content = content.replace(old, new)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Applied targeted fixes to: {filepath}')

print("Targeted fixes done. Now applying remaining generic identifier improvements...")

# Now fix remaining generic ones with better context-aware values by looking at the file structure
specific_semantic_fixes = {
    'AppointmentsList.tsx': {
        'title="Action" aria-label="Action" className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft': 
            'title="Previous day" aria-label="Previous day" className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft',
        'title="Action" aria-label="Action" className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight':
            'title="Next day" aria-label="Next day" className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight',
    }
}

for filepath in glob.glob(os.path.join(ADMIN_DIR, '**', '*.tsx'), recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    filename = os.path.basename(filepath)
    
    if filename in specific_semantic_fixes:
        for old, new in specific_semantic_fixes[filename].items():
            content = content.replace(old, new)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Applied semantic fixes to: {filepath}')

print("Done.")
