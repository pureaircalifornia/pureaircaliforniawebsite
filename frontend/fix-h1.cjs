const fs = require('fs');
const path = require('path');

function replaceH1InStyles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceH1InStyles(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('<h1') && (content.includes('textShadow: \'0 0 20px') || content.includes('style={{ textShadow'))) {
                let newContent = content.replace(/<h1 className="([^"]+)"/g, (match, classList) => {
                    if (!classList.includes('text-white')) {
                        return `<h1 className="${classList} text-white"`;
                    }
                    return match;
                });
                if (content !== newContent) {
                    fs.writeFileSync(fullPath, newContent);
                    console.log('Fixed H1 contrast in ' + fullPath);
                }
            }
        }
    }
}
replaceH1InStyles('src/pages');
replaceH1InStyles('src/components');
