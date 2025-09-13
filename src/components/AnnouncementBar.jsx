// AnnouncementBar.jsx
import React, { useState, useEffect } from 'react';
import './AnnouncementBar.css';

function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const HIDE_DURATION = 1 * 60 * 60 * 1000; // 1 saat

  useEffect(() => {
    const hiddenUntil = localStorage.getItem('announcementHiddenUntil');
    if (hiddenUntil && Date.now() < Number(hiddenUntil)) {
      setIsVisible(false);
    } else {
      localStorage.removeItem('announcementHiddenUntil');
    }
  }, []);

  const handleClose = () => {
    const hiddenUntil = Date.now() + HIDE_DURATION;
    localStorage.setItem('announcementHiddenUntil', hiddenUntil.toString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="announcement-bar">
      <div className="announcement-content">
        <div className="scrolling-container">
          <p className="scrolling-text">
            🌙 Senin hikâyeni notalara dönüştürelim.  
            <strong>Kişiye özel koku ritüeli</strong> HECATE'de başlıyor! 
            <a href="#rituel" className="announcement-link">Keşfet</a>
          </p>
        </div>
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