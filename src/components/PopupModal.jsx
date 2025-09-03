import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FragranceSession from './FragranceSession'; // Yeni bileşeni import ediyoruz
import './PopupModal.css';

const HecatePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSession, setShowSession] = useState(false); // Yeni state

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => setIsVisible(false);
  const openSession = () => setShowSession(true); // Yeni fonksiyon
  const closeSession = () => setShowSession(false); // Yeni fonksiyon

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
              >
                &times;
              </motion.button>

              <div className="hecate-popup-content">
                <div className="hecate-popup-text-content">
                  <h2 className="hecate-popup-title">HECATE PERFUME</h2>
                  <p className="hecate-popup-subtitle">K İ Ş İ Y E Ö Z E L P A R F Ü M </p>
                  
                  <div className="hecate-popup-description">
                    <p>Kendinize özel formüle edilmiş</p>
                    <p>parfümünüzü keşfedin.</p>
                    <p>size uygun özel kokunuzu</p>
                    <p>yaratıyoruz.</p>
                  </div>
                  
                  <div className="hecate-popup-divider"></div>
                  
                  {/* Butona onClick handler ekliyoruz */}
                  <button className="hecate-popup-cta-button" onClick={openSession}>
                    ÜCRETSİZ KOKU SEANSI
                  </button>
                  
                  <button 
                    className="hecate-popup-secondary-button"
                    onClick={closeModal}
                  >
                    DAHA SONRA HATIRLAT
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