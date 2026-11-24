// Loopback-only QA fixture. No messages, customer records or external API calls.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.env.PAC_QA_BUILD_DIR
  ? path.resolve(process.env.PAC_QA_BUILD_DIR)
  : fileURLToPath(new URL('../build/', import.meta.url));
const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = http.createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const json = (status, value) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(value)); };
  if (pathname.startsWith('/api/')) {
    if (pathname === '/api/reviews/feedback/policy-qa' && req.method === 'GET') return json(200, { customer_name: 'Test visitor' });
    if (pathname === '/api/reviews/feedback/policy-qa' && req.method === 'POST') {
      req.resume();
      // Simulate the old server response: the client must still offer everyone
      // the same Google link and must never automatically redirect.
      return json(200, { route: 'private', url: null });
    }
    if (pathname === '/api/leads' && req.method === 'POST') { req.resume(); return json(201, { id: 'local-qa-only', status: 'new' }); }
    return json(404, { detail: 'Local QA fixture not found' });
  }
  if (!['GET', 'HEAD'].includes(req.method)) return json(405, { detail: 'Method not allowed' });
  try {
    let filename = path.resolve(root, '.' + decodeURIComponent(pathname));
    if (path.relative(root, filename).startsWith('..') || pathname.split('/').some(part => part.startsWith('.'))) return json(403, { detail: 'Forbidden' });
    if (/^\/(admin|feedback)(\/|$)/.test(pathname)) filename = path.join(root, 'index.html');
    else if ((await fs.stat(filename)).isDirectory()) filename = path.join(filename, 'index.html');
    const content = await fs.readFile(filename);
    res.writeHead(200, { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream' });
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found'); }
});
server.listen(4178, '127.0.0.1', () => console.log('Local QA with simulated API: http://127.0.0.1:4178'));
