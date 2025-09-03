import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Testimonials.css';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const constraintsRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      comment: "Hecate parfümleri gerçekten başka hiçbir yerde bulamayacağınız bir kaliteye sahip.",
      rating: 5
    },
    {
      id: 2,
      comment: "Kalıcılığı inanılmaz! Sabah sıktım, akşam hala aynı tazelikte.",
      rating: 5
    },
    {
      id: 3,
      comment: "Paketleme inanılmaz özenli.",
      rating: 5
    },
    {
      id: 4,
      comment: "Doğal içerikler ve sürdürülebilir üretim benim için çok önemli. Hecate tam da aradığım marka! Çevre dostu olması ayrıca artı puan.",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const starVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: (i) => ({
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        type: "spring",
        stiffness: 150
      }
    })
  };

  const testimonialVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-8, 8, -8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="testimonials-section">
      {/* Dekoratif elementler */}
      <div className="testimonials-background">
        <motion.div 
          className="floating-element element-1"
          variants={floatingVariants}
          animate="float"
        />
        <motion.div 
          className="floating-element element-2"
          variants={floatingVariants}
          animate="float"
          transition={{ delay: 1.5 }}
        />
      </div>

      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2>Müşteri Yorumları</h2>
          <p>Hecate deneyimlerini paylaşan müşterilerimiz</p>
          <div className="header-divider"></div>
        </motion.div>

        <motion.div 
          className="testimonials-container"
          ref={constraintsRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              className="testimonial-card"
              variants={testimonialVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              drag="x"
              dragConstraints={constraintsRef}
              dragElastic={0.2}
              whileHover={{ y: -5 }}
              onDragEnd={(e, info) => {
                if (info.offset.x > 60) prevTestimonial();
                else if (info.offset.x < -60) nextTestimonial();
              }}
            >
              <div className="testimonial-content">
                <motion.div 
                  className="quote-icon"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  "
                </motion.div>
                
                <motion.p 
                  className="testimonial-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {testimonials[activeTestimonial].comment}
                </motion.p>
                
                <motion.div 
                  className="rating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className={`star ${i < testimonials[activeTestimonial].rating ? 'filled' : ''}`}
                      custom={i}
                      variants={starVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      ★
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <motion.div 
            className="navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button 
              className="nav-btn"
              onClick={prevTestimonial}
              whileHover={{ x: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
            
            <div className="dots">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <motion.span
                    animate={{ 
                      scale: index === activeTestimonial ? 1 : 0.6,
                      backgroundColor: index === activeTestimonial ? '#a1865e' : '#ddd'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>
            
            <motion.button 
              className="nav-btn"
              onClick={nextTestimonial}
              whileHover={{ x: 3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Instagram CTA */}
        <motion.div 
          className="instagram-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
          >
            Sen de deneyimini paylaş
          </motion.p>
          <motion.a
            href="https://www.instagram.com/hecateperfume/"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-btn"
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: "0 8px 25px rgba(161, 134, 94, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>@hecateperfume</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;