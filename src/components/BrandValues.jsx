import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiRefreshCw, FiFeather, FiAward, FiHeart } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import './BrandValues.css';

const BrandValues = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [hoveredItem, setHoveredItem] = useState(null);
  const { t } = useTranslation();

  const values = [
    {
      id: 1,
      icon: <FiRefreshCw />,
      title: t('values.vegan'),
      description: t('values.vegan_desc'),
      details: t('values.vegan_details', 'Formüllerimiz doğadan ilham alır ve hiçbir hayvansal içerik içermez.')
    },
    {
      id: 2,
      icon: <FiFeather />,
      title: t('values.unisex'),
      description: t('values.unisex_desc'),
      details: t('values.unisex_details', 'Cinsiyetsiz kokularımız, erkek/kadın ayrımının ötesinde, herkes için uygundur.')
    },
    {
      id: 3,
      icon: <FiAward />,
      title: t('values.independent'),
      description: t('values.independent_desc'),
      details: t('values.independent_details', 'Bağımsız bir kadın girişimi olarak, tutku ve özgünlükle yönetilen bir marka olmaktan gurur duyuyoruz.')
    },
    {
      id: 4,
      icon: <FiHeart />,
      title: t('values.transparency'),
      description: t('values.transparency_desc'),
      details: t('values.transparency_details', 'En nadide ve kaliteli hammaddeleri kullanarak eşsiz bir koku deneyimi sunuyoruz.')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section className="brand-values-premium" ref={ref}>
      <div className="values-background">
        <div className="floating-particles">
          {[...Array(95)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>
      </div>
      
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>{t('values.title')}</h2>
          <p>{t('values.subtitle')}</p>
          <div className="header-divider"></div>
        </motion.div>

        <motion.div 
          className="values-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {values.map((value) => (
            <motion.div
              key={value.id}
              className={`value-card ${hoveredItem === value.id ? 'hovered' : ''}`}
              variants={itemVariants}
              onMouseEnter={() => setHoveredItem(value.id)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ y: -5 }}
            >
              <div className="value-content">
                <div className="icon-wrapper">
                  <span className="value-icon">{value.icon}</span>
                </div>
                
                <h3>{value.title}</h3>
                <p className="value-description">{value.description}</p>
                
                <div className="value-details">
                  <p>{value.details}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="values-footer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p>{t('common.crafting')}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandValues;