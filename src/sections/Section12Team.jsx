import React from 'react';
import { content } from '../content/content';
import styles from '../styles/Section12Team.module.css';

export default function Section12Team() {
  return (
    <section id="team" className={styles.teamSection} aria-label="The Visionary Artists">
      <div className={styles.teamWrapper}>
        <div className={styles.sectionHeader}>
          <div className={styles.badgeRow}>
            <span className={styles.indexNum}>12</span>
            <span className={styles.badgeText}>THE ATELIER VISIONARIES</span>
          </div>
          <h2 className={styles.title}>Masters Behind The Glass</h2>
          <p className={styles.subtitle}>
            A curated collective of cine masters, colorists, and fine art archivists united by an obsession for truth in light.
          </p>
        </div>

        <div className={styles.teamGrid}>
          {content.team.map((member) => (
            <div key={member.id} className={styles.memberCard}>
              <div className={styles.portraitFrame}>
                {/* Master Sharp Portrait */}
                <img
                  src={member.photo}
                  alt={member.name}
                  className={styles.portraitSharp}
                  loading="lazy"
                />

                {/* Halftone Pattern Dot Screen Transition Layer */}
                <div className={styles.halftoneLayer}></div>
                <div className={styles.portraitVignette}></div>

                <div className={styles.expBadge}>
                  <span>{member.experience}</span>
                </div>
              </div>

              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <span className={styles.memberRole}>{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
