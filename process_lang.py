import re

def process_english(html_content):
    # Remove "/ <bangla text>" from labels and placeholders
    # e.g., "Full Name / পুরো নাম" -> "Full Name"
    # Matches / followed by any Bengali characters and spaces
    content = re.sub(r'\s*/\s*[\u0980-\u09FF\s]+', '', html_content)
    # Also fix some specific ones like (পারিবারিক তথ্য)
    content = re.sub(r'\s*\([\u0980-\u09FF\s]+\)', '', content)
    # Change script.js to script.js
    content = content.replace('script-bn.js', 'script.js')
    
    # Validation strictly English
    content = content.replace("replace(/[^a-zA-Z\\u0980-\\u09FF\\s]/g, '')", "replace(/[^a-zA-Z\\s]/g, '')")
    return content

def process_bangla(html_content):
    # e.g., "Full Name / পুরো নাম" -> "পুরো নাম"
    # Match English text then / then Bangla
    content = re.sub(r'[a-zA-Z\s\']+\s*/\s*([\u0980-\u09FF\s]+)', r'\1', html_content)
    # Some standalone english like 'Select'
    content = content.replace('Select / ', '')
    content = content.replace('script.js', 'script-bn.js')
    return content

# Read
with open('index.html', 'r', encoding='utf-8') as f:
    original_html = f.read()

# Write English version
english_html = process_english(original_html)
# Add Language Switcher to English
switcher_en = '''
        <div style="text-align: center; margin-bottom: 2rem;">
            <a href="index.html" class="primary-btn" style="text-decoration: none; padding: 0.5rem 2rem; border-radius: 20px 0 0 20px;">English</a>
            <a href="bangla.html" class="secondary-btn" style="text-decoration: none; padding: 0.5rem 2rem; border-radius: 0 20px 20px 0; background: #fff;">বাংলা</a>
        </div>
'''
english_html = english_html.replace('            <form id="biodata-form">', switcher_en + '            <form id="biodata-form">')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(english_html)

# Write Bangla version
bangla_html = process_bangla(original_html)
switcher_bn = '''
        <div style="text-align: center; margin-bottom: 2rem;">
            <a href="index.html" class="secondary-btn" style="text-decoration: none; padding: 0.5rem 2rem; border-radius: 20px 0 0 20px; background: #fff;">English</a>
            <a href="bangla.html" class="primary-btn" style="text-decoration: none; padding: 0.5rem 2rem; border-radius: 0 20px 20px 0;">বাংলা</a>
        </div>
'''
bangla_html = bangla_html.replace('            <form id="biodata-form">', switcher_bn + '            <form id="biodata-form">')
with open('bangla.html', 'w', encoding='utf-8') as f:
    f.write(bangla_html)

# Process Scripts
with open('script.js', 'r', encoding='utf-8') as f:
    original_js = f.read()

en_js = process_english(original_js)
with open('script.js', 'w', encoding='utf-8') as f:
    f.write(en_js)

bn_js = process_bangla(original_js)
with open('script-bn.js', 'w', encoding='utf-8') as f:
    f.write(bn_js)
