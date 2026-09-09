import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ChevronRight, ArrowLeft, MessageCircle } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './detail.module.css';
import { urlFor } from '@/sanity/client';
import { getPostBySlug, getRecentPosts, categoryMap, formatDate } from '@/sanity/queries';
import { siteConfig } from '@/data/siteConfig';

export const revalidate = 30;

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: `Berita Tidak Ditemukan - ${siteConfig.name}`,
    };
  }
  return {
    title: `${post.title} - ${siteConfig.name}`,
    description: `Baca selengkapnya artikel ${post.title} di website resmi ${siteConfig.name}.`,
  };
}

export default async function BeritaDetailPage({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const recentPosts = await getRecentPosts(params.slug, 3);

  const getImageUrl = (imageSource, width = 900, height = 550) => {
    if (!imageSource?.asset) return '/image/halaman_depan.jpg';
    try {
      return urlFor(imageSource).width(width).height(height).url();
    } catch {
      return '/image/halaman_depan.jpg';
    }
  };

  // Custom PortableText components for Sanity Rich Text
  const portableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset) return null;
        try {
          const imgUrl = urlFor(value).width(900).url();
          return (
            <figure className={styles.contentImageWrapper}>
              <img
                src={imgUrl}
                alt={value.alt || post.title}
                className={styles.contentImage}
              />
              {value.caption && (
                <figcaption className={styles.imageCaption}>{value.caption}</figcaption>
              )}
            </figure>
          );
        } catch {
          return null;
        }
      },
    },
    block: {
      h2: ({ children }) => <h2 className={styles.heading2}>{children}</h2>,
      h3: ({ children }) => <h3 className={styles.heading3}>{children}</h3>,
      normal: ({ children }) => <p className={styles.paragraph}>{children}</p>,
      blockquote: ({ children }) => <blockquote className={styles.quote}>{children}</blockquote>,
    },
    list: {
      bullet: ({ children }) => <ul className={styles.bulletList}>{children}</ul>,
      number: ({ children }) => <ol className={styles.numberedList}>{children}</ol>,
    },
  };

  const getWaShareLink = () => {
    const text = encodeURIComponent(
      `Assalamu'alaikum, baca kabar menarik ini dari SDIP Al-Hambra: "${post.title}"`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <>
      <Navbar />
      <main className={styles.articlePage}>
        <div className={styles.articleContainer}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Beranda</Link>
            <ChevronRight size={14} className={styles.breadcrumbSeparator} />
            <Link href="/berita">Berita & Kegiatan</Link>
            <ChevronRight size={14} className={styles.breadcrumbSeparator} />
            <span className={styles.breadcrumbActive}>{post.title}</span>
          </nav>

          {/* Header */}
          <header className={styles.articleHeader}>
            <div className={styles.metaRow}>
              <span className={styles.categoryBadge}>
                {categoryMap[post.category] || 'Umum'}
              </span>
              <span className={styles.dateRow}>
                <Calendar size={15} />
                <span>{formatDate(post.publishedAt)}</span>
              </span>
            </div>
            <h1 className={styles.articleTitle}>{post.title}</h1>
          </header>

          {/* Main Image */}
          {post.mainImage && (
            <div className={styles.featuredImageWrapper}>
              <img
                src={getImageUrl(post.mainImage, 1000, 600)}
                alt={post.title}
                className={styles.featuredImage}
              />
            </div>
          )}

          {/* Full Article Content */}
          <article className={styles.articleBody}>
            {post.body && post.body.length > 0 ? (
              <PortableText value={post.body} components={portableTextComponents} />
            ) : (
              <p className={styles.paragraph}>Belum ada isi naskah untuk berita ini.</p>
            )}

            {/* Bottom Actions */}
            <div className={styles.actionRow}>
              <Link href="/berita" className={styles.backBtn}>
                <ArrowLeft size={18} />
                <span>Kembali ke Semua Berita</span>
              </Link>
              <a
                href={getWaShareLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
              >
                <MessageCircle size={18} />
                <span>Bagikan ke WhatsApp</span>
              </a>
            </div>
          </article>

          {/* Related / Recent Posts */}
          {recentPosts.length > 0 && (
            <section className={styles.relatedSection}>
              <h3 className={styles.relatedTitle}>Kabar Terkini Lainnya</h3>
              <div className={styles.relatedGrid}>
                {recentPosts.map((recent) => (
                  <Link
                    key={recent._id}
                    href={`/berita/${recent.slug}`}
                    className={styles.relatedCard}
                  >
                    <div className={styles.relatedImageWrapper}>
                      <img
                        src={getImageUrl(recent.mainImage, 500, 320)}
                        alt={recent.title}
                        className={styles.relatedImage}
                      />
                    </div>
                    <div className={styles.relatedCardBody}>
                      <span className={styles.relatedDate}>
                        {formatDate(recent.publishedAt)}
                      </span>
                      <h4 className={styles.relatedCardTitle}>{recent.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
