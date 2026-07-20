import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Utensils, Sparkles, MapPin, ClipboardList } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export default function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const messagesEndRef = useRef(null);

  // Chat Order State
  const [chatState, setChatState] = useState('dining_type'); // dining_type, guests, table_select, ordering, confirm, done
  const [orderData, setOrderData] = useState({
    brand: 'sinar-rasa',
    diningType: '', // 'Dine-In', 'Takeaway', 'Delivery'
    guests: 0,
    tableId: '',
    items: [], // array of { menu_item_id, name, price_num, quantity }
    address: ''
  });

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch real menu and tables from backend on mount
  useEffect(() => {
    fetch(`${API_BASE}/menu`)
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .catch(() => loadLocalMenuFallback());

    fetch(`${API_BASE}/tables`)
      .then(res => res.json())
      .then(data => setTables(data))
      .catch(() => loadLocalTablesFallback());
  }, []);

  const loadLocalMenuFallback = () => {
    setMenuItems([
      { id: 1, brand: 'sinar-rasa', name: 'Rendang Daging Wagyu', price: 'Rp 145.000', price_num: 145000, desc: 'Daging Wagyu MB5 bumbu menghitam.' },
      { id: 7, brand: 'golden-dragon', name: 'Imperial Har Gow', price: 'Rp 52.000', price_num: 52000, desc: 'Dim sum udang berkulit kristal.' },
      { id: 8, brand: 'golden-dragon', name: 'Bebek Panggang Peking (Half)', price: 'Rp 285.000', price_num: 285000, desc: 'Bebek oven gantung garing.' },
      { id: 14, brand: 'kopi-ko', name: 'Es Kopi Susu Hartono', price: 'Rp 28.000', price_num: 28000, desc: 'Espresso Aceh Gayo & Toraja Aren.' }
    ]);
  };

  const loadLocalTablesFallback = () => {
    setTables([
      { id: 'SR-01', brand: 'sinar-rasa', table_number: 'Meja 01', status: 'Kosong' },
      { id: 'GD-01', brand: 'golden-dragon', table_number: 'Meja 01', status: 'Kosong' },
      { id: 'KK-01', brand: 'kopi-ko', table_number: 'Meja 01', status: 'Kosong' }
    ]);
  };

  // Start chat with greetings
  const handleOpenAssistant = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          sender: 'bot',
          text: 'Halo! Selamat datang di Hartono Culinary Group. Saya adalah Asisten Pemesanan Virtual Anda. Bagaimana Anda ingin menikmati hidangan Anda hari ini?',
          actions: [
            { label: '🍽️ Makan Di Tempat (Dine-In)', value: 'dine-in' },
            { label: '🛍️ Bawa Pulang (Takeaway)', value: 'takeaway' },
            { label: '🚚 Pesan Antar (Delivery)', value: 'delivery' }
          ]
        }
      ]);
    }
  };

  const addBotMessage = (text, actions = [], extraComponent = null) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'bot',
      text,
      actions,
      extraComponent
    }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      text
    }]);
  };

  // Conversational state handler
  const processUserResponse = async (value, textLabel) => {
    addUserMessage(textLabel);

    // 1. Dining Type Selection
    if (chatState === 'dining_type') {
      const type = value.toLowerCase();
      if (type === 'dine-in') {
        setOrderData(prev => ({ ...prev, diningType: 'Dine-In' }));
        setChatState('guests');
        setTimeout(() => {
          addBotMessage('Baik, Dine-In! Untuk berapa orang meja yang ingin Anda pesan? (Ketik angka, misal: 2 atau 4)');
        }, 600);
      } else {
        const selectedType = type === 'takeaway' ? 'Takeaway' : 'Delivery';
        setOrderData(prev => ({ ...prev, diningType: selectedType, tableId: '' }));
        setChatState('ordering');
        setTimeout(() => {
          addBotMessage(`Baik, Anda memilih ${selectedType}! Silakan pilih menu hidangan Anda. Mau cari menu apa? Atau butuh rekomendasi hidangan andalan kami?`, [
            { label: '⭐ Rekomendasi Menu', value: 'recommend' },
            { label: '📋 Lihat Menu Favorit', value: 'list_favorites' }
          ]);
        }, 600);
      }
    } 
    
    // 2. Guests input
    else if (chatState === 'guests') {
      const num = parseInt(value);
      if (isNaN(num) || num <= 0) {
        setTimeout(() => {
          addBotMessage('Mohon masukkan jumlah tamu yang valid (angka saja). Untuk berapa orang?');
        }, 600);
      } else {
        setOrderData(prev => ({ ...prev, guests: num }));
        setChatState('table_select');
        
        // Fetch available tables
        const availableTables = tables.filter(t => t.status === 'Kosong');
        const actions = availableTables.slice(0, 4).map(t => ({
          label: `${t.table_number} (${t.brand === 'sinar-rasa' ? 'Sinar Rasa' : t.brand === 'golden-dragon' ? 'Golden Dragon' : 'Kopi & Ko'})`,
          value: t.id
        }));

        setTimeout(() => {
          addBotMessage(`Meja untuk ${num} orang. Silakan pilih meja kosong yang ingin ditempati:`, actions);
        }, 600);
      }
    } 
    
    // 3. Table Selection
    else if (chatState === 'table_select') {
      const selectedTable = tables.find(t => t.id === value);
      const tblBrand = selectedTable ? selectedTable.brand : 'sinar-rasa';

      setOrderData(prev => ({ 
        ...prev, 
        tableId: value, 
        brand: tblBrand 
      }));
      
      setChatState('ordering');
      setTimeout(() => {
        addBotMessage(`Meja ${selectedTable ? selectedTable.table_number : value} berhasil dipesan. Sekarang, hidangan apa yang ingin Anda santap? Klik tombol di bawah untuk rekomendasi andalan!`, [
          { label: '⭐ Rekomendasi Menu', value: 'recommend' },
          { label: '📋 Lihat Menu Favorit', value: 'list_favorites' }
        ]);
      }, 600);
    } 
    
    // 4. Ordering Loop
    else if (chatState === 'ordering') {
      if (value === 'recommend') {
        const topDishes = menuItems.filter(m => m.popular);
        setTimeout(() => {
          addBotMessage(
            'Berikut menu andalan best-seller pembawa hoki kami:',
            [],
            <div className="assistant-menu-recommendations">
              {topDishes.map((dish) => (
                <div key={dish.id} className="recommendation-mini-card flex-center">
                  <div style={{ flexGrow: 1 }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{dish.name}</span><br />
                    <span className="text-gold" style={{ fontSize: '0.75rem' }}>{dish.price}</span>
                  </div>
                  <button onClick={() => addMenuItemToChatOrder(dish)} className="btn-add-mini-chat">+ Tambah</button>
                </div>
              ))}
            </div>
          );
        }, 600);
      } else if (value === 'list_favorites') {
        setTimeout(() => {
          addBotMessage(
            'Menu Favorit Hartono Group:',
            [],
            <div className="assistant-menu-recommendations">
              {menuItems.slice(0, 5).map((dish) => (
                <div key={dish.id} className="recommendation-mini-card flex-center">
                  <div style={{ flexGrow: 1 }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{dish.name}</span><br />
                    <span className="text-gold" style={{ fontSize: '0.75rem' }}>{dish.price}</span>
                  </div>
                  <button onClick={() => addMenuItemToChatOrder(dish)} className="btn-add-mini-chat">+ Tambah</button>
                </div>
              ))}
            </div>
          );
        }, 600);
      } else if (value === 'done_order') {
        if (orderData.items.length === 0) {
          setTimeout(() => {
            addBotMessage('Keranjang Anda masih kosong. Silakan pilih makanan terlebih dahulu sebelum memproses.');
          }, 600);
        } else {
          setChatState('confirm');
          const totalAmount = orderData.items.reduce((sum, item) => sum + (item.price_num * item.quantity), 0);
          setTimeout(() => {
            addBotMessage(
              `Berikut ringkasan pesanan Anda:\n\n` +
              `• Jenis: *${orderData.diningType}*\n` +
              (orderData.diningType === 'Dine-In' ? `• Meja: *${orderData.tableId}* (Tamu: ${orderData.guests} org)\n` : '') +
              `• Total Belanja: *${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalAmount)}*\n\n` +
              `Konfirmasi pesanan Anda untuk dikirim langsung ke dapur?`,
              [
                { label: '✅ Ya, Kirim ke Dapur', value: 'confirm_yes' },
                { label: '❌ Batal Pesanan', value: 'confirm_no' }
              ]
            );
          }, 600);
        }
      } else {
        // Search text matching
        const searchWord = value.toLowerCase();
        const matches = menuItems.filter(m => m.name.toLowerCase().includes(searchWord));
        if (matches.length > 0) {
          setTimeout(() => {
            addBotMessage(
              `Saya menemukan hidangan berikut berdasarkan pencarian "${value}":`,
              [],
              <div className="assistant-menu-recommendations">
                {matches.map((dish) => (
                  <div key={dish.id} className="recommendation-mini-card flex-center">
                    <div style={{ flexGrow: 1 }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{dish.name}</span><br />
                      <span className="text-gold" style={{ fontSize: '0.75rem' }}>{dish.price}</span>
                    </div>
                    <button onClick={() => addMenuItemToChatOrder(dish)} className="btn-add-mini-chat">+ Tambah</button>
                  </div>
                ))}
              </div>
            );
          }, 600);
        } else {
          setTimeout(() => {
            addBotMessage(`Maaf, saya tidak menemukan hidangan bernama "${value}". Silakan klik tombol di bawah untuk rekomendasi:`, [
              { label: '⭐ Rekomendasi Menu', value: 'recommend' }
            ]);
          }, 600);
        }
      }
    } 
    
    // 5. Final Confirmation
    else if (chatState === 'confirm') {
      if (value === 'confirm_yes') {
        setChatState('done');
        try {
          const res = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              brand: orderData.brand,
              table_id: orderData.tableId || null,
              items: orderData.items,
              payment_method: 'QRIS',
              status: 'Pending'
            })
          });
          const data = await res.json();
          setTimeout(() => {
            addBotMessage(
              `🎉 SUKSES! Pesanan Anda telah diterima oleh Dapur.\n\n` +
              `• Nomor Transaksi: *#${data.orderId || 'Offline-Mode'}*\n` +
              `• Estimasi Penyajian: *15-20 Menit*\n\n` +
              `Terima kasih telah memesan di Hartono Culinary Group! Ditunggu kunjungannya.`
            );
          }, 600);
        } catch (err) {
          setTimeout(() => {
            addBotMessage(
              `🎉 SUKSES OFFLINE! Pesanan simulasi berhasil dikirim ke antrean dapur.\n\n` +
              `Terima kasih telah berinteraksi dengan Asisten Virtual kami!`
            );
          }, 600);
        }
      } else {
        setChatState('dining_type');
        setOrderData({ brand: 'sinar-rasa', diningType: '', guests: 0, tableId: '', items: [] });
        setTimeout(() => {
          addBotMessage('Pesanan dibatalkan. Mari mulai ulang pemesanan Anda. Bagaimana Anda ingin menikmati hidangan?', [
            { label: '🍽️ Makan Di Tempat (Dine-In)', value: 'dine-in' },
            { label: '🛍️ Bawa Pulang (Takeaway)', value: 'takeaway' },
            { label: '🚚 Pesan Antar (Delivery)', value: 'delivery' }
          ]);
        }, 600);
      }
    }
  };

  const addMenuItemToChatOrder = (dish) => {
    setOrderData(prev => {
      const existing = prev.items.find(i => i.menu_item_id === dish.id);
      let updatedItems;
      if (existing) {
        updatedItems = prev.items.map(i => i.menu_item_id === dish.id ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        updatedItems = [...prev.items, { menu_item_id: dish.id, name: dish.name, price_num: dish.price_num, quantity: 1 }];
      }
      return {
        ...prev,
        brand: dish.brand, // set brand to matching dish
        items: updatedItems
      };
    });

    // Notify user of addition
    addBotMessage(`✓ Ditambahkan: 1 porsi *${dish.name}*. Ada lagi yang ingin dipesan?`, [
      { label: '📋 Selesai & Lanjut Bayar', value: 'done_order' },
      { label: '⭐ Butuh Rekomendasi Lagi', value: 'recommend' }
    ]);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText('');
    processUserResponse(text, text);
  };

  return (
    <div className="virtual-assistant-container">
      {/* Floating assistant bubble */}
      {!isOpen && (
        <button onClick={handleOpenAssistant} className="assistant-floating-btn flex-center animate-fade-in" aria-label="Buka Asisten Virtual">
          <Bot size={24} />
          <span className="assistant-pulse-dot"></span>
        </button>
      )}

      {/* Chat window panel */}
      {isOpen && (
        <div className="assistant-chat-window animate-fade-in">
          {/* Header */}
          <div className="assistant-header flex-center">
            <div className="flex-center" style={{ gap: '0.5rem' }}>
              <Bot size={20} className="text-gold" />
              <div>
                <span className="assistant-title font-serif">Asisten Hartono</span>
                <span className="assistant-status">Online • Siap Melayani</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="close-assistant-btn"><X size={18} /></button>
          </div>

          {/* Conversation history area */}
          <div className="assistant-messages-area">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}>
                <div className="message-icon flex-center">
                  {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{msg.text}</p>
                  </div>
                  
                  {/* Action Choices/Buttons inside bubble */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="message-action-options flex-center" style={{ gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.75rem', justifyContent: 'flex-start' }}>
                      {msg.actions.map((act, index) => (
                        <button 
                          key={index}
                          onClick={() => processUserResponse(act.value, act.label)}
                          className="assistant-action-btn font-sans"
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Extra inline components (recommendation cards) */}
                  {msg.extraComponent}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Text Input Panel */}
          <form onSubmit={handleTextSubmit} className="assistant-input-panel flex-center">
            <input
              type="text"
              placeholder={chatState === 'ordering' ? 'Ketik hidangan (e.g. rendang)...' : 'Ketik jawaban Anda...'}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="assistant-text-input"
            />
            <button type="submit" className="assistant-send-btn flex-center">
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      <style>{`
        .virtual-assistant-container {
          position: fixed;
          bottom: 30px;
          left: 30px;
          z-index: 999;
        }

        .assistant-floating-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: var(--color-primary);
          color: #FFFFFF;
          border: 1px solid var(--color-accent);
          cursor: pointer;
          box-shadow: var(--shadow-red);
          position: relative;
          transition: var(--transition-fast);
        }

        .assistant-floating-btn:hover {
          transform: scale(1.05);
          background-color: var(--color-primary-dark);
        }

        .assistant-pulse-dot {
          position: absolute;
          top: 0;
          right: 0;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #10B981;
          border: 2px solid var(--color-bg-light);
          animation: pulse-green 2s infinite;
        }

        @keyframes pulse-green {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        /* Chat window */
        .assistant-chat-window {
          width: 360px;
          height: 500px;
          background-color: #121215;
          border: 1.5px solid var(--color-accent);
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-lg);
        }

        @media (max-width: 400px) {
          .assistant-chat-window {
            width: 300px;
            height: 450px;
            left: 10px;
            bottom: 80px;
          }
        }

        .assistant-header {
          background-color: rgba(18, 18, 21, 0.95);
          padding: 1rem;
          justify-content: space-between;
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
        }

        .assistant-title {
          font-weight: 700;
          color: #FFF;
          font-size: 0.95rem;
          display: block;
        }

        .assistant-status {
          font-size: 0.65rem;
          color: #10B981;
          display: block;
          margin-top: 0.1rem;
        }

        .close-assistant-btn {
          background: transparent;
          border: none;
          color: #A1A1AA;
          cursor: pointer;
        }

        .close-assistant-btn:hover {
          color: #FFF;
        }

        /* Chat history content */
        .assistant-messages-area {
          flex-grow: 1;
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background-color: #0c0c0e;
        }

        .message-row {
          display: flex;
          gap: 0.75rem;
          max-width: 85%;
        }

        .user-row {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .bot-row {
          align-self: flex-start;
        }

        .message-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.05);
          color: #A1A1AA;
          flex-shrink: 0;
        }

        .user-row .message-icon {
          background-color: rgba(122, 12, 22, 0.15);
          color: var(--color-primary-light);
        }

        .message-bubble {
          padding: 0.75rem 1rem;
          border-radius: 2px;
          font-size: 0.85rem;
          line-height: 1.5;
        }

        .bot-row .message-bubble {
          background-color: #121215;
          color: #E4E4E7;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .user-row .message-bubble {
          background-color: var(--color-primary);
          color: #FFFFFF;
        }

        /* Recommendations */
        .assistant-menu-recommendations {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 0.75rem;
          width: 100%;
        }

        .recommendation-mini-card {
          background: #18181b;
          border: 1px solid rgba(255,255,255,0.05);
          padding: 0.5rem 0.75rem;
          justify-content: space-between;
          width: 100%;
        }

        .btn-add-mini-chat {
          background-color: var(--color-accent);
          color: var(--color-bg-dark);
          border: none;
          padding: 0.25rem 0.5rem;
          font-size: 0.7rem;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-add-mini-chat:hover {
          background-color: #FFF;
        }

        /* Action Buttons */
        .assistant-action-btn {
          background-color: rgba(212, 175, 55, 0.08);
          border: 1px solid var(--color-accent);
          color: var(--color-accent);
          padding: 0.35rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .assistant-action-btn:hover {
          background-color: var(--color-accent);
          color: var(--color-bg-dark);
        }

        /* Input field panel */
        .assistant-input-panel {
          padding: 0.75rem;
          background-color: #121215;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .assistant-text-input {
          flex-grow: 1;
          background-color: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.05);
          color: #FFF;
          padding: 0.5rem 0.75rem;
          font-size: 0.85rem;
          outline: none;
        }

        .assistant-send-btn {
          background-color: var(--color-accent);
          color: var(--color-bg-dark);
          border: none;
          width: 32px;
          height: 32px;
          margin-left: 0.5rem;
          cursor: pointer;
        }

        .assistant-send-btn:hover {
          background-color: #FFFFFF;
        }
      `}</style>
    </div>
  );
}
