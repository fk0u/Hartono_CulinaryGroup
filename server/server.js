import express from 'express';
import cors from 'cors';
import { initDb, query, run } from './db.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Inisialisasi Database saat Server berjalan
initDb()
  .then(() => {
    console.log('Database SQLite siap digunakan.');
  })
  .catch((err) => {
    console.error('Inisialisasi database SQLite gagal:', err);
  });

// --- API ENDPOINTS ---

// 1. GET: Menu Items
app.get('/api/menu', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM menu_items');
    // Deserialize tags JSON strings
    const formattedRows = rows.map(r => ({
      ...r,
      tags: JSON.parse(r.tags || '[]'),
      popular: !!r.popular
    }));
    res.json(formattedRows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET: Inventory Items (Gudang/BOM)
app.get('/api/inventory', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM inventory');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. POST: Adjust Inventory Stock
app.post('/api/inventory/adjust', async (req, res) => {
  const { id, quantity } = req.target || req.body;
  if (!id || quantity === undefined) {
    return res.status(400).json({ error: 'ID dan kuantitas penyesuaian harus disertakan.' });
  }
  try {
    await run('UPDATE inventory SET stock_qty = stock_qty + ? WHERE id = ?', [Number(quantity), id]);
    const updated = await query('SELECT * FROM inventory WHERE id = ?', [id]);
    res.json({ message: 'Stok berhasil disesuaikan.', item: updated[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. GET: Tables
app.get('/api/tables', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM tables');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. POST: Create new order (POS) - with BOM Auto-Deduct
app.post('/api/orders', async (req, res) => {
  const { brand, table_id, items, payment_method } = req.body;
  
  if (!brand || !items || items.length === 0) {
    return res.status(400).json({ error: 'Data pesanan tidak lengkap.' });
  }

  try {
    // Hitung total nominal
    const totalAmount = items.reduce((sum, item) => sum + (item.price_num * item.quantity), 0);
    const createdAt = new Date().toISOString();

    // 1. Insert ke tabel orders
    const orderRes = await run(
      'INSERT INTO orders (brand, table_id, status, total_amount, payment_method, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [brand, table_id || null, 'Pending', totalAmount, payment_method || 'Tunai', createdAt]
    );
    const orderId = orderRes.id;

    // 2. Loop insert order_items & Auto-Deduct stok inventaris berdasarkan resep
    for (const item of items) {
      await run(
        'INSERT INTO order_items (order_id, menu_item_id, name, price_num, quantity, notes) VALUES (?, ?, ?, ?, ?, ?)',
        [orderId, item.menu_item_id, item.name, item.price_num, item.quantity, item.notes || '']
      );

      // Cari resep (BOM) untuk menu ini
      const recipe = await query('SELECT * FROM recipes WHERE menu_item_name = ?', [item.name]);
      
      // Jika ada resepnya, kurangi bahan baku di gudang
      for (const ingredient of recipe) {
        const qtyToDeduct = ingredient.qty_needed * item.quantity;
        await run(
          'UPDATE inventory SET stock_qty = MAX(0, stock_qty - ?) WHERE id = ?',
          [qtyToDeduct, ingredient.inventory_id]
        );
      }
    }

    // 3. Update status meja jadi Terisi
    if (table_id) {
      await run("UPDATE tables SET status = 'Terisi' WHERE id = ?", [table_id]);
    }

    res.json({ message: 'Pesanan berhasil dibuat.', orderId, total: totalAmount });
  } catch (err) {
    console.error('Gagal memproses pesanan POS:', err);
    res.status(500).json({ error: err.message });
  }
});

// 6. GET: Active Orders (untuk KDS & POS Monitoring)
app.get('/api/orders/active', async (req, res) => {
  try {
    const orders = await query("SELECT * FROM orders WHERE status != 'Billed' ORDER BY id DESC");
    
    // Gabungkan dengan item pesanan masing-masing
    const detailedOrders = [];
    for (const order of orders) {
      const items = await query('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
      detailedOrders.push({
        ...order,
        items
      });
    }
    
    res.json(detailedOrders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. PUT: Update Order Status (Dapur KDS / Kasir Billed)
app.put('/api/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'Pending', 'Memasak', 'Selesai', 'Billed'

  try {
    // Ambil detail order dulu untuk cari table_id
    const order = await query('SELECT * FROM orders WHERE id = ?', [id]);
    if (order.length === 0) {
      return res.status(404).json({ error: 'Pesanan tidak ditemukan.' });
    }

    await run('UPDATE orders SET status = ? WHERE id = ?', [status, id]);

    // Jika pesanan di-billed (dibayar/selesai transaksi), kembalikan status meja ke Kosong
    if (status === 'Billed' && order[0].table_id) {
      await run("UPDATE tables SET status = 'Kosong' WHERE id = ?", [order[0].table_id]);
    }

    res.json({ message: `Status pesanan #${id} diperbarui menjadi ${status}.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. POST: Reservasi Baru dari Landing Page
app.post('/api/reservations', async (req, res) => {
  const { name, email, phone, brand, date, time, guests, dietary, notes } = req.body;
  if (!name || !email || !phone || !brand || !date || !time || !guests) {
    return res.status(400).json({ error: 'Kolom reservasi wajib diisi.' });
  }
  try {
    const dietaryString = Array.isArray(dietary) ? dietary.join(', ') : dietary || '';
    await run(
      'INSERT INTO reservations (name, email, phone, brand, date, time, guests, dietary, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, brand, date, time, Number(guests), dietaryString, 'Pending', notes || '']
    );
    res.json({ message: 'Reservasi berhasil didaftarkan.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. GET: Semua Reservasi (Admin CRM)
app.get('/api/reservations', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM reservations ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10. PUT: Update Status Reservasi (Approve/Decline)
app.put('/api/reservations/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'Approved', 'Declined'
  try {
    await run('UPDATE reservations SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: `Reservasi #${id} status diperbarui: ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 11. GET: Laporan & Live Analytics (Dashboard ERP)
app.get('/api/reports/analytics', async (req, res) => {
  try {
    // Total Revenue dari yang sudah Billed
    const revRes = await query("SELECT SUM(total_amount) as total FROM orders WHERE status = 'Billed'");
    const totalRevenue = revRes[0].total || 0;

    // Jumlah order aktif (belum di-billed)
    const activeCount = await query("SELECT COUNT(*) as count FROM orders WHERE status != 'Billed'");
    const activeOrders = activeCount[0].count;

    // Pembagian Penjualan per Brand (Billed)
    const brandSales = await query(
      "SELECT brand, SUM(total_amount) as sales, COUNT(*) as count FROM orders WHERE status = 'Billed' GROUP BY brand"
    );

    // Menu Terpopuler (Billed)
    const popularMenu = await query(`
      SELECT oi.name, SUM(oi.quantity) as qty_sold, m.brand
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      JOIN menu_items m ON oi.menu_item_id = m.id
      WHERE o.status = 'Billed'
      GROUP BY oi.name
      ORDER BY qty_sold DESC
      LIMIT 5
    `);

    // Bahan Baku Kritis (Low Stock)
    const lowStock = await query('SELECT * FROM inventory WHERE stock_qty <= min_stock_qty');

    // Jumlah meja terisi
    const occupiedTables = await query("SELECT COUNT(*) as count FROM tables WHERE status = 'Terisi'");
    
    // Antrean reservasi masuk
    const pendingReservations = await query("SELECT COUNT(*) as count FROM reservations WHERE status = 'Pending'");

    // Simulasi Laporan Penjualan Harian (7 hari terakhir)
    const dailySales = [
      { date: 'Senin', sales: Math.round(totalRevenue * 0.12) },
      { date: 'Selasa', sales: Math.round(totalRevenue * 0.08) },
      { date: 'Rabu', sales: Math.round(totalRevenue * 0.10) },
      { date: 'Kamis', sales: Math.round(totalRevenue * 0.15) },
      { date: 'Jumat', sales: Math.round(totalRevenue * 0.20) },
      { date: 'Sabtu', sales: Math.round(totalRevenue * 0.25) },
      { date: 'Minggu', sales: Math.round(totalRevenue * 0.10) },
    ];

    res.json({
      totalRevenue,
      activeOrders,
      brandSales,
      popularMenu,
      lowStock,
      occupiedTables: occupiedTables[0].count,
      pendingReservations: pendingReservations[0].count,
      dailySales
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend Server Hartono ERP berjalan di http://localhost:${PORT}`);
});
