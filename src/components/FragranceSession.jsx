import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FragranceSession.css';

const FragranceSession = ({ isOpen, onClose, translations }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointments, setAppointments] = useState({});

  const t = translations?.fragranceSession || {};

  // Gerçek zamanlı tarih oluşturma (önümüzdeki 14 gün)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      
      // Sadece hafta içi günleri ekle (Pazartesi-Cuma)
      if (date.getDay() >= 1 && date.getDay() <= 5) {
        const formattedDate = date.toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        });
        dates.push(formattedDate);
      }
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();
  const availableTimes = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

  // LocalStorage'dan randevuları yükle
  useEffect(() => {
    const savedAppointments = localStorage.getItem('hecateAppointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  // LocalStorage'a randevuları kaydet
  useEffect(() => {
    localStorage.setItem('hecateAppointments', JSON.stringify(appointments));
  }, [appointments]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isTimeSlotAvailable = (date, time) => {
    const dateAppointments = appointments[date] || [];
    return !dateAppointments.some(app => app.time === time);
  };

  const isDateFull = (date) => {
    const dateAppointments = appointments[date] || [];
    return dateAppointments.length >= 3;
  };

  const handleDateSelect = (date) => {
    if (isDateFull(date)) {
      alert(t.alerts?.dateFull || 'Bu tarih için maksimum 3 randevu dolmuştur. Lütfen başka bir tarih seçin.');
      return;
    }
    setSelectedDate(date);
    setSelectedTime(''); // Tarih değişince saati sıfırla
  };

  const handleTimeSelect = (time) => {
    if (!selectedDate) {
      alert(t.alerts?.dateRequired || 'Lütfen önce bir tarih seçin.');
      return;
    }

    if (!isTimeSlotAvailable(selectedDate, time)) {
      alert(t.alerts?.timeSlotFull || 'Bu saat için randevu dolmuştur. Lütfen başka bir saat seçin.');
      return;
    }

    setSelectedTime(time);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      alert(t.alerts?.timeRequired || 'Lütfen tarih ve saat seçin.');
      return;
    }

    if (!isTimeSlotAvailable(selectedDate, selectedTime)) {
      alert(t.alerts?.timeSlotFull || 'Bu saat için randevu dolmuştur. Lütfen başka bir saat seçin.');
      return;
    }

    setIsSubmitting(true);

    // Formspree'ye gönderilecek veri
    const formPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: selectedDate,
      time: selectedTime,
      notes: formData.notes,
      subject: 'Yeni Koku Seansı Randevusu',
      _replyto: formData.email,
      _subject: 'Yeni Koku Seansı Randevusu - Hecate Perfume'
    };

    try {
      const response = await fetch('https://formspree.io/f/mdkldzrb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formPayload),
      });

      if (response.ok) {
        // Randevuyu local storage'a kaydet
        const newAppointment = {
          date: selectedDate,
          time: selectedTime,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          timestamp: new Date().toISOString()
        };

        setAppointments(prev => ({
          ...prev,
          [selectedDate]: [...(prev[selectedDate] || []), newAppointment]
        }));

        alert(t.alerts?.success || 'Randevunuz başarıyla oluşturuldu! Size en kısa sürede dönüş yapacağız.');
        
        // Formu sıfırla
        setFormData({
          name: '',
          email: '',
          phone: '',
          notes: ''
        });
        setSelectedDate('');
        setSelectedTime('');
        onClose();
      } else {
        throw new Error('Form gönderilemedi');
      }
    } catch (error) {
      console.error('Hata:', error);
      alert(t.alerts?.error || 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="session-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="session-container"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="session-close-btn" onClick={onClose}>
              &times;
            </button>

            <div className="session-header">
              <h2>{t.title || "ÖZEL KOKU SEANSI"}</h2>
              <p>{t.description?.line1 || "Koku notalarından oluşan bir masa;"}</p>
              <p>{t.description?.line2 || "Esanslar, bazlar ve akorlarla"}</p>
              <p>{t.description?.line3 || "kendi imza kokunuzu yaratmanız için tasarlanmış"}</p>
              <p>{t.description?.line4 || "özel bir koku yolculuğu"}</p>
            </div>

            <div className="session-content">
              <div className="session-info">
                <h3>{t.experience?.title || "Koku Seansı Deneyimi"}</h3>
                <p>
                  {t.experience?.intro || "Kişiye özel parfüm yaratımını hedefleyen bu deneyim, keşif ve deneyselliği bir araya getirerek bu süreci kişinin en derin dilini çözmeyi ve onu bir kokuya dönüştürmeyi amaçlar"}
                </p>
                
                <p><strong>{t.experience?.essenceDiscovery || "Esansların Keşfi:"}</strong></p>
                
                <ul>
                  <li>{t.experience?.points?.analysis || "Kişinin koku hafızasını anlamaya yönelik kısa bir analiz formuyla başlar"}</li>
                  <li>{t.experience?.points?.formBasis || "Bu form, parfüm tasarım sürecinin temelini oluşturur"}</li>
                  <li>{t.experience?.points?.profile || "Ardından, esansların içgüdüsel keşfine geçilerek kişisel koku profili belirlenir"}</li>
                  <li>{t.experience?.points?.reference || "Kendinize ait referans notalarını seçerek kişisel koku profilinizi oluşturursunuz"}</li>
                </ul>

                <p><strong>{t.experience?.formula || "Formülün geliştirilmesi:"}</strong></p>
                
                 <ul>
                  <li>{t.experience?.formulaPoints?.guidance || "Parfüm tasarımcısının rehberliğinde, seçtiğiniz notalar arasından baz, kalp ve üst katmanlarıyla özgün bir formül oluşturulur"}</li>
                  </ul>

                  <p><strong>{t.experience?.bottling || "Şişeleme:"}</strong></p>

                  <ul>
                  <li>{t.experience?.bottlingPoints?.personalization || "Kişisel parfümünüz, özel şişemize doldurulur ve sizin seçtiğiniz isimle kişiselleştirilir."}</li>
                  </ul>
              </div>

              <form className="session-form" onSubmit={handleSubmit}>
                <h3>{t.form?.title || "Randevunuzu Oluşturun"}</h3>
                
                <div className="form-row">
                  <div className="input-group">
                    <label>{t.form?.selectDate || "Tarih Seçiniz"}</label>
                    <div className="date-options">
                      {availableDates.map(date => (
                        <button
                          key={date}
                          type="button"
                          className={`date-option ${selectedDate === date ? 'selected' : ''}`}
                          onClick={() => handleDateSelect(date)}
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="input-group">
                    <label>{t.form?.selectTime || "Saat Seçiniz"}</label>
                    <div className="time-options">
                      {availableTimes.map(time => (
                        <button
                          key={time}
                          type="button"
                          className={`time-option ${selectedTime === time ? 'selected' : ''}`}
                          onClick={() => handleTimeSelect(time)}
                          disabled={!selectedDate}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="input-group">
                  <label>{t.form?.fullName || "Adınız Soyadınız"}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="input-group">
                    <label>{t.form?.email || "E-posta Adresiniz"}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>{t.form?.phone || "Telefon Numaranız"}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="input-group">
                  <label>{t.form?.notes || "Özel notlarınız (isteğe bağlı)"}</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder={t.form?.notesPlaceholder || "Koku tercihleriniz veya özel istekleriniz..."}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="session-submit-btn"
                  disabled={isSubmitting || !selectedDate || !selectedTime || !formData.name || !formData.email || !formData.phone}
                >
                  {isSubmitting 
                    ? (t.form?.submitting || 'GÖNDERİLİYOR...') 
                    : (t.form?.submit || 'RANDEVUNUZU OLUŞTURUN')
                  }
                </button>
                
                <p className="form-note">
                  {t.form?.formNote?.part1 || "Randevu onayı için sizinle iletişime geçilecektir."}
                  {' '}
                  <a href="https://www.instagram.com/hecateperfume/" target="_blank" rel="noopener noreferrer">
                    {t.form?.formNote?.instagram || "Instagram sayfamızı"}
                  </a>
                  {' '}
                  {t.form?.formNote?.part2 || "takip etmeyi unutmayın!"}
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FragranceSession;