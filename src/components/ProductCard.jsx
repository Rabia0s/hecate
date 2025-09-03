// ProductCard.js - Minimal ve Şık
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

function ProductCard({ product, index }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="image-container">
        <img 
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
        
        <div className="badges">
          {product.limitedEdition && (
            <span className="badge limited">Sınırlı</span>
          )}
          {product.isNew && (
            <span className="badge new">Yeni</span>
          )}
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-type">{product.concentration}</p>
        
        <div className="price-section">
          <span className="current-price">{formatPrice(product.price)}</span>
          <button
            className={`add-btn ${isAdding ? 'adding' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? '...' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;