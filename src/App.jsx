import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import History from './components/History';
import Brands from './components/Brands';
import MenuCatalog from './components/MenuCatalog';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  const [selectedBrand, setSelectedBrand] = useState('all');

  return (
    <div className="app-wrapper">
      <Navbar />
      <main>
        <Hero />
        <History />
        <Brands setSelectedBrand={setSelectedBrand} />
        <MenuCatalog selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
        <ContactForm />
      </main>
      <Footer />

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
    </div>
  );
}

export default App;
