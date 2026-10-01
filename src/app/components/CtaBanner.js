"use client";
import React from 'react';
import Link from 'next/link';
import { Calendar, FileText, BookOpen, ArrowRight } from 'lucide-react';
import styles from './CtaBanner.module.css';
import { siteConfig } from '../../data/siteConfig';

export default function CtaBanner() {
  const getVisitWaLink = () => {
    const cleanWa = siteConfig.contact.whatsapp.replace(/\D/g, '');
    const waNumber = cleanWa.startsWith('0') ? '62' + cleanWa.substring(1) : cleanWa;
    return `https://wa.me/${waNumber}?text=Assalamu%27alaikum%20Admin%20SDIP%20Al-Hambra,%20saya%20ingin%20menjadwalkan%20kunjungan%20ke%20sekolah.`;
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
              Berikan pendidikan terbaik untuk buah hati Anda. Kuota sangat terbatas (maksimal 24 siswa per kelas) untuk menjaga efektivitas pembelajaran Al-Qur'an dan bimbingan akhlak. Silakan isi formulir pendaftaran online atau pelajari informasi lengkap PPDB melalui brosur kami.
            </p>
            
            {/* Top 2 Buttons: Google Form & Schedule Visit via WhatsApp */}
            <div className={styles.buttonGroup}>
              <a
                href={siteConfig.ppdb.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
                title="Buka Formulir Pendaftaran PPDB"
              >
                <FileText size={20} /> Isi Formulir Pendaftaran
              </a>
              <a
                href={getVisitWaLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-gold"
                title="Jadwalkan Kunjungan via WhatsApp"
              >
                <Calendar size={20} /> Jadwalkan Kunjungan
              </a>
            </div>

            {/* Dedicated PPDB Page Button Below */}
            <div className={styles.ppdbPageButtonContainer}>
              <Link
                href="/ppdb"
                className={styles.ppdbPageBtn}
              >
                <BookOpen size={18} />
                <span>Lihat Brosur & Informasi Lengkap PPDB</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
