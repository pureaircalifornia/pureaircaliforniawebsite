// Loopback-only, in-memory QA. No upstream requests, email, database or Google events.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../../output/ads-review-2026-10-12/', import.meta.url));
const receipts = new Map();
const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = http.createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  // Browser requests from this fixture cannot reach any real backend or ad provider.
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-src 'none'; object-src 'none'; form-action 'self'");
  const pathname = new URL(req.url, 'http://127.0.0.1:4188').pathname;
  const json = (status, value) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(value)); };
  if (pathname.startsWith('/api/')) {
    if (pathname !== '/api/leads' || req.method !== 'POST') { req.resume(); return json(404, { detail: 'Local fixture only' }); }
    try {
      const chunks = []; let size = 0;
      for await (const chunk of req) { size += chunk.length; if (size > 65536) return json(413, { detail: 'Too large' }); chunks.push(chunk); }
      const raw = Buffer.concat(chunks).toString('utf8'); const body = JSON.parse(raw);
      if (body.message?.includes('PAC_QA_FORCE_FAILURE')) return json(503, { detail: 'Simulated delivery failure' });
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.submission_id || '')) return json(422, { detail: 'Valid submission ID required' });
      const fingerprint = createHash('sha256').update(raw).digest('hex');
      const previous = receipts.get(body.submission_id);
      if (previous && previous.fingerprint !== fingerprint) return json(409, { detail: 'Submission ID reused with changed payload' });
      if (receipts.size >= 100 && !previous) return json(429, { detail: 'Restart fixture to reset test data' });
      const receipt = previous?.receipt || { accepted: true, submission_id: body.submission_id, id: randomUUID() };
      receipts.set(body.submission_id, { fingerprint, receipt });
      return json(201, receipt);
    } catch { return json(400, { detail: 'Invalid fixture request' }); }
  }
  if (!['GET', 'HEAD'].includes(req.method)) return json(405, { detail: 'Method not allowed' });
  try {
    const decoded = decodeURIComponent(pathname);
    let filename = path.resolve(root, '.' + decoded);
    if (path.relative(root, filename).startsWith('..') || decoded.split(/[\\/]/).some(part => part.startsWith('.'))) return json(403, { detail: 'Forbidden' });
    if (!path.extname(filename)) filename = path.join(root, 'index.html');
    const content = await fs.readFile(filename);
    res.writeHead(200, { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream' });
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch { return json(404, { detail: 'Fixture file not found' }); }
});
server.listen(4188, '127.0.0.1', () => console.log('Ads review fixture: http://127.0.0.1:4188 (all outbound requests blocked)'));
