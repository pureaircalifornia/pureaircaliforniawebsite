import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

test('a real sitemap build retains private-path exclusions for every named crawler', () => {
  const frontend = fileURLToPath(new URL('../', import.meta.url));
  const workspaceOutput = path.resolve(frontend, '../output');
  fs.mkdirSync(workspaceOutput, { recursive: true });
  const fixture = fs.mkdtempSync(path.join(workspaceOutput, 'robots-generation-test-'));
  try {
    for (const relative of ['scripts/generate-sitemap.js', 'scripts/business-routes.mjs',
      'src/utils/seo/searchPolicy.mjs', 'src/pages/locations/data.ts', 'src/data/businessCatalog.json',
      'src/pages/caseStudies/data.ts', 'src/pages/blog/data.ts', 'src/pages/blog/post-data.ts']) {
      const target = path.join(fixture, relative);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(path.join(frontend, relative), target);
    }
    fs.mkdirSync(path.join(fixture, 'public'));
    fs.writeFileSync(path.join(fixture, 'package.json'), '{"type":"module"}');
    const generate = () => execFileSync(process.execPath, [path.join(fixture, 'scripts/generate-sitemap.js')], { cwd: fixture, encoding: 'utf8' });
    generate();
    const output = fs.readFileSync(path.join(fixture, 'public/robots.txt'), 'utf8');
    const groups = output.split(/\r?\n\s*\r?\n/).map(block => block.split(/\r?\n/).map(line => line.trim()));
    for (const agent of ['*', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Claude-SearchBot',
      'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'Bingbot']) {
      const group = groups.find(lines => lines.includes(`User-agent: ${agent}`));
      assert.ok(group, `Missing crawler group: ${agent}`);
      assert.ok(group.includes('Allow: /'), `Public access changed for ${agent}`);
      for (const privatePath of ['/admin', '/api/', '/node_modules/']) {
        assert.ok(group.includes(`Disallow: ${privatePath}`), `${agent} lost ${privatePath} exclusion during generation`);
      }
    }
    assert.equal((output.match(/^Sitemap: https:\/\/www\.pureaircalifornia\.com\/sitemap\.xml$/gm) || []).length, 1);
    fs.writeFileSync(path.join(fixture, 'public/robots.txt'), 'User-agent: *\nAllow: /\n');
    generate();
    assert.equal(fs.readFileSync(path.join(fixture, 'public/robots.txt'), 'utf8'), output, 'Repeated builds must restore the complete rules');
  } finally {
    const relative = path.relative(workspaceOutput, path.resolve(fixture));
    if (relative.startsWith('..') || path.isAbsolute(relative) || !relative.startsWith('robots-generation-test-')) {
      throw new Error('Refusing fixture cleanup outside its workspace output directory');
    }
    fs.rmSync(fixture, { recursive: true, force: true });
  }
});
