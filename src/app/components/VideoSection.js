"use client";
import React from 'react';
import styles from './VideoSection.module.css';
import { heroData } from '../../data/heroData';

export default function VideoSection() {
  return (
    <section id="video-profil" className={styles.videoSection}>
      <div className={styles.subtleArabesque} />
      <div className={styles.wideContainer}>
        <div className={styles.grid}>
          {/* Left Column: Larger Video */}
          <div className={styles.mediaContainer}>
            <div className={styles.videoOuterFrame}>
              <div className="video-responsive">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${heroData.youtubeVideoId}?autoplay=0`}
                  title="Video Profil SDIP Al-Hambra"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Column: Text Info */}
          <div className={styles.textContainer}>
            <h2 className={styles.sectionTitle}>Video Profil SDIP Al-Hambra</h2>
            <p className={styles.sectionSubtitle}>
              Saksikan sekilas kegiatan belajar mengajar, sarana pendukung, dan atmosfer keagamaan di sekolah kami.
            </p>
            <p className={styles.sectionDescription}>
              Melalui video ini, kami mengajak Anda untuk melihat secara langsung lingkungan sekolah yang bersih, ruang kelas yang kondusif, sarana olahraga Sunnah seperti kolam renang privat, serta keceriaan para siswa dalam menuntut ilmu dan menghafal Al-Qur'an.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
