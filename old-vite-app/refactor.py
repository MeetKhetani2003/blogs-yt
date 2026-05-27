import re

def kebab_to_pascal(word):
    return ''.join(x.capitalize() for x in word.split('-'))

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Fix React imports
content = content.replace("const { useState, useEffect, useRef, useMemo } = React;", "import React, { useState, useEffect, useRef, useMemo } from 'react';")

# Find all lucide icons
icons = set(re.findall(r'data-lucide="([^"]+)"', content))
pascal_icons = [kebab_to_pascal(i) for i in icons]

# Replace <i data-lucide="icon" className="classes"></i> with <Icon className="classes" />
def replace_icon(match):
    icon_name = kebab_to_pascal(match.group(1))
    class_attr = match.group(2) if match.group(2) else ""
    # if it's just <i data-lucide="icon"></i> it'll have no class_attr
    if class_attr:
        return f"<{icon_name} {class_attr} />"
    return f"<{icon_name} />"

content = re.sub(r'<i\s+data-lucide="([^"]+)"\s*(className="[^"]*")?[^>]*>.*?</i\s*>', replace_icon, content)

# Remove IconRenderer component
content = re.sub(r'// Helper component.*?return null;\n\s*}', '', content, flags=re.DOTALL)
content = re.sub(r'<IconRenderer[^>]*/>', '', content)

# Remove ReactDOM render
content = re.sub(r'// Render React DOM App.*?root\.render\(<App />\);', 'export default App;', content, flags=re.DOTALL)

# Add lucide imports
if pascal_icons:
    import_statement = f"import {{ {', '.join(pascal_icons)} }} from 'lucide-react';\n"
    content = import_statement + content

with open('src/App.tsx', 'w') as f:
    f.write(content)

