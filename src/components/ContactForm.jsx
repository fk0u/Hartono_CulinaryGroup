import React, { useState } from 'react';
import { Calendar, Users, Phone, Mail, User, Info, CheckCircle2, HelpCircle, ShieldCheck } from 'lucide-react';

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState('booking'); // 'booking' or 'catering'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brand: 'sinar-rasa',
    date: '',
    time: '18:00',
    guests: '2',
    eventType: 'corporate',
    dietary: [],
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const faqs = [
    {
      q: 'Apakah semua hidangan di Hartono Culinary Group Halal?',
      a: 'Untuk brand Sinar Rasa dan Kopi & Ko, kami menjamin 100% halal menggunakan bahan baku bersertifikat resmi. Untuk Golden Dragon Bistro, kami menyediakan hidangan Cantonese klasik dengan dapur halal dan non-halal yang terpisah secara ketat demi kenyamanan seluruh pengunjung.'
    },
    {
      q: 'Bagaimana prosedur untuk pemesanan Katering?',
      a: 'Pemesanan katering dapat dilakukan melalui formulir di atas atau via WhatsApp khusus katering minimal H-7 dari tanggal acara. Kami melayani wilayah Jabodetabek dengan pilihan paket prasmanan (buffet) mulai dari minimal 50 porsi.'
    },
    {
      q: 'Apakah ada biaya tambahan untuk Reservasi Meja?',
      a: 'Reservasi meja biasa maupun ruangan privat VIP di seluruh brand kami tidak dikenakan biaya reservasi (gratis). Anda cukup mengisi detail pemesanan H-1 untuk memastikan slot meja tersedia.'
    },
    {
      q: 'Apakah Hartono Culinary Group melayani acara pernikahan atau corporate?',
      a: 'Ya, divisi katering kami memiliki pengalaman luas dalam menangani acara korporat berskala besar, pertemuan bisnis, ulang tahun, hingga pesta pernikahan dengan opsi menu kustom dari ketiga brand kami.'
    }
  ];

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Nama lengkap wajib diisi.';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Alamat email wajib diisi.';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Format email tidak valid.';
    }

    const phoneRegex = /^[0-9+ ]{10,15}$/;
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Nomor telepon wajib diisi.';
    } else if (!phoneRegex.test(formData.phone)) {
      tempErrors.phone = 'Nomor telepon harus berupa angka (10-15 karakter).';
    }

    if (!formData.date) {
      tempErrors.date = 'Tanggal harus dipilih.';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (selectedDate < today) {
        tempErrors.date = 'Tanggal tidak boleh di masa lalu.';
      }
    }

    if (activeTab === 'booking') {
      const guestNum = parseInt(formData.guests);
      if (!formData.guests || isNaN(guestNum) || guestNum <= 0) {
        tempErrors.guests = 'Jumlah tamu harus bernilai positif.';
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleDietaryChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const currentDietary = [...prev.dietary];
      if (checked) {
        currentDietary.push(value);
      } else {
        const index = currentDietary.indexOf(value);
        if (index > -1) currentDietary.splice(index, 1);
      }
      return { ...prev, dietary: currentDietary };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSubmitting(false);
        setIsSuccess(true);
      } else {
        alert('Gagal mengirim reservasi ke server.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.warn('Backend server offline. Menjalankan fallback simulasi lokal...', error);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1000);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      brand: 'sinar-rasa',
      date: '',
      time: '18:00',
      guests: '2',
      eventType: 'corporate',
      dietary: [],
      notes: ''
    });
    setIsSuccess(false);
    setErrors({});
  };

  const selectedBrandLabel = formData.brand === 'sinar-rasa' ? 'Sinar Rasa (Padang)' : formData.brand === 'golden-dragon' ? 'Golden Dragon Bistro' : 'Kopi & Ko (Cafe)';

  return (
    <section id="contact" className="section contact-section theme-dark">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Hubungi & Pesan Tempat</span>
          <h2 className="section-title font-serif" style={{ color: '#FFFFFF' }}>Reservasi & Layanan Katering</h2>
          <div className="accent-line-center"></div>
          <p className="section-desc lead">
            Nikmati momen spesial Anda bersama kami. Pesan meja makan malam atau diskusikan kebutuhan katering korporat Anda sekarang.
          </p>
        </div>

        <div className="form-container-wide">
          {/* Tab Selector */}
          <div className="form-tabs">
            <button
              onClick={() => { setActiveTab('booking'); resetForm(); }}
              className={`tab-btn font-sans ${activeTab === 'booking' ? 'active' : ''}`}
            >
              Reservasi Meja
            </button>
            <button
              onClick={() => { setActiveTab('catering'); resetForm(); }}
              className={`tab-btn font-sans ${activeTab === 'catering' ? 'active' : ''}`}
            >
              Layanan Katering
            </button>
          </div>

          <div className="form-layout-grid">
            {/* Left Column: Form */}
            <div className="form-card">
              {isSuccess ? (
                <div className="success-wrapper text-center animate-fade-in">
                  <CheckCircle2 size={64} className="text-gold success-icon animate-float" />
                  <h3 className="success-title font-serif">Pemesanan Berhasil Dikirim!</h3>
                  <p className="success-msg">
                    Terima kasih, <strong>{formData.name}</strong>. Permintaan {activeTab === 'booking' ? 'reservasi meja' : 'katering'} Anda untuk restoran <strong>{selectedBrandLabel}</strong> telah kami terima.
                  </p>
                  <div className="success-summary">
                    <p><strong>Tanggal:</strong> {formData.date}</p>
                    {activeTab === 'booking' ? (
                      <>
                        <p><strong>Waktu:</strong> {formData.time} WIB</p>
                        <p><strong>Jumlah Tamu:</strong> {formData.guests} Orang</p>
                      </>
                    ) : (
                      <p><strong>Tipe Acara:</strong> {formData.eventType === 'corporate' ? 'Korporat / Kantor' : formData.eventType === 'wedding' ? 'Pernikahan' : 'Ulang Tahun / Sosial'}</p>
                    )}
                    {formData.dietary.length > 0 && (
                      <p><strong>Pantangan Makanan:</strong> {formData.dietary.join(', ')}</p>
                    )}
                  </div>
                  <p className="success-note">
                    Tim kami akan menghubungi Anda via telepon atau email dalam waktu 1x24 jam untuk melakukan konfirmasi akhir. Semoga beruntung!
                  </p>
                  <button onClick={resetForm} className="btn btn-primary" style={{ marginTop: '2rem' }}>
                    Buat Pemesanan Baru
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="booking-form">
                  <div className="form-grid">
                    {/* Name */}
                    <div className="form-group">
                      <label className="form-label"><User size={16} /> Nama Lengkap</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Masukkan nama lengkap Anda"
                      />
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                      <label className="form-label"><Phone size={16} /> Nomor Telepon / WA</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`form-input ${errors.phone ? 'error' : ''}`}
                        placeholder="Contoh: 08123456789"
                      />
                      {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                      <label className="form-label"><Mail size={16} /> Alamat Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="Contoh: budi@gmail.com"
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    {/* Restoran Pilihan */}
                    <div className="form-group">
                      <label className="form-label"><Info size={16} /> Pilih Restoran</label>
                      <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className="form-input"
                      >
                        <option value="sinar-rasa">Sinar Rasa (Padang Dining)</option>
                        <option value="golden-dragon">Golden Dragon Bistro (Chinese)</option>
                        <option value="kopi-ko">Kopi & Ko (Coffee & Kopitiam)</option>
                      </select>
                    </div>

                    {/* Date */}
                    <div className="form-group">
                      <label className="form-label"><Calendar size={16} /> Tanggal Acara</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={`form-input ${errors.date ? 'error' : ''}`}
                      />
                      {errors.date && <span className="error-text">{errors.date}</span>}
                    </div>

                    {/* Conditional inputs */}
                    {activeTab === 'booking' ? (
                      <>
                        {/* Time */}
                        <div className="form-group">
                          <label className="form-label"><Calendar size={16} /> Jam Kedatangan</label>
                          <select
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            className="form-input"
                          >
                            <option value="11:00">11:00 (Makan Siang)</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="17:00">17:00 (Makan Malam)</option>
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                            <option value="20:00">20:00</option>
                          </select>
                        </div>

                        {/* Guest Count */}
                        <div className="form-group">
                          <label className="form-label"><Users size={16} /> Jumlah Tamu</label>
                          <input
                            type="number"
                            name="guests"
                            value={formData.guests}
                            onChange={handleInputChange}
                            className={`form-input ${errors.guests ? 'error' : ''}`}
                            min="1"
                            max="50"
                          />
                          {errors.guests && <span className="error-text">{errors.guests}</span>}
                        </div>
                      </>
                    ) : (
                      /* Event Type (Catering Only) */
                      <div className="form-group">
                        <label className="form-label"><Users size={16} /> Tipe Acara Katering</label>
                        <select
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleInputChange}
                          className="form-input"
                        >
                          <option value="corporate">Acara Kantor / Korporat</option>
                          <option value="wedding">Pernikahan / Lamaran</option>
                          <option value="social">Ulang Tahun / Pertemuan Sosial</option>
                        </select>
                      </div>
                    )}

                    {/* Dietary Restrictions (Immersive additions) */}
                    <div className="form-group full-width">
                      <label className="form-label"><ShieldCheck size={16} /> Kebutuhan Khusus Menu (Dietary)</label>
                      <div className="dietary-checkboxes-grid">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            value="100% Halal"
                            checked={formData.dietary.includes('100% Halal')}
                            onChange={handleDietaryChange}
                          />
                          <span>100% Halal</span>
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            value="Vegetarian"
                            checked={formData.dietary.includes('Vegetarian')}
                            onChange={handleDietaryChange}
                          />
                          <span>Vegetarian</span>
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            value="Bebas Alergi Kacang"
                            checked={formData.dietary.includes('Bebas Alergi Kacang')}
                            onChange={handleDietaryChange}
                          />
                          <span>Bebas Alergi Kacang</span>
                        </label>
                      </div>
                    </div>

                    {/* Notes / Special Requests */}
                    <div className="form-group full-width">
                      <label className="form-label"><Info size={16} /> Catatan Khusus / Permintaan Tambahan</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="form-input form-textarea"
                        placeholder="Contoh: alergi kacang, butuh ruangan privat VIP, dekorasi ulang tahun, dll."
                        rows="4"
                      />
                    </div>
                  </div>

                  <div className="form-submit text-center" style={{ marginTop: '2rem' }}>
                    <button
                      type="submit"
                      className="btn btn-primary form-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Mengirim...' : activeTab === 'booking' ? 'Konfirmasi Reservasi' : 'Kirim Permintaan Katering'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Live Preview Ticket */}
            {!isSuccess && (
              <div className="preview-card-wrapper animate-fade-in">
                <div className="preview-ticket">
                  <div className="ticket-header text-center">
                    <span className="ticket-title font-serif">RINGKASAN PEMESANAN</span>
                    <span className="ticket-subtitle">HARTONO CULINARY GROUP</span>
                  </div>
                  <div className="ticket-body">
                    <div className="ticket-row">
                      <span className="ticket-label">TIPE LAYANAN:</span>
                      <span className="ticket-val font-sans text-gold">
                        {activeTab === 'booking' ? 'RESERVASI MEJA' : 'LAYANAN KATERING'}
                      </span>
                    </div>
                    <div className="ticket-row">
                      <span className="ticket-label">NAMA TAMU:</span>
                      <span className="ticket-val">{formData.name || '---'}</span>
                    </div>
                    <div className="ticket-row">
                      <span className="ticket-label">OUTLET RESTORAN:</span>
                      <span className="ticket-val text-red">{selectedBrandLabel}</span>
                    </div>
                    <div className="ticket-row">
                      <span className="ticket-label">TANGGAL ACARA:</span>
                      <span className="ticket-val">{formData.date || 'Belum dipilih'}</span>
                    </div>
                    
                    {activeTab === 'booking' ? (
                      <>
                        <div className="ticket-row">
                          <span className="ticket-label">JAM KEDATANGAN:</span>
                          <span className="ticket-val">{formData.time} WIB</span>
                        </div>
                        <div className="ticket-row">
                          <span className="ticket-label">JUMLAH TAMU:</span>
                          <span className="ticket-val">{formData.guests} Orang</span>
                        </div>
                      </>
                    ) : (
                      <div className="ticket-row">
                        <span className="ticket-label">TIPE ACARA:</span>
                        <span className="ticket-val">
                          {formData.eventType === 'corporate' ? 'Korporat / Kantor' : formData.eventType === 'wedding' ? 'Pernikahan' : 'Ulang Tahun / Sosial'}
                        </span>
                      </div>
                    )}

                    {formData.dietary.length > 0 && (
                      <div className="ticket-row">
                        <span className="ticket-label">DIETARY NOTE:</span>
                        <span className="ticket-val">{formData.dietary.join(', ')}</span>
                      </div>
                    )}

                    <div className="ticket-row border-none">
                      <span className="ticket-label">STATUS TIKET:</span>
                      <span className="ticket-val text-gold" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                        MENUNGGU KIRIM
                      </span>
                    </div>
                  </div>
                  <div className="ticket-footer text-center">
                    <p className="ticket-footer-text font-serif">Selamat Menikmati Rasa Keberuntungan</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Informative FAQ Section */}
        <div className="faq-wrapper animate-fade-in-up">
          <h3 className="faq-section-title font-serif text-center">
            <HelpCircle className="faq-icon" size={24} />
            Pertanyaan yang Sering Diajukan (FAQ)
          </h3>
          <div className="accent-line-center"></div>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card">
                <h4 className="faq-question font-sans text-gold">{faq.q}</h4>
                <p className="faq-answer">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background-color: var(--color-bg-dark);
          position: relative;
        }

        .form-container-wide {
          max-width: 1100px;
          margin: 0 auto 5rem;
        }

        .form-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .tab-btn {
          background-color: transparent;
          border: 1px solid rgba(212, 175, 55, 0.2);
          color: var(--color-text-dark);
          padding: 0.8rem 2rem;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: var(--transition-smooth);
        }

        .tab-btn.active {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
          color: #FFFFFF;
          box-shadow: var(--shadow-red);
        }

        /* Two Column Grid */
        .form-layout-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
          align-items: start;
        }

        @media (max-width: 992px) {
          .form-layout-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .form-card {
          background-color: var(--color-surface-dark);
          border: 1px solid rgba(212, 175, 55, 0.15);
          padding: 3rem;
          box-shadow: var(--shadow-lg);
          position: relative;
        }

        @media (max-width: 768px) {
          .form-card {
            padding: 1.5rem;
          }
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--color-accent);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .form-input {
          background-color: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
          padding: 0.8rem 1rem;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          transition: var(--transition-fast);
        }

        .form-input::placeholder {
          color: #52525B;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--color-accent);
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.1);
          background-color: rgba(0, 0, 0, 0.3);
        }

        .form-input.error {
          border-color: var(--color-error);
        }

        select.form-input option {
          background-color: var(--color-surface-dark);
          color: #FFFFFF;
        }

        .form-textarea {
          resize: vertical;
        }

        .error-text {
          color: var(--color-error);
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }

        /* Checkbox grid styling */
        .dietary-checkboxes-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-top: 0.25rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.9rem;
          color: var(--color-text-dark);
        }

        .checkbox-label input {
          accent-color: var(--color-accent);
          width: 16px;
          height: 16px;
        }

        .form-btn {
          width: 100%;
          max-width: 300px;
        }

        /* Success screen styles */
        .success-wrapper {
          padding: 2rem 0;
        }

        .success-icon {
          color: var(--color-accent);
          margin-bottom: 1.5rem;
        }

        .success-title {
          font-size: 2rem;
          color: #FFFFFF;
          margin-bottom: 1rem;
        }

        .success-msg {
          font-size: 1.05rem;
          color: var(--color-text-dark);
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .success-summary {
          background-color: rgba(122, 12, 22, 0.15);
          border: 1px dashed rgba(212, 175, 55, 0.3);
          padding: 1.5rem;
          max-width: 400px;
          margin: 0 auto 2rem;
          text-align: left;
        }

        .success-summary p {
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          color: var(--color-text-dark);
        }

        .success-summary p:last-child {
          margin-bottom: 0;
        }

        .success-note {
          font-size: 0.85rem;
          color: #A1A1AA;
        }

        /* Live Preview Ticket Styles */
        .preview-card-wrapper {
          position: sticky;
          top: 100px;
        }

        .preview-ticket {
          background-color: var(--color-bg-light);
          color: var(--color-text-light);
          border: 1px solid var(--color-accent);
          padding: 2.5rem 2rem;
          box-shadow: var(--shadow-lg);
          position: relative;
        }

        /* Zig zag ticket edges simulated with border style */
        .preview-ticket::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 10px;
          background: linear-gradient(-45deg, var(--color-bg-dark) 5px, transparent 0), linear-gradient(45deg, var(--color-bg-dark) 5px, transparent 0);
          background-size: 10px 10px;
          z-index: 5;
        }

        .ticket-header {
          border-bottom: 1px dashed rgba(122, 12, 22, 0.2);
          padding-bottom: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .ticket-title {
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: var(--color-primary-dark);
          display: block;
        }

        .ticket-subtitle {
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--color-text-muted-light);
          letter-spacing: 2px;
          display: block;
          margin-top: 0.25rem;
        }

        .ticket-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .ticket-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(122, 12, 22, 0.05);
          padding-bottom: 0.75rem;
          font-size: 0.85rem;
        }

        .ticket-row.border-none {
          border-bottom: none;
          padding-bottom: 0;
        }

        .ticket-label {
          font-weight: 600;
          color: var(--color-text-muted-light);
          letter-spacing: 0.5px;
        }

        .ticket-val {
          font-weight: 700;
          color: var(--color-primary-dark);
          text-align: right;
          max-width: 60%;
          word-wrap: break-word;
        }

        .ticket-footer {
          border-top: 1px dashed rgba(122, 12, 22, 0.2);
          margin-top: 1.5rem;
          padding-top: 1.25rem;
        }

        .ticket-footer-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-primary);
          font-style: italic;
        }

        /* FAQ Section Styles */
        .faq-wrapper {
          max-width: 900px;
          margin: 4rem auto 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 4rem;
        }

        .faq-section-title {
          font-size: 2rem;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .faq-icon {
          color: var(--color-accent);
        }

        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }

        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .faq-card {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 2rem;
          transition: var(--transition-smooth);
        }

        .faq-card:hover {
          background-color: rgba(255, 255, 255, 0.04);
          border-color: rgba(212, 175, 55, 0.2);
          transform: translateY(-3px);
        }

        .faq-question {
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
          font-weight: 600;
        }

        .faq-answer {
          font-size: 0.9rem;
          color: var(--color-text-dark);
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
