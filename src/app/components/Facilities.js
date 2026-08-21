"use client";
import React from 'react';
import styles from './Facilities.module.css';
import { facilities } from '../../data/facilities';

export default function Facilities() {
  return (
    <section id="fasilitas" className={styles.facilitiesSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Fasilitas Sekolah</h2>
          <p className={styles.sectionSubtitle}>
            Dukungan fasilitas belajar kondusif yang mengintegrasikan aspek akademis dengan nilai-nilai luhur Sunnah Rasulullah SAW.
          </p>
        </div>

        <div className={styles.cardsContainer}>
          {facilities.map((fac) => (
            <div key={fac.id} className={styles.facilityCard}>
              {/* Left Column: Image with shading/fade-out gradient */}
              <div className={styles.imageColumn}>
                <img
                  src={fac.image}
                  alt={fac.title}
                  className={styles.facilityImage}
                />
                <div className={styles.fadeOverlay} />
              </div>

              {/* Right Column: Information */}
              <div className={styles.infoColumn}>
                <h3 className={styles.facilityTitle}>{fac.title}</h3>
                
                {fac.quote && (
                  <div className={styles.quoteBox}>
                    <p className={styles.quoteText}>{fac.quote}</p>
                    <span className={styles.quoteSource}>{fac.sumber_quote}</span>
                  </div>
                )}
                
                <p className={styles.description}>{fac.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
