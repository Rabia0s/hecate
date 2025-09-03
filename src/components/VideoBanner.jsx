import React, { useState, useEffect } from 'react';
import './VideoBanner.css';

function VideoBanner() {
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  // YouTube video ID'si - Tüm cihazlarda aynı video
  const youtubeVideoId = "d6zsqBSvzIc";

  // YouTube embed URL'si - Tüm cihazlar için video
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&modestbranding=1&rel=0`;

  // Video yüklendikten sonra loading'i kaldır
  const handleIframeLoad = () => {
    setIsLoading(false);
    setShowVideo(true);
  };

  // 2 saniye sonra loading'i kaldır (fallback)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowVideo(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="banner-container">
      {/* TÜM CİHAZLARDA VIDEO GÖSTER */}
      <div className="youtube-video-container">
        {showVideo && (
          <iframe
            src={youtubeEmbedUrl}
            className="banner-video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Banner Video"
            onLoad={handleIframeLoad}
          ></iframe>
        )}
      </div>
      
      {/* Loading gösterimi */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p className="loading-text">Video yükleniyor...</p>
        </div>
      )}
      
      {/* İçerik overlay */}
      <div className="content-overlay">
        <div className="title-wrapper">
          <h1 className="main-title">HECATE</h1>
          <div className="title-divider"></div>
          <p className="subtitle">Born in a Bottle</p>
        </div>
      </div>

      {/* Masaüstü için ek resimler (isteğe bağlı) */}
      <div className="desktop-banner-grid">
        {[
          `${process.env.PUBLIC_URL}/images/banner1.jpg`,
          `${process.env.PUBLIC_URL}/images/banner2.jpg`,
          `${process.env.PUBLIC_URL}/images/banner3.jpg`
        ].map((imagePath, index) => (
          <div key={index} className="banner-grid-item">
            <img 
              src={imagePath} 
              alt={`Banner ${index + 1}`}
              className="grid-image"
            />
            <div className="image-overlay"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoBanner;