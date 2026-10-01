import React from 'react';
import Link from 'next/link';
import {
  FileText,
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BrochureCarousel from './BrochureCarousel';
import styles from './ppdb.module.css';
import { siteConfig } from '@/data/siteConfig';

export const metadata = {
  title: `Pendaftaran PPDB - ${siteConfig.name}`,
  description: `Informasi resmi Penerimaan Peserta Didik Baru (PPDB) ${siteConfig.name}. Lihat brosur lengkap, syarat pendaftaran, dan isi formulir pendaftaran online.`,
  openGraph: {
    title: `Pendaftaran PPDB - ${siteConfig.name}`,
    description: `Penerimaan Peserta Didik Baru (PPDB) ${siteConfig.name}. Kuota terbatas 24 siswa per kelas.`,
    images: [
      {
        url: '/apple-touch-icon.png',
        width: 180,
        height: 180,
        alt: `Logo ${siteConfig.name}`,
      },
    ],
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function PpdbPage() {
  const cleanWa = siteConfig.contact.whatsapp.replace(/\D/g, '');
  const waNumber = cleanWa.startsWith('62')
    ? cleanWa
    : cleanWa.startsWith('0')
      ? '62' + cleanWa.substring(1)
      : '62' + cleanWa;
  const waConsultationLink = `https://wa.me/${waNumber}?text=Assalamu%27alaikum%20Ibu%20Lia%20(PPDB%20SDIP%20Al-Hambra),%20saya%20ingin%20berkonsultasi%20mengenai%20pendaftaran%20PPDB%20siswa%20baru.`;
  const waVisitLink = `https://wa.me/${waNumber}?text=Assalamu%27alaikum%20Ibu%20Lia%20(SDIP%20Al-Hambra),%20saya%20ingin%20menjadwalkan%20kunjungan%20ke%20sekolah%20terkait%20PPDB.`;

  return (
    <>
      <Navbar />
      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroOverlay} />
          <div className="container">
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/" className={styles.breadcrumbLink}>Beranda</Link>
              <ChevronRight size={14} className={styles.breadcrumbSeparator} />
              <span className={styles.breadcrumbCurrent}>PPDB</span>
            </nav>

            <div className={styles.heroHeader}>
              <div className={styles.badge}>
                <Sparkles size={16} /> PENERIMAAN PESERTA DIDIK BARU (PPDB)
              </div>
              <h1 className={styles.title}>
                Bergabunglah Bersama Keluarga Besar <br />
                <span className={styles.highlight}>{siteConfig.name}</span>
              </h1>
              <p className={styles.subtitle}>
                Membentuk generasi Qur'ani yang berakhlak mulia, cerdas, mandiri, dan berwawasan luas.
                Kuota terbatas maksimal 24 siswa per kelas untuk menjamin kualitas bimbingan terbaik bagi putra-putri Anda.
              </p>
            </div>
          </div>
        </section>

        {/* Brochure Section */}
        <section className={styles.brochureSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>BROSUR RESMI</span>
              <h2 className={styles.sectionTitle}>Brosur & Informasi Pendaftaran</h2>
              <p className={styles.sectionSubtitle}>
                Silakan geser halaman brosur di bawah atau gunakan tombol perbesar untuk membaca rincian program, kurikulum, dan informasi pendaftaran dengan lebih jelas.
              </p>
            </div>

            <BrochureCarousel brochures={siteConfig.ppdb.brochures} />
          </div>
        </section>

        {/* Registration CTA Card (Direct Link to Google Form) */}
        <section className={styles.registrationSection}>
          <div className="container">
            <div className={styles.registrationCard}>
              <div className={styles.regCardHeader}>
                <span className={styles.regBadge}>LANGKAH PENDAFTARAN</span>
                <h2 className={styles.regTitle}>Formulir Pendaftaran Online PPDB</h2>
                <p className={styles.regDesc}>
                  Pendaftaran dapat dilakukan secara praktis melalui formulir online (Google Form) di bawah ini. Pastikan Anda telah membaca brosur dan menyiapkan data calon peserta didik.
                </p>
              </div>

              {/* Steps */}
              <div className={styles.stepsGrid}>
                <div className={styles.stepItem}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h3>Isi Formulir Online</h3>
                    <p>Klik tombol formulir Google Form di bawah dan lengkapi data calon siswa serta orang tua.</p>
                  </div>
                </div>

                <div className={styles.stepItem}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h3>Konfirmasi ke Panitia</h3>
                    <p>Konfirmasi pengisian formulir melalui WhatsApp agar panitia dapat segera memverifikasi berkas Anda.</p>
                  </div>
                </div>

                <div className={styles.stepItem}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h3>Observasi & Kunjungan</h3>
                    <p>Ikuti sesi observasi santai untuk calon siswa dan wawancara pemetaan minat bakat di kampus sekolah.</p>
                  </div>
                </div>
              </div>

              {/* Registration Action Buttons */}
              <div className={styles.actionButtonGroup}>
                <a
                  href={siteConfig.ppdb.googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryFormBtn}
                >
                  <FileText size={22} />
                  <span>
                    <strong>Isi Formulir Pendaftaran PPDB</strong>
                    <small>Klik untuk membuka Google Form Pendaftaran</small>
                  </span>
                  <ExternalLink size={18} className={styles.externalIcon} />
                </a>

                <div className={styles.secondaryButtonGroup}>
                  <a
                    href={waConsultationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryBtn}
                  >
                    <MessageCircle size={18} />
                    <span>Tanya Admin PPDB (WhatsApp)</span>
                  </a>

                  <a
                    href={waVisitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryBtn}
                  >
                    <Calendar size={18} />
                    <span>Jadwalkan Kunjungan Sekolah</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Information Cards */}
            <div className={styles.infoCardsGrid}>
              <div className={styles.infoCard}>
                <div className={styles.infoIconWrapper}>
                  <CheckCircle2 size={24} color="var(--gold)" />
                </div>
                <h3>Keunggulan Kelas</h3>
                <p>Maksimal 24 siswa per kelas dengan 2 pendidik di kelas awal untuk pendampingan tahfizh dan karakter yang optimal.</p>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIconWrapper}>
                  <Clock size={24} color="var(--gold)" />
                </div>
                <h3>Layanan Informasi PPDB</h3>
                <p>Senin – Jumat: 07.30 – 15.00 WIB<br />Sabtu: 08.00 – 12.00 WIB (Dengan Janji Temu)</p>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIconWrapper}>
                  <MapPin size={24} color="var(--gold)" />
                </div>
                <h3>Lokasi Sekolah</h3>
                <p>{siteConfig.contact.address}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
