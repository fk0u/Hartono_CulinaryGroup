import React, { useState } from 'react';
import { Shield, Lock, ArrowLeft, Users } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export default function AdminLogin({ onLoginSuccess, onCancel }) {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleKeyPress = (num) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
    }
  };

  const handleClear = () => {
    setPin('');
    setError('');
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (pin.length < 4) {
      setError('PIN harus berisi 4 digit.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        onLoginSuccess(data.employee);
      } else {
        setError(data.error || 'PIN Karyawan tidak terdaftar.');
        setPin('');
      }
    } catch (err) {
      console.warn('Backend server offline. Menjalankan autentikasi lokal...', err);
      // Offline fallback
      if (pin === '0000') {
        onLoginSuccess({ name: 'Admin Hartono (Offline)', role: 'Manager ERP (Admin)' });
      } else if (pin === '1234') {
        onLoginSuccess({ name: 'Budi Santoso (Offline)', role: 'Pramusaji (Waiter)' });
      } else if (pin === '5678') {
        onLoginSuccess({ name: 'Siti Aminah (Offline)', role: 'Kepala Koki (Chef)' });
      } else {
        setError('PIN salah (Koneksi offline, gunakan 0000, 1234, atau 5678).');
        setPin('');
      }
    } finally {
      setLoading(false);
    }
  };

  // Auto-submit when 4 digits are entered
  React.useEffect(() => {
    if (pin.length === 4) {
      handleSubmit();
    }
  }, [pin]);

  return (
    <div className="login-overlay flex-center">
      <div className="login-card animate-fade-in">
        <button onClick={onCancel} className="btn-back-login flex-center">
          <ArrowLeft size={16} /> Kembali
        </button>

        <div className="login-header text-center">
          <div className="shield-icon-container flex-center">
            <Shield size={32} className="text-gold" />
          </div>
          <h2 className="login-title font-serif">Otentikasi Staf</h2>
          <p className="login-desc">Masukkan 4 digit PIN Anda untuk mengakses Hartono ERP</p>
        </div>

        {error && <div className="login-error-msg text-center">{error}</div>}

        {/* PIN Display Dots */}
        <div className="pin-dots-container flex-center">
          {[0, 1, 2, 3].map((idx) => (
            <div 
              key={idx} 
              className={`pin-dot ${pin.length > idx ? 'active' : ''}`}
            ></div>
          ))}
        </div>

        {/* Numeric Keyboard */}
        <div className="pin-keyboard-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button 
              key={num} 
              onClick={() => handleKeyPress(num.toString())}
              className="keyboard-btn"
              disabled={loading}
            >
              {num}
            </button>
          ))}
          <button 
            onClick={handleClear} 
            className="keyboard-btn text-red"
            disabled={loading}
          >
            Clear
          </button>
          <button 
            onClick={() => handleKeyPress('0')} 
            className="keyboard-btn"
            disabled={loading}
          >
            0
          </button>
          <button 
            onClick={() => handleSubmit()} 
            className="keyboard-btn text-gold"
            style={{ fontSize: '0.9rem', fontWeight: 700 }}
            disabled={loading}
          >
            OK
          </button>
        </div>

        {/* Testing Hint Box */}
        <div className="testing-hint-box">
          <h4 className="flex-center" style={{ gap: '0.3rem', justifyContent: 'flex-start', fontSize: '0.8rem', color: 'var(--color-accent)', marginBottom: '0.25rem' }}>
            <Users size={12} /> Panduan PIN Uji Coba Staf:
          </h4>
          <p style={{ margin: 0 }}>
            • Admin Manager: <strong>0000</strong><br />
            • Waiter (Budi): <strong>1234</strong><br />
            • Koki (Siti): <strong>5678</strong><br />
            • Kasir (Dedi): <strong>9012</strong>
          </p>
        </div>
      </div>

      <style>{`
        .login-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #0c0c0e;
          z-index: 10000;
        }

        .login-card {
          background: rgba(18, 18, 21, 0.95);
          border: 1px solid rgba(212, 175, 55, 0.15);
          padding: 3rem;
          width: 380px;
          box-shadow: var(--shadow-lg);
          position: relative;
        }

        .btn-back-login {
          position: absolute;
          top: 15px;
          left: 15px;
          background: transparent;
          border: none;
          color: var(--color-text-muted-dark);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          gap: 0.25rem;
        }

        .btn-back-login:hover {
          color: #FFF;
        }

        .shield-icon-container {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: rgba(122, 12, 22, 0.15);
          border: 1px solid var(--color-accent);
          margin: 0 auto 1rem;
        }

        .login-title {
          font-size: 1.5rem;
          color: #FFFFFF;
        }

        .login-desc {
          font-size: 0.8rem;
          color: var(--color-text-muted-dark);
          margin-top: 0.25rem;
        }

        .login-error-msg {
          background-color: rgba(239, 68, 68, 0.1);
          border: 1px solid var(--color-error);
          color: #FCA5A5;
          font-size: 0.8rem;
          padding: 0.5rem;
          margin-top: 1rem;
        }

        /* PIN Dots */
        .pin-dots-container {
          gap: 1.25rem;
          margin: 2rem 0;
        }

        .pin-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.2);
          background-color: transparent;
          transition: var(--transition-fast);
        }

        .pin-dot.active {
          background-color: var(--color-accent);
          border-color: var(--color-accent);
          box-shadow: var(--shadow-gold);
        }

        /* Keyboard Grid */
        .pin-keyboard-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .keyboard-btn {
          height: 52px;
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255,255,255,0.05);
          color: #FFF;
          font-size: 1.2rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .keyboard-btn:hover {
          background-color: rgba(212, 175, 55, 0.1);
          border-color: var(--color-accent);
        }

        .keyboard-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Test Guide */
        .testing-hint-box {
          background-color: rgba(212, 175, 55, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.1);
          padding: 0.75rem 1rem;
          font-size: 0.75rem;
          color: var(--color-text-muted-dark);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
