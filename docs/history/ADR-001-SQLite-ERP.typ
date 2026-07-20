#import "/docs/templates/company_spec.typ": project-profile

#show: project-profile.with(
  title: "ARCHITECTURE DECISION RECORD (ADR)",
  subtitle: "ADR-001: SQLite & Express Integration",
  doc-type: "ARCHITECTURE RECORD (TECHNICAL)",
  date: "20 Juli 2026",
  version: "1.0.0",
  author: "LITEXLY"
)

#v(0.5cm)

= Status
*ACCEPTED* (Disetujui)

= Konteks
Awalnya, proyek ini dirancang sebagai portofolio landing page statis murni untuk menunjukkan menu restoran Hartono Culinary Group. Namun, untuk memenuhi permintaan sistem manajemen restoran all-in-one tingkat lanjut (*all-in-one ERP system*) yang mencakup POS Kasir, antrean dapur (KDS), absensi kehadiran pramusaji/koki, dan stok gudang (BOM), sistem membutuhkan penyimpanan data persisten yang nyata. 

Kami membutuhkan solusi penyimpanan data yang:
1. Bersifat relasional (untuk mengaitkan menu, pesanan, resep, dan bahan baku mentah).
2. Memiliki konfigurasi minimal (*zero-configuration*) agar mudah dijalankan oleh klien secara lokal tanpa memerlukan instalasi database server yang rumit (seperti MySQL atau PostgreSQL).
3. Cepat dan memiliki overhead memori rendah.

= Keputusan Arsitektur
Kami memutuskan untuk menggunakan:
1. *SQLite 3* sebagai database relasional berbasis file lokal (`server/hartono.db`). Koneksi dikelola secara native melalui pustaka `sqlite3` pada lingkungan Node.js.
2. *Express.js* sebagai server API perantara di port `5000` untuk melayani request dari frontend React.
3. *Concurrently* untuk membundel perintah startup sehingga frontend (Vite React di port `3001`) dan backend (Node di port `5000`) menyala secara bersamaan hanya dengan mengetik `npm run dev`.

= Konsekuensi

== Dampak Positif (Positives)
- *Zero Installation:* Klien tidak perlu menginstal software database terpisah. Database berbentuk file tunggal `hartono.db` yang terbuat otomatis pada saat server Express pertama kali diaktifkan.
- *Integritas Relasional (BOM):* SQLite mendukung foreign keys dan transaksi ACID, memudahkan kalkulasi pemotongan stok bahan baku mentah berbasis resep secara aman (*atomic data deduction*).
- *Portabilitas Tinggi:* Seluruh codebase dan database tersimpan di dalam satu direktori proyek, mempermudah pemindahan folder maupun proses deployment.

== Dampak Negatif (Negatives)
- *Keterbatasan Concurrency:* SQLite menggunakan penguncian file tingkat database (*database-level locking*) saat menulis data. Hal ini tidak direkomendasikan jika sistem diakses oleh ribuan kasir secara bersamaan di internet (namun sangat memadai untuk operasional 1-3 mesin POS lokal restoran).
