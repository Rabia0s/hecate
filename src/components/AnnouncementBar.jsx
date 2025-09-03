import React, { useState, useEffect } from 'react';
import './AnnouncementBar.css';

function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const HIDE_DURATION = 1 * 60 * 60 * 1000; // 1 saat (milisaniye cinsinden)

  useEffect(() => {
    // localStorage'dan kayıtlı zamanı kontrol et
    const hiddenUntil = localStorage.getItem('announcementHiddenUntil');
    if (hiddenUntil && Date.now() < Number(hiddenUntil)) {
      setIsVisible(false);
    } else {
      // Süre dolmuşsa localStorage'dan temizle
      localStorage.removeItem('announcementHiddenUntil');
    }
  }, []);

  const handleClose = () => {
    // Şuanki zaman + 1 saat sonrasını kaydet
    const hiddenUntil = Date.now() + HIDE_DURATION;
    localStorage.setItem('announcementHiddenUntil', hiddenUntil.toString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="announcement-bar">
      <div className="scrolling-text-container">
        <p className="scrolling-text">
          🌙 Senin hikâyeni notalara dönüştürelim.  
          <strong>Kişiye özel koku ritüeli</strong> HECATE'de başlıyor! <a href="#rituel"></a>
        </p>
      </div>
      <button 
        className="announcement-close" 
        onClick={handleClose}
        aria-label="Duyuruyu kapat"
      >
        &times;
      </button>
    </div>
  );
}

export default AnnouncementBar;