"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import { siteConfig } from '../../data/siteConfig';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';
  const isSolid = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getWaLink = () => {
    const cleanWa = siteConfig.contact.whatsapp.replace(/\D/g, '');
    const waNumber = cleanWa.startsWith('0') ? '62' + cleanWa.substring(1) : cleanWa;
    return `https://wa.me/${waNumber}?text=Assalamu%27alaikum%20Admin%20SDIP%20Al-Hambra,%20saya%20tertarik%20untuk%20mendaftarkan%20anak%20saya%20di%20PPDB.`;
  };

  const isBeritaActive = pathname?.startsWith('/berita');

  return (
    <nav className={`${styles.navbar} ${isSolid ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoContainer}>
          <img
            src="/image/Logo Sekolah.webp"
            alt="Logo SDIP Al-Hambra"
            className={styles.logo}
          />
          <div className={styles.logoText}>
            <span className={styles.schoolName}>SDIP Al-Hambra</span>
            <span className={styles.subText}>Kebayoran Lama</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          <Link href="/#tentang" className={styles.navLink}>Tentang</Link>
          <Link href="/#visi-misi" className={styles.navLink}>Visi & Misi</Link>
          <Link href="/#fasilitas" className={styles.navLink}>Fasilitas</Link>
          <Link href="/#ekskul" className={styles.navLink}>Ekskul</Link>
          <Link
            href="/berita"
            className={`${styles.navLink} ${isBeritaActive ? styles.activeNavLink : ''}`}
          >
            Berita
          </Link>
          <Link href="/#kontak" className={styles.navLink}>Kontak</Link>
          <a
            href={getWaLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            Daftar PPDB
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className={styles.mobileToggle} onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? (
            <X size={24} color="var(--maroon)" />
          ) : (
            <Menu size={24} color={isSolid ? "var(--maroon)" : "var(--white)"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/#tentang" className={styles.mobileNavLink} onClick={toggleMenu}>Tentang</Link>
          <Link href="/#visi-misi" className={styles.mobileNavLink} onClick={toggleMenu}>Visi & Misi</Link>
          <Link href="/#fasilitas" className={styles.mobileNavLink} onClick={toggleMenu}>Fasilitas</Link>
          <Link href="/#ekskul" className={styles.mobileNavLink} onClick={toggleMenu}>Ekskul</Link>
          <Link href="/berita" className={styles.mobileNavLink} onClick={toggleMenu}>Berita & Kegiatan</Link>
          <Link href="/#kontak" className={styles.mobileNavLink} onClick={toggleMenu}>Kontak</Link>
          <a
            href={getWaLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
            onClick={toggleMenu}
            style={{ marginTop: '1rem', width: '100%' }}
          >
            Daftar PPDB
          </a>
        </div>
      )}
    </nav>
  );
}
