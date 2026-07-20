#import "/docs/templates/company_spec.typ": project-profile

#show: project-profile.with(
  title: "SURAT PERJANJIAN KONTRAK KERJA",
  subtitle: "Jasa Pengembangan Sistem Informasi ERP & Portal Konsumen",
  doc-type: "SURAT PERJANJIAN KERJA (LEGAL)",
  date: "20 Juli 2026",
  version: "1.0.0",
  author: "LITEXLY"
)

#v(0.5cm)
Pada hari ini, *Senin, 20 Juli 2026*, bertempat di Jakarta, yang bertanda tangan di bawah ini sepakat untuk mengikatkan diri dalam hubungan kerja profesional:

+ *Pihak Pertama (KLIEN):* \
  *Hartono Culinary Group* (Mewakili cabang restoran Sinar Rasa, Golden Dragon Bistro, dan Kopi & Ko) \
  Bertindak sebagai pemilik proyek dan pemberi perintah kerja.
  
+ *Pihak Kedua (DEVELOPER):* \
  *LITEXLY* (Diwakili oleh Antigravity AI Coding Assistant selaku Tech Lead di LITEXLY) \
  Bertindak sebagai pelaksana jasa teknologi informasi.

Kedua belah pihak dengan ini sepakat atas ketentuan-ketentuan kontrak berikut:

= Pasal 1: Lingkup Pekerjaan
DEVELOPER berkewajiban merancang, membangun, dan menyebarkan sistem informasi terintegrasi *Hartono Culinary Group ERP & Consumer Portal* yang meliputi:
- *Landing Page Konsumen:* Profil cabang, sejarah timeline korporat, katalog menu, dan form reservasi dengan tiket pratinjau langsung.
- *Customer Self-Ordering:* Fitur belanja melayang dan pemesanan mandiri oleh konsumen dari meja makan langsung ke database.
- *Asisten Virtual Pemesanan:* Chatbot interaktif pemandu metode makan, alokasi meja kosong, rekomendasi hidangan hoki, dilengkapi *Idle Tracking Engagement* beranimasi getar (*shaking*).
- *Hartono ERP Control Center:* Dasbor analitik keuangan, kasir Point of Sale (POS), Kitchen Display System (KDS), Stock Inventory BOM (Bill of Materials), dan absensi shift karyawan berbasis PIN.
- *Integrasi Database:* Database SQLite (`hartono.db`) dan REST API Express.js untuk koordinasi transaksi data dua arah.

= Pasal 2: Nilai Jasa & Pembayaran
Total nilai pekerjaan disepakati sebesar *USD 200* yang dikonversi flat ke nilai mata uang Rupiah sebesar *Rp3.200.000,00* (Tiga Juta Dua Ratus Ribu Rupiah) dengan kurs acuan Rp16.000,00 per USD.

= Pasal 3: Tenggat Waktu
Durasi pengerjaan proyek ditetapkan selama *4 Minggu (28 Hari Kalender)* terhitung dari tanggal penandatanganan kontrak, dengan serah terima hasil final pada *17 Agustus 2026*.

= Pasal 4: Hak Kekayaan Intelektual
Seluruh hak kepemilikan atas kode sumber (*source code*), database relasional SQLite, dokumentasi teknis, serta aset grafis yang dihasilkan dalam proyek ini akan dialihkan secara eksklusif kepada KLIEN setelah pelunasan nilai kontrak dipenuhi.

#v(1.5cm)

#grid(
  columns: (1fr, 1fr),
  align: center,
  [
    *PIHAK PERTAMA (KLIEN)* \
    *Hartono Culinary Group* \
    \ \ \ \
    #underline[*( Tanda Tangan Elektronik )*] \
    Status: Menyetujui Proyek
  ],
  [
    *PIHAK KEDUA (DEVELOPER)* \
    *LITEXLY* \
    \ \ \
    #text(fill: rgb("#7A0C16"))[✍️ _LITEXLY (Signed by Tech Lead)_] \
    #underline[*Antigravity AI (Tech Lead)*] \
    Status: Pengembang Utama
  ]
)
