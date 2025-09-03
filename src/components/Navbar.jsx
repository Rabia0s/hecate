import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const { t, i18n } = useTranslation();

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

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setMenuOpen(false);
  };
  
  const toggleSubmenu = (itemKey) => {
    if (activeSubmenu === itemKey) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(itemKey);
    }
  };

  // Çeviriler için menü öğeleri
  const menuItems = [
    { key: 'home', path: '#home' },
    { 
      key: 'products', 
      path: '#products',
      submenu: [
        { key: 'product1', path: '#product1' },
        { key: 'product2', path: '#product2' },
        { key: 'product3', path: '#product3' }
      ]
    },
    { key: 'event', path: '#event' },
    { key: 'about', path: '#about' },
    { key: 'contact', path: '#contact' }
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
              <li key={item.key}>
                <div className="mobile-menu-item-container">
                  <a href={item.path} onClick={() => setMenuOpen(false)}>
                    {t(`navbar.${item.key}`)}
                  </a>
                  {item.submenu && (
                    <button 
                      className={`mobile-submenu-toggle ${activeSubmenu === item.key ? 'active' : ''}`}
                      onClick={() => toggleSubmenu(item.key)}
                    >
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  )}
                </div>
                {item.submenu && activeSubmenu === item.key && (
                  <ul className="mobile-submenu">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.key}>
                        <a href={subItem.path} onClick={() => setMenuOpen(false)}>
                          {t(`navbar.${subItem.key}`)}
                        </a>
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
              <span className="tagline">{t('Born in a Bottle')}</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <ul className="desktop-menu">
            {menuItems.map((item) => (
              <li 
                key={item.key} 
                className={item.submenu ? 'has-submenu' : ''}
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.key)}
                onMouseLeave={() => item.submenu && setActiveSubmenu(null)}
              >
                <a href={item.path}>{t(`navbar.${item.key}`)}</a>
                {item.submenu && (
                  <ul className={`desktop-submenu ${activeSubmenu === item.key ? 'active' : ''}`}>
                    {item.submenu.map((subItem) => (
                      <li key={subItem.key}>
                        <a href={subItem.path}>{t(`navbar.${subItem.key}`)}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="desktop-right-section">
            <div className="language-buttons">
              <button onClick={() => i18n.changeLanguage('tr')} className={i18n.language === 'tr' ? 'active' : ''}>
                TR
              </button>
              <span className="divider">|</span>
              <button onClick={() => i18n.changeLanguage('en')} className={i18n.language === 'en' ? 'active' : ''}>
                EN
              </button>
            </div>
            
            <div className="spacer"></div>
            
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

export default Navbar;