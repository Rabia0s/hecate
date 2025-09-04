// InstagramGallery.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './InstagramGallery.css';

const InstagramGallery = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const instagramPosts = [
    { 
      id: 1, 
      image: `${process.env.PUBLIC_URL}/images/insphoto1.jpeg`,
      caption: "Lüks Parfüm Koleksiyonu",
      delay: 0.1
    },
    { 
      id: 2, 
      image: `${process.env.PUBLIC_URL}/images/insphoto2.jpeg`,
      caption: "Özel Seri",
      delay: 0.2
    },
    { 
      id: 3, 
      image: `${process.env.PUBLIC_URL}/images/insphoto3.jpeg`,
      caption: "Boutique Deneyimi",
      delay: 0.3
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="instagram-section" ref={ref}>
      <div className="section-container">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            <span className="gold-gradient">#HecatePerfume</span>
          </motion.h2>
          <motion.p className="section-subtitle" variants={itemVariants}>
            Bir damla koku, içindeki tanrıçayı hatırlatabilir
          </motion.p>
        </motion.div>

        <motion.div 
          className="gallery-grid"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {instagramPosts.map((post) => (
            <motion.div
              key={post.id}
              className="gallery-item"
              variants={itemVariants}
              custom={post.delay}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <img 
                src={post.image} 
                alt={`Instagram: ${post.caption}`}
                className="gallery-image"
                loading="lazy"
                onError={(e) => {
                  e.target.src = `${process.env.PUBLIC_URL}/images/logo.png`;
                  console.error("Fotoğraf yüklenemedi:", post.image);
                }}
              />
              <div className="instagram-overlay">
                <p className="caption">{post.caption}</p>
                <div className="instagram-icon">
                  <InstagramIcon />
                </div>
              </div>
              <div className="shine-effect"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          href="https://www.instagram.com/hecateperfume"
          className="instagram-button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 20 
          }}
          transition={{ delay: 0.6 }}
          whileHover={{ 
            y: -3,
            boxShadow: "0 10px 25px rgba(142, 197, 252, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Bizi Takip Edin</span>
          <div className="button-hover-effect"></div>
        </motion.a>
      </div>
    </section>
  );
};

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" fill="currentColor"/>
    <path d="M3 16V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z" stroke="currentColor" strokeWidth="2"/>
    <path d="M17.5 6.5l.01-.011" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default InstagramGallery;