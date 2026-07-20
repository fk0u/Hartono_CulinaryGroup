# Hartono Culinary Group - All-in-One Restaurant ERP & Consumer Self-Ordering Portal

[![Vite Build](https://img.shields.io/badge/Vite-Build%20Success-success?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![React Version](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![SQLite Database](https://img.shields.io/badge/SQLite-Database%20Relational-blue?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

Aplikasi portofolio korporat F&B premium dan sistem manajemen ERP restoran *all-in-one* yang terintegrasi secara real-time ke database relasional **SQLite** lokal via **Express.js API**.

---

> [!IMPORTANT]
> ### ⚠️ DISCLAIMER & SIMULASI PROYEK
> **Proyek ini merupakan sarana LATIHAN / SIMULASI untuk menghadapi proyek nyata (Real Project) dari klien dengan tekanan tinggi.** 
> Pengembangan ini berjalan di bawah platform simulasi buatan sendiri bernama **Faclie.com**. Seluruh data transaksi, menu restoran, nama klien, dan nominal kontrak bersifat simulasi profesional.
> 
> Seluruh kode sumber, database, dan rangkaian dokumen formal di dalam repositori ini telah **memenuhi standar minimum platform Faclie.com** untuk menyelesaikan proyek secara lengkap dan dinyatakan lulus uji kelayakan.

---

## 🚀 Fitur Utama Sistem

### 1. Portal Konsumen (Landing Page & Order Mandiri)
* **Interactive F&B Catalog:** Menyajikan 18 menu hidangan rill dari 3 brand restoran grup (Sinar Rasa, Golden Dragon Bistro, Kopi & Ko).
* **Customer Self-Ordering System:** Keranjang belanja melayang (*Floating Cart*) di mana pelanggan dapat memasukkan pesanan, memilih nomor meja makan, dan mengirim pesanan langsung ke antrean dapur SQLite.
* **Asisten Virtual Pemesanan (Chatbot):** Panduan memesan mandiri berbasis state machine (Pilihan Metode Makan $\to$ Jumlah Orang $\to$ Pilih Meja Kosong $\to$ Rekomendasi Menu $\to$ Konfirmasi SQLite Checkout).
* **Intelligent Inactivity Tracker (Idle Engagement):** Jika pengguna pasif selama 15 detik di halaman web, tombol asisten robot akan bergetar (*shaking*) secara visual dan membuka panel chat secara proaktif.
* **Live Booking Ticket Preview:** Form reservasi meja & katering yang langsung mencetak struk tiket pratinjau fisik lengkap dengan pilihan diet khusus.

### 2. Hartono ERP Control Center (Portal Internal Staf)
* **Dashboard Finansial:** Laporan pendapatan riil (*Billed*), pesanan dapur aktif, grafik perbandingan omzet antar-restoran, serta metrik kegemaran menu makanan.
* **Point of Sale (POS) Kasir:** Antarmuka kasir cepat untuk melayani transaksi makan di tempat, menghitung kembalian uang tunai, dan mencetak simulasi nota lunas fisik.
* **Kitchen Display System (KDS):** Antrean monitor dapur staf berwaktu (timer) untuk memandu koki melacak durasi memasak per pesanan.
* **BOM (Bill of Materials) Stock Control:** Pemotongan otomatis persediaan bahan baku mentah (seperti berat daging wagyu, pcs ayam, kg kopi) di gudang sesaat setelah hidangan terjual di kasir/self-ordering.
* **Shift Absensi Karyawan:** Roster check-in/check-out absensi karyawan terintegrasi PIN staf.
* **Reservasi CRM:** Panel kelola persetujuan (*Approve* / *Decline*) atas booking reservasi masuk dari landing page.

---

## 🛠️ Tech Stack & Arsitektur

* **Frontend:** React 19, Vite 8, Lucide React, Vanilla CSS.
* **Backend:** Node.js, Express.js, CORS.
* **Database:** SQLite 3 (Lokal persisten & inisialisasi data benih otomatis).
* **Process Manager:** Concurrently (Menjalankan frontend & backend secara simultan).

---

## 📥 Panduan Instalasi & Menjalankan Proyek

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Menjalankan Server Pengembangan (Concurrently)
Jalankan perintah di bawah ini. Frontend (port `3001`) dan Express API server (port `5000`) akan menyala secara simultan:
```bash
npm run dev
```

* **Frontend URL:** [http://localhost:3001](http://localhost:3001)
* **Backend API URL:** [http://localhost:5000](http://localhost:5000)

---

## 🔐 Otentikasi Karyawan (PIN Login)

Masukkan PIN 4 digit berikut saat mengakses Portal Admin di Navbar kanan atas:
* **Manager ERP (Admin):** `0000`
* **Kasir Utama (Dedi):** `9012`
* **Kepala Koki (Siti):** `5678`
* **Pramusaji (Budi):** `1234`

---

## 📁 Struktur Direktori Dokumentasi Formal (Typst & PDF)

Seluruh berkas dokumen formal berdesain highend (Crimson-Gold dengan sampul gradasi linear) dikelompokkan di dalam folder `docs/`:
* **📁 `docs/templates/`** — [company_spec.typ](file:///d:/Project/Hartono_CulinaryGroup/docs/templates/company_spec.typ) (Template gaya & cover)
* **📁 `docs/legal/`** — [KONTRAK.typ](file:///d:/Project/Hartono_CulinaryGroup/docs/legal/KONTRAK.typ) | [KONTRAK.pdf](file:///d:/Project/Hartono_CulinaryGroup/docs/legal/KONTRAK.pdf) (Surat Kontrak Kerja)
* **📁 `docs/product/`** — [PRD.typ](file:///d:/Project/Hartono_CulinaryGroup/docs/product/PRD.typ) | [PRD.pdf](file:///d:/Project/Hartono_CulinaryGroup/docs/product/PRD.pdf) (Product Requirement Document)
* **📁 `docs/technical/`** — [SRS.typ](file:///d:/Project/Hartono_CulinaryGroup/docs/technical/SRS.typ) | [SRS.pdf](file:///d:/Project/Hartono_CulinaryGroup/docs/technical/SRS.pdf) (Software Requirements Specification)
* **📁 `docs/project/`** — [roadmap.typ](file:///d:/Project/Hartono_CulinaryGroup/docs/project/roadmap.typ) | [roadmap.pdf](file:///d:/Project/Hartono_CulinaryGroup/docs/project/roadmap.pdf) (Rencana Rilis)
* **📁 `docs/history/`** — [ADR-001-SQLite-ERP.typ](file:///d:/Project/Hartono_CulinaryGroup/docs/history/ADR-001-SQLite-ERP.typ) | [ADR-001-SQLite-ERP.pdf](file:///d:/Project/Hartono_CulinaryGroup/docs/history/ADR-001-SQLite-ERP.pdf) (Architecture Decision Record)
