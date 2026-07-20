import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import History from './components/History';
import Brands from './components/Brands';
import MenuCatalog from './components/MenuCatalog';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminPortal from './components/AdminPortal';
import AdminLogin from './components/AdminLogin';
import VirtualAssistant from './components/VirtualAssistant';

function App() {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInStaff, setLoggedInStaff] = useState(null);

  // Consumer Cart State
  const [consumerCart, setConsumerCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [consumerTable, setConsumerTable] = useState('');
  const [tablesList, setTablesList] = useState([]);

  // Fetch tables on load for consumer selection
  useEffect(() => {
    fetch('http://localhost:5000/api/tables')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Offline');
      })
      .then(data => setTablesList(data))
      .catch(() => {
        // Fallback default tables
        setTablesList([
          { id: 'SR-01', brand: 'sinar-rasa', table_number: 'Sinar Rasa - Meja 01' },
          { id: 'SR-02', brand: 'sinar-rasa', table_number: 'Sinar Rasa - Meja 02' },
          { id: 'GD-01', brand: 'golden-dragon', table_number: 'Golden Dragon - Meja 01' },
          { id: 'KK-01', brand: 'kopi-ko', table_number: 'Kopi & Ko - Meja 01' }
        ]);
      });
  }, []);

  const handleAddToConsumerCart = (item) => {
    setConsumerCart((prev) => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { ...item, menu_item_id: item.id, quantity: 1, notes: '' }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateConsumerQty = (id, change) => {
    setConsumerCart((prev) => {
      const existing = prev.find(c => c.id === id);
      if (existing.quantity + change <= 0) {
        return prev.filter(c => c.id !== id);
      }
      return prev.map(c => c.id === id ? { ...c, quantity: c.quantity + change } : c);
    });
  };

  const handleConsumerNoteChange = (id, note) => {
    setConsumerCart(prev => prev.map(c => c.id === id ? { ...c, notes: note } : c));
  };

  const handleConsumerSubmitOrder = async (e) => {
    e.preventDefault();
    if (consumerCart.length === 0) return;
    if (!consumerTable) {
      alert('Silakan pilih nomor meja Anda terlebih dahulu.');
      return;
    }

    // Determine the brand based on the first item in cart
    const activeBrand = consumerCart[0].brand;

    const orderData = {
      brand: activeBrand,
      table_id: consumerTable,
      items: consumerCart,
      payment_method: 'QRIS',
      status: 'Pending' // Sent to KDS
    };

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        alert('Pesanan mandiri Anda berhasil dikirim ke dapur! Silakan tunggu pesanan disajikan di meja.');
        setConsumerCart([]);
        setConsumerTable('');
        setIsCartOpen(false);
      } else {
        alert('Gagal mengirimkan pesanan.');
      }
    } catch (err) {
      alert('Sukses Offline: Pesanan berhasil dikirim ke dapur simulasi.');
      setConsumerCart([]);
      setConsumerTable('');
      setIsCartOpen(false);
    }
  };

  const handleLoginSuccess = (employee) => {
    setLoggedInStaff(employee);
    setIsAdmin(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setLoggedInStaff(null);
  };

  // If in Admin ERP mode
  if (isAdmin) {
    return (
      <AdminPortal 
        setIsAdmin={setIsAdmin} 
        loggedInStaff={loggedInStaff} 
        onLogout={handleLogout} 
      />
    );
  }

  // If in Login mode
  if (showLogin) {
    return (
      <AdminLogin 
        onLoginSuccess={handleLoginSuccess} 
        onCancel={() => setShowLogin(false)} 
      />
    );
  }

  const getPriceNum = (item) => {
    if (item.price_num) return item.price_num;
    if (typeof item.price === 'string') {
      const parsed = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  const cartTotalQty = consumerCart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalAmount = consumerCart.reduce((sum, item) => sum + (getPriceNum(item) * item.quantity), 0);

  return (
    <div className="app-wrapper">
      <Navbar setIsAdmin={setShowLogin} />
      <main>
        <Hero />
        <History />
        <Brands setSelectedBrand={setSelectedBrand} />
        <MenuCatalog 
          selectedBrand={selectedBrand} 
          setSelectedBrand={setSelectedBrand} 
          onAddToConsumerCart={handleAddToConsumerCart}
        />
        <ContactForm />
      </main>
      <Footer />

      {/* Floating Cart Icon Badge */}
      {cartTotalQty > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="floating-cart-badge-btn flex-center animate-fade-in"
          aria-label="Buka Keranjang Pesanan Saya"
        >
          <span className="cart-badge-count">{cartTotalQty}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          Pesanan Saya ({new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(cartTotalAmount)})
        </button>
      )}

      {/* Sliding Consumer Cart Drawer */}
      {isCartOpen && (
        <div className="cart-drawer-overlay animate-fade-in" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header flex-center">
              <h3 className="font-serif text-gold">Daftar Pesanan Saya</h3>
              <button onClick={() => setIsCartOpen(false)} className="close-drawer-btn">Tutup</button>
            </div>
            
            <div className="drawer-items-container">
              {consumerCart.length > 0 ? (
                consumerCart.map((item) => (
                  <div key={item.id} className="drawer-cart-item flex-center">
                    <div style={{ flexGrow: 1 }}>
                      <strong>{item.name}</strong><br />
                      <span className="text-gold" style={{ fontSize: '0.8rem' }}>{item.price}</span>
                      <input 
                        type="text" 
                        placeholder="Catatan porsi..." 
                        value={item.notes} 
                        onChange={(e) => handleConsumerNoteChange(item.id, e.target.value)} 
                        className="drawer-item-notes-input"
                      />
                    </div>
                    <div className="flex-center" style={{ gap: '0.5rem' }}>
                      <button onClick={() => handleUpdateConsumerQty(item.id, -1)} className="qty-control">-</button>
                      <span className="qty-val">{item.quantity}</span>
                      <button onClick={() => handleUpdateConsumerQty(item.id, 1)} className="qty-control">+</button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center" style={{ padding: '3rem 0', color: '#888' }}>Belum ada hidangan terpilih.</p>
              )}
            </div>

            {consumerCart.length > 0 && (
              <form onSubmit={handleConsumerSubmitOrder} className="drawer-checkout-form">
                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label text-gold">Pilih Meja Anda:</label>
                  <select 
                    value={consumerTable} 
                    onChange={(e) => setConsumerTable(e.target.value)} 
                    className="form-input" 
                    required
                  >
                    <option value="">-- Nomor Meja --</option>
                    {tablesList.map(t => (
                      <option key={t.id} value={t.id}>{t.table_number || t.id}</option>
                    ))}
                  </select>
                </div>
                
                <div className="drawer-total-row flex-center">
                  <span>TOTAL ESTIMASI:</span>
                  <strong className="text-gold" style={{ fontSize: '1.3rem' }}>
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(cartTotalAmount)}
                  </strong>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                  Kirim Pesanan ke Dapur
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <VirtualAssistant />

      {/* Floating WhatsApp CTA */}
      <a
        href="https://wa.me/628123456789?text=Halo%20Admin%20Hartono%20Culinary%20Group,%20saya%20ingin%20bertanya%20mengenai%20menu%20restoran%20dan%20layanan%20katering.%20Terima%20kasih!"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa-btn font-sans"
        aria-label="Tanya Kami di WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        Tanya Kami (WA)
      </a>

      <style>{`
        /* Floating Cart Badge Styles */
        .floating-cart-badge-btn {
          position: fixed;
          bottom: 100px;
          right: 30px;
          background-color: var(--color-accent);
          color: var(--color-bg-dark);
          border: 1px solid var(--color-accent);
          padding: 0.75rem 1.25rem;
          font-weight: 700;
          font-size: 0.85rem;
          box-shadow: var(--shadow-gold);
          z-index: 999;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .floating-cart-badge-btn:hover {
          transform: translateY(-2px);
          background-color: #FFFFFF;
          border-color: #FFFFFF;
        }

        .cart-badge-count {
          position: absolute;
          top: -10px;
          left: -10px;
          background-color: var(--color-primary);
          color: #FFF;
          font-size: 0.75rem;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          border: 2px solid var(--color-bg-light);
        }

        /* Drawer Overlay */
        .cart-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.75);
          z-index: 10001;
          display: flex;
          justify-content: flex-end;
        }

        .cart-drawer {
          width: 400px;
          background-color: #121215;
          height: 100vh;
          box-shadow: -5px 0 25px rgba(0, 0, 0, 0.5);
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          border-left: 1px solid rgba(212, 175, 55, 0.2);
        }

        @media (max-width: 450px) {
          .cart-drawer {
            width: 100%;
          }
        }

        .drawer-header {
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
        }

        .close-drawer-btn {
          background: transparent;
          border: none;
          color: #FFF;
          font-weight: 600;
          cursor: pointer;
        }

        .drawer-items-container {
          flex-grow: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .drawer-cart-item {
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 1rem;
          color: #D4D4D8;
        }

        .drawer-item-notes-input {
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.05);
          color: #FFF;
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          margin-top: 0.35rem;
          outline: none;
          width: 100%;
        }

        .drawer-checkout-form {
          border-top: 1px dashed rgba(255,255,255,0.1);
          padding-top: 1.5rem;
        }

        .drawer-total-row {
          justify-content: space-between;
          padding: 0.5rem 0;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

export default App;
