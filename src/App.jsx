// App.jsx - DÜZELTİLMİŞ VERSİYON
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Products from './components/Products';
import VideoBanner from './components/VideoBanner';
import AnnouncementBar from './components/AnnouncementBar';
import CartButton from './components/CartButton';
import CartDetails from './components/CartDetails';
import InstagramGallery from './components/InstagramGallery';
import BrandValues from './components/BrandValues';
import Testimonials from './components/Testimonials';
import PopupModal from './components/PopupModal';
import Events from './components/Events';
import Workshops from './components/Workshops';
import './App.css';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Route değiştiğinde scroll işlemi
  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 300);
    }
  }, [location]);

  const addToCart = (item) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const signatureCollections = [
    {
      id: 1,
      title: 'No.1 Imperial Majesty',
      price: 2150,
      image: '/images/no1-imperial.jpg'
    },
    {
      id: 2,
      title: 'X for Men',
      price: 980,
      image: '/images/x-men.jpg'
    }
  ];

  // Ana layout bileşeni
  const MainLayout = ({ children, showNavbar = true, showFooter = true }) => (
    <>
      {showNavbar && <Navbar scrolled={scrolled} />}
      {children}
      {showFooter && <Footer />}
    </>
  );

  return (
    <I18nextProvider i18n={i18n}>
      <div className={`app ${scrolled ? 'scrolled' : ''}`}>
        <AnnouncementBar />
        
        <main>
          <Routes>
            {/* Ana Sayfa */}
            <Route 
              path="/" 
              element={
                <MainLayout>
                  <VideoBanner 
                    videoSrc="/videos/luxury-hero.mp4"
                    title="Parfüm Sanatı"
                  />
                  <Products 
                    products={signatureCollections} 
                    onAddToCart={addToCart}
                  />
                  <BrandValues />
                  <Testimonials />
                  <InstagramGallery username="hecateperfume" />
                </MainLayout>
              } 
            />
            
            {/* Workshops Sayfası */}
            <Route 
              path="/workshops" 
              element={
                <MainLayout>
                  <Workshops />
                </MainLayout>
              } 
            />
            
            {/* Products Sayfası */}
            <Route 
              path="/products" 
              element={
                <MainLayout>
                  <Products 
                    products={signatureCollections} 
                    onAddToCart={addToCart}
                  />
                </MainLayout>
              } 
            />
            
            {/* Events Sayfası */}
            <Route 
              path="/events" 
              element={
                <MainLayout>
                  <Events />
                </MainLayout>
              } 
            />
            
            {/* About Sayfası */}
            <Route 
              path="/about" 
              element={
                <MainLayout>
                  <div className="about-page">
                    <h1>Hakkımızda</h1>
                    <p>Hecate olarak parfüm sanatını en iyi şekilde temsil ediyoruz.</p>
                  </div>
                </MainLayout>
              } 
            />
            
            {/* Contact Sayfası */}
            <Route 
              path="/contact" 
              element={
                <MainLayout>
                  <div className="contact-page">
                    <h1>İletişim</h1>
                    <p>Bize ulaşın</p>
                  </div>
                </MainLayout>
              } 
            />
            
            {/* 404 Sayfası */}
            <Route 
              path="*" 
              element={
                <MainLayout>
                  <div className="not-found-page">
                    <h1>404 - Sayfa Bulunmadı</h1>
                    <p>Aradığınız sayfa mevcut değil.</p>
                  </div>
                </MainLayout>
              } 
            />
          </Routes>
        </main>

        <CartButton 
          itemCount={cartItems.length} 
          onClick={toggleCart}
        />
        
        {isCartOpen && (
          <CartDetails 
            items={cartItems}
            onRemove={removeFromCart}
            onClose={() => setIsCartOpen(false)}
          />
        )}
        
        <PopupModal />
      </div>
    </I18nextProvider>
  );
};

export default App;