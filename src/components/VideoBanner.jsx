import React, { useRef, useEffect, useState } from 'react';
import './VideoBanner.css';

function VideoBanner() {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  const videoPath = `${process.env.PUBLIC_URL}/videos/bannervideo.mp4`;
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

  // Video yükleme ve oynatma
  useEffect(() => {
    // Sadece mobilde video işlemleri yap
    if (!isMobile) {
      setIsLoading(false);
      return;
    }

    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleLoadedData = () => {
        setIsLoading(false);
        videoElement.play().catch(error => {
          console.error("Oynatma hatası:", error);
        });
      };
      
      const handleError = (e) => {
        console.error("Video yükleme hatası:", e);
        setVideoError(true);
        setIsLoading(false);
      };
      
      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('error', handleError);
      
      // Cleanup
      return () => {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('error', handleError);
      };
    }
  }, [videoPath, isMobile]);

  return (
    <div className="banner-container">
      {/* MOBİL GÖRÜNÜM: Video */}
      {isMobile ? (
        <>
          <video
            ref={videoRef}
            className="banner-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={videoPath} type="video/mp4" />
            Tarayıcınız video öğesini desteklemiyor.
          </video>
          
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