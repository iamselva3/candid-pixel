import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../content/content';
import styles from '../styles/Section14Faq.module.css';

export default function Section14Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className={styles.faqSection} aria-label="Frequently Asked Questions">
      <div className={styles.faqWrapper}>
        <div className={styles.sectionHeader}>
          <div className={styles.badgeRow}>
            <span className={styles.indexNum}>14</span>
            <span className={styles.badgeText}>CLARITY &bull; ESSENTIAL INQUIRIES</span>
          </div>
          <h2 className={styles.title}>Answers to Common Wonderings</h2>
        </div>

        <div className={styles.accordionContainer}>
          {content.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`${styles.accordionItem} ${isOpen ? styles.itemOpen : ''}`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={styles.accordionHeaderBtn}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionIndex}>0{index + 1}</span>
                  <span className={styles.questionText}>{faq.question}</span>

                  {/* Gold Plus-to-Cross Morph Icon */}
                  <div className={`${styles.morphIcon} ${isOpen ? styles.morphRotated : ''}`}>
                    <span className={styles.morphH}></span>
                    <span className={styles.morphV}></span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className={styles.accordionContent}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                    >
                      <p className={styles.answerText}>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
