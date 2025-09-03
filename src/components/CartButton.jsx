// CartButton.js - Geliştirilmiş Versiyon
import React, { useState, useMemo, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import './CartButton.css';

const CartButton = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const itemCount = useMemo(() => 
    cartItems.reduce((total, item) => total + item.quantity, 0), 
    [cartItems]
  );

  const totalPrice = useMemo(() => 
    cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), 
    [cartItems]
  );

  // LocalStorage'dan kayıtlı bilgileri yükle
  useEffect(() => {
    const savedInfo = localStorage.getItem('deliveryInfo');
    if (savedInfo) {
      setDeliveryInfo(JSON.parse(savedInfo));
    }
  }, []);

  // Bilgileri LocalStorage'a kaydet
  useEffect(() => {
    if (Object.values(deliveryInfo).some(value => value !== '')) {
      localStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
    }
  }, [deliveryInfo]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  // Form doğrulama
  const validateForm = () => {
    const errors = {};
    
    if (!deliveryInfo.fullName.trim()) {
      errors.fullName = 'Ad soyad gereklidir';
    } else if (deliveryInfo.fullName.trim().length < 3) {
      errors.fullName = 'Geçerli bir ad soyad giriniz';
    }
    
    if (!deliveryInfo.address.trim()) {
      errors.address = 'Adres gereklidir';
    } else if (deliveryInfo.address.trim().length < 10) {
      errors.address = 'Daha detaylı bir adres giriniz';
    }
    
    if (!deliveryInfo.city.trim()) {
      errors.city = 'Şehir gereklidir';
    }
    
    if (!deliveryInfo.phone.trim()) {
      errors.phone = 'Telefon numarası gereklidir';
    } else if (!/^[5][0-9]{9}$/.test(deliveryInfo.phone.replace(/\D/g, ''))) {
      errors.phone = 'Geçerli bir telefon numarası giriniz (5XX XXX XX XX)';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Telefon numarasını formatlama
  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    if (numbers.length <= 8) return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 8)} ${numbers.slice(8, 10)}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    if (name === 'phone') {
      formattedValue = formatPhoneNumber(value);
    }
    
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    // Hata mesajını temizle
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // WhatsApp mesajı oluşturma
  const createWhatsAppMessage = () => {
    const itemsText = cartItems.map(item => 
      `▫️ ${item.title} (${item.quantity} adet) - ${formatPrice(item.price * item.quantity)}`
    ).join('\n');
    
    const orderNumber = `SIP-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    
    return `Merhaba, aşağıdaki ürünleri sipariş vermek istiyorum:\n\n${itemsText}\n\nToplam Tutar: ${formatPrice(totalPrice)}\n\nSipariş Numarası: ${orderNumber}\n\nTESLİMAT BİLGİLERİ:\nAd Soyad: ${deliveryInfo.fullName}\nAdres: ${deliveryInfo.address}\nŞehir: ${deliveryInfo.city}\nTelefon: ${deliveryInfo.phone}\nNot: ${deliveryInfo.notes || 'Yok'}\n\nÖdeme yöntemi: Kapıda ödeme\nTeslimat notu: Lütfen paketi dikkatli taşıyınız.`;
  };

  // WhatsApp'a yönlendirme
  const handleWhatsAppOrder = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const message = createWhatsAppMessage();
      const phoneNumber = '905380664628';
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      
      // Yeni pencere aç
      const newWindow = window.open(whatsappUrl, '_blank');
      
      // 3 saniye bekle ve sonra temizle
      setTimeout(() => {
        if (newWindow && !newWindow.closed) {
          clearCart();
          setShowDeliveryForm(false);
          setIsOpen(false);
          setIsSubmitting(false);
        }
      }, 3000);
      
    } catch (error) {
      console.error('WhatsApp gönderim hatası:', error);
      setIsSubmitting(false);
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const isFormValid = () => {
    return deliveryInfo.fullName.trim() !== '' && 
           deliveryInfo.address.trim() !== '' && 
           deliveryInfo.city.trim() !== '' && 
           deliveryInfo.phone.replace(/\D/g, '').length === 10;
  };

  if (itemCount === 0 && !isOpen) return null;

  return (
    <div className="cart-system">
      <button
        className="cart-fab"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Sepetim (${itemCount} ürün)`}
      >
        <span className="cart-icon">🛒</span>
        {itemCount > 0 && <span className="item-count">{itemCount}</span>}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              className="cart-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut' }}
            >
              <div className="drawer-header">
                <h3>
                  {showDeliveryForm ? 'Teslimat Bilgileri' : `Sepet (${itemCount})`}
                </h3>
                <button 
                  onClick={() => {
                    if (showDeliveryForm) {
                      setShowDeliveryForm(false);
                    } else {
                      setIsOpen(false);
                    }
                  }} 
                  className="close-btn"
                  aria-label="Kapat"
                >
                  ✕
                </button>
              </div>

              <div className="cart-items-container">
                {!showDeliveryForm ? (
                  <>
                    {cartItems.length === 0 ? (
                      <div className="empty-cart">
                        <div className="empty-icon">🛒</div>
                        <p>Sepetiniz boş</p>
                        <span>Harika ürünlerimizi keşfedin!</span>
                      </div>
                    ) : (
                      <div className="cart-items">
                        {cartItems.map((item) => (
                          <div key={item.id} className="cart-item">
                            <div 
                              className="item-image" 
                              style={{ backgroundImage: `url(${item.image})` }}
                              aria-label={item.title}
                            />
                            <div className="item-details">
                              <h4>{item.title}</h4>
                              <div className="item-controls">
                                <div className="quantity-selector">
                                  <button 
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    aria-label="Miktarı azalt"
                                  >
                                    −
                                  </button>
                                  <span>{item.quantity}</span>
                                  <button 
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    aria-label="Miktarı artır"
                                  >
                                    +
                                  </button>
                                </div>
                                <span className="item-price">
                                  {formatPrice(item.price * item.quantity)}
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)} 
                              className="remove-item"
                              aria-label="Ürünü kaldır"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="delivery-form">
                    <div className="form-notice">
                      📦 Teslimat bilgileriniz güvende saklanır ve bir sonraki alışverişinizde otomatik doldurulur.
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="fullName">Ad Soyad *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={deliveryInfo.fullName}
                        onChange={handleInputChange}
                        placeholder="Adınız ve soyadınız"
                        className={formErrors.fullName ? 'error' : ''}
                        required
                      />
                      {formErrors.fullName && <span className="error-text">{formErrors.fullName}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="address">Adres *</label>
                      <textarea
                        id="address"
                        name="address"
                        value={deliveryInfo.address}
                        onChange={handleInputChange}
                        placeholder="Cadde, sokak, apartman, daire no, kat ve varsa kapı kodu"
                        rows="3"
                        className={formErrors.address ? 'error' : ''}
                        required
                      />
                      {formErrors.address && <span className="error-text">{formErrors.address}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="city">Şehir *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={deliveryInfo.city}
                        onChange={handleInputChange}
                        placeholder="İl/İlçe"
                        className={formErrors.city ? 'error' : ''}
                        required
                      />
                      {formErrors.city && <span className="error-text">{formErrors.city}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Telefon *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={deliveryInfo.phone}
                        onChange={handleInputChange}
                        placeholder="5XX XXX XX XX"
                        className={formErrors.phone ? 'error' : ''}
                        required
                        maxLength="14"
                      />
                      {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="notes">Sipariş Notları (Opsiyonel)</label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={deliveryInfo.notes}
                        onChange={handleInputChange}
                        placeholder="Kapıda ödeme, teslimat saati, özel notlar..."
                        rows="2"
                      />
                    </div>

                    <div className="order-summary">
                      <h4>Sipariş Özeti</h4>
                      <div className="summary-item">
                        <span>Ürün Sayısı:</span>
                        <span>{itemCount} adet</span>
                      </div>
                      <div className="summary-item">
                        <span>Toplam Tutar:</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="summary-item">
                        <span>Teslimat:</span>
                        <span>Ücretsiz</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="cart-footer">
                  {!showDeliveryForm ? (
                    <>
                      <div className="cart-summary">
                        <div className="summary-row">
                          <span>Toplam</span>
                          <span>{formatPrice(totalPrice)}</span>
                        </div>
                      </div>
                      <button 
                        className="checkout-btn" 
                        onClick={() => setShowDeliveryForm(true)}
                      >
                        <span className="arrow-icon">→</span>
                        Teslimat Bilgilerini Doldur
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="form-notice-bottom">
                        💬 WhatsApp'a yönlendirileceksiniz. Siparişinizi tamamlamak için mesajı gönder butonuna basın.
                      </div>
                      <button 
                        className={`checkout-btn ${isSubmitting ? 'submitting' : ''}`} 
                        onClick={handleWhatsAppOrder}
                        disabled={isSubmitting || !isFormValid()}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="loading-spinner"></span>
                            Yönlendiriliyor...
                          </>
                        ) : (
                          <>
                            <span className="whatsapp-icon">💬</span>
                            WhatsApp ile Sipariş Ver
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              )}
            </motion.div>
            
            <div 
              className="overlay" 
              onClick={() => {
                setIsOpen(false);
                setShowDeliveryForm(false);
              }}
              aria-hidden="true"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartButton;