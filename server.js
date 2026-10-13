const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  let requestPath = decodeURIComponent(req.url.split('?')[0]);

  // Root -> redirect to the login page.
  if (requestPath === '/') {
    requestPath = '/halaman-login.html';
  }

  // Prevent path traversal outside the public folder.
  const safeSuffix = path.normalize(requestPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safeSuffix);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(
        '<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8">' +
        '<title>404 - Halaman tidak ditemukan</title></head>' +
        '<body style="font-family: sans-serif; padding: 40px;">' +
        '<h1>404 — Halaman tidak ditemukan</h1>' +
        '<p><a href="/">Kembali ke Halaman Login</a></p>' +
        '</body></html>'
      );
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('  Kader TPK — prototipe berjalan!');
  console.log('  ------------------------------------------');
  console.log('  Buka salah satu tautan berikut di browser:');
  console.log('');
  console.log(`   Login             http://localhost:${PORT}/`);
  console.log(`   Beranda           http://localhost:${PORT}/halaman-beranda.html`);
  console.log(`   Beranda (desktop) http://localhost:${PORT}/halaman-beranda-desktop.html`);
  console.log(`   Catin             http://localhost:${PORT}/halaman-catin.html`);
  console.log(`   Detail Catin      http://localhost:${PORT}/halaman-detail-catin.html`);
  console.log(`   Ibu Hamil (Bumil) http://localhost:${PORT}/halaman-bumil.html`);
  console.log(`   Detail Bumil      http://localhost:${PORT}/halaman-detail-bumil.html`);
  console.log(`   Pasca Salin       http://localhost:${PORT}/halaman-bulin.html`);
  console.log(`   Detail Bulin      http://localhost:${PORT}/halaman-detail-bulin.html`);
  console.log(`   Baduta (0-23 Bln) http://localhost:${PORT}/halaman-baduta.html`);
  console.log(`   Detail Baduta     http://localhost:${PORT}/halaman-detail-baduta.html`);
  console.log(`   Balita (24-59Bln) http://localhost:${PORT}/halaman-balita.html`);
  console.log(`   Detail Balita     http://localhost:${PORT}/halaman-detail-balita.html`);
  console.log('');
  console.log('  Tekan Ctrl+C untuk menghentikan server.');
  console.log('');
});
