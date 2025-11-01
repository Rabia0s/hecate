// components/Navbar.jsx - TAM BİRLEŞTİRİLMİŞ VERSİYON
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ scrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  // Navigation state'ini dinle - ana sayfada scroll yapmak için
  useEffect(() => {
    if (location.state?.scrollTo && location.pathname === '/') {
      const sectionId = location.state.scrollTo;
      
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
          const offset = 80;
          
          window.scrollTo({
            top: elementTop - offset,
            behavior: location.state.scrollBehavior || 'smooth'
          });
          
          // State'i temizle (geri butonu için)
          window.history.replaceState({ ...window.history.state, scrollTo: null }, '');
        }
      }, 150);
    }
  }, [location]);

  // Gelişmiş metin arama fonksiyonu
  const searchInPage = (searchTerm) => {
    const allElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, section, article');
    
    let foundElement = null;
    let highestScore = 0;

    allElements.forEach(element => {
      const text = element.textContent.toLowerCase().trim();
      if (text.includes(searchTerm)) {
        let score = 0;
        
        if (element.tagName.startsWith('H')) {
          score = 100 - parseInt(element.tagName.charAt(1)) * 10;
        } else if (element.classList.contains('section-title') || 
                   element.classList.contains('product-title')) {
          score = 95;
        } else if (text.length < 100) {
          score = 80;
        } else {
          score = 50;
        }

        if (text === searchTerm) score += 30;
        
        if (score > highestScore) {
          highestScore = score;
          foundElement = element;
        }
      }
    });

    return foundElement;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    const searchTerm = searchQuery.trim().toLowerCase();
    
    if (!searchTerm) {
      alert(t('search.emptyWarning'));
      return;
    }

    const foundElement = searchInPage(searchTerm);

    if (foundElement) {
      foundElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
      
      const originalBackground = foundElement.style.backgroundColor;
      foundElement.style.backgroundColor = 'rgba(161, 134, 94, 0.2)';
      foundElement.style.transition = 'background-color 0.3s ease';
      
      setTimeout(() => {
        foundElement.style.backgroundColor = originalBackground;
      }, 2000);
      
    } else {
      const sectionMap = {
        'parfüm': 'products',
        'perfume': 'products',
        'koku': 'products',
        'ürün': 'products',
        'product': 'products',
        'koleksiyon': 'products',
        'collection': 'products',
        'müşteri': 'testimonials',
        'yorum': 'testimonials',
        'testimonial': 'testimonials',
        'iletişim': 'contact',
        'contact': 'contact',
        'hakkında': 'about',
        'about': 'about',
        'atölye': 'workshops',
        'workshops': 'workshops',
        'etkinlik': 'events',
        'event': 'events',
        'ana sayfa': 'home',
        'home': 'home'
      };

      const matchedSection = sectionMap[searchTerm];
      if (matchedSection) {
        handleNavigation(matchedSection);
      } else {
        alert(`"${searchTerm}" ile eşleşen bir içerik bulunamadı.\n\nAşağıdaki terimleri deneyebilirsiniz:\n• parfüm, ürün, koleksiyon\n• müşteri, yorum\n• iletişim\n• hakkında\n• atölye, etkinlik`);
      }
    }

    setSearchQuery('');
    setMenuOpen(false);
  };
  
  // GÜNCELLENMİŞ handleNavigation fonksiyonu
  const handleNavigation = (sectionId) => {
    const currentPath = window.location.pathname;
    
    // Menüyü kapat
    setMenuOpen(false);

    // Eğer sectionId bir route ise navigate kullan
    if (sectionId === 'workshops') {
      navigate('/workshops');
      return;
    }
    
    // Eğer home ise
    if (sectionId === 'home') {
      // Zaten ana sayfadaysa en üste scroll yap
      if (currentPath === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Ana sayfada değilse ana sayfaya git
        navigate('/');
      }
      return;
    }
    
    // Ana sayfadaysa ve sectionId bir sayfa içi bölüm ise
    if (currentPath === '/') {
      // Küçük bir gecikme ile DOM'un güncellenmesini bekle
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
          const offset = 80; // Navbar yüksekliği kadar offset
          
          window.scrollTo({
            top: elementTop - offset,
            behavior: 'smooth'
          });
        } else {
          // Element bulunamazsa en üste scroll yap
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Ana sayfada değilse önce ana sayfaya git, state ile scroll hedefini belirt
      navigate('/', { 
        state: { 
          scrollTo: sectionId,
          scrollBehavior: 'smooth'
        } 
      });
    }
  };

  const toggleSubmenu = (itemKey) => {
    if (activeSubmenu === itemKey) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(itemKey);
    }
  };

  // Menü öğeleri - Çeviri key'leri ile
  const menuItems = [
    { key: 'home', id: 'home', translationKey: 'navbar.home' },
    { 
      key: 'products', 
      id: 'products',
      translationKey: 'navbar.products',
      submenu: [
        { key: 'extrait', id: 'Extrait de Parfum', label: 'Extrait de Parfum' },
        { key: 'elixir', id: 'Parfum Elixir Oil', label: 'Parfum Elixir Oil' },
        { key: 'diffuser', id: 'Reed Diffuser', label: 'Reed Diffuser' }
      ]
    },
    { key: 'workshops', id: 'workshops', translationKey: 'Workshops' },
    { key: 'about', id: 'about', translationKey: 'navbar.about' },
    { key: 'contact', id: 'contact', translationKey: 'navbar.contact' }
  ];

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div className={`fullscreen-overlay ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
        <div className="menu-content" onClick={(e) => e.stopPropagation()}>
          {/* Language Selector in Mobile Menu */}
          <div className="mobile-language-buttons">
            <button
              onClick={() => i18n.changeLanguage('tr')}
              className={i18n.language === 'tr' ? 'active' : ''}
            >
              TR
            </button>
            <span className="divider">|</span>
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={i18n.language === 'en' ? 'active' : ''}
            >
              EN
            </button>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mobile-search-form">
            <div className="mobile-search-container">
              <input
                type="text"
                placeholder={t('search.placeholder')}
                className="mobile-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="mobile-search-button">
                <SearchIcon />
              </button>
            </div>
          </form>

          <ul className="fullscreen-menu">
            {menuItems.map((item) => (
              <li key={item.key} className="menu-item">
                <div className="mobile-menu-item-container">
                  <button 
                    className="mobile-menu-link"
                    onClick={() => handleNavigation(item.id)}
                  >
                    {t(item.translationKey)}
                  </button>
                  {item.submenu && (
                    <button 
                      className={`mobile-submenu-toggle ${activeSubmenu === item.key ? 'active' : ''}`}
                      onClick={() => toggleSubmenu(item.key)}
                      aria-label={t('navbar.menuToggle')}
                    >
                      <ChevronIcon />
                    </button>
                  )}
                </div>
                {item.submenu && activeSubmenu === item.key && (
                  <ul className="mobile-submenu">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.key} className="submenu-item">
                        <button 
                          className="mobile-submenu-link"
                          onClick={() => handleNavigation(subItem.id)}
                        >
                          {subItem.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <nav className="navbar">
        <div className="navbar-main">
          <div className="logo-wrapper">
            <img 
              src={`${process.env.PUBLIC_URL}/images/logo.png`} 
              alt={t('navbar.logoAlt')} 
              className="navbar-logo" 
            />
            <div className="brand-row">
              <span className="navbar-brand-text">HECATE</span>
              <span className="tagline">Born in a Bottle</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <ul className="desktop-menu">
            {menuItems.map((item) => (
              <li 
                key={item.key} 
                className={`desktop-menu-item ${item.submenu ? 'has-submenu' : ''}`}
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.key)}
                onMouseLeave={() => item.submenu && setActiveSubmenu(null)}
              >
                <button 
                  className="desktop-menu-link"
                  onClick={() => handleNavigation(item.id)}
                >
                  {t(item.translationKey)}
                  {item.submenu && <ChevronIcon className="desktop-chevron" />}
                </button>
                {item.submenu && (
                  <div className={`desktop-submenu-container ${activeSubmenu === item.key ? 'active' : ''}`}>
                    <ul className="desktop-submenu">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.key} className="desktop-submenu-item">
                          <button 
                            className="desktop-submenu-link"
                            onClick={() => handleNavigation(subItem.id)}
                          >
                            {subItem.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="desktop-right-section">
            <div className="language-buttons">
              <button 
                onClick={() => i18n.changeLanguage('tr')} 
                className={i18n.language === 'tr' ? 'active' : ''}
                aria-label="Türkçe"
              >
                TR
              </button>
              <span className="divider">|</span>
              <button 
                onClick={() => i18n.changeLanguage('en')} 
                className={i18n.language === 'en' ? 'active' : ''}
                aria-label="English"
              >
                EN
              </button>
            </div>
            
            <form onSubmit={handleSearch} className="desktop-search-form">
              <div className="desktop-search-container">
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  className="desktop-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="desktop-search-button">
                  <SearchIcon />
                </button>
              </div>
            </form>
          </div>

          {/* Hamburger Menu Button */}
          <div 
            className={`burger ${menuOpen ? 'active' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t('navbar.menuToggle')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setMenuOpen(!menuOpen)}
          >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      </nav>
    </>
  );
};

const SearchIcon = () => (
  <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18">
    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const ChevronIcon = ({ className = '' }) => (
  <svg className={`chevron-icon ${className}`} width="12" height="8" viewBox="0 0 12 8" fill="none">
    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default Navbar;