import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import styles from './NewsSnippet.module.css';
import { urlFor } from '@/sanity/client';
import { getTopNewsSnippets, categoryMap, formatDate } from '@/sanity/queries';

export default async function NewsSnippet() {
  const posts = await getTopNewsSnippets(3);

  if (!posts || posts.length === 0) {
    return null;
  }

  const getImageUrl = (imageSource) => {
    if (!imageSource?.asset) return '/image/halaman_depan.jpg';
    try {
      return urlFor(imageSource).width(600).height(380).url();
    } catch {
      return '/image/halaman_depan.jpg';
    }
  };

  const getGridClass = () => {
    if (posts.length === 1) return `${styles.grid} ${styles.singleCardGrid}`;
    if (posts.length === 2) return `${styles.grid} ${styles.twoCardGrid}`;
    return styles.grid;
  };

  return (
    <section className={styles.newsSection}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Kabar & <span className={styles.highlight}>Berita Terkini</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Ikuti berbagai kabar inspiratif, agenda kegiatan santri, dan pengumuman resmi dari SDIP Al-Hambra.
          </p>
        </div>

        {/* 3 Top Snippets Grid: disusun kanan-kiri */}
        <div className={getGridClass()}>
          {posts.map((post, index) => (
            <Link
              key={post._id || post.slug || index}
              href={`/berita/${post.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={getImageUrl(post.mainImage)}
                  alt={post.title}
                  className={styles.cardImage}
                />
                <span className={styles.categoryBadge}>
                  {categoryMap[post.category] || 'Umum'}
                </span>
                {post.isFeatured && (
                  <span className={styles.topBadge}>
                    <Sparkles size={11} style={{ display: 'inline', marginRight: 3 }} />
                    Top
                  </span>
                )}
              </div>
              <div className={styles.cardContent}>
                <div className={styles.metaRow}>
                  <Calendar size={14} />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.snippet}>
                  {post.snippet || 'Klik untuk membaca laporan dan ulasan lengkap kegiatan ini.'}
                </p>
                <span className={styles.readMore}>
                  Baca Selengkapnya <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Button to News Page */}
        <div className={styles.bottomAction}>
          <Link href="/berita" className={styles.seeAllBtn}>
            Lihat Semua Berita & Kegiatan <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
