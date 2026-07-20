#import "/docs/templates/company_spec.typ": project-profile

#show: project-profile.with(
  title: "PROJECT DEVELOPMENT ROADMAP",
  subtitle: "Hartono Culinary Group ERP & Consumer Portal",
  doc-type: "DEVELOPMENT ROADMAP (PROJECT)",
  date: "20 Juli 2026",
  version: "1.0.0",
  author: "LITEXLY"
)

#v(0.5cm)

= Rencana Jalannya Proyek (4 Minggu)

== Minggu 1: Inisialisasi & Landasan Desain (Selesai)
- Inisialisasi Git repository dan pemasangan hook Graphify.
- Konfigurasi tipografi Google Fonts (*Outfit* & *Playfair Display*) serta tag SEO dasar.
- Pembuatan token warna, layout navbar glassmorphic, dan Hero section bertema Crimson-Gold.
- Pembuatan komponen sejarah timeline korporat dan testimonial pelanggan di `History.jsx`.

== Minggu 2: Setup Database & Backend API (Selesai)
- Inisialisasi database lokal SQLite (`server/hartono.db`) beserta data benih restoran dan menu.
- Setup Express.js API untuk melayani pendaftaran menu, status meja makan, dan input pesanan.
- Penyesuaian nama folder proyek menjadi `Hartono_CulinaryGroup` tanpa mengganggu dependensi dev server.
- Integrasi formulir reservasi landing page dengan database SQLite agar tersimpan secara persisten.

== Minggu 3: Sistem ERP Manajemen Restoran (Selesai)
- Pembuatan konsol admin staf *Hartono ERP Control Center* (`AdminPortal.jsx`).
- Modul *Point of Sale (POS)* untuk melayani kasir dine-in, cetak nota, dan kembalian tunai.
- Modul *Kitchen Display System (KDS)* untuk mengontrol antrean dapur berwaktu (timer).
- Modul *Absensi Karyawan* berbasis otentikasi PIN staf dan shift kehadiran terintegrasi SQLite.
- Modul *Persediaan Stok BOM (Bill of Materials)* dengan kalkulasi potongan otomatis resep makanan saat transaksi terjual.
- Modul *Denah Meja (Table Map)* interaktif dengan visualisasi warna status meja.

== Minggu 4: Self-Ordering & Asisten Virtual (Selesai)
- Integrasi keranjang belanja melayang konsumen (*Floating Cart*) untuk pemesanan mandiri langsung dari meja.
- Pembuatan *Asisten Pemesanan Virtual* berbasis state machine chat untuk reservasi dan pesanan interaktif.
- Implementasi fitur *Idle Behavior Engagement* (animasi guncangan chatbot jika pengguna pasif selama 15 detik).
- Bug-fix penyelesaian kalkulasi nominal total belanja konsumen dari `Rp NaN` menjadi integer valid rupiah menggunakan regex parser fallback.
- Kompilasi bundel build produksi Vite React (`npm run build`) sukses 100%.

= Rencana Pengembangan Fase Selanjutnya (Fase 2)

Jika kontrak diperpanjang di masa depan, berikut adalah modul tambahan yang direkomendasikan untuk dikembangkan:
1. *Integrasi QRIS Payment Gateway:* Menghubungkan QRIS dinamis di POS kasir dan chatbot dengan Midtrans atau Xendit API agar pembayaran dapat terverifikasi lunas secara otomatis tanpa input manual kasir.
2. *Notifikasi WhatsApp Gateway:* Mengirimkan nota pembayaran dan konfirmasi reservasi meja secara otomatis ke nomor WhatsApp pelanggan menggunakan Fonepay atau Twilio API.
3. *Multi-Outlet Cloud Synchronization:* Sinkronisasi database lokal SQLite di masing-masing cabang restoran ke server pusat (PostgreSQL Cloud) secara otomatis setiap malam untuk rekapitulasi data grup usaha.
