import React from 'react';
import { ArrowRight, Flame, Coffee, Compass, MapPin, Clock } from 'lucide-react';

export default function Brands({ setSelectedBrand }) {
  const brandData = [
    {
      id: 'sinar-rasa',
      name: 'Sinar Rasa',
      tagline: 'Authentic Padang Dining',
      desc: 'Menghadirkan kelezatan masakan Minang dalam format modern dan higienis. Dari rendang legendaris hingga gulai gurih yang kaya rempah nusantara.',
      image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=600&auto=format&fit=crop',
      signature: 'Rendang Daging Wagyu & Ayam Pop Premium',
      location: 'Jl. Menteng Raya No. 42, Jakarta Pusat',
      hours: '10:00 - 22:00 WIB',
      icon: <Flame className="brand-badge-icon" />
    },
    {
      id: 'golden-dragon',
      name: 'Golden Dragon Bistro',
      tagline: 'Modern Chinese & Dim Sum',
      desc: 'Menyajikan seni kuliner Tiongkok klasik dengan sentuhan modern. Rasakan kelembutan dim sum buatan tangan serta hidangan laut segar bercitarasa khas.',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop',
      signature: 'Imperial Har Gow & Bebek Panggang Peking',
      location: 'Grand Indonesia East Mall Lt. 5, Jakarta Pusat',
      hours: '11:00 - 22:00 WIB',
      icon: <Compass className="brand-badge-icon" />
    },
    {
      id: 'kopi-ko',
      name: 'Kopi & Ko',
      tagline: 'Artisan Coffee & Kopitiam',
      desc: 'Tempat berkumpul hangat dengan aroma kopi terbaik Indonesia. Menyajikan roti bakar srikaya klasik dan kopi susu andalan yang diseduh penuh cinta.',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop',
      signature: 'Es Kopi Susu Hartono & Roti Bakar Butter Kaya',
      location: 'Jl. Senopati Raya No. 71, Jakarta Selatan',
      hours: '07:00 - 21:00 WIB',
      icon: <Coffee className="brand-badge-icon" />
    }
  ];

  const handleBrandClick = (brandId) => {
    setSelectedBrand(brandId);
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="brands" className="section brands-section theme-dark">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Portofolio Restoran</span>
          <h2 className="section-title font-serif" style={{ color: '#FFFFFF' }}>Tiga Pilar Kelezatan Kami</h2>
          <div className="accent-line-center"></div>
          <p className="section-desc lead">
            Setiap brand dirancang secara unik untuk menyajikan spesialisasi kuliner yang berbeda dengan satu standar kualitas tinggi Hartono Culinary Group.
          </p>
        </div>

        <div className="brands-grid">
          {brandData.map((brand) => (
            <div key={brand.id} className="brand-card card-scale">
              <div className="brand-image-wrapper">
                <img src={brand.image} alt={brand.name} className="brand-image" loading="lazy" />
                <div className="brand-badge flex-center">
                  {brand.icon}
                </div>
              </div>
              <div className="brand-info">
                <span className="brand-tag">{brand.tagline}</span>
                <h3 className="brand-name font-serif">{brand.name}</h3>
                <p className="brand-desc">{brand.desc}</p>
                
                {/* Tactical details */}
                <div className="brand-details-tactical">
                  <div className="tactical-item">
                    <MapPin size={14} className="text-gold" />
                    <span>{brand.location}</span>
                  </div>
                  <div className="tactical-item">
                    <Clock size={14} className="text-gold" />
                    <span>{brand.hours}</span>
                  </div>
                </div>

                <div className="brand-signature">
                  <strong>Andalan:</strong> {brand.signature}
                </div>
                
                <button 
                  onClick={() => handleBrandClick(brand.id)}
                  className="btn btn-outline brand-action"
                  style={{ color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.2)', width: '100%', marginTop: '1.5rem' }}
                >
                  Lihat Menu <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .brands-section {
          background-color: var(--color-bg-dark);
        }

        .brands-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }

        @media (max-width: 992px) {
          .brands-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin: 0 auto;
          }
        }

        .brand-card {
          background-color: var(--color-surface-dark);
          border: 1px solid rgba(212, 175, 55, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .brand-card:hover {
          border-color: var(--color-accent);
          box-shadow: var(--shadow-gold);
        }

        .brand-image-wrapper {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .brand-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }

        .brand-card:hover .brand-image {
          transform: scale(1.08);
        }

        .brand-badge {
          position: absolute;
          bottom: -20px;
          right: 25px;
          width: 50px;
          height: 50px;
          background-color: var(--color-primary);
          color: var(--color-accent);
          border: 2px solid var(--color-accent);
          border-radius: 50%;
          box-shadow: var(--shadow-sm);
          z-index: 5;
        }

        .brand-badge-icon {
          color: var(--color-accent);
        }

        .brand-info {
          padding: 2.5rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .brand-tag {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--color-accent);
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: block;
        }

        .brand-name {
          font-size: 1.75rem;
          color: #FFFFFF;
          margin-bottom: 1rem;
        }

        .brand-desc {
          color: var(--color-text-dark);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.25rem;
          flex-grow: 1;
        }

        .brand-details-tactical {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          font-size: 0.85rem;
          color: #D4D4D8;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 0.75rem;
        }

        .tactical-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .brand-signature {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 0.75rem;
          font-size: 0.85rem;
          color: #A1A1AA;
        }

        .brand-signature strong {
          color: var(--color-accent);
        }

        .brand-action:hover {
          background-color: var(--color-primary) !important;
          border-color: var(--color-primary) !important;
          color: #FFFFFF !important;
          box-shadow: var(--shadow-red);
        }
      `}</style>
    </section>
  );
}
