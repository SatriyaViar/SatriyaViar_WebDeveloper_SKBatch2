# Sekolah Karir — Recruitment Prototype

Prototype assignment berbasis Laravel 12, Inertia 2, Vue 3, dan Tailwind CSS 4. Halaman menampilkan tiga posisi contoh dan simulasi alur lamaran sampai konfirmasi.

## Menjalankan secara lokal

Prasyarat: PHP 8.2+, Composer 2, dan Node.js 22.22.2+ (jalur 22.x), 24.15+ (24.x), atau 26+ beserta npm. Proyek diuji dengan PHP 8.2.7 dan Node.js 22.23.2.

```powershell
composer install
npm ci
if (!(Test-Path .env)) { Copy-Item .env.example .env }
php artisan key:generate
```

Jalankan server Laravel dan Vite di dua terminal:

```powershell
php artisan serve
```

```powershell
npm run dev
```

Buka `http://127.0.0.1:8000`. Untuk menjalankan bundle tanpa Vite dev server, gunakan `npm run build`, lalu `php artisan serve`.

## Pemeriksaan

```powershell
npm run test:unit
php artisan test
```

## Batas prototype

- Katalog Frontend Developer, UI/UX Designer, dan Quality Assurance Intern berasal dari `config/recruitment.php`; semua posisi adalah data contoh, bukan lowongan resmi.
- Form memakai isian contoh yang read-only. Tombol CV memilih descriptor contoh—tidak ada file input, upload, atau akses ke file pengguna.
- Validasi, review, proses satu detik, dan konfirmasi berjalan lokal di browser. Tidak ada endpoint submission, penyimpanan lamaran, email, akun, atau integrasi AI runtime.
- Reload mengembalikan formulir ke keadaan kosong. Gunakan hanya data contoh, bukan data pribadi.

## Acuan desain dan aset

Implementasi mengacu pada [prototype Figma Sekolah Karir](https://www.figma.com/design/weHyFym1lCI8wmeQcVZvaX?node-id=25-965). Ilustrasi kandidat dan bingkai hero berasal dari aset prototype tersebut; ilustrasi dibuat dengan Stitch dan bukan foto karyawan. Repository tidak menyertakan lisensi terpisah untuk aset Figma/Stitch—pastikan hak pakainya sebelum redistribusi di luar assignment.

Font Geist dan Bricolage Grotesque disimpan lokal. Berkas lisensi SIL Open Font License 1.1 disertakan di `public/fonts/OFL-Geist.txt` dan `public/fonts/OFL-Bricolage-Grotesque.txt`.

## Penggunaan AI

OpenCode dengan OpenAI GPT-6 Luna membantu membaca acuan Figma, menyusun dan mengimplementasikan kode Laravel/Vue/CSS, menulis tes, men-debug, serta menyiapkan dokumentasi. Figma MCP digunakan untuk membaca desain sebagai referensi; halaman tidak dibuat dari screenshot Figma. Hasil implementasi diverifikasi dengan build, tes otomatis, dan QA browser yang dicatat di `docs/reviews/2026-11-12-implementation-qa.md`.

AI hanya digunakan selama pengembangan. Aplikasi tidak memanggil model/API AI, layanan berbayar, analytics, atau layanan pihak ketiga saat runtime; tidak ada data pelamar yang dikirim ke AI.
