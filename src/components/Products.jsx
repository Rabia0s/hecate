// Products.js - Tamamen Çevrildi
import React, { useState, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from './ProductCard';
import './Products.css';

const Products = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showComingSoon, setShowComingSoon] = useState(true);
  const scrollContainerRef = useRef(null);

  const products = [
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

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return products;
    if (activeFilter === 'men') return products.filter(p => p.gender === 'Man' || p.gender === 'Unisex');
    if (activeFilter === 'women') return products.filter(p => p.gender === 'Woman' || p.gender === 'Unisex');
    if (activeFilter === 'new') return products.filter(p => p.isNew);
    return products;
  }, [activeFilter, products]);

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
    <section className="products-section" id="products">
      <div className="container">
        <div className="section-header">
          <div className="header-content">
            <h1 className="section-title">{t('products.title')}</h1>
          </div>
          
          <div className="controls">
            <div className="filters">
              <button 
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                {t('products.filter_all')}
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'men' ? 'active' : ''}`}
                onClick={() => setActiveFilter('men')}
              >
                {t('products.filter_men')}
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'women' ? 'active' : ''}`}
                onClick={() => setActiveFilter('women')}
              >
                {t('products.filter_women')}
              </button>
            </div>
          </div>
        </div>

        <div className="products-footer">
          <p className="footer-notice">
            {t('products.collection_growing')} <strong>{t('products.new_coming_soon')}</strong>
          </p>
        </div>

        <div className="products-scroll-wrapper">
          <button 
            className="nav-btn left" 
            onClick={() => scroll(-1)}
            aria-label={t('products.previous_products', 'Önceki ürünler')}
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
                      <h3>{t('products.coming_soon')}</h3>
                      <p>{t('products.new_perfumes_coming')}</p>
                    </div>
                  </div>
                  
                  <div className="coming-soon-card">
                    <div className="coming-soon-placeholder">
                      <div className="placeholder-icon">✨</div>
                      <h3>{t('products.coming_soon')}</h3>
                      <p>{t('products.special_collection')}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <button 
            className="nav-btn right" 
            onClick={() => scroll(1)}
            aria-label={t('products.next_products', 'Sonraki ürünler')}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;