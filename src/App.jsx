import { useState, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileMenu from './components/MobileMenu';
import Products from './components/Products';
import VideoBanner from './components/VideoBanner';
import AnnouncementBar from './components/AnnouncementBar';
import CartButton from './components/CartButton';
import CartDetails from './components/CartDetails';
import InstagramGallery from './components/InstagramGallery';
import BrandValues from './components/BrandValues';
import Testimonials from './components/Testimonials';
import LanguageSwitcher from './components/LanguageSwitcher';
import PopupModal from './components/PopupModal';
import Events from './components/Events';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  const addToCart = (item) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Scroll olayını doğru şekilde yönet
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Boş bağımlılık dizisi - sadece bir kere ekle

  // Görünümü değiştiren fonksiyon
  const changeView = (view) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const signatureCollections = [
    {
      id: 1,
      title: "Torchlight",
      gender: "Unisex",
      concentration: "Extrait de Parfum",
      price: 2150,
      originalPrice: 2500,
      image: process.env.PUBLIC_URL + "/images/IMG_0770.jpg",
      notes: ["Saffron", "Jasmine", "Vanilla"],
      limitedEdition: true,
      discount: 14,
      isNew: false,
      rating: 4.8
    },
    {
      id: 2,
      title: "Violet Sorcery",
      gender: "Woman",
      concentration: "Eau de Parfum",
      price: 980,
      image: process.env.PUBLIC_URL + "/images/IMG_0769.jpg",
      notes: ["Bergamot", "Vetiver", "Amber"],
      limitedEdition: false,
      isNew: true,
      rating: 4.5
    },
    {
      id: 3,
      title: "Crossroads",
      gender: "Man",
      concentration: "Eau de Parfum",
      price: 1250,
      image: process.env.PUBLIC_URL + "/images/IMG_0771.jpg",
      notes: ["Oud", "Sandalwood", "Bergamot"],
      limitedEdition: false,
      isNew: false,
      rating: 4.7
    }
  ];

  // Mevcut görünüme göre içerik render et
  const renderContent = () => {
    switch(currentView) {
      case 'events':
        return <Events />;
      case 'products':
        return <Products 
          products={signatureCollections} 
          onAddToCart={addToCart}
        />;
      default:
        return (
          <>
            <VideoBanner 
              videoSrc="/videos/luxury-hero.mp4"
              title="Parfüm Sanatı"
            />
            <BrandValues />
            <Products  // ✅ BU SATIRI EKLİYORUM
              products={signatureCollections} 
              onAddToCart={addToCart}
            />
            <Testimonials />
            <InstagramGallery username="hecateperfume" />
          </>
        );
    }
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className={`app ${scrolled ? 'scrolled' : ''}`}>
        <AnnouncementBar text="Ücretsiz global kargo" />
        
        <Navbar scrolled={scrolled} onChangeView={changeView}>
          <LanguageSwitcher />
          <MobileMenu onChangeView={changeView} />
        </Navbar>
        
        <main>
          {renderContent()}
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

        <Footer />
        
        <PopupModal />
      </div>
    </I18nextProvider>
  );
};

export default App;