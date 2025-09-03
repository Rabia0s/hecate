import React, { useState, useEffect } from 'react';
import './VideoBanner.css';

function VideoBanner() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLoading, setIsLoading] = useState(true);

  // YouTube video ID'si - URL'den alınan kısım
  const youtubeVideoId = "kO66qBMg4Ac"; // ← BURAYI DEĞİŞTİRDİM

  // YouTube embed URL'si oluştur
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&modestbranding=1&rel=0`;

  const imagePaths = [
    `${process.env.PUBLIC_URL}/images/banner1.jpg`,
    `${process.env.PUBLIC_URL}/images/banner2.jpg`,
    `${process.env.PUBLIC_URL}/images/banner3.jpg`
  ];

  // Ekran genişliğine göre mobil/desktop kontrolü
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // YouTube iframe yüklendikten sonra loading'i kaldır
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="banner-container">
      {/* MOBİL GÖRÜNÜM: YouTube Video */}
      {isMobile ? (
        <>
          <div className="youtube-video-container">
            <iframe
              src={youtubeEmbedUrl}
              className="banner-video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Banner Video"
              onLoad={handleIframeLoad}
            ></iframe>
          </div>
          
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
        </>
      ) : (
        /* MASAÜSTÜ GÖRÜNÜM: 3'lü Resim Galerisi */
        <div className="desktop-banner-grid">
          {imagePaths.map((imagePath, index) => (
            <div key={index} className="banner-grid-item">
              <img 
                src={imagePath} 
                alt={`Banner ${index + 1}`}
                className="grid-image"
                onLoad={() => index === 0 && setIsLoading(false)}
              />
              <div className="image-overlay"></div>
            </div>
          ))}
        </div>
      )}
      
      <div className="content-overlay">
        <div className="title-wrapper">
          <h1 className="main-title">HECATE</h1>
          <div className="title-divider"></div>
          <p className="subtitle">Born in a Bottle</p>
        </div>
      </div>
    </div>
  );
}

export default VideoBanner;