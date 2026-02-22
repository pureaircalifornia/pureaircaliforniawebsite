const fs = require('fs');
const path = require('path');

function fillStars(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fillStars(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Look for standard <Star className="..." /> patterns that might need filling
            if (content.includes('<Star')) {
                let newContent = content.replace(/<Star[^>]*className="([^"]+)"[^>]*>/g, (match, classList) => {
                    if (!classList.includes('fill-') && !classList.includes('fill-current')) {
                        // If it text-yellow or brand, add fill-current so it fills with that color
                        if (classList.includes('text-yellow-') || classList.includes('text-brand-')) {
                            return match.replace(classList, classList + ' fill-current');
                        }
                    }
                    return match;
                });

                if (content !== newContent) {
                    fs.writeFileSync(fullPath, newContent);
                    console.log('Filled stars in ' + fullPath);
                }
            }
        }
    }
}

fillStars('src');
