"use client";
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { Play, ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';
import { heroData } from '../../data/heroData';
import { siteConfig } from '../../data/siteConfig';

export default function Hero() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: heroData.typingWords,
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const getWaLink = () => {
    const cleanWa = siteConfig.contact.whatsapp.replace(/\D/g, '');
    const waNumber = cleanWa.startsWith('0') ? '62' + cleanWa.substring(1) : cleanWa;
    return `https://wa.me/${waNumber}?text=Assalamu%27alaikum%20Admin%20SDIP%20Al-Hambra,%20saya%20ingin%20tanya%20mengenai%20pendaftaran%20PPDB.`;
  };

  return (
    <section id="tentang" className={styles.heroSection}>
      <div className={styles.absoluteBackground} />
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Text Content */}
          <div className={styles.content}>
            <span className="badge-gold">{heroData.pembukaan}</span>
            <h1 className={styles.title}>
              Selamat Datang di <br />
              <span className={styles.highlight}>SDIP Al-Hambra</span>
            </h1>
            <h2 className={styles.jargon}>
              {heroData.taglinePrefix} <br className={styles.breakOnMobile} />
              <span ref={el} className={styles.typedText} />
            </h2>
            <p className={styles.description}>
              {siteConfig.tagline}. {heroData.vision} Kami bertekad mendidik tunas bangsa berlandaskan Al-Qur'an dan Sunnah, menanamkan akhlak mulia, serta membekali anak dengan kecerdasan emosional, spiritual, dan intelektual.
            </p>
            <div className={styles.ctaGroup}>
              <a href={getWaLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Daftar PPDB <ArrowRight size={18} />
              </a>
              <a href="#visi-misi" className="btn btn-outline">
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>

          {/* Right Column: Responsive Video Embed */}
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
        </div>
      </div>
    </section>
  );
}
