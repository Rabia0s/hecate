import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function MobileMenu({ onChangeView }) {
  const [open, setOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const { t } = useTranslation();

  const toggleSubmenu = (itemKey) => {
    if (activeSubmenu === itemKey) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(itemKey);
    }
  };

  const handleMenuItemClick = (item) => {
    if (item.view) {
      onChangeView(item.view);
    }
    setOpen(false);
    setActiveSubmenu(null);
  };

  // Menü öğeleri
  const menuItems = [
    { key: 'home', view: 'home' },
    { 
      key: 'products', 
      view: 'products',
      submenu: [
        { key: 'product1', view: 'products' },
        { key: 'product2', view: 'products' },
        { key: 'product3', view: 'products' }
      ]
    },
    { key: 'events', view: 'events' }, // Events sayfasına link ekleyin
    { key: 'about', view: 'home' },
    { key: 'contact', view: 'home' }
  ];

  return (
    <>
      <button 
        className={`mobile-menu-button ${open ? 'active' : ''}`} 
        onClick={() => setOpen(!open)}
        aria-label="Mobile menu toggle"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className={`mobile-menu-overlay ${open ? 'active' : ''}`} onClick={() => setOpen(false)}>
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          <button className="mobile-menu-close" onClick={() => setOpen(false)}>
            &times;
          </button>
          
          <ul className="mobile-menu-list">
            {menuItems.map((item) => (
              <li key={item.key} className="mobile-menu-item">
                <div className="mobile-menu-item-row">
                  <button 
                    onClick={() => handleMenuItemClick(item)}
                    className="mobile-menu-link"
                  >
                    {t(`navbar.${item.key}`)}
                  </button>
                  
                  {item.submenu && (
                    <button 
                      className={`mobile-submenu-toggle ${activeSubmenu === item.key ? 'active' : ''}`}
                      onClick={() => toggleSubmenu(item.key)}
                      aria-expanded={activeSubmenu === item.key}
                    >
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  )}
                </div>
                
                {item.submenu && activeSubmenu === item.key && (
                  <ul className="mobile-submenu">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.key}>
                        <button 
                          onClick={() => handleMenuItemClick(subItem)}
                          className="mobile-submenu-link"
                        >
                          {t(`navbar.${subItem.key}`)}
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
    </>
  );
}