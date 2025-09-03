import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Events.css';

const Events = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Gelecek workshop verileri
  const upcomingWorkshops = [
    {
      id: 1,
      title: "Kokulu Mum Yapım Atölyesi",
      date: "15 Kasım 2023",
      time: "14:00 - 16:00",
      location: "HECATE Atölye, İstanbul",
      description: "Kendi kokulu mumlarınızı yapmayı öğrenin ve evinize özel bir dokunuş katın.",
      image: `${process.env.PUBLIC_URL}/images/workshops/candle-making.jpg`,
      price: "₺250",
      capacity: 12,
      registered: 8
    },
    {
      id: 2,
      title: "Doğal Parfüm Yapımı",
      date: "22 Kasım 2023",
      time: "18:00 - 20:00",
      location: "HECATE Atölye, İstanbul",
      description: "Kendi doğal parfümünüzü yapmayı öğrenin ve size özel bir koku yaratın.",
      image: `${process.env.PUBLIC_URL}/images/workshops/perfume-making.jpg`,
      price: "₺350",
      capacity: 10,
      registered: 6
    }
  ];
  
  // Geçmiş workshop verileri
  const pastWorkshops = [
    {
      id: 1,
      title: "Aromaterapi ve Esans Yağları",
      date: "10 Ekim 2023",
      description: "Esansiyel yağların terapötik kullanımlarını öğrendiğimiz keyifli bir atölye çalışması.",
      images: [
        `${process.env.PUBLIC_URL}/images/workshops/aromatherapy-1.jpg`,
        `${process.env.PUBLIC_URL}/images/workshops/aromatherapy-2.jpg`,
        `${process.env.PUBLIC_URL}/images/workshops/aromatherapy-3.jpg`
      ],
      video: "https://www.youtube.com/embed/örnek-video-id"
    },
    {
      id: 2,
      title: "Doğal Sabun Yapımı",
      date: "5 Eylül 2023",
      description: "Kimyasal içermeyen, tamamen doğal malzemelerle kendi sabunlarımızı yaptık.",
      images: [
        `${process.env.PUBLIC_URL}/images/workshops/soap-making-1.jpg`,
        `${process.env.PUBLIC_URL}/images/workshops/soap-making-2.jpg`
      ],
      video: null
    }
  ];

  // checkDateAvailability fonksiyonunu kaldırın veya düzeltin
  // Eğer tarih kontrolü yapmanız gerekiyorsa, bunu useEffect dışında yapın

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>{t('events.title')}</h1>
        <p>{t('events.subtitle')}</p>
      </div>
      
      <div className="events-tabs">
        <button 
          className={activeTab === 'upcoming' ? 'active' : ''}
          onClick={() => setActiveTab('upcoming')}
        >
          {t('events.upcoming')}
        </button>
        <button 
          className={activeTab === 'past' ? 'active' : ''}
          onClick={() => setActiveTab('past')}
        >
          {t('events.past')}
        </button>
      </div>
      
      <div className="events-content">
        {activeTab === 'upcoming' ? (
          <div className="upcoming-workshops">
            {upcomingWorkshops.length > 0 ? (
              upcomingWorkshops.map(workshop => (
                <div key={workshop.id} className="workshop-card">
                  <div className="workshop-image">
                    <img src={workshop.image} alt={workshop.title} />
                    <div className="workshop-badge">Yaklaşan Etkinlik</div>
                  </div>
                  <div className="workshop-details">
                    <h3>{workshop.title}</h3>
                    <div className="workshop-meta">
                      <span className="date">{workshop.date}</span>
                      <span className="time">{workshop.time}</span>
                      <span className="location">{workshop.location}</span>
                    </div>
                    <p className="workshop-description">{workshop.description}</p>
                    <div className="workshop-info">
                      <div className="price">{workshop.price}</div>
                      <div className="capacity">
                        Katılımcı: {workshop.registered}/{workshop.capacity}
                      </div>
                    </div>
                    <button className="register-btn">{t('events.register')}</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-events">
                <p>{t('events.noUpcoming')}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="past-workshops">
            {pastWorkshops.map(workshop => (
              <div key={workshop.id} className="past-workshop-card">
                <h3>{workshop.title}</h3>
                <p className="workshop-date">{workshop.date}</p>
                <p className="workshop-description">{workshop.description}</p>
                
                {workshop.images && workshop.images.length > 0 && (
                  <div className="workshop-gallery">
                    <h4>{t('events.photos')}</h4>
                    <div className="gallery-grid">
                      {workshop.images.map((image, index) => (
                        <div key={index} className="gallery-item">
                          <img src={image} alt={`${workshop.title} ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {workshop.video && (
                  <div className="workshop-video">
                    <h4>{t('events.video')}</h4>
                    <div className="video-container">
                      <iframe 
                        src={workshop.video}
                        title={workshop.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;