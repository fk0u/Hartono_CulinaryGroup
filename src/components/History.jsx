import React from 'react';
import { Calendar, Award, Star, Heart } from 'lucide-react';

export default function History() {
  const milestones = [
    {
      year: '1988',
      title: 'Awal Mula & Resep Keluarga',
      icon: <Heart size={20} />,
      desc: 'Bapak Budi Hartono merintis usaha kuliner pertama di Padang dengan resep rendang legendaris dari sang nenek, mengutamakan keaslian rasa dan kualitas bahan rempah.'
    },
    {
      year: '2002',
      title: 'Lahirnya Golden Dragon Bistro',
      icon: <Star size={20} />,
      desc: 'Melihat besarnya antusiasme pencinta kuliner Oriental, grup melakukan ekspansi dengan mendirikan restoran Chinese fine-dining modern pertama kami yang berfokus pada Dim Sum dan hidangan Sichuan autentik.'
    },
    {
      year: '2018',
      title: 'Kopi & Ko & Inovasi Modern',
      icon: <Award size={20} />,
      desc: 'Memasuki era modern, generasi kedua keluarga Hartono meluncurkan Kopi & Ko, memadukan konsep warung kopi lokal (kopitiam) dengan kopi artisan masa kini untuk generasi muda.'
    }
  ];

  return (
    <section id="about" className="section history-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Warisan Kuliner Kami</span>
          <h2 className="section-title font-serif">Kisah Perjalanan Hartono Culinary Group</h2>
          <div className="accent-line-center"></div>
          <p className="section-desc lead">
            Lebih dari tiga dekade menyajikan rasa autentik Nusantara dan Asia Timur. Kami percaya makanan lezat adalah pembawa kebahagiaan dan keberuntungan bagi setiap keluarga.
          </p>
        </div>

        <div className="history-timeline">
          <div className="timeline-line"></div>
          
          {milestones.map((item, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-badge flex-center">
                {item.icon}
              </div>
              <div className="timeline-card card-scale">
                <span className="timeline-year font-serif">{item.year}</span>
                <h3 className="timeline-card-title">{item.title}</h3>
                <p className="timeline-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials (Social Proof) */}
        <div className="testimonials-section-wrapper" style={{ marginTop: '7rem', borderTop: '1px solid rgba(122, 12, 22, 0.08)', paddingTop: '5rem' }}>
          <div className="section-header text-center" style={{ marginBottom: '3rem' }}>
            <span className="section-subtitle">Testimoni Pelanggan</span>
            <h3 className="font-serif" style={{ fontSize: '2rem', color: 'var(--color-primary-dark)', fontWeight: 700 }}>Apa Kata Kolega & Pengunjung</h3>
            <div className="accent-line-center"></div>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "Rendang Wagyu dari Sinar Rasa benar-benar luar biasa. Dagingnya sangat empuk, bumbu rendangnya pekat dan gurih autentik. Ini level baru kuliner Minang!"
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">HW</div>
                <div className="testimonial-info">
                  <span className="testimonial-name">Hendra Wijaya</span>
                  <span className="testimonial-role">Kolega Bisnis & Pengusaha</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "Dim sum di Golden Dragon Bistro selalu segar dan disajikan panas. Har Gow-nya memiliki kulit transparan yang tipis dan udang yang sangat garing. Luar biasa!"
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">MT</div>
                <div className="testimonial-info">
                  <span className="testimonial-name">Meiliana Tan</span>
                  <span className="testimonial-role">Diner Reguler</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "Kopi & Ko adalah tempat favorit saya untuk rapat santai. Es Kopi Susu Hartono dipadu dengan Roti Bakar Kaya Butter mereka benar-benar kombinasi sarapan terbaik."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">AP</div>
                <div className="testimonial-info">
                  <span className="testimonial-name">Aditya Pratama</span>
                  <span className="testimonial-role">Creative Director</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .history-section {
          background-color: var(--color-bg-light);
        }

        .section-header {
          max-width: 700px;
          margin: 0 auto 5rem;
          text-align: center;
        }

        .section-subtitle {
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.85rem;
          font-weight: 600;
          display: block;
          margin-bottom: 0.5rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-primary-dark);
        }

        .section-desc {
          font-size: 1.05rem;
          color: var(--color-text-muted-light);
        }

        /* Timeline Layout */
        .history-timeline {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background-color: rgba(122, 12, 22, 0.15);
          transform: translateX(-50%);
        }

        .timeline-item {
          display: flex;
          justify-content: flex-end;
          padding-left: 30px;
          margin-bottom: 4rem;
          position: relative;
          width: 50%;
        }

        .timeline-item.left {
          align-self: flex-start;
          justify-content: flex-start;
          padding-left: 0;
          padding-right: 30px;
          margin-left: 0;
        }

        .timeline-item.right {
          margin-left: 50%;
        }

        .timeline-badge {
          position: absolute;
          left: 100%;
          top: 20px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--color-primary);
          color: #FFFFFF;
          border: 4px solid var(--color-bg-light);
          box-shadow: var(--shadow-sm);
          z-index: 5;
          transform: translateX(-50%);
          transition: var(--transition-smooth);
        }

        .timeline-item.right .timeline-badge {
          left: 0;
        }

        .timeline-item:hover .timeline-badge {
          background-color: var(--color-accent);
          color: var(--color-primary-dark);
          transform: translateX(-50%) scale(1.1);
          box-shadow: var(--shadow-gold);
        }

        .timeline-card {
          background-color: var(--color-surface-light);
          border: 1px solid rgba(122, 12, 22, 0.08);
          padding: 2.5rem;
          box-shadow: var(--shadow-md);
          position: relative;
          border-top: 4px solid var(--color-primary);
        }

        .timeline-card:hover {
          border-top-color: var(--color-accent);
          box-shadow: 0 15px 35px -5px rgba(122, 12, 22, 0.15);
        }

        .timeline-year {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-primary);
          display: block;
          margin-bottom: 0.5rem;
        }

        .timeline-card-title {
          font-size: 1.3rem;
          margin-bottom: 0.75rem;
          color: var(--color-primary-dark);
        }

        .timeline-card-desc {
          color: var(--color-text-light);
          font-size: 0.95rem;
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .timeline-line {
            left: 20px;
          }

          .timeline-item {
            width: 100%;
            margin-left: 0 !important;
            padding-left: 45px !important;
            padding-right: 0 !important;
            justify-content: flex-start !important;
          }

          .timeline-badge {
            left: 20px !important;
          }

          .timeline-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
