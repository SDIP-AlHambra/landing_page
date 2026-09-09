"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Sparkles, Newspaper } from 'lucide-react';
import styles from './berita.module.css';
import { urlFor } from '@/sanity/client';
import { categoryMap, formatDate } from '@/sanity/queries';

export default function BeritaClient({ posts = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Any and all posts with isFeatured === true are placed in the top area
  const explicitFeatured = posts.filter((p) => p.isFeatured);

  // If no post is explicitly marked as featured, fallback to the latest 1 post
  const featuredPosts = explicitFeatured.length > 0
    ? explicitFeatured
    : (posts.length > 0 ? [posts[0]] : []);

  const featuredIds = new Set(featuredPosts.map((p) => p._id));
  const regularPosts = posts.filter((p) => !featuredIds.has(p._id));

  // Category filtering
  const filteredFeaturedPosts = selectedCategory === 'all'
    ? featuredPosts
    : featuredPosts.filter((p) => p.category === selectedCategory);

  const filteredRegularPosts = selectedCategory === 'all'
    ? regularPosts
    : regularPosts.filter((p) => p.category === selectedCategory);

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

        {/* Featured / Top Articles Area (Bisa 1 atau Lebih) */}
        {filteredFeaturedPosts.length > 0 && (
          <section className={styles.featuredSection} aria-label="Berita Utama">
            <div className={styles.featuredSectionHeader}>
              <div className={styles.featuredSectionLabel}>
                <Sparkles size={15} />
                <span>Berita Utama {filteredFeaturedPosts.length > 1 ? `(${filteredFeaturedPosts.length})` : ''}</span>
              </div>
            </div>

            {/* If exactly 1 featured article: display wide horizontal card */}
            {filteredFeaturedPosts.length === 1 ? (
              <Link
                href={`/berita/${filteredFeaturedPosts[0].slug}`}
                className={styles.featuredSingleCard}
              >
                <div className={styles.featuredImageWrapper}>
                  <img
                    src={getImageUrl(filteredFeaturedPosts[0].mainImage, 900, 600)}
                    alt={filteredFeaturedPosts[0].title}
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
                      {categoryMap[filteredFeaturedPosts[0].category] || 'Umum'}
                    </span>
                    <span className={styles.dateText}>
                      <Calendar size={14} />
                      {formatDate(filteredFeaturedPosts[0].publishedAt)}
                    </span>
                  </div>
                  <h2 className={styles.featuredTitle}>{filteredFeaturedPosts[0].title}</h2>
                  <p className={styles.featuredSnippet}>
                    {filteredFeaturedPosts[0].snippet || 'Klik untuk membaca laporan dan ulasan lengkap kegiatan ini.'}
                  </p>
                  <span className="btn btn-primary">
                    Baca Selengkapnya <ArrowRight size={18} />
                  </span>
                </div>
              </Link>
            ) : (
              /* If multiple featured articles: display responsive grid of featured cards */
              <div className={styles.featuredGrid}>
                {filteredFeaturedPosts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/berita/${post.slug}`}
                    className={styles.featuredGridCard}
                  >
                    <div className={styles.featuredGridImageWrapper}>
                      <img
                        src={getImageUrl(post.mainImage, 700, 440)}
                        alt={post.title}
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
                          {categoryMap[post.category] || 'Umum'}
                        </span>
                        <span className={styles.dateText}>
                          <Calendar size={14} />
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>
                      <h2 className={styles.featuredTitle}>{post.title}</h2>
                      <p className={styles.featuredSnippet}>
                        {post.snippet || 'Klik untuk membaca laporan dan ulasan lengkap kegiatan ini.'}
                      </p>
                      <span className={styles.readMoreLink} style={{ marginTop: 'auto' }}>
                        Baca Selengkapnya <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
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
        <section aria-label="Daftar Berita Lainnya">
          <div className={styles.gridHeader}>
            <h3 className={styles.gridHeading}>
              {selectedCategory === 'all'
                ? (filteredFeaturedPosts.length > 0 ? 'Berita & Kegiatan Lainnya' : 'Semua Kabar Terkini')
                : `Kategori: ${categoryMap[selectedCategory] || selectedCategory}`}
            </h3>
            <span className={styles.articleCount}>
              {filteredRegularPosts.length + filteredFeaturedPosts.length} Artikel
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
          ) : filteredFeaturedPosts.length === 0 ? (
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
