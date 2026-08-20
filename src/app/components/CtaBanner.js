"use client";
import React from 'react';
import { MessageCircle, Calendar } from 'lucide-react';
import styles from './CtaBanner.module.css';
import { siteConfig } from '../../data/siteConfig';

export default function CtaBanner() {
  const getWaLink = () => {
    const cleanWa = siteConfig.contact.whatsapp.replace(/\D/g, '');
    const waNumber = cleanWa.startsWith('0') ? '62' + cleanWa.substring(1) : cleanWa;
    return `https://wa.me/${waNumber}?text=Assalamu%27alaikum%20Admin%20SDIP%20Al-Hambra,%20saya%20ingin%20tanya%20mengenai%20pendaftaran%20PPDB%20tahun%20ajaran%20baru.`;
  };

  return (
    <section className={styles.ctaSection}>
      <div className={styles.arabesqueOverlay} />
      <div className="container">
        <div className={styles.bannerCard}>
          <div className={styles.content}>
            <span className={styles.badge}>PENDAFTARAN PPDB DIBUKA</span>
            <h2 className={styles.title}>Mari Bergabung Bersama Keluarga Besar <br />SDIP Al-Hambra</h2>
            <p className={styles.description}>
              Berikan pendidikan terbaik untuk buah hati Anda. Kuota sangat terbatas (maksimal 24 siswa per kelas) untuk menjaga efektivitas pembelajaran Al-Qur'an dan bimbingan akhlak. Hubungi admin kami sekarang untuk informasi pendaftaran dan biaya.
            </p>
            <div className={styles.buttonGroup}>
              <a
                href={getWaLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
              >
                <MessageCircle size={20} fill="currentColor" /> Hubungi Admin WA
              </a>
              <a
                href={getWaLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-gold"
              >
                <Calendar size={20} /> Jadwalkan Kunjungan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
