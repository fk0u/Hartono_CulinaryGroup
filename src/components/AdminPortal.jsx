import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, Clipboard, RefreshCw, ShoppingCart, 
  UtensilsCrossed, CheckSquare, Package, Table, ShieldAlert,
  Search, ArrowLeft, ArrowRight, Plus, Trash2, Calendar, 
  History, UserCheck, LogOut
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export default function AdminPortal({ setIsAdmin, loggedInStaff, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [menuItems, setMenuItems] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [tables, setTables] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [historicalOrders, setHistoricalOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // POS State
  const [posBrand, setPosBrand] = useState('sinar-rasa');
  const [cart, setCart] = useState([]);
  const [posTable, setPosTable] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Tunai');
  const [checkoutResult, setCheckoutResult] = useState(null);

  // Search History State
  const [historySearch, setHistorySearch] = useState('');

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch menu
      const menuRes = await fetch(`${API_BASE}/menu`);
      if (menuRes.ok) setMenuItems(await menuRes.json());

      // Fetch inventory
      const invRes = await fetch(`${API_BASE}/inventory`);
      if (invRes.ok) setInventory(await invRes.json());

      // Fetch tables
      const tabRes = await fetch(`${API_BASE}/tables`);
      if (tabRes.ok) setTables(await tabRes.json());

      // Fetch active orders
      const orderRes = await fetch(`${API_BASE}/orders/active`);
      if (orderRes.ok) setActiveOrders(await orderRes.json());

      // Fetch historical orders
      const histRes = await fetch(`${API_BASE}/orders/history`);
      if (histRes.ok) setHistoricalOrders(await histRes.json());

      // Fetch reservations
      const resvRes = await fetch(`${API_BASE}/reservations`);
      if (resvRes.ok) setReservations(await resvRes.json());

      // Fetch employees
      const empRes = await fetch(`${API_BASE}/employees`);
      if (empRes.ok) setEmployees(await empRes.json());

      // Fetch attendance
      const attRes = await fetch(`${API_BASE}/attendance`);
      if (attRes.ok) setAttendance(await attRes.json());

      // Fetch analytics
      const analRes = await fetch(`${API_BASE}/reports/analytics`);
      if (analRes.ok) setAnalytics(await analRes.json());

    } catch (err) {
      console.error('Koneksi backend gagal. Menjalankan fallback data lokal...', err);
      setError('Koneksi server Express terputus. Menjalankan data simulasi lokal.');
      loadFallbackData();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadFallbackData = () => {
    setAnalytics({
      totalRevenue: 2845000,
      activeOrders: 2,
      brandSales: [
        { brand: 'sinar-rasa', sales: 1250000, count: 8 },
        { brand: 'golden-dragon', sales: 1120000, count: 4 },
        { brand: 'kopi-ko', sales: 475000, count: 12 }
      ],
      popularMenu: [
        { name: 'Rendang Daging Wagyu', qty_sold: 14, brand: 'sinar-rasa' },
        { name: 'Es Kopi Susu Hartono', qty_sold: 22, brand: 'kopi-ko' },
        { name: 'Imperial Har Gow', qty_sold: 10, brand: 'golden-dragon' }
      ],
      lowStock: [
        { id: 'wagyu_beef', item_name: 'Daging Wagyu Sapi MB5', stock_qty: 4.5, unit: 'kg', min_stock_qty: 5.0 },
        { id: 'peking_duck', item_name: 'Bebek Peking Premium', stock_qty: 2, unit: 'pcs', min_stock_qty: 3.0 }
      ],
      occupiedTables: 3,
      pendingReservations: 1,
      dailySales: [
        { date: 'Senin', sales: 240000 },
        { date: 'Selasa', sales: 310000 },
        { date: 'Rabu', sales: 280000 },
        { date: 'Kamis', sales: 420000 },
        { date: 'Jumat', sales: 580000 },
        { date: 'Sabtu', sales: 740000 },
        { date: 'Minggu', sales: 275000 },
      ]
    });

    setTables([
      { id: 'SR-01', brand: 'sinar-rasa', table_number: 'Meja 01', capacity: 4, status: 'Terisi' },
      { id: 'SR-02', brand: 'sinar-rasa', table_number: 'Meja 02', capacity: 2, status: 'Kosong' },
      { id: 'GD-01', brand: 'golden-dragon', table_number: 'Meja 01', capacity: 2, status: 'Terisi' },
      { id: 'KK-01', brand: 'kopi-ko', table_number: 'Meja 01', capacity: 2, status: 'Kosong' }
    ]);

    setInventory([
      { id: 'wagyu_beef', item_name: 'Daging Wagyu Sapi MB5', stock_qty: 4.5, unit: 'kg', min_stock_qty: 5.0 },
      { id: 'chicken_pop', item_name: 'Ayam Kampung Muda (Organik)', stock_qty: 32.0, unit: 'pcs', min_stock_qty: 10.0 },
      { id: 'shrimp_windu', item_name: 'Udang Windu Segar Kupas', stock_qty: 18.0, unit: 'kg', min_stock_qty: 4.0 },
      { id: 'coffee_beans', item_name: 'Biji Kopi Gayo-Toraja Blend', stock_qty: 24.5, unit: 'kg', min_stock_qty: 8.0 }
    ]);

    setEmployees([
      { id: 1, name: 'Budi Santoso', role: 'Pramusaji (Waiter)' },
      { id: 2, name: 'Siti Aminah', role: 'Kepala Koki (Chef)' },
      { id: 3, name: 'Dedi Kurniawan', role: 'Kasir Utama (Cashier)' }
    ]);

    setAttendance([
      { id: 1, employee_name: 'Budi Santoso', role: 'Pramusaji (Waiter)', check_in: '20/07/2026, 08.00.00', check_out: '20/07/2026, 17.00.00' }
    ]);

    setHistoricalOrders([
      { 
        id: 999, 
        brand: 'sinar-rasa', 
        table_id: 'SR-01', 
        status: 'Billed', 
        total_amount: 325000, 
        payment_method: 'QRIS', 
        created_at: '2026-07-20T04:00:00.000Z',
        items: [
          { name: 'Rendang Daging Wagyu', quantity: 2, price_num: 145000 },
          { name: 'Teh Talua Rempah', quantity: 1, price_num: 35000 }
        ]
      }
    ]);
  };

  // 1. POS Actions
  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...item, menu_item_id: item.id, quantity: 1, notes: '' }]);
    }
  };

  const updateCartQty = (id, change) => {
    const existing = cart.find(c => c.id === id);
    if (existing.quantity + change <= 0) {
      setCart(cart.filter(c => c.id !== id));
    } else {
      setCart(cart.map(c => c.id === id ? { ...c, quantity: c.quantity + change } : c));
    }
  };

  const handleCartItemNoteChange = (id, note) => {
    setCart(cart.map(c => c.id === id ? { ...c, notes: note } : c));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert('Keranjang masih kosong.');

    const orderData = {
      brand: posBrand,
      table_id: posTable || null,
      items: cart,
      payment_method: paymentMethod,
      status: 'Billed' // POS order directly settled
    };

    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        const data = await res.json();
        setCheckoutResult({
          orderId: data.orderId,
          total: data.total,
          table: posTable,
          brand: posBrand,
          items: [...cart],
          payment: paymentMethod
        });
        setCart([]);
        setPosTable('');
        fetchData();
      } else {
        alert('Gagal memproses transaksi.');
      }
    } catch (err) {
      setCheckoutResult({
        orderId: Math.floor(Math.random() * 9000) + 1000,
        total: cart.reduce((sum, item) => sum + (item.price_num * item.quantity), 0),
        table: posTable,
        brand: posBrand,
        items: [...cart],
        payment: paymentMethod
      });
      setCart([]);
      setPosTable('');
      alert('Mode Simulasi Offline: Transaksi sukses diproses secara lokal.');
    }
  };

  // 2. KDS Actions
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchData();
    } catch (err) {
      alert('Gagal memperbarui status order.');
    }
  };

  // 3. Inventory Actions
  const handleAdjustStock = async (itemId, amount) => {
    try {
      const res = await fetch(`${API_BASE}/inventory/adjust`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: itemId, quantity: amount })
      });
      if (res.ok) fetchData();
    } catch (err) {
      alert('Gagal menambah stok.');
    }
  };

  // 4. Reservation Actions
  const handleUpdateReservationStatus = async (resvId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/reservations/${resvId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchData();
    } catch (err) {
      alert('Gagal memperbarui status reservasi.');
    }
  };

  // 5. Staff Attendance Actions
  const handleAttendance = async (empName, empRole, action) => {
    try {
      const res = await fetch(`${API_BASE}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee_name: empName, role: empRole, action })
      });
      const data = await res.json();
      alert(data.message || data.error);
      fetchData();
    } catch (err) {
      alert('Gagal mencatat absensi (Koneksi offline).');
    }
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  return (
    <div className="erp-portal theme-dark">
      {/* Header Panel */}
      <header className="erp-header flex-center">
        <div className="erp-header-left flex-center" style={{ gap: '1rem' }}>
          <button onClick={() => setIsAdmin(false)} className="btn btn-outline back-btn flex-center">
            <ArrowLeft size={16} /> Ke Landing Page
          </button>
          {loggedInStaff && (
            <div className="logged-in-badge flex-center">
              <UserCheck size={14} className="text-gold" />
              <span>{loggedInStaff.name} ({loggedInStaff.role})</span>
            </div>
          )}
        </div>
        <div className="erp-header-center">
          <UtensilsCrossed size={20} className="text-gold" />
          <span className="erp-brand-text">HARTONO ERP SYSTEM v3.0</span>
        </div>
        <div className="erp-header-right flex-center" style={{ gap: '1.25rem' }}>
          <button onClick={fetchData} className="refresh-btn flex-center">
            <RefreshCw size={14} /> Sinkron
          </button>
          <button onClick={onLogout} className="logout-btn flex-center text-red" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', gap: '0.25rem' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="erp-layout">
        {/* Sidebar Nav */}
        <aside className="erp-sidebar">
          <button onClick={() => setActiveTab('dashboard')} className={`sidebar-link ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <TrendingUp size={18} /> Ringkasan & Laporan
          </button>
          <button onClick={() => setActiveTab('pos')} className={`sidebar-link ${activeTab === 'pos' ? 'active' : ''}`}>
            <ShoppingCart size={18} /> POS (Kasir)
          </button>
          <button onClick={() => setActiveTab('kds')} className={`sidebar-link ${activeTab === 'kds' ? 'active' : ''}`}>
            <Clipboard size={18} /> Antrean Dapur (KDS)
          </button>
          <button onClick={() => setActiveTab('history')} className={`sidebar-link ${activeTab === 'history' ? 'active' : ''}`}>
            <History size={18} /> Riwayat Penjualan
          </button>
          <button onClick={() => setActiveTab('inventory')} className={`sidebar-link ${activeTab === 'inventory' ? 'active' : ''}`}>
            <Package size={18} /> Stok Gudang (BOM)
          </button>
          <button onClick={() => setActiveTab('tables')} className={`sidebar-link ${activeTab === 'tables' ? 'active' : ''}`}>
            <Table size={18} /> Denah Meja Map
          </button>
          <button onClick={() => setActiveTab('reservations')} className={`sidebar-link ${activeTab === 'reservations' ? 'active' : ''}`}>
            <Calendar size={18} /> Reservasi CRM
            {analytics?.pendingReservations > 0 && (
              <span className="notif-badge">{analytics.pendingReservations}</span>
            )}
          </button>
          <button onClick={() => setActiveTab('staff')} className={`sidebar-link ${activeTab === 'staff' ? 'active' : ''}`}>
            <UserCheck size={18} /> Kehadiran Karyawan
          </button>
        </aside>

        {/* Workspace */}
        <main className="erp-workspace">
          {error && <div className="offline-alert flex-center">{error}</div>}

          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && analytics && (
            <div className="tab-pane animate-fade-in">
              <h2 className="workspace-title font-serif">Dasbor Laporan & Live Metrik</h2>
              
              <div className="metrics-grid">
                <div className="metric-card">
                  <span className="metric-label">TOTAL PENDAPATAN RIIL (BILLED)</span>
                  <span className="metric-value text-gold">{formatRupiah(analytics.totalRevenue)}</span>
                </div>
                <div className="metric-card">
                  <span className="metric-label">PESANAN AKTIF KDS</span>
                  <span className="metric-value text-red">{analytics.activeOrders} Pesanan</span>
                </div>
                <div className="metric-card">
                  <span className="metric-label">RESERVASI MENUNGGU KONFIRMASI</span>
                  <span className="metric-value text-gold">{analytics.pendingReservations} Booking</span>
                </div>
              </div>

              {analytics.lowStock && analytics.lowStock.length > 0 && (
                <div className="low-stock-alert-panel">
                  <h4 className="flex-center text-red" style={{ gap: '0.5rem', justifyContent: 'flex-start', marginBottom: '0.75rem' }}>
                    <ShieldAlert size={20} /> PERINGATAN! STOK BAHAN BAKU MENIPIS
                  </h4>
                  <div className="low-stock-grid">
                    {analytics.lowStock.map((item) => (
                      <div key={item.id} className="low-stock-item">
                        <span><strong>{item.item_name}</strong></span>
                        <span className="text-red">Sisa: {item.stock_qty} {item.unit} (Min: {item.min_stock_qty} {item.unit})</span>
                        <button onClick={() => handleAdjustStock(item.id, 10)} className="btn-refill">Refill +10</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="charts-grid">
                <div className="chart-card">
                  <h3 className="chart-title">Penjualan per Brand Restoran</h3>
                  <div className="brand-sales-bars">
                    {analytics.brandSales && analytics.brandSales.map((item) => {
                      const percentage = analytics.totalRevenue > 0 ? (item.sales / analytics.totalRevenue) * 100 : 0;
                      return (
                        <div key={item.brand} className="brand-bar-row">
                          <span className="bar-brand-label">{item.brand.replace('-', ' ').toUpperCase()}</span>
                          <div className="bar-container-bg">
                            <div className="bar-fill" style={{ width: `${percentage}%`, backgroundColor: item.brand === 'sinar-rasa' ? 'var(--color-primary)' : item.brand === 'golden-dragon' ? 'var(--color-accent)' : '#4B3F2F' }}></div>
                          </div>
                          <span className="bar-value-label">{formatRupiah(item.sales)} ({item.count} order)</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="chart-card">
                  <h3 className="chart-title">Menu Terlaris (Top Selling)</h3>
                  <table className="erp-table">
                    <thead>
                      <tr>
                        <th>Menu Makanan/Minuman</th>
                        <th>Outlet Restoran</th>
                        <th style={{ textAlign: 'right' }}>Terjual (Porsi)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.popularMenu && analytics.popularMenu.map((item, idx) => (
                        <tr key={idx}>
                          <td><strong>{item.name}</strong></td>
                          <td><span className="menu-card-brand" style={{ position: 'static' }}>{item.brand.toUpperCase()}</span></td>
                          <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{item.qty_sold} Porsi</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: POINT OF SALE (POS) */}
          {activeTab === 'pos' && (
            <div className="tab-pane pos-pane animate-fade-in">
              <h2 className="workspace-title font-serif">Point of Sale (POS Kasir)</h2>
              
              <div className="pos-grid">
                <div className="pos-menu-column">
                  <div className="pos-brand-selector flex-center" style={{ gap: '0.75rem', justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
                    <button onClick={() => setPosBrand('sinar-rasa')} className={`filter-btn ${posBrand === 'sinar-rasa' ? 'active' : ''}`}>Sinar Rasa</button>
                    <button onClick={() => setPosBrand('golden-dragon')} className={`filter-btn ${posBrand === 'golden-dragon' ? 'active' : ''}`}>Golden Dragon</button>
                    <button onClick={() => setPosBrand('kopi-ko')} className={`filter-btn ${posBrand === 'kopi-ko' ? 'active' : ''}`}>Kopi & Ko</button>
                  </div>

                  <div className="pos-menu-grid">
                    {menuItems.filter(item => item.brand === posBrand).map(item => (
                      <div key={item.id} className="pos-menu-item-card card-scale" onClick={() => addToCart(item)}>
                        <div className="pos-item-img-placeholder" style={{ backgroundColor: item.color || '#333' }}>
                          <span className="font-serif" style={{ color: '#FFF', fontSize: '0.85rem', fontWeight: 600 }}>{item.name}</span>
                        </div>
                        <div className="pos-item-info">
                          <span className="pos-item-price">{item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pos-cart-column">
                  <h3 className="cart-title flex-center" style={{ gap: '0.5rem', justifyContent: 'flex-start' }}><ShoppingCart size={18} /> Keranjang Belanja</h3>
                  
                  <div className="cart-items-list">
                    {cart.length > 0 ? (
                      cart.map((item) => (
                        <div key={item.id} className="cart-item-row">
                          <div className="cart-item-desc">
                            <span className="cart-item-name"><strong>{item.name}</strong></span>
                            <span className="cart-item-unit-price">{item.price}</span>
                            <input
                              type="text"
                              placeholder="Catatan"
                              value={item.notes}
                              onChange={(e) => handleCartItemNoteChange(item.id, e.target.value)}
                              className="cart-item-notes-input"
                            />
                          </div>
                          <div className="cart-item-controls flex-center">
                            <button onClick={() => updateCartQty(item.id, -1)} className="qty-control">-</button>
                            <span className="qty-val">{item.quantity}</span>
                            <button onClick={() => updateCartQty(item.id, 1)} className="qty-control">+</button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="empty-cart-msg flex-center">Keranjang kosong.</div>
                    )}
                  </div>

                  {cart.length > 0 && (
                    <form onSubmit={handleCheckout} className="checkout-form">
                      <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="form-label">Meja:</label>
                        <select value={posTable} onChange={(e) => setPosTable(e.target.value)} className="form-input" required>
                          <option value="">Pilih Nomor Meja</option>
                          {tables.filter(t => t.brand === posBrand && t.status === 'Kosong').map(t => (
                            <option key={t.id} value={t.id}>{t.table_number}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="form-label">Metode Pembayaran:</label>
                        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="form-input">
                          <option value="Tunai">Tunai</option>
                          <option value="QRIS">QRIS</option>
                          <option value="Debit">Debit Card</option>
                        </select>
                      </div>

                      <div className="cart-total-row flex-center" style={{ justifyContent: 'space-between', padding: '1rem 0', borderTop: '1px dashed #444', marginBottom: '1.5rem' }}>
                        <span>TOTAL AKHIR:</span>
                        <strong className="text-gold" style={{ fontSize: '1.4rem' }}>
                          {formatRupiah(cart.reduce((sum, item) => sum + (item.price_num * item.quantity), 0))}
                        </strong>
                      </div>

                      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Selesaikan Transaksi</button>
                    </form>
                  )}

                  {checkoutResult && (
                    <div className="checkout-receipt-overlay flex-center">
                      <div className="checkout-receipt-card animate-fade-in">
                        <h4 className="receipt-title font-serif">NOTA LUNAS</h4>
                        <div className="accent-line-center"></div>
                        <p><strong>Order ID:</strong> #{checkoutResult.orderId}</p>
                        <p><strong>Outlet:</strong> {checkoutResult.brand.toUpperCase()}</p>
                        <p><strong>Meja:</strong> {checkoutResult.table || 'Takeaway'}</p>
                        <p><strong>Pembayaran:</strong> {checkoutResult.payment}</p>
                        <div className="receipt-divider"></div>
                        <div className="receipt-items">
                          {checkoutResult.items.map((item, idx) => (
                            <div key={idx} className="receipt-item-line">
                              <span>{item.name} x {item.quantity}</span>
                              <span>{formatRupiah(item.price_num * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="receipt-divider"></div>
                        <div className="receipt-item-line bold text-gold">
                          <span>TOTAL LUNAS:</span>
                          <span>{formatRupiah(checkoutResult.total)}</span>
                        </div>
                        <button onClick={() => setCheckoutResult(null)} className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>Tutup Nota</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KITCHEN DISPLAY SYSTEM (KDS) */}
          {activeTab === 'kds' && (
            <div className="tab-pane KDS-pane animate-fade-in">
              <h2 className="workspace-title font-serif">Kitchen Display System (KDS Dapur)</h2>
              
              <div className="kds-orders-grid">
                {activeOrders.length > 0 ? (
                  activeOrders.map((order) => {
                    const tableObj = tables.find(t => t.id === order.table_id);
                    const tableName = tableObj ? tableObj.table_number : 'Takeaway';
                    
                    return (
                      <div key={order.id} className="kds-card">
                        <div className="kds-card-header flex-center" style={{ justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                          <div>
                            <span className="kds-order-id text-gold"><strong>Order #{order.id}</strong></span>
                            <span className="kds-order-brand">{order.brand.replace('-', ' ').toUpperCase()}</span>
                          </div>
                          <span className="kds-order-table">{tableName}</span>
                        </div>

                        <div className="kds-card-body">
                          <ul className="kds-items-list">
                            {order.items && order.items.map((item, idx) => (
                              <li key={idx} className="kds-item-line">
                                <span className="kds-item-qty">{item.quantity}x</span>
                                <div className="kds-item-desc">
                                  <span className="kds-item-name"><strong>{item.name}</strong></span>
                                  {item.notes && <span className="kds-item-note">Catatan: {item.notes}</span>}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="kds-card-footer" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '0.75rem', marginTop: '1rem' }}>
                          <div className="kds-status-row flex-center" style={{ justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <span>STATUS:</span>
                            <strong className={order.status === 'Pending' ? 'text-red' : 'text-gold'}>{order.status.toUpperCase()}</strong>
                          </div>
                          
                          <div className="kds-action-buttons flex-center" style={{ gap: '0.5rem' }}>
                            {order.status === 'Pending' && (
                              <button onClick={() => handleUpdateOrderStatus(order.id, 'Memasak')} className="btn btn-outline" style={{ flexGrow: 1, padding: '0.4rem', fontSize: '0.8rem' }}>Mulai Masak</button>
                            )}
                            {order.status === 'Memasak' && (
                              <button onClick={() => handleUpdateOrderStatus(order.id, 'Selesai')} className="btn btn-primary" style={{ flexGrow: 1, padding: '0.4rem', fontSize: '0.8rem' }}>Selesai Masak</button>
                            )}
                            {order.status === 'Selesai' && (
                              <button onClick={() => handleUpdateOrderStatus(order.id, 'Billed')} className="btn btn-primary" style={{ flexGrow: 1, padding: '0.4rem', fontSize: '0.8rem', backgroundColor: '#10B981', borderColor: '#10B981' }}>Bayar (Billed)</button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-items flex-center" style={{ gridColumn: '1 / -1' }}>
                    <p className="lead">Tidak ada pesanan antrean dapur yang aktif saat ini.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* NEW TAB: RIWAYAT PENJUALAN (SALES HISTORY) */}
          {activeTab === 'history' && (
            <div className="tab-pane history-pane animate-fade-in">
              <h2 className="workspace-title font-serif">Riwayat Transaksi Penjualan</h2>
              
              <div className="search-wrapper" style={{ maxWidth: '400px', margin: '0 0 2rem' }}>
                <div className="search-box">
                  <Search className="search-icon" size={16} />
                  <input
                    type="text"
                    placeholder="Cari Order ID..."
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>

              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Outlet Brand</th>
                    <th>Meja</th>
                    <th>Metode Bayar</th>
                    <th>Menu Terpesan</th>
                    <th style={{ textAlign: 'right' }}>Total Pembayaran</th>
                  </tr>
                </thead>
                <tbody>
                  {historicalOrders
                    .filter(order => order.id.toString().includes(historySearch))
                    .map((order) => (
                      <tr key={order.id}>
                        <td><strong>#{order.id}</strong></td>
                        <td><span className="menu-card-brand" style={{ position: 'static' }}>{order.brand.replace('-', ' ').toUpperCase()}</span></td>
                        <td>{order.table_id || 'Takeaway'}</td>
                        <td>{order.payment_method}</td>
                        <td>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem' }}>
                            {order.items && order.items.map((item, idx) => (
                              <li key={idx}>{item.name} x {item.quantity}</li>
                            ))}
                          </ul>
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold', color: 'var(--color-accent)' }}>{formatRupiah(order.total_amount)}</td>
                      </tr>
                    ))}
                  {historicalOrders.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '3rem' }}>Belum ada riwayat transaksi lunas.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: INVENTORY / BOM */}
          {activeTab === 'inventory' && (
            <div className="tab-pane inventory-pane animate-fade-in">
              <h2 className="workspace-title font-serif">Inventaris Bahan Baku & BOM (Bill of Materials)</h2>
              
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Nama Bahan Baku</th>
                    <th>Satuan</th>
                    <th style={{ textAlign: 'right' }}>Stok Gudang saat ini</th>
                    <th style={{ textAlign: 'right' }}>Batas Minimal Stok</th>
                    <th>Status Gudang</th>
                    <th style={{ textAlign: 'center' }}>Aksi Tambah</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => {
                    const isCritical = item.stock_qty <= item.min_stock_qty;
                    return (
                      <tr key={item.id} className={isCritical ? 'row-critical-stock' : ''}>
                        <td><strong>{item.item_name}</strong></td>
                        <td>{item.unit}</td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{item.stock_qty.toFixed(2)}</td>
                        <td style={{ textAlign: 'right', color: '#888' }}>{item.min_stock_qty.toFixed(2)}</td>
                        <td>
                          {isCritical ? (
                            <span className="stock-badge badge-critical flex-center">Kritis ⚠️</span>
                          ) : (
                            <span className="stock-badge badge-ok flex-center">Aman ✅</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button onClick={() => handleAdjustStock(item.id, 5)} className="refill-btn flex-center" style={{ margin: '0 auto' }}>
                            <Plus size={12} /> Isi +5 {item.unit}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 5: TABLE MAP */}
          {activeTab === 'tables' && (
            <div className="tab-pane tables-pane animate-fade-in">
              <h2 className="workspace-title font-serif">Denah & Status Meja Restoran</h2>
              
              <div className="table-map-brands-selector flex-center" style={{ gap: '0.75rem', justifyContent: 'flex-start', marginBottom: '2rem' }}>
                <button onClick={() => setPosBrand('sinar-rasa')} className={`filter-btn ${posBrand === 'sinar-rasa' ? 'active' : ''}`}>Sinar Rasa</button>
                <button onClick={() => setPosBrand('golden-dragon')} className={`filter-btn ${posBrand === 'golden-dragon' ? 'active' : ''}`}>Golden Dragon</button>
                <button onClick={() => setPosBrand('kopi-ko')} className={`filter-btn ${posBrand === 'kopi-ko' ? 'active' : ''}`}>Kopi & Ko</button>
              </div>

              <div className="table-grid-map">
                {tables.filter(t => t.brand === posBrand).map((table) => {
                  return (
                    <div key={table.id} className={`table-map-card flex-center ${table.status === 'Terisi' ? 'status-occupied' : 'status-empty'}`}>
                      <div className="table-map-details text-center">
                        <span className="table-map-num font-serif">Meja #{table.table_number.replace('Meja ', '')}</span>
                        <span className="table-map-cap">Kapasitas: {table.capacity} Org</span>
                        <span className="table-map-status-text font-sans">{table.status.toUpperCase()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: RESERVATIONS CRM */}
          {activeTab === 'reservations' && (
            <div className="tab-pane reservations-pane animate-fade-in">
              <h2 className="workspace-title font-serif">Reservasi & Booking CRM</h2>
              
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Nama Pelanggan</th>
                    <th>Kontak</th>
                    <th>Restoran</th>
                    <th>Tanggal & Waktu</th>
                    <th style={{ textAlign: 'right' }}>Tamu</th>
                    <th>Dietary</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'center' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((resv) => (
                    <tr key={resv.id}>
                      <td><strong>{resv.name}</strong><br /><span style={{ fontSize: '0.75rem', color: '#888' }}>{resv.email}</span></td>
                      <td>{resv.phone}</td>
                      <td><span className="menu-card-brand" style={{ position: 'static' }}>{resv.brand.replace('-', ' ').toUpperCase()}</span></td>
                      <td>{resv.date} ({resv.time} WIB)</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{resv.guests} Org</td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--color-accent)' }}>{resv.dietary || 'Tidak Ada'}</td>
                      <td>
                        <span className={`status-badge-crm status-${resv.status.toLowerCase()}`}>
                          {resv.status === 'Pending' ? 'Menunggu' : resv.status === 'Approved' ? 'Diterima' : 'Ditolak'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {resv.status === 'Pending' ? (
                          <div className="flex-center" style={{ gap: '0.5rem', justifyContent: 'center' }}>
                            <button onClick={() => handleUpdateReservationStatus(resv.id, 'Approved')} className="action-crm-btn approve">Terima</button>
                            <button onClick={() => handleUpdateReservationStatus(resv.id, 'Declined')} className="action-crm-btn decline">Tolak</button>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: '#888' }}>Selesai</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {reservations.length === 0 && (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', padding: '3rem' }}>Belum ada reservasi masuk.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* NEW TAB: KEHADIRAN KARYAWAN (STAFF & ATTENDANCE) */}
          {activeTab === 'staff' && (
            <div className="tab-pane staff-pane animate-fade-in">
              <h2 className="workspace-title font-serif">Kehadiran & Shift Roster Karyawan</h2>
              
              <div className="pos-grid" style={{ height: 'auto', gap: '2rem', marginBottom: '2.5rem' }}>
                {/* Employee check-in control */}
                <div className="metric-card" style={{ height: 'fit-content' }}>
                  <h3 className="chart-title flex-center" style={{ gap: '0.5rem', justifyContent: 'flex-start' }}><UserCheck size={18} /> Pencatatan Jam Masuk/Pulang Staf</h3>
                  <div className="attendance-buttons-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    {employees.map(emp => (
                      <div key={emp.id} className="employee-attendance-row flex-center" style={{ justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '0.75rem 1rem' }}>
                        <div>
                          <strong>{emp.name}</strong><br />
                          <span style={{ fontSize: '0.75rem', color: '#888' }}>{emp.role}</span>
                        </div>
                        <div className="flex-center" style={{ gap: '0.5rem' }}>
                          <button onClick={() => handleAttendance(emp.name, emp.role, 'check-in')} className="btn btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>Check In</button>
                          <button onClick={() => handleAttendance(emp.name, emp.role, 'check-out')} className="btn btn-primary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>Check Out</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Attendance History logs */}
                <div className="metric-card" style={{ height: 'fit-content' }}>
                  <h3 className="chart-title">Jurnal Log Kehadiran Hari Ini</h3>
                  <div className="attendance-logs-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto', marginTop: '1rem' }}>
                    {attendance.map((log) => (
                      <div key={log.id} style={{ fontSize: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                        <strong>{log.employee_name}</strong> ({log.role})<br />
                        <span className="text-gold">Masuk: {log.check_in}</span><br />
                        {log.check_out ? (
                          <span style={{ color: '#10B981' }}>Pulang: {log.check_out}</span>
                        ) : (
                          <span className="text-red">Sedang Bekerja (Aktif)</span>
                        )}
                      </div>
                    ))}
                    {attendance.length === 0 && (
                      <div className="text-center" style={{ padding: '2rem 0', color: '#888' }}>Belum ada log kehadiran untuk shift ini.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        .erp-portal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          background-color: #0c0c0e;
          color: #D4D4D8;
          font-family: var(--font-sans);
        }

        .erp-header {
          height: 60px;
          border-bottom: 2px solid var(--color-accent);
          background-color: #121215;
          padding: 0 2rem;
          justify-content: space-between;
        }

        .back-btn {
          font-size: 0.8rem;
          padding: 0.4rem 1rem;
          border-color: rgba(255,255,255,0.2) !important;
          color: #FFF !important;
        }

        .back-btn:hover {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
        }

        .logged-in-badge {
          background-color: rgba(212, 175, 55, 0.1);
          border: 1px solid var(--color-accent);
          padding: 0.25rem 0.6rem;
          font-size: 0.75rem;
          color: #FFF;
          gap: 0.4rem;
        }

        .erp-brand-text {
          font-weight: 700;
          letter-spacing: 2px;
          font-size: 0.95rem;
        }

        .refresh-btn {
          background: transparent;
          border: none;
          color: var(--color-accent);
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          gap: 0.4rem;
        }

        .refresh-btn:hover {
          color: #FFFFFF;
        }

        .erp-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          height: calc(100vh - 60px);
          overflow: hidden;
        }

        .erp-sidebar {
          background-color: #121215;
          border-right: 1px solid rgba(255,255,255,0.05);
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .sidebar-link {
          background: transparent;
          border: none;
          color: #A1A1AA;
          padding: 0.9rem 1.2rem;
          text-align: left;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          position: relative;
        }

        .sidebar-link:hover {
          background-color: rgba(255, 255, 255, 0.02);
          color: #FFFFFF;
        }

        .sidebar-link.active {
          background-color: rgba(122, 12, 22, 0.15);
          color: var(--color-accent);
          border-left: 3px solid var(--color-accent);
        }

        .notif-badge {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background-color: var(--color-primary);
          color: #FFF;
          font-size: 0.7rem;
          padding: 0.15rem 0.4rem;
          border-radius: 10px;
        }

        .erp-workspace {
          padding: 2.5rem;
          overflow-y: auto;
          background-color: #0c0c0e;
        }

        .workspace-title {
          font-size: 2rem;
          color: #FFFFFF;
          margin-bottom: 2rem;
        }

        .offline-alert {
          background-color: rgba(239, 68, 68, 0.15);
          border: 1px solid var(--color-error);
          color: #FCA5A5;
          padding: 0.75rem;
          margin-bottom: 1.5rem;
          font-size: 0.85rem;
          gap: 0.5rem;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 2.5rem;
        }

        .metric-card {
          background-color: #121215;
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          box-shadow: var(--shadow-sm);
        }

        .metric-label {
          font-size: 0.7rem;
          font-weight: 600;
          color: #A1A1AA;
          letter-spacing: 1px;
        }

        .metric-value {
          font-size: 2rem;
          font-weight: 700;
        }

        .erp-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.9rem;
          background-color: #121215;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .erp-table th {
          background-color: rgba(255, 255, 255, 0.02);
          border-bottom: 2px solid rgba(255,255,255,0.05);
          padding: 1rem 1.5rem;
          font-weight: 600;
          color: #FFFFFF;
        }

        .erp-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .erp-table tr:hover {
          background-color: rgba(255,255,255,0.01);
        }

        .row-critical-stock td {
          background-color: rgba(239, 68, 68, 0.03);
        }

        .low-stock-alert-panel {
          background-color: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .low-stock-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .low-stock-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          background: rgba(0, 0, 0, 0.2);
          padding: 0.75rem 1rem;
          border-left: 3px solid var(--color-error);
        }

        .btn-refill {
          background-color: var(--color-primary);
          color: #FFF;
          border: none;
          padding: 0.25rem 0.6rem;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }

        .chart-card {
          background-color: #121215;
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
        }

        .chart-title {
          font-size: 1.1rem;
          color: #FFFFFF;
          margin-bottom: 1.5rem;
        }

        .brand-sales-bars {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .brand-bar-row {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .bar-brand-label {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .bar-container-bg {
          height: 10px;
          background-color: rgba(255, 255, 255, 0.05);
          width: 100%;
        }

        .bar-fill {
          height: 100%;
          transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bar-value-label {
          font-size: 0.8rem;
          color: #A1A1AA;
          text-align: right;
        }

        .pos-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 2.5rem;
          height: calc(100vh - 200px);
        }

        .pos-menu-column {
          overflow-y: auto;
          padding-right: 1rem;
        }

        .pos-menu-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .pos-menu-item-card {
          background-color: #121215;
          border: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
          overflow: hidden;
        }

        .pos-menu-item-card:hover {
          border-color: var(--color-accent);
        }

        .pos-item-img-placeholder {
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          text-align: center;
        }

        .pos-item-info {
          padding: 0.75rem;
          text-align: center;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .pos-item-price {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-accent);
        }

        .pos-cart-column {
          background-color: #121215;
          border: 1px solid rgba(255,255,255,0.05);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow-y: auto;
        }

        .cart-items-list {
          flex-grow: 1;
          overflow-y: auto;
          margin: 1.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .cart-item-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 1rem;
        }

        .cart-item-desc {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          width: 60%;
        }

        .cart-item-name {
          font-size: 0.9rem;
          color: #FFF;
        }

        .cart-item-unit-price {
          font-size: 0.8rem;
          color: var(--color-accent);
        }

        .cart-item-notes-input {
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.05);
          color: #FFF;
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          margin-top: 0.25rem;
          outline: none;
        }

        .cart-item-controls {
          gap: 0.75rem;
        }

        .qty-control {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: #FFF;
          width: 26px;
          height: 26px;
          cursor: pointer;
          font-size: 1rem;
          transition: var(--transition-fast);
        }

        .qty-control:hover {
          background: var(--color-primary);
          border-color: var(--color-primary);
        }

        .qty-val {
          font-weight: 700;
          font-size: 0.95rem;
        }

        .empty-cart-msg {
          font-size: 0.85rem;
          color: var(--color-text-muted-dark);
          text-align: center;
          height: 100%;
        }

        .checkout-receipt-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.85);
          z-index: 10000;
        }

        .checkout-receipt-card {
          background-color: var(--color-bg-light);
          color: var(--color-text-light);
          width: 350px;
          border: 1px solid var(--color-accent);
          padding: 2.5rem;
          box-shadow: var(--shadow-lg);
        }

        .receipt-title {
          font-size: 1.1rem;
          font-weight: 700;
          text-align: center;
          color: var(--color-primary-dark);
        }

        .receipt-divider {
          border-top: 1px dashed rgba(122,12,22,0.2);
          margin: 1rem 0;
        }

        .receipt-item-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
          color: var(--color-text-light);
        }

        .receipt-item-line.bold {
          font-weight: 700;
        }

        .kds-orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .kds-card {
          background-color: #121215;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: var(--shadow-sm);
        }

        .kds-card:hover {
          border-color: var(--color-accent);
        }

        .kds-order-brand {
          font-size: 0.65rem;
          text-transform: uppercase;
          background-color: rgba(255,255,255,0.05);
          padding: 0.15rem 0.4rem;
          border-radius: 2px;
          margin-left: 0.5rem;
        }

        .kds-order-table {
          font-weight: 700;
          color: var(--color-accent);
        }

        .kds-items-list {
          list-style: none;
          margin-top: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .kds-item-line {
          display: flex;
          gap: 0.75rem;
          font-size: 0.9rem;
        }

        .kds-item-qty {
          font-weight: 700;
          color: var(--color-accent);
        }

        .kds-item-desc {
          display: flex;
          flex-direction: column;
        }

        .kds-item-note {
          font-size: 0.75rem;
          color: var(--color-text-muted-dark);
          font-style: italic;
        }

        .stock-badge {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          width: fit-content;
        }

        .badge-critical {
          background-color: rgba(239, 68, 68, 0.15);
          color: #FFA3A3;
          border: 1px solid var(--color-error);
        }

        .badge-ok {
          background-color: rgba(16, 185, 129, 0.15);
          color: #A7F3D0;
          border: 1px solid var(--color-success);
        }

        .refill-btn {
          background-color: transparent;
          border: 1px solid var(--color-accent);
          color: var(--color-accent);
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          gap: 0.3rem;
          transition: var(--transition-fast);
        }

        .refill-btn:hover {
          background-color: var(--color-accent);
          color: var(--color-bg-dark);
        }

        .table-grid-map {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
        }

        .table-map-card {
          height: 140px;
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: var(--shadow-sm);
        }

        .table-map-card.status-occupied {
          border-left: 5px solid var(--color-primary);
          background-color: rgba(122, 12, 22, 0.05);
        }

        .table-map-card.status-empty {
          border-left: 5px solid var(--color-success);
          background-color: rgba(16, 185, 129, 0.05);
        }

        .table-map-num {
          display: block;
          font-size: 1.25rem;
          color: #FFF;
          font-weight: 600;
        }

        .table-map-cap {
          display: block;
          font-size: 0.75rem;
          color: var(--color-text-muted-dark);
          margin-bottom: 0.5rem;
        }

        .table-map-status-text {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .status-badge-crm {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
        }

        .status-badge-crm.status-pending {
          background-color: rgba(251, 191, 36, 0.15);
          color: #FCD34D;
        }

        .status-badge-crm.status-approved {
          background-color: rgba(16, 185, 129, 0.15);
          color: #A7F3D0;
        }

        .status-badge-crm.status-declined {
          background-color: rgba(239, 68, 68, 0.15);
          color: #FCA5A5;
        }

        .action-crm-btn {
          border: none;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }

        .action-crm-btn.approve {
          background-color: var(--color-success);
          color: #FFF;
        }

        .action-crm-btn.decline {
          background-color: var(--color-error);
          color: #FFF;
        }
      `}</style>
    </div>
  );
}
