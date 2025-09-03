import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);

  // Formspree endpoint URL'nizi buraya yazın
  const FORM_ENDPOINT_URL = 'https://formspree.io/f/mdkldzrb'; // kendi endpoint'inizi ekleyin 

  // İletişim modalını açma/kapatma
  const toggleContactModal = () => {
    setShowContactModal(!showContactModal);
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Email validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Lütfen geçerli bir email adresi giriniz');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(FORM_ENDPOINT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setSubscribed(true);
        setEmail('');

        // 4 saniye sonra başarı mesajını gizle
        setTimeout(() => {
          setSubscribed(false);
        }, 4000);
      } else {
        setError('Bir hata oluştu, lütfen tekrar deneyin');
      }
    } catch (err) {
      console.error('Hata:', err);
      setError('Bağlantı sağlanamadı');
    } finally {
      setIsLoading(false);
    }
  };

  // Küçük kare fotoğraflar
  const galleryImages = [
    {
      id: 1,
      src: `${process.env.PUBLIC_URL}/images/fotograf1.jpeg`,
      alt: "Parfüm 1"
    },
    {
      id: 2,
      src: `${process.env.PUBLIC_URL}/images/fotograf2.png`,
      alt: "Parfüm 2"
    },
    {
      id: 3,
      src: `${process.env.PUBLIC_URL}/images/fotograf3.jpeg`,
      alt: "Parfüm 3"
    },
    {
      id: 4,
      src: `${process.env.PUBLIC_URL}/images/fotograf4.png`,
      alt: "Parfüm 4"
    }
  ];

  return (
    <>
      {/* Birleşik Fotoğraf ve Abonelik Bölümü */}
      <motion.section 
        className="unified-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="unified-container">
          {/* Fotoğraf Galerisi */}
          <div className="unified-gallery">
            {galleryImages.map((image, index) => (
              <motion.div 
                key={image.id}
                className="unified-gallery-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="gallery-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `${process.env.PUBLIC_URL}/images/placeholder.jpg`;
                  }}
                />
                <motion.div 
                  className="gallery-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.i 
                    className="fas fa-search-plus"
                    whileHover={{ scale: 1.2 }}
                  ></motion.i>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          {/* Abonelik Bölümü */}
          <div className="unified-newsletter">
            <motion.div 
              className="unified-content"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2>Yeni Koleksiyondan Haberdar Olun</h2>
              <p>Özel indirimler ve yeni ürünler hakkında ilk siz bilgi sahibi olun</p>
              
              <form className="unified-form" onSubmit={handleSubmit}>
                <motion.div 
                  className="unified-input-container"
                  whileHover={{ scale: 1.02 }}
                >
                  <input 
                    type="email" 
                    className="unified-input" 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    required
                    placeholder=" "
                  />
                  <label className="unified-input-label">E-posta adresiniz</label>
                  <motion.button 
                    type="submit" 
                    className="unified-submit-btn"
                    disabled={isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLoading ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      <>
                        <span>Abone Ol</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23.0677 11.9929L18.818 7.75739L17.4061 9.17398L19.2415 11.0032L0.932469 11.0012L0.932251 13.0012L19.2369 13.0032L17.4155 14.8308L18.8321 16.2426L23.0677 11.9929Z" fill="currentColor"/>
                        </svg>
                      </>
                    )}
                  </motion.button>
                </motion.div>
                
                {error && (
                  <motion.div 
                    className="unified-error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.div>
                )}
              </form>
              
              {subscribed && (
                <motion.div 
                  className="unified-success-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.i 
                    className="fas fa-check-circle"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  ></motion.i>
                  Teşekkürler! Aboneliğiniz tamamlandı.
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="hecate-footer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={footerVariants}
      >
        <div className="footer-container">
          {/* Marka Bölümü */}
          <motion.div 
            className="footer-column footer-brand-column"
            custom={0}
            variants={itemVariants}
          >
            <motion.div 
              className="footer-brand"
              whileHover={{ y: -2 }}
            >
              <h3 className="brand-name">HECATE</h3>
              <p className="brand-subtitle">✨ Exclusive Fragrance Craftsmanship</p>
            </motion.div>
            <motion.p 
              className="brand-description"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Zarafetin ve kalitenin buluştuğu eşsiz parfüm deneyimi
            </motion.p>
          </motion.div>

          <motion.div 
            className="footer-column"
            custom={1}
            variants={itemVariants}
          >
            <h4>KEŞFET</h4>
            <ul>
              <motion.li whileHover={{ x: 5 }}><a href="/collections">Koleksiyonlar</a></motion.li>
              <motion.li whileHover={{ x: 5 }}><a href="/bespoke">Kişiye Özel</a></motion.li>
              <motion.li whileHover={{ x: 5 }}><a href="/gift">Hediye Setleri</a></motion.li>
            </ul>
          </motion.div>

          <motion.div 
            className="footer-column"
            custom={2}
            variants={itemVariants}
          >
            <h4>DESTEK</h4>
            <ul>
              {/* İletişim Butonu - Modal tetikleyici */}
              <motion.li whileHover={{ x: 5 }}>
                <button className="contact-button" onClick={toggleContactModal}>
                  İletişim
                </button>
              </motion.li>
              
              <motion.li whileHover={{ x: 5 }}><a href="/shipping"></a></motion.li>
              <motion.li whileHover={{ x: 5 }}><a href="/returns"></a></motion.li>
            </ul>
          </motion.div>

          <motion.div 
            className="footer-column"
            custom={3}
            variants={itemVariants}
          >
            <h4>BİZİ TAKİP EDİN</h4>
            <p className="social-description">Yeni ürünler ve özel fırsatlar</p>
            <div className="footer-social-icons">
              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/hecateperfume"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram"
                whileHover={{ 
                  y: -5, 
                  scale: 1.1,
                  rotate: 5 
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.i 
                  className="fab fa-instagram"
                  whileHover={{ scale: 1.2 }}
                ></motion.i>
                <span className="social-tooltip">Instagram</span>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/905380664628"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link whatsapp"
                whileHover={{ 
                  y: -5, 
                  scale: 1.1,
                  rotate: -5 
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <motion.i 
                  className="fab fa-whatsapp"
                  whileHover={{ scale: 1.2 }}
                ></motion.i>
                <span className="social-tooltip">WhatsApp</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="footer-bottom-content">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              © {new Date().getFullYear()} HECATE . Tüm hakları saklıdır.
            </motion.p>
            <div className="footer-links">
              <motion.a 
                href="/privacy"
                whileHover={{ y: -2 }}
              >Gizlilik Politikası</motion.a>
              <motion.a 
                href="/terms"
                whileHover={{ y: -2 }}
              >Kullanım Şartları</motion.a>
              <motion.a 
                href="/cookies"
                whileHover={{ y: -2 }}
              >Çerezler</motion.a>
            </div>
          </div>
        </motion.div>
      </motion.footer>

      {/* İletişim Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleContactModal}
          >
            <motion.div 
              className="contact-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={toggleContactModal}>
                <i className="fas fa-times"></i>
              </button>
              
              <div className="modal-header">
                <h2>İletişim Bilgilerimiz</h2>
                <p>Bize ulaşmak için aşağıdaki iletişim kanallarını kullanabilirsiniz</p>
              </div>
              
              <div className="modal-content">
                <div className="contact-info">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="contact-details">
                      <h3>Adres</h3>
                      <p>Ataşehir, İzmir</p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className="contact-details">
                      <h3>Telefon</h3>
                      <p>
                        <a href="tel:+905380664628">+90 538 066 46 28</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="contact-details">
                      <h3>E-posta</h3>
                      <p>
                        <a href="mailto:info@hecate.com">info@hecateperfume.com</a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="contact-actions">
                  <motion.a
                    href="https://wa.me/905380664628"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-action-btn whatsapp-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fab fa-whatsapp"></i>
                    WhatsApp'tan Yazın
                  </motion.a>
                  
                  <motion.a
                    href="tel:+905380664628"
                    className="contact-action-btn call-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fas fa-phone"></i>
                    Hemen Ara
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;