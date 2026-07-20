import React, { useState, useEffect } from 'react';
import { Menu, X, UtensilsCrossed } from 'lucide-react';

export default function Navbar({ setIsAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#hero" className="nav-logo">
          <UtensilsCrossed className="logo-icon" />
          <span className="logo-text">HARTONO</span>
          <span className="logo-sub">CULINARY GROUP</span>
        </a>

        {/* Desktop Menu */}
        <div className="nav-menu-desktop">
          <a href="#about" className="nav-link">Tentang Kami</a>
          <a href="#brands" className="nav-link">Brand Restoran</a>
          <a href="#menu" className="nav-link">Katalog Menu</a>
          <button onClick={() => setIsAdmin(true)} className="nav-link" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Portal Admin</button>
          <a href="#contact" className="btn btn-primary nav-btn">Reservasi & Kontak</a>
        </div>

        {/* Mobile Toggle */}
        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div className={`nav-menu-mobile ${isOpen ? 'open' : ''}`}>
          <a href="#about" className="nav-link" onClick={() => setIsOpen(false)}>Tentang Kami</a>
          <a href="#brands" className="nav-link" onClick={() => setIsOpen(false)}>Brand Restoran</a>
          <a href="#menu" className="nav-link" onClick={() => setIsOpen(false)}>Katalog Menu</a>
          <button onClick={() => { setIsAdmin(true); setIsOpen(false); }} className="nav-link text-gold" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 600, textAlign: 'left', padding: '0.5rem 0' }}>Portal Admin (Staf)</button>
          <a href="#contact" className="btn btn-primary nav-btn-mobile" onClick={() => setIsOpen(false)}>Reservasi & Kontak</a>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 0;
          transition: var(--transition-smooth);
          background: transparent;
        }

        .navbar.scrolled {
          padding: 1rem 0;
          background: rgba(18, 18, 18, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          box-shadow: var(--shadow-md);
        }

        .navbar-container {
          max-width: var(--container-width);
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: #FFFFFF;
        }

        .logo-icon {
          color: var(--color-accent);
          transition: var(--transition-smooth);
        }

        .nav-logo:hover .logo-icon {
          transform: rotate(45deg);
        }

        .logo-text {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: 2px;
        }

        .logo-sub {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          color: var(--color-accent);
          border-left: 1px solid rgba(255, 255, 255, 0.3);
          padding-left: 0.75rem;
          margin-left: 0.5rem;
          letter-spacing: 1px;
          display: inline-block;
          vertical-align: middle;
        }

        .nav-menu-desktop {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }

        .nav-link {
          font-family: var(--font-sans);
          color: #E4E4E7;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: var(--transition-fast);
          position: relative;
          padding: 0.5rem 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--color-accent);
          transition: var(--transition-fast);
        }

        .nav-link:hover {
          color: #FFFFFF;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-btn {
          font-size: 0.8rem;
          padding: 0.6rem 1.5rem;
        }

        .nav-toggle {
          display: none;
          background: transparent;
          border: none;
          color: #FFFFFF;
          cursor: pointer;
        }

        .nav-menu-mobile {
          display: none;
        }

        @media (max-width: 768px) {
          .nav-menu-desktop {
            display: none;
          }

          .nav-toggle {
            display: block;
          }

          .nav-menu-mobile {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: #181818;
            border-bottom: 1px solid rgba(212, 175, 55, 0.15);
            padding: 2rem;
            gap: 1.5rem;
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
            transition: var(--transition-smooth);
            z-index: 999;
          }

          .nav-menu-mobile.open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
          }

          .nav-btn-mobile {
            width: 100%;
            margin-top: 1rem;
          }
        }
      `}</style>
    </nav>
  );
}
