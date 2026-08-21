"use client";
import React from 'react';
import styles from './ImageBanner.module.css';

export default function ImageBanner() {
  return (
    <section className={styles.bannerSection}>
      <div className={styles.imageContainer}>
        <img
          src="/image/halaman_depan.jpg"
          alt="SDIP Al-Hambra Halaman Depan"
          className={styles.bannerImage}
        />
        <div className={styles.gradientOverlay} />
      </div>
    </section>
  );
}
