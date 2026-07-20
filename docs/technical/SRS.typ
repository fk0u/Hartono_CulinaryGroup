#import "/docs/templates/company_spec.typ": project-profile

#show: project-profile.with(
  title: "SOFTWARE REQUIREMENTS SPECIFICATION",
  subtitle: "Hartono Culinary Group ERP System Architecture",
  doc-type: "SOFTWARE SPECIFICATION (SRS)",
  date: "20 Juli 2026",
  version: "1.0.0",
  author: "LITEXLY"
)

#v(0.5cm)
#outline(indent: 1.5em)
#pagebreak()

= 1. Arsitektur Data & Model Relasional
Database relasional menggunakan SQLite 3 dengan tabel terstruktur berikut:

== 1.1 Tabel `restaurants`
- `id` (TEXT PRIMARY KEY) - Contoh: `'sinar-rasa'`
- `name` (TEXT NOT NULL)
- `tagline` (TEXT)

== 1.2 Tabel `menu_items`
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `brand` (TEXT) - Referensi ke `restaurants.id`
- `category` (TEXT) - `'mains'`, `'dimsum'`, `'desserts'`, `'beverages'`
- `name` (TEXT NOT NULL)
- `price` (TEXT)
- `price_num` (INTEGER)
- `image` (TEXT)
- `color` (TEXT)
- `popular` (INTEGER)
- `tags` (TEXT) - JSON string array

== 1.3 Tabel `tables`
- `id` (TEXT PRIMARY KEY) - Contoh: `'SR-01'`
- `brand` (TEXT)
- `table_number` (TEXT)
- `capacity` (INTEGER)
- `status` (TEXT) - `'Kosong'`, `'Terisi'`, `'Reserved'`

== 1.4 Tabel `orders` & `order_items`
- `orders`: `id`, `brand`, `table_id`, `status`, `total_amount`, `payment_method`, `created_at`
- `order_items`: `id`, `order_id`, `menu_item_id`, `name`, `price_num`, `quantity`, `notes`

== 1.5 Tabel `inventory` & `recipes` (BOM)
- `inventory`: `id` (PK), `item_name`, `stock_qty`, `unit`, `min_stock_qty`
- `recipes`: `id`, `menu_item_name`, `inventory_id`, `qty_needed`

= 2. Spesifikasi API REST (Express.js)
Semua base URL diarahkan ke `http://localhost:5000/api`.

- *`POST /login`*: Verifikasi PIN 4 digit karyawan.
- *`POST /orders`*: Pembuatan pesanan baru & eksekusi BOM auto-deduct.
- *`GET /orders/active`*: Mengambil pesanan aktif (status pending/cooking/done).
- *`PUT /orders/:id/status`*: Memperbarui antrean memasak (KDS) dan billing kasir.
- *`GET /inventory`*: Memantau tingkat persediaan gudang.
- *`POST /inventory/adjust`*: Menyesuaikan stok / restock instan.
- *`POST /reservations`*: Registrasi booking meja makan baru.
