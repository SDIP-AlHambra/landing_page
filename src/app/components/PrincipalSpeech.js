"use client";
import React from 'react';
import styles from './PrincipalSpeech.module.css';
import { KepalaSekolah } from '../../data/kepalaSekolah';

export default function PrincipalSpeech() {
  return (
    <section className="bg-arabesque">
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Photo */}
          <div className={styles.photoContainer}>
            <div className={styles.frameWrapper}>
              <div className={styles.goldFrameDecoration}>
                <img
                  src={KepalaSekolah.foto}
                  alt={KepalaSekolah.name}
                  className={styles.photo}
                />
              </div>
            </div>
            <div className={styles.badgeLabel}>
              <h4 className={styles.principalName}>{KepalaSekolah.name}</h4>
              <p className={styles.principalRole}>{KepalaSekolah.role}</p>
            </div>
          </div>

          {/* Right Column: Speech Text */}
          <div className={styles.speechContent}>
            <span className="badge-gold">{KepalaSekolah.welcomeSpeech.pembukaan}</span>
            <h2 className={styles.title}>Membimbing dengan Kasih, Mendidik dengan Al-Qur'an</h2>
            <div className={styles.textBlock}>
              {KepalaSekolah.welcomeSpeech.isi.map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className={styles.signature}>
              <div className={styles.signatureText}>
                <p>Wassalamu'alaikum Wr. Wb.</p>
                <strong>{KepalaSekolah.name}</strong>
                <span>Kepala Sekolah SDIP Al-Hambra</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
