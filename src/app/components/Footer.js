"use client";
import React from 'react';
import { Phone, Mail, MapPin, Youtube, Instagram, Facebook, MessageSquare } from 'lucide-react';
import styles from './Footer.module.css';
import { siteConfig } from '../../data/siteConfig';

export default function Footer() {
  const getWaLink = () => {
    const cleanWa = siteConfig.contact.whatsapp.replace(/\D/g, '');
    const waNumber = cleanWa.startsWith('0') ? '62' + cleanWa.substring(1) : cleanWa;
    return `https://wa.me/${waNumber}?text=Assalamu%27alaikum%20Admin%20SDIP%20Al-Hambra,%20saya%20ingin%20tanya%20mengenai%20sekolah.`;
  };

  return (
    <footer id="kontak" className={styles.footer}>
      <div className="container">
        <div className={styles.topRow}>
          {/* Column 1: School Profile */}
          <div className={styles.profileCol}>
            <div className={styles.logoContainer}>
              <img
                src="/image/Logo Sekolah.webp"
                alt="Logo SDIP Al-Hambra"
                className={styles.logo}
              />
              <span className={styles.schoolName}>{siteConfig.name}</span>
            </div>
            <p className={styles.tagline}>{siteConfig.tagline}</p>
            <p className={styles.summary}>
              Pendidikan dasar berkualitas yang memadukan keunggulan akademis (IPTEK) dengan nilai-nilai kepribadian Islami (IMTAK) berlandaskan Al-Qur'an dan Sunnah.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.linksCol}>
            <h4 className={styles.title}>Navigasi</h4>
            <ul className={styles.linksList}>
              <li><a href="#tentang">Tentang</a></li>
              <li><a href="#visi-misi">Visi & Misi</a></li>
              <li><a href="#fasilitas">Fasilitas</a></li>
              <li><a href="#ekskul">Ekstrakurikuler</a></li>
              <li><a href="#kontak">Hubungi Kami</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className={styles.contactCol}>
            <h4 className={styles.title}>Kontak Kami</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <MapPin size={22} className={styles.contactIcon} />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className={styles.contactItem}>
                <MessageSquare size={18} className={styles.contactIcon} />
                <a href={getWaLink()} target="_blank" rel="noopener noreferrer">
                  {siteConfig.contact.whatsapp} (WhatsApp)
                </a>
              </li>
              <li className={styles.contactItem}>
                <Phone size={18} className={styles.contactIcon} />
                <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}>
                  {siteConfig.contact.phone} (Telepon)
                </a>
              </li>
              <li className={styles.contactItem}>
                <Mail size={18} className={styles.contactIcon} />
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Google Maps Embed */}
          <div className={styles.mapCol}>
            <h4 className={styles.title}>Lokasi Sekolah</h4>
            <div className={styles.mapFrame}>
              <iframe
                src={siteConfig.contact.googleMapsEmbedUrl}
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi SDIP Al-Hambra"
              ></iframe>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.
          </p>
          <div className={styles.socials}>
            <a href={siteConfig.socialMedia.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href={siteConfig.socialMedia.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube size={20} />
            </a>
            <a href={siteConfig.socialMedia.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
