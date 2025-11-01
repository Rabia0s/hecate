// Workshops.jsx - DÜZENLENMİŞ VERSİYON
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Workshops.css';

const Workshops = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    participants: '1'
  });

  // Modern workshop veri yapısı - Sadece Sweet November
  const workshopsData = {
    upcoming: [
      {
        id: 1,
        title: "✨ Sweet November Parfüm Atölyesi",
        
        description: t('workshops.workshopDescription'),
        date: "2025-11-13",
        time: "13:00 - 16:00",
        location: "Pasta Kodu Karşıyaka",
        duration: "3 saat",
        price: 2500,
        originalPrice: 3000,
        paymentInfo: {
          bank: "İş Bankası",
          iban: "TR12 3456 7890 1234 5678 9012 34",
          receiver: "HECATE Parfüm Atölyesi",
          note: "Sweet November Atölye Katılım"
        },
        featured: true,
        category: "perfume",
        icon: "✨",
        color: "linear-gradient(135deg, #dc2626, #b91c1c, #991b1b)",
        theme: "red",
        importantNotes: [
          t('workshops.importantNotesList.location'),
          t('workshops.importantNotesList.fee'),
          t('workshops.importantNotesList.limited'),
          t('workshops.importantNotesList.duration'),
          t('workshops.importantNotesList.capacity')
        ]
      }
    ],
    past: [
      {
        id: 101,
        title: "Yaz Parfüm Workshop",
        subtitle: "Yaza özel ferah kokular",
        description: "Yaz sıcaklarına özel ferah ve enerjik kokular tasarladığımız unutulmaz bir atölye.",
        date: "2024-09-15",
        location: "Pasta Kodu Karşıyaka",
        duration: "3 saat",
        participants: 12,
        rating: 4.9,
        icon: "☀️",
        color: "linear-gradient(135deg, #ffd89b, #19547b)"
      },
      {
        id: 102,
        title: "buna isim bulamadım Workshopu",
        subtitle: "Takım ruhunu kokuya dönüştür",
        description: "Şirket çalışanlarıyla birlikte kurumsal kimliğe uygun özel kokular tasarladığımız etkinlik.",
        date: "2024-08-05",
        location: "ABC Şirket Ofisi",
        duration: "4 saat",
        participants: 15,
        rating: 4.8,
        icon: "👥",
        color: "linear-gradient(135deg, #4facfe, #00f2fe)"
      },
      {
        id: 103,
        title: "İlkbahar Workshop'u",
        subtitle: "Baharın tazeliğini kokulara yansıt",
        description: "İlkbaharın enerjisi ve tazeliğini yansıtan kokular oluşturduğumuz özel workshop.",
        date: "2024-04-22",
        location: "Pasta Kodu Karşıyaka",
        duration: "3 saat",
        participants: 8,
        rating: 4.9,
        icon: "🌸",
        color: "linear-gradient(135deg, #a8edea, #fed6e3)"
      }
    ]
  };

  // WhatsApp mesajı oluşturma
  const createWhatsAppMessage = (workshop, formData) => {
    const phoneNumber = '905411969043';
    const totalPrice = workshop.price * parseInt(formData.participants);
    
    const message = `🎨 **HECATE Parfüm Atölyesi - Rezervasyon** 🎨

👤 **Katılımcı Bilgileri:**
• Ad Soyad: ${formData.name}
• E-posta: ${formData.email}
• Telefon: ${formData.phone}
• Katılımcı Sayısı: ${formData.participants}

📋 **Atölye Detayları:**
• Atölye: ${workshop.title}
• Tarih: ${workshop.date} | ${workshop.time}
• Lokasyon: ${workshop.location}
• Toplam Tutar: ${totalPrice} TL

💳 **Ödeme Bilgileri:**
• Banka: ${workshop.paymentInfo.bank}
• IBAN: ${workshop.paymentInfo.iban}
• Alıcı: ${workshop.paymentInfo.receiver}
• Açıklama: ${workshop.paymentInfo.note}

_**Ödeme sonrası dekontu bu mesajla iletiniz.**_

Teşekkür ederiz! ✨`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  // Form işlemleri
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.email || !bookingData.phone) {
      alert('Lütfen tüm alanları doldurunuz');
      return;
    }

    const whatsappUrl = createWhatsAppMessage(selectedWorkshop, bookingData);
    window.open(whatsappUrl, '_blank');
    
    // Formu temizle
    setBookingData({ name: '', email: '', phone: '', participants: '1' });
    setShowBookingModal(false);
    setSelectedWorkshop(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const currentWorkshops = workshopsData[activeTab];

  return (
    <div className="workshops-modern">
      {/* Hero Section - Kırmızı Tema */}
      <section className="modern-hero red-theme">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge red-badge">{t('workshops.featured')}</div>
            <h1 className="hero-title">
              Sweet November
              <span className="title-accent red-accent">{t('workshops.title')}</span>
            </h1>
            <p className="hero-description">
              {t('workshops.heroDescription')}
            </p>
            <div className="hero-actions">
              <button 
                className="btn-primary red-btn"
                onClick={() => document.getElementById('workshops').scrollIntoView({ behavior: 'smooth' })}
              >
                {t('workshops.bookNow')}
              </button>
              <button 
                className="btn-secondary"
                onClick={() => setActiveTab('past')}
              >
                {t('workshops.past')}
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="icon-display red-icon-display">
              <div className="main-icon red-icon">🪄</div>
              <div className="icon-grid">
                <div className="icon-item red-icon-item">✨</div>
                <div className="icon-item red-icon-item">🎄</div>
                <div className="icon-item red-icon-item">⭐</div>
                <div className="icon-item red-icon-item">🔥</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section id="workshops" className="workshops-section">
        <div className="container">
          {/* Tab Navigation */}
          <div className="section-tabs">
            <button 
              className={`tab ${activeTab === 'upcoming' ? 'active red-tab' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              <span className="tab-icon">🗓️</span>
              {t('workshops.upcoming')}
              <span className="tab-count">({workshopsData.upcoming.length})</span>
              {activeTab === 'upcoming' && <div className="tab-indicator red-indicator"></div>}
            </button>
            <button 
              className={`tab ${activeTab === 'past' ? 'active red-tab' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              <span className="tab-icon">📸</span>
              {t('workshops.past')}
              <span className="tab-count">({workshopsData.past.length})</span>
              {activeTab === 'past' && <div className="tab-indicator red-indicator"></div>}
            </button>
          </div>

          {/* Workshops Grid */}
          <div className="workshops-grid-modern">
            {currentWorkshops.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <h3>{t('workshops.emptyState.title')}</h3>
                <p>{t('workshops.emptyState.message')}</p>
              </div>
            ) : (
              currentWorkshops.map(workshop => (
                <div key={workshop.id} className={`workshop-card-modern ${workshop.theme === 'red' ? 'red-workshop' : ''}`}>
                  <div className="workshop-header-modern" style={{ background: workshop.color }}>
                    <div className="workshop-icon">{workshop.icon}</div>
                    <div className="workshop-title-section">
                      <h3>{workshop.title}</h3>
                      <p className="workshop-subtitle">{workshop.subtitle}</p>
                    </div>
                    {workshop.featured && (
                      <div className="featured-badge red-featured">{t('workshops.featured')}</div>
                    )}
                  </div>

                  <div className="workshop-content-modern">
                    <div className="workshop-meta-modern">
                      <div className="meta-item">
                        <span className="meta-icon">📅</span>
                        <span>{workshop.date} {workshop.time && `| ${workshop.time}`}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-icon">📍</span>
                        <span>{workshop.location}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-icon">⏱️</span>
                        <span>{workshop.duration}</span>
                      </div>
                    </div>

                    <div className="workshop-description">
                      <p>{workshop.description}</p>
                    </div>

                    {activeTab === 'upcoming' && (
                      <div className="workshop-footer-modern">
                        <div className="pricing">
                          <span className="current-price">{workshop.price} TL</span>
                          {workshop.originalPrice && workshop.originalPrice > workshop.price && (
                            <span className="original-price">{workshop.originalPrice} TL</span>
                          )}
                        </div>
                        <div className="action-buttons">
                          <button 
                            className={`btn-details ${workshop.theme === 'red' ? 'red-details' : ''}`}
                            onClick={() => setSelectedWorkshop(workshop)}
                          >
                            {t('workshops.details')}
                          </button>
                          <button 
                            className={`btn-book ${workshop.theme === 'red' ? 'red-book' : ''}`}
                            onClick={() => {
                              setSelectedWorkshop(workshop);
                              setShowBookingModal(true);
                            }}
                          >
                            {t('workshops.reservation')}
                          </button>
                        </div>
                      </div>
                    )}

                    {activeTab === 'past' && (
                      <div className="past-stats">
                        <div className="stat-item">
                          <span className="stat-icon">👥</span>
                          <span>{workshop.participants} katılımcı</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-icon">⭐</span>
                          <span>{workshop.rating}/5</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedWorkshop && (
        <div className="modal-overlay-modern" onClick={() => setSelectedWorkshop(null)}>
          <div className="modal-modern" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedWorkshop(null)}>
              <span>×</span>
            </button>

            <div className="modal-content-modern">
              <div className="modal-header-modern" style={{ background: selectedWorkshop.color }}>
                <div className="modal-icon">{selectedWorkshop.icon}</div>
                <div className="modal-title-section">
                  <h2>{selectedWorkshop.title}</h2>
                  <p className="modal-subtitle">{selectedWorkshop.subtitle}</p>
                </div>
              </div>

              <div className="modal-details">
                <div className="modal-description">
                  <p>{selectedWorkshop.description}</p>
                </div>

                <div className="details-grid">
                  <div className="detail-card">
                    <div className="detail-icon">📅</div>
                    <div className="detail-content">
                      <h4>{t('workshops.modal.dateTime')}</h4>
                      <p>{selectedWorkshop.date} | {selectedWorkshop.time}</p>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">📍</div>
                    <div className="detail-content">
                      <h4>{t('workshops.modal.location')}</h4>
                      <p>{selectedWorkshop.location}</p>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">⏱️</div>
                    <div className="detail-content">
                      <h4>{t('workshops.modal.duration')}</h4>
                      <p>{selectedWorkshop.duration}</p>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-icon">💰</div>
                    <div className="detail-content">
                      <h4>{t('workshops.modal.fee')}</h4>
                      <p>{selectedWorkshop.price} TL</p>
                    </div>
                  </div>
                </div>

                {selectedWorkshop.importantNotes && (
                  <div className="important-notes-section">
                    <h4>{t('workshops.importantNotes')}</h4>
                    <div className="notes-list">
                      {selectedWorkshop.importantNotes.map((note, index) => (
                        <div key={index} className="note-item">
                          {note}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ödeme Bilgileri */}
                {selectedWorkshop.paymentInfo && (
                  <div className="payment-section">
                    <h4>{t('workshops.paymentInfo')}</h4>
                    <div className="payment-details">
                      <div className="payment-item">
                        <strong>{t('workshops.paymentDetails.bank')}:</strong> {selectedWorkshop.paymentInfo.bank}
                      </div>
                      <div className="payment-item">
                        <strong>{t('workshops.paymentDetails.iban')}:</strong> {selectedWorkshop.paymentInfo.iban}
                      </div>
                      <div className="payment-item">
                        <strong>{t('workshops.paymentDetails.receiver')}:</strong> {selectedWorkshop.paymentInfo.receiver}
                      </div>
                      <div className="payment-item">
                        <strong>{t('workshops.paymentDetails.note')}:</strong> {selectedWorkshop.paymentInfo.note}
                      </div>
                    </div>
                  </div>
                )}

                <div className="modal-actions">
                  <button 
                    className={`btn-book-large ${selectedWorkshop.theme === 'red' ? 'red-book-large' : ''}`}
                    onClick={() => {
                      setShowBookingModal(true);
                      setSelectedWorkshop(null);
                    }}
                  >
                    {t('workshops.reservation')} - {selectedWorkshop.price} TL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay-modern" onClick={() => setShowBookingModal(false)}>
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBookingModal(false)}>
              <span>×</span>
            </button>

            <div className="booking-content">
              <h2>{t('workshops.bookingForm.title')}</h2>
              
              <form onSubmit={handleBookingSubmit} className="booking-form-modern">
                <div className="form-grid">
                  <div className="form-group">
                    <label>{t('workshops.bookingForm.name')}</label>
                    <input
                      type="text"
                      name="name"
                      value={bookingData.name}
                      onChange={handleInputChange}
                      placeholder={t('workshops.bookingForm.name')}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>{t('workshops.bookingForm.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      placeholder={t('workshops.bookingForm.email')}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>{t('workshops.bookingForm.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      placeholder={t('workshops.bookingForm.phone')}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>{t('workshops.bookingForm.participants')}</label>
                    <select
                      name="participants"
                      value={bookingData.participants}
                      onChange={handleInputChange}
                    >
                      {[1,2,3,4].map(num => (
                        <option key={num} value={num}>{num} {t('workshops.bookingForm.person')}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="price-summary">
                  <h4>{t('workshops.bookingForm.summary')}</h4>
                  <div className="summary-item">
                    <span>{t('workshops.bookingForm.workshopFee')}</span>
                    <span>{selectedWorkshop?.price} TL</span>
                  </div>
                  <div className="summary-item">
                    <span>{t('workshops.bookingForm.participantCount')}</span>
                    <span>{bookingData.participants}</span>
                  </div>
                  <div className="summary-total">
                    <span>{t('workshops.bookingForm.total')}</span>
                    <span>{selectedWorkshop ? selectedWorkshop.price * parseInt(bookingData.participants) : 0} TL</span>
                  </div>
                </div>

                <button type="submit" className="submit-button">
                  {t('workshops.bookingForm.submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workshops;