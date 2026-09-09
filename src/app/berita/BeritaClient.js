"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Sparkles, Newspaper } from 'lucide-react';
import styles from './berita.module.css';
import { urlFor } from '@/sanity/client';
import { categoryMap, formatDate } from '@/sanity/queries';

export default function BeritaClient({ posts = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Determine top/featured article
  const featuredPost = posts.find((p) => p.isFeatured) || posts[0] || null;
  const regularPosts = featuredPost ? posts.filter((p) => p._id !== featuredPost._id) : posts;

  // Filter regular posts by category
  const filteredRegularPosts = selectedCategory === 'all'
    ? regularPosts
    : regularPosts.filter((p) => p.category === selectedCategory);

  // Check if featured post matches the active filter
  const showFeaturedInFilter = featuredPost && (selectedCategory === 'all' || featuredPost.category === selectedCategory);

  const getImageUrl = (imageSource, width = 800, height = 500) => {
    if (!imageSource?.asset) return '/image/halaman_depan.jpg';
    try {
      return urlFor(imageSource).width(width).height(height).url();
    } catch {
      return '/image/halaman_depan.jpg';
    }
  };

  return (
    <div className={styles.newsPage}>
      <div className="container">
        {/* Header */}
        <header className={styles.pageHeader}>
          <h1 className={styles.title}>
            Kabar & <span className={styles.titleHighlight}>Kegiatan Sekolah</span>
          </h1>
          <p className={styles.subtitle}>
            Informasi terkini seputar agenda akademik, prestasi siswa, kegiatan sunnah, dan pengumuman resmi SDIP Al-Hambra.
          </p>
        </header>

        {/* Featured / Top Article */}
        {showFeaturedInFilter && featuredPost && (
          <section className={styles.featuredSection} aria-label="Berita Utama">
            <Link href={`/berita/${featuredPost.slug}`} className={styles.featuredCard}>
              <div className={styles.featuredImageWrapper}>
                <img
                  src={getImageUrl(featuredPost.mainImage, 900, 600)}
                  alt={featuredPost.title}
                  className={styles.featuredImage}
                />
              </div>
              <div className={styles.featuredContent}>
                <div className={styles.topBadge}>
                  <Sparkles size={14} />
                  <span>Berita Utama</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.categoryTag}>
                    {categoryMap[featuredPost.category] || 'Umum'}
                  </span>
                  <span className={styles.dateText}>
                    <Calendar size={14} />
                    {formatDate(featuredPost.publishedAt)}
                  </span>
                </div>
                <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                <p className={styles.featuredSnippet}>
                  {featuredPost.snippet || 'Klik untuk membaca laporan dan ulasan lengkap kegiatan ini.'}
                </p>
                <span className="btn btn-primary">
                  Baca Selengkapnya <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* Category Filters */}
        <nav className={styles.filterContainer} aria-label="Filter Kategori">
          <button
            type="button"
            className={`${styles.filterBtn} ${selectedCategory === 'all' ? styles.filterBtnActive : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Semua Berita
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${selectedCategory === 'kegiatan' ? styles.filterBtnActive : ''}`}
            onClick={() => setSelectedCategory('kegiatan')}
          >
            Kegiatan Sekolah
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${selectedCategory === 'prestasi' ? styles.filterBtnActive : ''}`}
            onClick={() => setSelectedCategory('prestasi')}
          >
            Prestasi Siswa
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${selectedCategory === 'pengumuman' ? styles.filterBtnActive : ''}`}
            onClick={() => setSelectedCategory('pengumuman')}
          >
            Pengumuman
          </button>
        </nav>

        {/* Regular News Grid */}
        <section aria-label="Daftar Berita">
          <div className={styles.gridHeader}>
            <h3 className={styles.gridHeading}>
              {selectedCategory === 'all'
                ? 'Semua Kabar Terkini'
                : `Kategori: ${categoryMap[selectedCategory] || selectedCategory}`}
            </h3>
            <span className={styles.articleCount}>
              {filteredRegularPosts.length + (showFeaturedInFilter && featuredPost ? 1 : 0)} Artikel
            </span>
          </div>

          {filteredRegularPosts.length > 0 ? (
            <div className={styles.newsGrid}>
              {filteredRegularPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/berita/${post.slug}`}
                  className={styles.newsCard}
                >
                  <div className={styles.cardImageWrapper}>
                    <img
                      src={getImageUrl(post.mainImage, 600, 380)}
                      alt={post.title}
                      className={styles.cardImage}
                    />
                    <span className={styles.cardCategoryBadge}>
                      {categoryMap[post.category] || 'Umum'}
                    </span>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardDate}>
                      <Calendar size={13} />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <h4 className={styles.cardTitle}>{post.title}</h4>
                    <p className={styles.cardSnippet}>
                      {post.snippet || 'Klik untuk membaca rincian artikel ini selengkapnya.'}
                    </p>
                    <span className={styles.readMoreLink}>
                      Baca Artikel <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : !showFeaturedInFilter ? (
            <div className={styles.emptyState}>
              <Newspaper size={44} color="#8C1C13" style={{ marginBottom: '1rem', opacity: 0.6 }} />
              <h4 className={styles.emptyTitle}>Belum Ada Berita</h4>
              <p className={styles.emptyText}>
                Belum ada artikel yang dipublikasikan pada kategori ini. Silakan pilih kategori lain.
              </p>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
