// Products.js - Ürün Yayınlama Bildirimi Eklendi
import React, { useState, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from './ProductCard';
import './Products.css';

const Products = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showComingSoon, setShowComingSoon] = useState(true);
  const scrollContainerRef = useRef(null);

  
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return products;
    if (activeFilter === 'men') return products.filter(p => p.gender === 'Man' || p.gender === 'Unisex');
    if (activeFilter === 'women') return products.filter(p => p.gender === 'Woman' || p.gender === 'Unisex');
    if (activeFilter === 'new') return products.filter(p => p.isNew);
    return products;
  }, [activeFilter]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({ 
        left: direction * scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section className="products-section">
      <div className="container">
        <div className="section-header">
          <div className="header-content">
            <h1 className="section-title">{t('products.title', 'Parfümler')}</h1>
          </div>
          
          <div className="controls">
            <div className="filters">
              <button 
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                Tümü
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'men' ? 'active' : ''}`}
                onClick={() => setActiveFilter('men')}
              >
                Erkek
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'women' ? 'active' : ''}`}
                onClick={() => setActiveFilter('women')}
              >
                Kadın
              </button>
            </div>
          </div>
        </div>

        {/* Ürün Yayınlama Bildirimi */}
        {showComingSoon && (
          <div className="coming-soon-notice">
            <div className="notice-content">
              <span className="notice-icon">🎯</span>
              <div className="notice-text">
                <p>Daha fazla özel parfüm yakında yayınlanacak.</p>
                <small>Koleksiyonumuz zamanla genişliyor, takipte kalın.</small>
              </div>
              <button 
                className="notice-close"
                onClick={() => setShowComingSoon(false)}
                aria-label="Bildirimi kapat"
              >
                ✕
              </button>
            </div>
          </div>
        )}
        
        <div className="products-scroll-wrapper">
          <button 
            className="nav-btn left" 
            onClick={() => scroll(-1)}
            aria-label="Önceki ürünler"
          >
            ←
          </button>
          
          <div className="products-scroll-container" ref={scrollContainerRef}>
            <div className="products-scroll">
              {filteredProducts.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  index={index}
                />
              ))}
              
              {/* Yakında Gelecek Ürün Yer Tutucular */}
              {filteredProducts.length < 4 && (
                <>
                  <div className="coming-soon-card">
                    <div className="coming-soon-placeholder">
                      <div className="placeholder-icon">⏳</div>
                      <h3>Yakında</h3>
                      <p>Yeni parfümler geliyor</p>
                    </div>
                  </div>
                  
                  <div className="coming-soon-card">
                    <div className="coming-soon-placeholder">
                      <div className="placeholder-icon">✨</div>
                      <h3>Yakında</h3>
                      <p>Özel koleksiyon</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <button 
            className="nav-btn right" 
            onClick={() => scroll(1)}
            aria-label="Sonraki ürünler"
          >
            →
          </button>
        </div>

        {/* Alt Bilgilendirme */}
        <div className="products-footer">
          <p className="footer-notice">
            💫 <strong>Koleksiyonumuz büyüyor!</strong> Yeni özel parfümler yakında eklenecek.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Products;