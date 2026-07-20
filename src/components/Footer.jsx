import React from 'react';
import { Mail, Phone, MapPin, Globe, UtensilsCrossed } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer theme-dark">
      <div className="container footer-grid">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <a href="#hero" className="footer-logo">
            <UtensilsCrossed className="logo-icon" />
            <span className="logo-text">HARTONO</span>
            <span className="logo-sub">CULINARY GROUP</span>
          </a>
          <p className="footer-about">
            Menyajikan warisan kuliner terbaik Asia dan Nusantara sejak 1988. Berdedikasi menghadirkan cita rasa autentik dan kebahagiaan dalam setiap suapan.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="social-icon" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="social-icon" aria-label="Website"><Globe size={18} /></a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col">
          <h4 className="footer-title font-sans">Navigasi</h4>
          <ul className="footer-links">
            <li><a href="#hero">Beranda</a></li>
            <li><a href="#about">Tentang Kami</a></li>
            <li><a href="#brands">Brand Restoran</a></li>
            <li><a href="#menu">Katalog Menu</a></li>
            <li><a href="#contact">Reservasi & Katering</a></li>
          </ul>
        </div>

        {/* Restaurant Brands Column */}
        <div className="footer-col">
          <h4 className="footer-title font-sans">Brand Restoran</h4>
          <ul className="footer-links">
            <li><a href="#menu">Sinar Rasa</a></li>
            <li><a href="#menu">Golden Dragon Bistro</a></li>
            <li><a href="#menu">Kopi & Ko</a></li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="footer-col contact-col">
          <h4 className="footer-title font-sans">Kantor Pusat</h4>
          <ul className="contact-details">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>Jl. Jenderal Sudirman No. 88, Menteng, Jakarta Pusat, 10310</span>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <span>+62 (21) 555-8888</span>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <span>info@hartonoculinary.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>&copy; {currentYear} Hartono Culinary Group. Hak Cipta Dilindungi. Desain premium pembawa hoki.</p>
          <p className="footer-credit">Handcrafted with ❤️ & Auspicious Red</p>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: #0E0E0E;
          border-top: 4px solid var(--color-primary);
          padding: 5rem 0 0;
          color: #A1A1AA;
          font-size: 0.9rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 2fr;
          gap: 4rem;
          margin-bottom: 4rem;
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: #FFFFFF;
        }

        .footer-logo .logo-icon {
          color: var(--color-accent);
        }

        .footer-logo .logo-text {
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: 2px;
        }

        .footer-logo .logo-sub {
          font-size: 0.65rem;
          color: var(--color-accent);
          border-left: 1px solid rgba(255, 255, 255, 0.3);
          padding-left: 0.75rem;
          margin-left: 0.5rem;
          letter-spacing: 1px;
        }

        .footer-about {
          line-height: 1.6;
          color: #A1A1AA;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.05);
          color: #FFFFFF;
          transition: var(--transition-fast);
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .social-icon:hover {
          background-color: var(--color-primary);
          color: #FFFFFF;
          border-color: var(--color-accent);
          box-shadow: var(--shadow-gold);
          transform: translateY(-3px);
        }

        .footer-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #FFFFFF;
          position: relative;
          padding-bottom: 0.75rem;
          letter-spacing: 0.5px;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background-color: var(--color-accent);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links a {
          color: #A1A1AA;
          text-decoration: none;
          transition: var(--transition-fast);
        }

        .footer-links a:hover {
          color: #FFFFFF;
          padding-left: 5px;
        }

        .contact-details {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-details li {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          line-height: 1.5;
        }

        .contact-icon {
          color: var(--color-accent);
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 2rem 0;
          font-size: 0.8rem;
          color: #71717A;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-credit {
          color: #71717A;
        }

        @media (max-width: 768px) {
          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
