import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const { t } = useTranslation();

  // Formspree endpoint URL'nizi buraya yazın
  const FORM_ENDPOINT_URL = 'https://formspree.io/f/mdkldzrb';

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
      setError(t('footer.emailError', 'Lütfen geçerli bir email adresi giriniz'));
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(FORM_ENDPOINT_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          email,
          _subject: 'Hecate Newsletter Aboneliği',
          _replyto: email
        })
      });

      if (response.ok) {
        setSubscribed(true);
        setEmail('');

        // 4 saniye sonra başarı mesajını gizle
        setTimeout(() => {
          setSubscribed(false);
        }, 4000);
      } else {
        const errorData = await response.json();
        setError(t('footer.submitError', 'Bir hata oluştu, lütfen tekrar deneyin'));
        console.error('Formspree Error:', errorData);
      }
    } catch (err) {
      console.error('Hata:', err);
      setError(t('footer.connectionError', 'Bağlantı sağlanamadı'));
    } finally {
      setIsLoading(false);
    }
  };

  // Küçük kare fotoğraflar
  const galleryImages = [
    {
      id: 1,
      src: `${process.env.PUBLIC_URL}/images/fotograf1.jpeg`,
      alt: t('footer.imageAlt1', 'Parfüm 1')
    },
    {
      id: 2,
      src: `${process.env.PUBLIC_URL}/images/fotograf2.png`,
      alt: t('footer.imageAlt2', 'Parfüm 2')
    },
    {
      id: 3,
      src: `${process.env.PUBLIC_URL}/images/fotograf3.jpeg`,
      alt: t('footer.imageAlt3', 'Parfüm 3')
    },
    {
      id: 4,
      src: `${process.env.PUBLIC_URL}/images/fotograf4.png`,
      alt: t('footer.imageAlt4', 'Parfüm 4')
    }
  ];

  return (
    <>
      {/* Birleşik Fotoğraf ve Abonelik Bölümü */}
      <motion.section 
        className="unified-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
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
                    e.target.alt = 'Placeholder image';
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
              <h2>{t('newsletter.title')}</h2>
              <p>{t('newsletter.description')}</p>
              
              <form className="unified-form" onSubmit={handleSubmit} noValidate>
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
                    disabled={isLoading}
                  />
                  <label className="unified-input-label">{t('newsletter.placeholder')}</label>
                  <motion.button 
                    type="submit" 
                    className="unified-submit-btn"
                    disabled={isLoading}
                    whileHover={!isLoading ? { scale: 1.05 } : {}}
                    whileTap={!isLoading ? { scale: 0.95 } : {}}
                    aria-label={t('newsletter.button')}
                  >
                    {isLoading ? (
                      <div className="loading-spinner" aria-label="Yükleniyor"></div>
                    ) : (
                      <>
                        <span>{t('newsletter.button')}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
                    role="alert"
                    aria-live="polite"
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
                  role="alert"
                  aria-live="polite"
                >
                  <motion.i 
                    className="fas fa-check-circle"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    aria-hidden="true"
                  ></motion.i>
                  {t('footer.subscriptionSuccess', 'Teşekkürler! Aboneliğiniz tamamlandı.')}
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
              <h3 className="brand-name">{t('footer.brand')}</h3>
              <p className="brand-subtitle">{t('footer.tagline')}</p>
            </motion.div>
            <motion.p 
              className="brand-description"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {t('footer.description')}
            </motion.p>
          </motion.div>

          <motion.div 
            className="footer-column"
            custom={1}
            variants={itemVariants}
          >
            <h4>{t('footer.discover')}</h4>
            <ul>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/collections" aria-label={t('footer.collections')}>
                  {t('footer.collections')}
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/bespoke" aria-label={t('footer.personalized')}>
                  {t('footer.personalized')}
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/gift" aria-label={t('footer.gift_sets')}>
                  {t('footer.gift_sets')}
                </a>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div 
            className="footer-column"
            custom={2}
            variants={itemVariants}
          >
            <h4>{t('footer.support')}</h4>
            <ul>
              {/* İletişim Butonu - Modal tetikleyici */}
              <motion.li whileHover={{ x: 5 }}>
                <button 
                  className="contact-button" 
                  onClick={toggleContactModal}
                  aria-label={t('footer.contact')}
                  aria-haspopup="dialog"
                >
                  {t('footer.contact')}
                </button>
              </motion.li>
              
              {/* Boş linkler kaldırıldı veya düzeltildi */}
              <motion.li whileHover={{ x: 5 }}>
                <a href="/shipping" aria-label="Kargo Bilgileri">
                  {t('footer.shipping', 'Kargo')}
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/returns" aria-label="İade Politikası">
                  {t('footer.returns', 'İade')}
                </a>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div 
            className="footer-column"
            custom={3}
            variants={itemVariants}
          >
            <h4>{t('footer.follow')}</h4>
            <p className="social-description">{t('footer.follow_desc')}</p>
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
                aria-label="Instagram'da bizi takip edin"
              >
                <motion.i 
                  className="fab fa-instagram"
                  whileHover={{ scale: 1.2 }}
                  aria-hidden="true"
                ></motion.i>
                <span className="social-tooltip">Instagram</span>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/905411969043"
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
                aria-label="WhatsApp'tan bize ulaşın"
              >
                <motion.i 
                  className="fab fa-whatsapp"
                  whileHover={{ scale: 1.2 }}
                  aria-hidden="true"
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
              {t('footer.copyright', '© 2025 HECATE . Tüm hakları saklıdır.')}
            </motion.p>
            <div className="footer-links">
              <motion.a 
                href="/privacy"
                whileHover={{ y: -2 }}
                aria-label="Gizlilik Politikası"
              >
                {t('footer.privacy')}
              </motion.a>
              <motion.a 
                href="/terms"
                whileHover={{ y: -2 }}
                aria-label="Kullanım Şartları"
              >
                {t('footer.terms')}
              </motion.a>
              <motion.a 
                href="/cookies"
                whileHover={{ y: -2 }}
                aria-label="Çerez Politikası"
              >
                {t('footer.cookies')}
              </motion.a>
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
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <motion.div 
              className="contact-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close-btn" 
                onClick={toggleContactModal}
                aria-label="İletişim modalını kapat"
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
              
              <div className="modal-header">
                <h2 id="contact-modal-title">
                  {t('footer.contactModal.title', 'İletişim Bilgilerimiz')}
                </h2>
                <p>{t('footer.contactModal.subtitle', 'Bize ulaşmak için aşağıdaki iletişim kanallarını kullanabilirsiniz')}</p>
              </div>
              
              <div className="modal-content">
                <div className="contact-info">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                    </div>
                    <div className="contact-details">
                      <h3>{t('footer.contactModal.address', 'Adres')}</h3>
                      <p>{t('footer.contactModal.addressValue', 'Ataşehir, İzmir')}</p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-phone" aria-hidden="true"></i>
                    </div>
                    <div className="contact-details">
                      <h3>{t('footer.contactModal.phone', 'Telefon')}</h3>
                      <p>
                        <a href="tel:+905411969043" aria-label="Telefon numaramız: +90 541 196 90 43">
                          +90 541 196 90 43
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-envelope" aria-hidden="true"></i>
                    </div>
                    <div className="contact-details">
                      <h3>{t('footer.contactModal.email', 'E-posta')}</h3>
                      <p>
                        <a href="mailto:info@hecateperfume.com" aria-label="E-posta adresimiz: info@hecateperfume.com">
                          info@hecateperfume.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="contact-actions">
                  <motion.a
                    href="https://wa.me/905411969043"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-action-btn whatsapp-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="WhatsApp'tan mesaj gönderin"
                  >
                    <i className="fab fa-whatsapp" aria-hidden="true"></i>
                    {t('footer.contactModal.whatsapp', 'WhatsApp\'tan Yazın')}
                  </motion.a>
                  
                  <motion.a
                    href="tel:+905411969043"
                    className="contact-action-btn call-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Telefon numaramızı arayın"
                  >
                    <i className="fas fa-phone" aria-hidden="true"></i>
                    {t('footer.contactModal.call', 'Hemen Ara')}
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