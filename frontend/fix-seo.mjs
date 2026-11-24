import fs from 'fs';
import path from 'path';

function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, fileList);
    } else if (filePath.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const pagesDir = 'C:\\Users\\IMAGINE360\\Documents\\PAC\\Website\\pureaircaliforniawebsite\\frontend\\src\\pages';
const files = findFiles(pagesDir);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('react-helmet-async')) {
    console.log(`Processing ${file}`);
    
    let title = '';
    let description = '';

    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    if (titleMatch) title = titleMatch[1];
    
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/s);
    if (descMatch) description = descMatch[1].replace(/\n/g, ' ').replace(/\s+/g, ' ');

    let isLocal = file.includes('LocationDetail') || file.includes('Locations');
    
    // Construct the SEOProvider tag
    let seoAttrs = [];
    if (title) seoAttrs.push(`title="${title}"`);
    if (description) seoAttrs.push(`description="${description}"`);
    if (isLocal) seoAttrs.push(`isLocalBusiness={true}`);
    
    // If there were no SEO tags inside, we check if it had an SEO provider import at all. We might just inject a default one if needed, but SEOProvider has defaults.
    let seoTag = `<SEOProvider ${seoAttrs.join(' ')} />`;

    // Remove the `<HelmetProvider>` block wrappers completely
    content = content.replace(/<HelmetProvider>/g, '');
    content = content.replace(/<\/HelmetProvider>/g, '');

    // Replace `<Helmet>...</Helmet>` with `<SEOProvider ... />`
    content = content.replace(/<Helmet>[\s\S]*?<\/Helmet>/g, seoTag);
    
    // Remote helmet import
    content = content.replace(/import\s*\{\s*Helmet[^}]*\}\s*from\s*['"]react-helmet-async['"];?/g, '');
    content = content.replace(/import\s*\{\s*HelmetProvider[^}]*\}\s*from\s*['"]react-helmet-async['"];?/g, '');

    // Add SEOProvider import if missing and if we injected the tag
    if (content.includes('SEOProvider') && !content.includes('import SEOProvider')) {
        content = `import SEOProvider from '@/components/SEOProvider';\n` + content;
    }
    
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
