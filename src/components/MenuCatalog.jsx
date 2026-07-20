import React, { useState } from 'react';
import { Sparkles, Utensils, Search, Phone } from 'lucide-react';

// Custom LazyImage with Blur-Up/Color placeholder loading optimization
function LazyImage({ src, alt, placeholderColor = '#2A1012' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="lazy-image-container" style={{ backgroundColor: placeholderColor }}>
      {!isLoaded && <div className="lazy-image-placeholder-blur"></div>}
      <img
        src={src}
        alt={alt}
        className={`lazy-image-actual ${isLoaded ? 'loaded' : ''}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        style={{ display: error ? 'none' : 'block' }}
      />
      {error && (
        <div className="lazy-image-error flex-center">
          <Utensils size={32} className="text-gold" />
          <span>Gambar tidak tersedia</span>
        </div>
      )}
      <style>{`
        .lazy-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .lazy-image-placeholder-blur {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          filter: blur(10px);
          transform: scale(1.1);
          background: linear-gradient(45deg, rgba(122, 12, 22, 0.4), rgba(212, 175, 55, 0.2));
          animation: pulse 1.5s infinite ease-in-out;
        }

        .lazy-image-actual {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .lazy-image-actual.loaded {
          opacity: 1;
        }

        .lazy-image-error {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          color: var(--color-text-muted-light);
          gap: 0.5rem;
          position: absolute;
          top: 0;
          left: 0;
        }

        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.9; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

export default function MenuCatalog({ selectedBrand, setSelectedBrand }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    // Brand 1: Sinar Rasa (Padang Fine Dining)
    {
      id: 1,
      brand: 'sinar-rasa',
      category: 'mains',
      name: 'Rendang Daging Wagyu',
      desc: 'Daging Wagyu MB5 pilihan yang dimasak lambat selama 8 jam dengan rempah-rempah kelapa sangrai dan minyak kelapa asli hingga bumbu menghitam pekat dan meresap sempurna.',
      price: 'Rp 145.000',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
      color: '#3D1518',
      popular: true,
      tags: ['Pedas 🌶️', 'Rekomendasi ⭐', 'Wagyu Beef']
    },
    {
      id: 2,
      brand: 'sinar-rasa',
      category: 'mains',
      name: 'Ayam Pop Premium',
      desc: 'Ayam kampung organik tanpa kulit yang direbus perlahan dengan air kelapa muda dan rempah khusus, lalu digoreng cepat dalam minyak kelapa panas. Disajikan dengan sambal tomat merah pop gurih.',
      price: 'Rp 48.000',
      image: 'https://images.unsplash.com/photo-1626804475315-9944a9e32049?q=80&w=600&auto=format&fit=crop',
      color: '#422815',
      popular: false,
      tags: ['Terlaris 🔥', 'Organik']
    },
    {
      id: 3,
      brand: 'sinar-rasa',
      category: 'mains',
      name: 'Gulai Kepala Ikan Kakap',
      desc: 'Kepala ikan kakap merah segar ukuran besar yang disiram kuah gulai kental berempah Minang autentik, bercitarasa pedas, gurih, dan sedikit asam segar dari belimbing wuluh.',
      price: 'Rp 195.000',
      image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=600&auto=format&fit=crop',
      color: '#4F3010',
      popular: true,
      tags: ['Rekomendasi ⭐', 'Seafood 🐟']
    },
    {
      id: 4,
      brand: 'sinar-rasa',
      category: 'mains',
      name: 'Dendeng Batokok Balado',
      desc: 'Irisan tipis daging sapi has dalam berkualitas yang dipukul (batokok) hingga empuk, dibakar di atas arang batok kelapa, lalu disajikan dengan cabai merah keriting tumbuk kasar dan minyak kelapa.',
      price: 'Rp 95.000',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
      color: '#4F1E21',
      popular: false,
      tags: ['Pedas 🌶️', 'Favorit ❤️']
    },
    {
      id: 5,
      brand: 'sinar-rasa',
      category: 'beverages',
      name: 'Teh Talua Rempah',
      desc: 'Minuman khas Minang legendaris bertekstur creamy berbusa tebal. Campuran kuning telur bebek segar, gula pasir, susu kental manis, seduhan teh hitam pekat Solok, jeruk nipis, dan kayu manis.',
      price: 'Rp 35.000',
      image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=600&auto=format&fit=crop',
      color: '#3A2A1A',
      popular: true,
      tags: ['Tradisional ☕', 'Energi ⚡']
    },
    {
      id: 6,
      brand: 'sinar-rasa',
      category: 'desserts',
      name: 'Es Cendol Durian Sinar Rasa',
      desc: 'Hidangan penutup manis berisi cendol tepung beras wangi pandan asli, santan kelapa kental segar, gula merah cair kental khas Padang, dan topping daging buah durian Medan asli.',
      price: 'Rp 45.000',
      image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=600&auto=format&fit=crop',
      color: '#2F3D1F',
      popular: false,
      tags: ['Manis 🥞', 'Dingin 🍧']
    },

    // Brand 2: Golden Dragon Bistro (Chinese Fine Dining)
    {
      id: 7,
      brand: 'golden-dragon',
      category: 'dimsum',
      name: 'Imperial Har Gow',
      desc: 'Dim sum legendaris berupa pangsit kukus berkulit kristal transparan tipis yang diisi dengan udang windu utuh yang sangat gurih, kenyal, dan juicy.',
      price: 'Rp 52.000',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop',
      color: '#2E3A1A',
      popular: true,
      tags: ['Seafood 🍤', 'Rekomendasi ⭐']
    },
    {
      id: 8,
      brand: 'golden-dragon',
      category: 'mains',
      name: 'Bebek Panggang Peking (Half)',
      desc: 'Bebek premium setengah ekor yang diproses selama 24 jam dengan bumbu rempah rahasia, dipanggang oven gantung tradisional hingga kulit garing kemerahan dan daging super lembut. Disajikan dengan crepes tipis.',
      price: 'Rp 285.000',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=600&auto=format&fit=crop',
      color: '#4A201A',
      popular: true,
      tags: ['Premium 👑', 'Favorit ❤️']
    },
    {
      id: 9,
      brand: 'golden-dragon',
      category: 'dimsum',
      name: 'Steamed Xiao Long Bao',
      desc: 'Pangsit kukus khas Shanghai (4 pcs) berkulit adonan tipis buatan tangan, berisi campuran daging ayam cincang gurih dan kuah kaldu kolagen panas gurih yang lumer di mulut saat digigit.',
      price: 'Rp 48.000',
      image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=600&auto=format&fit=crop',
      color: '#3B3E32',
      popular: false,
      tags: ['Sp Dumpling 🥟', 'Hangat']
    },
    {
      id: 10,
      brand: 'golden-dragon',
      category: 'mains',
      name: 'Yang Chow Fried Rice',
      desc: 'Nasi goreng khas Kanton dengan aroma wok-hei kuat, diisi dengan potongan premium Chinese BBQ chicken, udang windu cincang, telur orak-arik, dan polong hijau manis.',
      price: 'Rp 90.000',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
      color: '#3C3925',
      popular: false,
      tags: ['Klasik Wok 🍳', 'Favorit ❤️']
    },
    {
      id: 11,
      brand: 'golden-dragon',
      category: 'desserts',
      name: 'Mango Sago with Pomelo',
      desc: 'Kombinasi puree mangga harum manis dingin, susu evaporasi gurih, butiran mutiara sagu kenyal, potongan mangga segar, dan bulir jeruk bali merah yang sedikit asam manis segar.',
      price: 'Rp 48.000',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop',
      color: '#4F4A21',
      popular: false,
      tags: ['Dingin 🍧', 'Buah Segar']
    },
    {
      id: 12,
      brand: 'golden-dragon',
      category: 'beverages',
      name: 'Teh Chrysanthemum Pu-Erh',
      desc: 'Teh herbal tradisional premium (pot) yang menggabungkan bunga krisan wangi menenangkan dengan daun teh Pu-Erh fermentasi gelap khas Yunnan, membantu menyeimbangkan makanan berlemak.',
      price: 'Rp 35.000',
      image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=600&auto=format&fit=crop',
      color: '#2F271D',
      popular: false,
      tags: ['Hangat ☕', 'Sehat 🌱']
    },

    // Brand 3: Kopi & Ko (Artisan Coffee & Kopitiam)
    {
      id: 13,
      brand: 'kopi-ko',
      category: 'dimsum',
      name: 'Charcoal Grilled Kaya Toast',
      desc: 'Dua lembar roti brioche empuk dipanggang di atas arang kelapa asli hingga renyah di luar, diisi selai srikaya wangi pandan alami buatan rumah dan potongan mentega cold salted butter yang tebal.',
      price: 'Rp 32.000',
      image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=600&auto=format&fit=crop',
      color: '#342A20',
      popular: true,
      tags: ['Terlaris 🔥', 'Manis']
    },
    {
      id: 14,
      brand: 'kopi-ko',
      category: 'beverages',
      name: 'Es Kopi Susu Hartono',
      desc: 'Perpaduan espresso double-shot kopi house blend (70% Aceh Gayo arabika, 30% Toraja robusta), susu segar creamy dingin, dan gula aren cair organik kental aromatik.',
      price: 'Rp 28.000',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop',
      color: '#2A1A10',
      popular: true,
      tags: ['Signature ☕', 'Terlaris 🔥']
    },
    {
      id: 15,
      brand: 'kopi-ko',
      category: 'mains',
      name: 'Mie Goreng Mamak Special',
      desc: 'Mie kuning tebal ditumis dengan wajan panas besar menggunakan saus cabai kecap manis pedas gurih, dilengkapi dengan telur, potongan cumi segar, udang windu, sawi hijau, dan tahu pong renyah.',
      price: 'Rp 62.000',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
      color: '#4A3521',
      popular: false,
      tags: ['Pedas 🌶️', 'Favorit ❤️']
    },
    {
      id: 16,
      brand: 'kopi-ko',
      category: 'mains',
      name: 'Nasi Goreng Kampung Kopitiam',
      desc: 'Nasi goreng bumbu terasi udang wangi khas kopitiam Melayu, disajikan lengkap dengan telur ceplok setengah matang, sate ayam bumbu kacang, acar segar, dan kerupuk udang renyah.',
      price: 'Rp 58.000',
      image: 'https://images.unsplash.com/photo-1626804475315-9944a9e32049?q=80&w=600&auto=format&fit=crop',
      color: '#453E2A',
      popular: true,
      tags: ['Tradisional 🍳', 'Mengenyangkan']
    },
    {
      id: 17,
      brand: 'kopi-ko',
      category: 'dimsum',
      name: 'Singkong Goreng Sambal Roa',
      desc: 'Stik singkong mentega pilihan yang direbus rempah bawang putih hingga merekah, digoreng garing keemasan di luar namun sangat pulen di dalam. Disajikan hangat dengan sambal roa Manado pedas gurih.',
      price: 'Rp 38.000',
      image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=600&auto=format&fit=crop',
      color: '#3B3320',
      popular: false,
      tags: ['Pedas 🌶️', 'Camilan Gurih']
    },
    {
      id: 18,
      brand: 'kopi-ko',
      category: 'beverages',
      name: 'Manual Brew V60 Flores Bajawa',
      desc: 'Kopi single-origin arabika Flores Bajawa berkualitas tinggi yang diseduh manual dengan metode V60. Menghasilkan karakter rasa cokelat manis, karamel lembut, dan aroma floral lemon segar.',
      price: 'Rp 38.000',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop',
      color: '#2F1F15',
      popular: false,
      tags: ['Single Origin ☕', 'Filter Coffee']
    }
  ];

  const brands = [
    { id: 'all', name: 'Semua Brand' },
    { id: 'sinar-rasa', name: 'Sinar Rasa' },
    { id: 'golden-dragon', name: 'Golden Dragon' },
    { id: 'kopi-ko', name: 'Kopi & Ko' }
  ];

  const categories = [
    { id: 'all', name: 'Semua Kategori' },
    { id: 'mains', name: 'Makanan Utama' },
    { id: 'dimsum', name: 'Camilan & Dim Sum' },
    { id: 'desserts', name: 'Penutup' },
    { id: 'beverages', name: 'Minuman' }
  ];

  const filteredMenu = menuItems.filter((item) => {
    const matchesBrand = selectedBrand === 'all' || item.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="section menu-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Katalog Menu</span>
          <h2 className="section-title font-serif">Pilihan Menu Andalan</h2>
          <div className="accent-line-center"></div>
          <p className="section-desc lead">
            Jelajahi mahakarya kuliner kami. Cari menu favorit Anda, saring berdasarkan restoran, dan pesan langsung secara instan via WhatsApp.
          </p>
        </div>

        {/* Tactical Search Box */}
        <div className="search-wrapper">
          <div className="search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Cari hidangan, kopi, dim sum, atau gulai..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input font-sans"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="clear-search-btn">
                Mulai Ulang
              </button>
            )}
          </div>
        </div>

        {/* Brand Filters */}
        <div className="filter-group brand-filters">
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => setSelectedBrand(brand.id)}
              className={`filter-btn font-sans ${selectedBrand === brand.id ? 'active' : ''}`}
            >
              {brand.name}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="filter-group category-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`filter-btn category-btn font-sans ${selectedCategory === category.id ? 'active' : ''}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Informative Search Status */}
        {searchQuery && (
          <p className="search-status-text font-sans">
            Menampilkan <strong>{filteredMenu.length}</strong> hasil pencarian untuk "{searchQuery}"
          </p>
        )}

        {/* Menu Grid */}
        <div className="menu-grid">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item) => {
              const brandLabel = item.brand === 'sinar-rasa' ? 'Sinar Rasa' : item.brand === 'golden-dragon' ? 'Golden Dragon' : 'Kopi & Ko';
              const waText = `Halo Admin Hartono Culinary Group, saya ingin memesan menu ini:\n\n- Nama Menu: *${item.name}*\n- Brand: *${brandLabel}*\n- Harga: *${item.price}*\n\nMohon informasi ketersediaan dan cara pemesanannya. Terima kasih!`;
              const encodedWaText = encodeURIComponent(waText);
              
              return (
                <div key={item.id} className="menu-card card-scale">
                  <div className="menu-image-container">
                    <LazyImage src={item.image} alt={item.name} placeholderColor={item.color} />
                    {item.popular && (
                      <div className="popular-badge flex-center">
                        <Sparkles size={12} />
                        <span>Terlaris</span>
                      </div>
                    )}
                    <span className="menu-card-brand">{brandLabel.toUpperCase()}</span>
                  </div>
                  <div className="menu-details">
                    <div className="menu-header-group">
                      <div className="menu-header">
                        <h3 className="menu-name font-serif">{item.name}</h3>
                        <span className="menu-price font-sans">{item.price}</span>
                      </div>
                      
                      {/* Premium Food Tags */}
                      <div className="menu-tags-list">
                        {item.tags && item.tags.map((tag, idx) => (
                          <span key={idx} className="menu-tag-pill font-sans">{tag}</span>
                        ))}
                      </div>
                    </div>
                    
                    <p className="menu-desc">{item.desc}</p>
                    
                    <div className="menu-action-row">
                      <a
                        href={`https://wa.me/628123456789?text=${encodedWaText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="menu-wa-btn flex-center font-sans"
                      >
                        <Phone size={12} style={{ marginRight: '6px' }} />
                        Pesan via WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-items flex-center">
              <p className="lead">Tidak ada menu yang sesuai dengan filter atau kata pencarian Anda.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .menu-section {
          background-color: var(--color-bg-light);
        }

        /* Search Box Styles */
        .search-wrapper {
          max-width: 600px;
          margin: 0 auto 2.5rem;
        }

        .search-box {
          display: flex;
          align-items: center;
          background: #FFFFFF;
          border: 1px solid rgba(122, 12, 22, 0.15);
          padding: 0.6rem 1.2rem;
          box-shadow: var(--shadow-sm);
          position: relative;
          transition: var(--transition-fast);
        }

        .search-box:focus-within {
          border-color: var(--color-primary);
          box-shadow: 0 5px 15px rgba(122, 12, 22, 0.08);
        }

        .search-icon {
          color: var(--color-primary-light);
          margin-right: 0.75rem;
        }

        .search-input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 1rem;
          color: var(--color-text-light);
          background: transparent;
        }

        .search-input::placeholder {
          color: #A1A1AA;
        }

        .clear-search-btn {
          background: transparent;
          border: none;
          color: var(--color-text-muted-light);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          padding-left: 0.5rem;
        }

        .clear-search-btn:hover {
          color: var(--color-primary);
        }

        .search-status-text {
          text-align: center;
          color: var(--color-text-muted-light);
          font-size: 0.9rem;
          margin: -0.5rem auto 1.5rem;
        }

        /* Filters */
        .filter-group {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .brand-filters {
          border-bottom: 1px solid rgba(122, 12, 22, 0.1);
          padding-bottom: 1.5rem;
          max-width: 600px;
          margin: 0 auto 1.5rem;
        }

        .filter-btn {
          background: transparent;
          border: 1px solid rgba(122, 12, 22, 0.2);
          color: var(--color-primary-dark);
          padding: 0.6rem 1.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .filter-btn:hover {
          background-color: rgba(122, 12, 22, 0.05);
          border-color: var(--color-primary);
        }

        .filter-btn.active {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
          color: #FFFFFF;
          box-shadow: var(--shadow-red);
        }

        .category-btn {
          border-radius: 20px;
          padding: 0.4rem 1.2rem;
          font-size: 0.85rem;
          border-color: transparent;
          background-color: rgba(0, 0, 0, 0.04);
        }

        .category-btn:hover {
          background-color: rgba(122, 12, 22, 0.05);
        }

        .category-btn.active {
          background-color: var(--color-accent);
          border-color: var(--color-accent);
          color: var(--color-bg-dark);
          box-shadow: var(--shadow-gold);
        }

        /* Menu Grid */
        .menu-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          margin-top: 3.5rem;
        }

        @media (max-width: 992px) {
          .menu-grid {
            grid-template-columns: 1fr;
            max-width: 600px;
            margin: 3.5rem auto 0;
          }
        }

        .menu-card {
          background-color: var(--color-surface-light);
          border: 1px solid rgba(122, 12, 22, 0.08);
          display: flex;
          height: 220px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        @media (max-width: 600px) {
          .menu-card {
            flex-direction: column;
            height: auto;
          }
          .menu-image-container {
            width: 100% !important;
            height: 200px;
          }
        }

        .menu-card:hover {
          border-color: var(--color-accent);
          box-shadow: 0 10px 25px rgba(122, 12, 22, 0.08);
        }

        .menu-image-container {
          position: relative;
          width: 40%;
          height: 100%;
          flex-shrink: 0;
        }

        .popular-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: var(--color-accent);
          color: var(--color-bg-dark);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          border-radius: 2px;
          gap: 0.25rem;
          box-shadow: var(--shadow-sm);
          z-index: 5;
        }

        .menu-card-brand {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background-color: rgba(18, 18, 18, 0.85);
          color: var(--color-accent);
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border: 1px solid rgba(212, 175, 55, 0.3);
          letter-spacing: 0.5px;
          z-index: 5;
        }

        .menu-details {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-grow: 1;
        }

        .menu-header-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .menu-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }

        .menu-name {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--color-primary-dark);
          line-height: 1.3;
        }

        .menu-price {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-primary);
          white-space: nowrap;
        }

        /* Food Tags */
        .menu-tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
        }

        .menu-tag-pill {
          font-size: 0.65rem;
          padding: 0.1rem 0.45rem;
          background-color: rgba(122, 12, 22, 0.05);
          color: var(--color-primary);
          border: 1px solid rgba(122, 12, 22, 0.1);
          font-weight: 600;
          letter-spacing: 0.2px;
        }

        .menu-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted-light);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0.5rem 0;
        }

        .menu-action-row {
          display: flex;
          align-items: center;
        }

        /* Premium Minimalist WA Button */
        .menu-wa-btn {
          background-color: transparent;
          color: var(--color-primary);
          border: 1px solid var(--color-primary);
          padding: 0.45rem 1rem;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
          text-decoration: none;
          width: 100%;
          text-align: center;
        }

        .menu-wa-btn:hover {
          background-color: var(--color-primary);
          color: #FFFFFF !important;
          box-shadow: var(--shadow-red);
          transform: translateY(-1px);
        }

        .no-items {
          grid-column: 1 / -1;
          padding: 5rem 0;
          text-align: center;
          width: 100%;
        }
      `}</style>
    </section>
  );
}
