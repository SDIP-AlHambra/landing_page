"use client";
import React from 'react';
import { BookOpen, Heart, Shield, Languages, Leaf } from 'lucide-react';
import styles from './VisiMisi.module.css';
import { heroData } from '../../data/heroData';

export default function VisiMisi() {
  const getIcon = (index) => {
    const iconSize = 24;
    const colors = ["#8C1C13", "#C5A059", "#8C1C13", "#C5A059", "#8C1C13"];
    const style = { color: colors[index] };
    
    switch (index) {
      case 0:
        return <BookOpen size={iconSize} style={style} />;
      case 1:
        return <Heart size={iconSize} style={style} />;
      case 2:
        return <Shield size={iconSize} style={style} />;
      case 3:
        return <Languages size={iconSize} style={style} />;
      case 4:
        return <Leaf size={iconSize} style={style} />;
      default:
        return <BookOpen size={iconSize} style={style} />;
    }
  };

  return (
    <section id="visi-misi" className={styles.visiMisiSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className="badge-gold">Haluan Pendidikan</span>
          <h2 className={styles.sectionTitle}>Visi & Misi Sekolah</h2>
          <p className={styles.sectionSubtitle}>Landasan utama kami dalam mendidik generasi penerus yang cerdas dan bertaqwa.</p>
        </div>

        <div className={styles.grid}>
          {/* Left Card: Visi */}
          <div className={styles.visiCard}>
            <div className={styles.visiAccent} />
            <span className={styles.cardLabel}>VISI UTAMA</span>
            <blockquote className={styles.visiQuote}>
              "{heroData.vision}"
            </blockquote>
            <div className={styles.arabesqueDecoration} />
          </div>

          {/* Right Card: Misi */}
          <div className={styles.misiCard}>
            <span className={styles.cardLabel}>MISI SEKOLAH</span>
            <ul className={styles.misiList}>
              {heroData.missions.map((misi, index) => (
                <li key={index} className={styles.misiItem}>
                  <div className={styles.iconWrapper}>
                    {getIcon(index)}
                  </div>
                  <div className={styles.misiText}>
                    <p>{misi}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
