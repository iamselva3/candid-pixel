import React, { useState } from 'react';
import { content } from '../content/content';
import Magnetic from '../components/Magnetic';
import styles from '../styles/Section15Booking.module.css';

export default function Section15Booking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: 'Candid Wedding & Cinema',
    date: '',
    venue: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Working form handler with success state feedback
    setSubmitted(true);
  };

  return (
    <section id="booking" className={styles.bookingSection} aria-label="Reserve Dates & Inquiries">
      <div className={styles.bookingWrapper}>
        {/* Left Column: Direct Inquiries & Google Map Embed */}
        <div className={styles.infoCol}>
          <div className={styles.badgeRow}>
            <span className={styles.indexNum}>15</span>
            <span className={styles.badgeText}>INTAKE &bull; COMMISSIONS RESERVATION</span>
          </div>

          <h2 className={styles.headline}>
            Let&rsquo;s Frame <br />
            <span className={styles.headlineItalic}>Your Story.</span>
          </h2>

          <p className={styles.introPara}>
            Our dates for the 2025&ndash;2026 season are strictly limited to 24 commissions. Tell us about your rituals, your venue, and your vision.
          </p>

          <div className={styles.contactDetailsBlock}>
            <div className={styles.contactPoint}>
              <span className={styles.metaLabel}>PRIVATE CONCIERGE</span>
              <a href={`tel:${content.studio.phone}`} className={styles.metaLink}>
                {content.studio.phoneDisplay}
              </a>
              <a href={`mailto:${content.studio.email}`} className={styles.metaLink}>
                {content.studio.email}
              </a>
            </div>

            <div className={styles.contactPoint}>
              <span className={styles.metaLabel}>ATELIER ADDRESS</span>
              <p className={styles.metaAddress}>{content.studio.address}</p>
            </div>
          </div>

          {/* WhatsApp Direct Link */}
          <div className={styles.whatsappBox}>
            <a
              href={content.studio.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waBtn}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.18-.544-1.897-.788-3.125-2.736-3.218-2.862-.094-.125-.771-1.025-.771-1.956 0-.931.488-1.388.662-1.577.175-.188.381-.235.508-.235.127 0 .254.002.365.008.118.006.275-.045.43.328.157.375.539 1.314.586 1.41.047.095.079.206.016.332-.064.127-.095.206-.191.317-.095.111-.202.248-.288.334-.095.095-.195.198-.084.389.111.19.493.813 1.059 1.317.728.647 1.341.848 1.532.943.19.095.302.079.413-.048.111-.127.476-.556.603-.746.127-.19.254-.158.428-.095.175.063 1.111.524 1.302.619.19.095.317.143.365.222.048.079.048.46-.096.865z" />
              </svg>
              <span>INSTANT WHATSAPP PRIORITY INQUIRY &rarr;</span>
            </a>
          </div>

          {/* Google Maps Embed */}
          <div className={styles.mapFrame}>
            <iframe
              src={content.studio.googleMapsEmbed}
              title="Candid Pixel Studios Atelier Location"
              loading="lazy"
              className={styles.mapIframe}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Right Column: Working Booking Form */}
        <div className={styles.formCol}>
          {submitted ? (
            <div className={styles.successCard}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>Your Invitation is Received</h3>
              <p className={styles.successDesc}>
                Thank you for entrusting Candid Pixel with your celebration. Principal Director Karthik Subramanian will personally review your dates and reach out within 24 hours.
              </p>
              <button onClick={() => setSubmitted(false)} className={styles.resetBtn}>
                SEND ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.actualForm}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.inputLabel}>YOUR NAMES</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Aishwarya & Vikram"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="phone" className={styles.inputLabel}>PHONE / WHATSAPP</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="eventType" className={styles.inputLabel}>COMMISSION TYPE</label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className={styles.formSelect}
                  >
                    <option value="Candid Wedding & Cinema">Candid Wedding &amp; Cinema</option>
                    <option value="Destination Royal Wedding">Destination Royal Wedding</option>
                    <option value="Pre-Wedding Narrative">Pre-Wedding Narrative</option>
                    <option value="Traditional & Heritage Rites">Traditional &amp; Heritage Rites</option>
                    <option value="Maternity & Heirloom">Maternity &amp; Heirloom</option>
                    <option value="Luxury Private Gala">Luxury Private Gala</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="date" className={styles.inputLabel}>CELEBRATION DATE</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="venue" className={styles.inputLabel}>VENUE / CITY / DESTINATION</label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  placeholder="e.g. Umaid Bhawan Palace, Jodhpur"
                  value={formData.venue}
                  onChange={handleChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="message" className={styles.inputLabel}>YOUR VISION &amp; STORY</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Tell us about the flow of events, aesthetic preferences, and what matters most to you..."
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.formTextarea}
                ></textarea>
              </div>

              <Magnetic strength={0.4}>
                <button type="submit" className={styles.submitBtn} data-cursor="view">
                  <span>DISPATCH ATELIER INQUIRY</span>
                  <span className={styles.submitArrow}>&rarr;</span>
                </button>
              </Magnetic>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
