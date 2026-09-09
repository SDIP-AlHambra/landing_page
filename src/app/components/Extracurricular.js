"use client";
import React, { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';
import styles from './Extracurricular.module.css';
import { eskul } from '../../data/extracurricular';

export default function Extracurricular() {
  const [activeImage, setActiveImage] = useState(null);

  const openLightbox = (item) => {
    setActiveImage(item);
    document.body.style.overflow = 'hidden'; // Lock scrolling
  };

  const closeLightbox = () => {
    setActiveImage(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  return (
    <section id="ekskul" className={styles.eskulSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Ekstrakurikuler</h2>
          <p className={styles.sectionSubtitle}>
            Wadah pengembangan diri santri untuk menyalurkan minat, bakat, serta ketangkasan jasmani dan rohani.
          </p>
        </div>

        <div className={styles.grid}>
          {eskul.map((item, index) => (
            <div key={item.id || item.title || index} className={styles.card} onClick={() => openLightbox(item)}>
              <div className={styles.imageContainer}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.eskulImage}
                />
                <div className={styles.hoverOverlay}>
                  <div className={styles.zoomButton}>
                    <ZoomIn size={24} />
                    <span>Lihat Foto</span>
                  </div>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <span className={styles.cardArrow}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.closeBtn} onClick={closeLightbox} aria-label="Close Lightbox">
            <X size={32} />
          </button>
          
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={activeImage.image}
              alt={activeImage.title}
              className={styles.lightboxImage}
            />
            <div className={styles.lightboxCaption}>
              <h3>{activeImage.title}</h3>
              <p>SDIP Al-Hambra Ekstrakurikuler Mandiri</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
