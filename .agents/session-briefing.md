# Session Briefing - Hartono ERP & Consumer Self-Ordering Extension

## Project Status
Proyek ini sekarang merupakan sistem F&B ERP terintegrasi penuh yang melampaui standar Odoo. Proyek mencakup Halaman Login PIN Staf yang aman, Keranjang Belanja Mandiri (Customer Self-Ordering Drawer) langsung dari landing page konsumen ke KDS, pencatatan Absensi Shift Karyawan, dan tabel Riwayat Penjualan lengkap dengan database relasional SQLite.

## Completed Goals
- Memodifikasi skema SQLite di `server/db.js` untuk tabel `employees` dan `attendance` beserta seed data karyawan awal.
- Menambahkan API endpoint di `server/server.js` untuk otentikasi login PIN, daftar karyawan, log absensi, dan riwayat transaksi closed (*Billed*).
- Membuat komponen visual PIN Pad **AdminLogin (`src/components/AdminLogin.jsx`)** dengan gaya glassmorphism Crimson-Gold dan petunjuk login untuk memudahkan pengujian.
- Memperluas **AdminPortal (`src/components/AdminPortal.jsx`)** dengan menambahkan dua tab baru: **Riwayat Penjualan** (pencarian invoice closed) dan **Kehadiran Karyawan** (log absensi check-in/check-out).
- Memodifikasi **MenuCatalog (`src/components/MenuCatalog.jsx`)** untuk mendukung tombol **"Tambah ke Pesanan"** per hidangan.
- Memodifikasi **App (`src/App.jsx`)** untuk menangani state keranjang belanja melayang konsumen, drawer laci samping pemesanan mandiri (dengan input nomor meja makan), dan validasi otentikasi admin.
- Menjalankan build produksi frontend `npm run build` dan berhasil dikompilasi 100% dengan sukses.
- Memperbarui bagan Graphify dan menyimpan hasil pembelajaran.

## Retrospective / Notes
- Alur pemesanan mandiri oleh konsumen (Self-Ordering) terhubung secara atomik ke database SQLite. Pesanan yang dibuat di landing page langsung masuk ke antrean KDS dengan status 'Pending'. Setelah koki memproses di KDS dan kasir melakukan billing, pesanan berpindah ke tab Riwayat Penjualan secara instan.
- Sistem absensi shift menggunakan PIN numerik yang disimpan di database, memberikan simulasi login POS fisik yang sangat otentik bagi staf F&B.
