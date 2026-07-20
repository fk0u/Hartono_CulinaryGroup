#import "/docs/templates/company_spec.typ": project-profile

#show: project-profile.with(
  title: "PRODUCT REQUIREMENT DOCUMENT",
  subtitle: "Hartono Culinary Group ERP & Consumer Portal",
  doc-type: "PRODUCT REQUIREMENT DOCUMENT (PRD)",
  date: "20 Juli 2026",
  version: "1.0.0",
  author: "LITEXLY"
)

#v(0.5cm)
#outline(indent: 1.5em)
#pagebreak()

= 1. Pendahuluan
Dokumen Persyaratan Produk (PRD) ini menjelaskan ruang lingkup bisnis, arsitektur fungsional, dan spesifikasi antarmuka untuk platform F&B terintegrasi Hartono Culinary Group. Platform ini terdiri atas Landing Page konsumen (Online) dan Sistem ERP manajemen internal restoran (Offline).

= 2. Tujuan Bisnis
- *Peningkatan Efisiensi:* Automasi pengiriman pesanan konsumen ke KDS.
- *Kendali Margin:* Pemotongan otomatis persediaan bahan baku mentah (BOM) berbasis resep relasional.
- *Interaktivitas:* Asisten pemesanan virtual proaktif berkemampuan idle detection.

= 3. Persyaratan Fungsional
== 3.1 Portal Konsumen (Landing Page)
- *Katalog Menu:* Menyajikan 18 produk dari 3 brand restoran grup.
- *Self-Ordering Drawer:* Laci belanja untuk memesan mandiri langsung dari meja.
- *Virtual Chatbot:* Chatbot pemandu metode makan, pemilih meja, dan pemberi rekomendasi menu.
- *Idle Engagement:* Animasi getar chatbot jika pengguna diam selama 15 detik.

== 3.2 Hartono ERP Control Center
- *Dashboard Analitik:* Ringkasan total billed, pesanan aktif, bagan omzet brand, dan notifikasi stok kritis.
- *POS Kasir:* Entri pesanan kasir, perhitungan kembalian, diskon, dan cetak struk nota lunas simulasi.
- *KDS Monitor:* Tampilan antrean dapur dengan pencatat waktu memasak per pesanan.
- *BOM Inventory:* Pemotongan otomatis bahan baku per porsi menu terjual dan tombol isi ulang.
- *Absensi Roster:* Absen masuk/pulang karyawan terotentikasi PIN staf.
- *CRM Reservasi:* Persetujuan booking reservasi meja dari landing page.
