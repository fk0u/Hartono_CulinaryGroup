import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="hero-section flex-center theme-dark">
      <div className="hero-overlay"></div>
      <div className="container hero-content animate-fade-in-up">
        <div className="hero-badge flex-center animate-float">
          <Sparkles size={14} className="text-gold" />
          <span>Hartono Culinary Group</span>
        </div>
        <h1 className="hero-title font-serif">
          Menyajikan Kelezatan,<br />
          Membawa <span className="text-gold">Keberuntungan</span>
        </h1>
        <p className="hero-subtitle lead">
          Mewarisi tradisi kuliner terbaik melalui 3 brand restoran legendaris kami yang menyajikan hidangan autentik dengan bahan-bahan pilihan premium.
        </p>
        <div className="accent-line-center"></div>
        <div className="hero-actions">
          <a href="#brands" className="btn btn-primary">
            Jelajahi Brand Kami <ArrowRight size={16} />
          </a>
          <a href="#contact" className="btn btn-outline" style={{ color: '#FFFFFF', borderColor: '#FFFFFF' }}>
            Hubungi Kami
          </a>
        </div>
      </div>

      {/* Mouse Scroll Indicator */}
      <a href="#about" className="scroll-indicator">
        <div className="scroll-indicator-mouse">
          <div className="scroll-indicator-wheel"></div>
        </div>
        <span className="scroll-indicator-text">Gulir ke Bawah</span>
      </a>

      <style>{`
        .hero-section {
          height: 100vh;
          min-height: 600px;
          position: relative;
          background-image: url('/images/hero_background.png');
          background-size: cover;
          background-position: center;
          text-align: center;
          padding-top: 80px; /* Offset for navbar */
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(18, 18, 18, 0.7) 0%,
            rgba(18, 18, 18, 0.85) 50%,
            rgba(18, 18, 18, 0.95) 100%
          );
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
        }

        .hero-badge {
          display: inline-flex;
          gap: 0.5rem;
          background: rgba(122, 12, 22, 0.2);
          border: 1px solid rgba(212, 175, 55, 0.3);
          padding: 0.5rem 1.25rem;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #FFFFFF;
          margin-bottom: 2rem;
        }

        .hero-title {
          font-size: 4rem;
          line-height: 1.15;
          margin-bottom: 1.5rem;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .hero-subtitle {
          max-width: 650px;
          margin: 0 auto 2rem;
          font-size: 1.15rem;
          line-height: 1.8;
          color: #D4D4D8;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: 2rem;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-subtitle {
            font-size: 1rem;
          }
          .hero-actions {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
            max-width: 300px;
            margin: 2rem auto 0;
          }
        }
      `}</style>
    </section>
  );
}
