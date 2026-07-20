import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'hartono.db');

// Ensure server directory exists
if (!fs.existsSync(__dirname)) {
  fs.mkdirSync(__dirname);
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Koneksi database SQLite gagal:', err.message);
  } else {
    console.log('Terhubung ke database SQLite Hartono ERP:', dbPath);
  }
});

// Helper for running queries synchronously-ish (via promises)
export const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

// Database structure initialization
export const initDb = async () => {
  console.log('Memulai inisialisasi skema database SQLite...');

  // 1. Table: restaurants
  await run(`CREATE TABLE IF NOT EXISTS restaurants (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT
  )`);

  // 2. Table: menu_items
  await run(`CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    desc TEXT,
    price TEXT NOT NULL,
    price_num INTEGER NOT NULL,
    image TEXT,
    color TEXT,
    popular INTEGER DEFAULT 0,
    tags TEXT
  )`);

  // 3. Table: tables
  await run(`CREATE TABLE IF NOT EXISTS tables (
    id TEXT PRIMARY KEY,
    brand TEXT NOT NULL,
    table_number TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'Kosong' -- 'Kosong', 'Terisi', 'Reserved'
  )`);

  // 4. Table: orders
  await run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    table_id TEXT,
    status TEXT NOT NULL DEFAULT 'Pending', -- 'Pending', 'Memasak', 'Selesai', 'Billed'
    total_amount INTEGER NOT NULL,
    payment_method TEXT, -- 'Tunai', 'QRIS', 'Debit'
    created_at TEXT NOT NULL
  )`);

  // 5. Table: order_items
  await run(`CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    menu_item_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    price_num INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    notes TEXT,
    FOREIGN KEY(order_id) REFERENCES orders(id)
  )`);

  // 6. Table: inventory
  await run(`CREATE TABLE IF NOT EXISTS inventory (
    id TEXT PRIMARY KEY,
    item_name TEXT NOT NULL,
    stock_qty REAL NOT NULL,
    unit TEXT NOT NULL,
    min_stock_qty REAL NOT NULL
  )`);

  // 7. Table: recipes (Bill of Materials)
  await run(`CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    menu_item_name TEXT NOT NULL,
    inventory_id TEXT NOT NULL,
    qty_needed REAL NOT NULL,
    FOREIGN KEY(inventory_id) REFERENCES inventory(id)
  )`);

  // 8. Table: reservations
  await run(`CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    brand TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    guests INTEGER NOT NULL,
    dietary TEXT,
    status TEXT NOT NULL DEFAULT 'Pending', -- 'Pending', 'Approved', 'Declined'
    notes TEXT
  )`);

  // 9. Table: employees
  await run(`CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    pin TEXT NOT NULL
  )`);

  // 10. Table: attendance
  await run(`CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_name TEXT NOT NULL,
    role TEXT NOT NULL,
    check_in TEXT NOT NULL,
    check_out TEXT
  )`);

  // --- SEED DATA ---
  // Seed Restaurants
  const restCount = await query('SELECT COUNT(*) as count FROM restaurants');
  if (restCount[0].count === 0) {
    await run("INSERT INTO restaurants VALUES ('sinar-rasa', 'Sinar Rasa', 'Authentic Padang Dining')");
    await run("INSERT INTO restaurants VALUES ('golden-dragon', 'Golden Dragon Bistro', 'Modern Chinese & Dim Sum')");
    await run("INSERT INTO restaurants VALUES ('kopi-ko', 'Kopi & Ko', 'Artisan Coffee & Kopitiam')");
    console.log('Seeding restoran sukses.');
  }

  // Seed Menu Items
  const menuCount = await query('SELECT COUNT(*) as count FROM menu_items');
  if (menuCount[0].count === 0) {
    const menus = [
      // Sinar Rasa
      ['sinar-rasa', 'mains', 'Rendang Daging Wagyu', 'Daging Wagyu MB5 pilihan yang dimasak lambat selama 8 jam dengan rempah-rempah kelapa sangrai dan minyak kelapa asli hingga bumbu menghitam pekat.', 'Rp 145.000', 145000, 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop', '#3D1518', 1, '["Pedas 🌶️", "Rekomendasi ⭐", "Wagyu Beef"]'],
      ['sinar-rasa', 'mains', 'Ayam Pop Premium', 'Ayam kampung organik tanpa kulit yang direbus perlahan dengan air kelapa muda dan rempah khusus, lalu digoreng cepat dalam minyak kelapa panas.', 'Rp 48.000', 48000, 'https://images.unsplash.com/photo-1626804475315-9944a9e32049?q=80&w=600&auto=format&fit=crop', '#422815', 0, '["Terlaris 🔥", "Organik"]'],
      ['sinar-rasa', 'mains', 'Gulai Kepala Ikan Kakap', 'Kepala ikan kakap merah segar ukuran besar yang disiram kuah gulai kental berempah Minang autentik, bercitarasa pedas, gurih, dan belimbing wuluh.', 'Rp 195.000', 195000, 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=600&auto=format&fit=crop', '#4F3010', 1, '["Rekomendasi ⭐", "Seafood 🐟"]'],
      ['sinar-rasa', 'mains', 'Dendeng Batokok Balado', 'Irisan tipis daging sapi has dalam berkualitas yang dipukul (batokok) hingga empuk, dibakar di atas arang batok kelapa, lalu disajikan dengan cabai merah keriting tumbuk kasar.', 'Rp 95.000', 95000, 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop', '#4F1E21', 0, '["Pedas 🌶️", "Favorit ❤️"]'],
      ['sinar-rasa', 'beverages', 'Teh Talua Rempah', 'Minuman khas Minang legendaris bertekstur creamy berbusa tebal. Kuning telur bebek segar, gula pasir, susu kental manis, seduhan teh hitam pekat Solok, jeruk nipis, dan kayu manis.', 'Rp 35.000', 35000, 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=600&auto=format&fit=crop', '#3A2A1A', 1, '["Tradisional ☕", "Energi ⚡"]'],
      ['sinar-rasa', 'desserts', 'Es Cendol Durian Sinar Rasa', 'Hidangan penutup manis berisi cendol pandan asli, santan kelapa kental segar, gula merah cair kental khas Padang, dan daging buah durian Medan asli.', 'Rp 45.000', 45000, 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=600&auto=format&fit=crop', '#2F3D1F', 0, '["Manis 🥞", "Dingin 🍧"]'],
      // Golden Dragon
      ['golden-dragon', 'dimsum', 'Imperial Har Gow', 'Dim sum legendaris berupa pangsit kukus berkulit kristal transparan tipis yang diisi dengan udang windu utuh yang sangat gurih, kenyal, dan juicy.', 'Rp 52.000', 52000, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop', '#2E3A1A', 1, '["Seafood 🍤", "Rekomendasi ⭐"]'],
      ['golden-dragon', 'mains', 'Bebek Panggang Peking (Half)', 'Bebek premium setengah ekor yang diproses selama 24 jam dengan bumbu rempah, dipanggang oven gantung tradisional hingga kulit garing kemerahan dan daging lembut.', 'Rp 285.000', 285000, 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=600&auto=format&fit=crop', '#4A201A', 1, '["Premium 👑", "Favorit ❤️"]'],
      ['golden-dragon', 'dimsum', 'Steamed Xiao Long Bao', 'Pangsit kukus khas Shanghai (4 pcs) berkulit adonan tipis buatan tangan, berisi campuran daging ayam cincang gurih dan kuah kaldu kolagen panas gurih.', 'Rp 48.000', 48000, 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=600&auto=format&fit=crop', '#3B3E32', 0, '["Sp Dumpling 🥟", "Hangat"]'],
      ['golden-dragon', 'mains', 'Yang Chow Fried Rice', 'Nasi goreng khas Kanton dengan aroma wok-hei kuat, diisi dengan potongan premium Chinese BBQ chicken, udang windu cincang, telur orak-arik, dan polong hijau.', 'Rp 90.000', 90000, 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop', '#3C3925', 0, '["Klasik Wok 🍳", "Favorit ❤️"]'],
      ['golden-dragon', 'desserts', 'Mango Sago with Pomelo', 'Kombinasi puree mangga harum manis dingin, susu evaporasi gurih, mutiara sagu kenyal, potongan mangga segar, dan bulir jeruk bali merah.', 'Rp 48.000', 48000, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop', '#4F4A21', 0, '["Dingin 🍧", "Buah Segar"]'],
      ['golden-dragon', 'beverages', 'Teh Chrysanthemum Pu-Erh', 'Teh herbal tradisional premium (pot) yang menggabungkan bunga krisan wangi menenangkan dengan daun teh Pu-Erh fermentasi gelap khas Yunnan.', 'Rp 35.000', 35000, 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=600&auto=format&fit=crop', '#2F271D', 0, '["Hangat ☕", "Sehat 🌱"]'],
      // Kopi & Ko
      ['kopi-ko', 'dimsum', 'Charcoal Grilled Kaya Toast', 'Dua lembar roti brioche empuk dipanggang di atas arang kelapa asli hingga renyah di luar, diisi selai srikaya wangi pandan alami buatan rumah dan potongan mentega cold butter.', 'Rp 32.000', 32000, 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=600&auto=format&fit=crop', '#342A20', 1, '["Terlaris 🔥", "Manis"]'],
      ['kopi-ko', 'beverages', 'Es Kopi Susu Hartono', 'Perpaduan espresso double-shot kopi house blend (70% Aceh Gayo arabika, 30% Toraja robusta), susu segar creamy dingin, dan gula aren cair organik kental aromatik.', 'Rp 28.000', 28000, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop', '#2A1A10', 1, '["Signature ☕", "Terlaris 🔥"]'],
      ['kopi-ko', 'mains', 'Mie Goreng Mamak Special', 'Mie kuning tebal ditumis dengan wajan panas besar menggunakan saus cabai kecap manis pedas gurih, dilengkapi dengan telur, potongan cumi segar, udang windu, dan tahu pong.', 'Rp 62.000', 62000, 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop', '#4A3521', 0, '["Pedas 🌶️", "Favorit ❤️"]'],
      ['kopi-ko', 'mains', 'Nasi Goreng Kampung Kopitiam', 'Nasi goreng bumbu terasi udang wangi khas kopitiam Melayu, disajikan lengkap dengan telur ceplok setengah matang, sate ayam bumbu kacang, acar segar, dan kerupuk udang.', 'Rp 58.000', 58000, 'https://images.unsplash.com/photo-1626804475315-9944a9e32049?q=80&w=600&auto=format&fit=crop', '#453E2A', 1, '["Tradisional 🍳", "Mengenyangkan"]'],
      ['kopi-ko', 'dimsum', 'Singkong Goreng Sambal Roa', 'Stik singkong mentega pilihan yang direbus rempah bawang putih hingga merekah, digoreng garing keemasan di luar namun sangat pulen di dalam. Disajikan dengan sambal roa Manado.', 'Rp 38.000', 38000, 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=600&auto=format&fit=crop', '#3B3320', 0, '["Pedas 🌶️", "Camilan Gurih"]'],
      ['kopi-ko', 'beverages', 'Manual Brew V60 Flores Bajawa', 'Kopi single-origin arabika Flores Bajawa berkualitas tinggi yang diseduh manual dengan metode V60. Menghasilkan karakter rasa cokelat manis, karamel lembut, dan aroma floral lemon.', 'Rp 38.000', 38000, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop', '#2F1F15', 0, '["Single Origin ☕", "Filter Coffee"]']
    ];

    for (const m of menus) {
      await run('INSERT INTO menu_items (brand, category, name, desc, price, price_num, image, color, popular, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', m);
    }
    console.log('Seeding menu items sukses.');
  }

  // Seed Tables
  const tableCount = await query('SELECT COUNT(*) as count FROM tables');
  if (tableCount[0].count === 0) {
    const tableSeeds = [
      // Sinar Rasa
      ['SR-01', 'sinar-rasa', 'Meja 01', 4, 'Kosong'],
      ['SR-02', 'sinar-rasa', 'Meja 02', 2, 'Kosong'],
      ['SR-03', 'sinar-rasa', 'Meja 03', 6, 'Kosong'],
      ['SR-04', 'sinar-rasa', 'Meja 04', 4, 'Kosong'],
      ['SR-VIP', 'sinar-rasa', 'Ruangan VIP', 12, 'Kosong'],
      // Golden Dragon
      ['GD-01', 'golden-dragon', 'Meja 01', 2, 'Kosong'],
      ['GD-02', 'golden-dragon', 'Meja 02', 4, 'Kosong'],
      ['GD-03', 'golden-dragon', 'Meja 03', 4, 'Kosong'],
      ['GD-VIP-A', 'golden-dragon', 'Ruang VIP Peony', 8, 'Kosong'],
      ['GD-VIP-B', 'golden-dragon', 'Ruang VIP Lotus', 12, 'Kosong'],
      // Kopi & Ko
      ['KK-01', 'kopi-ko', 'Meja Indoor 01', 2, 'Kosong'],
      ['KK-02', 'kopi-ko', 'Meja Indoor 02', 2, 'Kosong'],
      ['KK-03', 'kopi-ko', 'Meja Sofa 03', 4, 'Kosong'],
      ['KK-Bar', 'kopi-ko', 'Meja Bar', 1, 'Kosong'],
      ['KK-Outdoor', 'kopi-ko', 'Meja Outdoor 01', 4, 'Kosong']
    ];

    for (const t of tableSeeds) {
      await run('INSERT INTO tables VALUES (?, ?, ?, ?, ?)', t);
    }
    console.log('Seeding tables sukses.');
  }

  // Seed Inventory
  const invCount = await query('SELECT COUNT(*) as count FROM inventory');
  if (invCount[0].count === 0) {
    const invSeeds = [
      ['wagyu_beef', 'Daging Wagyu Sapi MB5', 25.0, 'kg', 5.0],
      ['chicken_pop', 'Ayam Kampung Muda (Organik)', 40.0, 'pcs', 10.0],
      ['red_snapper', 'Kepala Kakap Merah Segar', 20.0, 'pcs', 5.0],
      ['beef_dendeng', 'Daging Has Sapi Dendeng', 30.0, 'kg', 6.0],
      ['coffee_beans', 'Biji Kopi Gayo-Toraja Blend', 45.0, 'kg', 8.0],
      ['flores_beans', 'Biji Kopi Flores Bajawa Single Origin', 15.0, 'kg', 3.0],
      ['shrimp_windu', 'Udang Windu Segar Kupas', 20.0, 'kg', 4.0],
      ['peking_duck', 'Bebek Peking Premium', 10.0, 'pcs', 3.0],
      ['kaya_jam', 'Selai Srikaya Pandan Homemade', 12.0, 'kg', 3.0],
      ['butter_nz', 'Cold Salted Butter New Zealand', 18.0, 'kg', 4.0],
      ['mango_puree', 'Puree Mangga Harum Manis Dingin', 30.0, 'liter', 8.0],
      ['coconut_milk', 'Santan Kelapa Murni Segar', 60.0, 'liter', 15.0]
    ];

    for (const i of invSeeds) {
      await run('INSERT INTO inventory VALUES (?, ?, ?, ?, ?)', i);
    }
    console.log('Seeding inventory sukses.');
  }

  // Seed Recipes (BOM)
  const recipeCount = await query('SELECT COUNT(*) as count FROM recipes');
  if (recipeCount[0].count === 0) {
    const recipeSeeds = [
      // Sinar Rasa
      ['Rendang Daging Wagyu', 'wagyu_beef', 0.25],       // 250g wagyu beef
      ['Rendang Daging Wagyu', 'coconut_milk', 0.35],     // 350ml coconut milk
      ['Ayam Pop Premium', 'chicken_pop', 1.0],           // 1 piece chicken
      ['Ayam Pop Premium', 'coconut_milk', 0.15],         // cooked in coconut water/milk
      ['Gulai Kepala Ikan Kakap', 'red_snapper', 1.0],    // 1 snapper head
      ['Gulai Kepala Ikan Kakap', 'coconut_milk', 0.5],   // 500ml coconut milk
      ['Dendeng Batokok Balado', 'beef_dendeng', 0.2],     // 200g tenderloin
      ['Teh Talua Rempah', 'coconut_milk', 0.05],         // touch of coconut cream (optional, for seed)
      
      // Golden Dragon
      ['Imperial Har Gow', 'shrimp_windu', 0.08],         // 80g prawn
      ['Bebek Panggang Peking (Half)', 'peking_duck', 0.5], // 0.5 piece duck
      ['Yang Chow Fried Rice', 'shrimp_windu', 0.04],      // 40g prawn

      // Kopi & Ko
      ['Charcoal Grilled Kaya Toast', 'kaya_jam', 0.06],   // 60g kaya jam
      ['Charcoal Grilled Kaya Toast', 'butter_nz', 0.03],  // 30g cold butter
      ['Es Kopi Susu Hartono', 'coffee_beans', 0.022],     // 22g espresso grind
      ['Manual Brew V60 Flores Bajawa', 'flores_beans', 0.016], // 16g filter coffee
      ['Mie Goreng Mamak Special', 'shrimp_windu', 0.05]   // 50g prawns
    ];

    for (const r of recipeSeeds) {
      await run('INSERT INTO recipes (menu_item_name, inventory_id, qty_needed) VALUES (?, ?, ?)', r);
    }
    console.log('Seeding recipes (BOM) sukses.');
  }

  // Seed Employees
  const empCount = await query('SELECT COUNT(*) as count FROM employees');
  if (empCount[0].count === 0) {
    const empSeeds = [
      ['Budi Santoso', 'Pramusaji (Waiter)', '1234'],
      ['Siti Aminah', 'Kepala Koki (Chef)', '5678'],
      ['Dedi Kurniawan', 'Kasir Utama (Cashier)', '9012'],
      ['Admin Hartono', 'Manager ERP (Admin)', '0000']
    ];
    for (const e of empSeeds) {
      await run('INSERT INTO employees (name, role, pin) VALUES (?, ?, ?)', e);
    }
    console.log('Seeding employees sukses.');
  }

  console.log('Database SQLite Hartono ERP sukses diinisialisasi.');
};

export default db;
