# Prototipe Kader TPK

Prototipe HTML/CSS/JS statis untuk sistem Kader TPK (Halaman Login, Beranda, Catin, dan Detail Catin), dibuat dari desain Figma.

## Menjalankan (tanpa perlu `npm install`)

Server ini hanya memakai modul bawaan Node.js (`http`, `fs`, `path`) — tidak ada dependency eksternal, jadi bisa langsung dijalankan:

```bash
node server.js
```

Atau, jika lebih suka lewat npm:

```bash
npm start
```

Lalu buka browser ke:

```
http://localhost:3000/
```

Port bisa diganti lewat environment variable `PORT`, misalnya:

```bash
PORT=8080 node server.js
```

## Peta halaman

| Halaman | URL |
|---|---|
| Login | `http://localhost:3000/` atau `/halaman-login.html` |
| Beranda (desktop + mobile) | `/halaman-beranda.html` |
| Beranda (desktop saja) | `/halaman-beranda-desktop.html` |
| Catin (list + wizard) | `/halaman-catin.html` |
| Detail Catin | `/halaman-detail-catin.html` |
| Ibu Hamil (Bumil list + wizard) | `/halaman-bumil.html` |
| Detail Ibu Hamil | `/halaman-detail-bumil.html` |
| Pasca Salin (Bulin list + wizard) | `/halaman-bulin.html` |
| Detail Pasca Salin | `/halaman-detail-bulin.html` |
| Baduta (0-23 Bln list + wizard) | `/halaman-baduta.html` |
| Detail Baduta | `/halaman-detail-baduta.html` |
| Balita (24-59 Bln list + wizard) | `/halaman-balita.html` |
| Detail Balita | `/halaman-detail-balita.html` |

1. **Login** (`halaman-login.html`) → mengisi form & klik **Masuk** → redirect ke **Beranda**.
2. **Navigasi Sidebar** → terhubung penuh ke menu **Catin**, **Ibu Hamil**, **Pasca Salin**, **Baduta**, dan **Balita**.
3. **Setiap Modul** → tombol **+ Data Baru** membuka wizard form interaktif multi-tahap yang dapat menambahkan data langsung ke tabel tanpa refresh.
4. **Detail View** → klik tombol **Detail** di tabel untuk membuka profil lengkap & skrining masing-masing sasaran TPK.

## Struktur folder

```
.
├── server.js        # server statis Node.js (tanpa dependency)
├── package.json
├── README.md
└── public/
    ├── styles.css               # satu file CSS gabungan, dipakai semua halaman
    ├── halaman-login.html
    ├── halaman-beranda.html
    ├── halaman-beranda-desktop.html
    ├── halaman-catin.html
    └── halaman-detail-catin.html
```

Semua CSS sudah dipisah ke satu file eksternal `public/styles.css` (bukan lagi `<style>` inline di tiap HTML). Setiap halaman memuatnya lewat:

```html
<link rel="stylesheet" href="styles.css">
```

File tersebut dikelompokkan per halaman dengan komentar penanda, jadi tetap mudah ditelusuri meski sudah digabung jadi satu.

## Catatan

- Ini adalah prototipe front-end statis (tanpa backend/database sungguhan) — data yang ditambahkan lewat wizard "Tambah Data" hanya tersimpan sementara di memori browser (hilang saat halaman di-refresh).
- Beberapa ikon dibuat sebagai SVG custom karena asset asli dari Figma tidak dapat diunduh langsung oleh sandbox pembuatan file ini.
