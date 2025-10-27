import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FragranceSession from './FragranceSession';
import { useTranslation } from 'react-i18next';
import './PopupModal.css';

const HecatePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSession, setShowSession] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => setIsVisible(false);
  const openSession = () => setShowSession(true);
  const closeSession = () => setShowSession(false);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="hecate-popup-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="hecate-popup-modal"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <motion.button 
                className="hecate-popup-close-btn"
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={t('popup.closeButton', 'Popup\'u kapat')}
              >
                &times;
              </motion.button>

              <div className="hecate-popup-content">
                <div className="hecate-popup-text-content">
                  <h2 className="hecate-popup-title">{t('popup.brand', 'HECATE PERFUME')}</h2>
                  <p className="hecate-popup-subtitle">{t('popup.subtitle', 'K İ Ş İ Y E Ö Z E L P A R F Ü M')}</p>
                  
                  <div className="hecate-popup-description">
                    <p>{t('popup.descriptionLine1', 'Size özel formüle edilmiş')}</p>
                    <p>{t('popup.descriptionLine2', 'parfümünüzü keşfedin.')}</p>
                  </div>
                  
                  <div className="hecate-popup-divider"></div>
                  
                  <button 
                    className="hecate-popup-cta-button" 
                    onClick={openSession}
                    aria-label={t('popup.ctaButton', 'Randevu almak için tıklayın')}
                  >
                    {t('popup.ctaButtonText', 'RANDEVU AL')}
                  </button>
                  
                  <button 
                    className="hecate-popup-secondary-button"
                    onClick={closeModal}
                    aria-label={t('popup.secondaryButton', 'Daha sonra hatırlat')}
                  >
                    {t('popup.secondaryButtonText', 'DAHA SONRA HATIRLAT')}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Koku Seansı Modal'ı */}
      <FragranceSession isOpen={showSession} onClose={closeSession} />
    </>
  );
};

export default HecatePopup;