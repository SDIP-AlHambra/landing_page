"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Download, 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  ExternalLink 
} from 'lucide-react';
import styles from './BrochureCarousel.module.css';

export default function BrochureCarousel({ brochures = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [touchStartX, setTouchStartX] = useState(null);

  const total = brochures.length;
  const currentBrochure = brochures[currentIndex] || brochures[0];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, isModalOpen]);

  // Touch swipe handling
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  const openModal = () => {
    setZoomLevel(1);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setZoomLevel(1);
    document.body.style.overflow = '';
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.35, 0.75));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  if (!brochures || brochures.length === 0) {
    return null;
  }

  return (
    <div className={styles.carouselWrapper}>
      {/* Main Carousel Display with Smooth Sliding Track */}
      <div 
        className={styles.carouselContainer}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.sliderViewport}>
          <div 
            className={styles.sliderTrack}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {brochures.map((item, idx) => (
              <div key={item.id || idx} className={styles.slideItem}>
                <img
                  src={encodeURI(item.image)}
                  alt={item.title || `Brosur Halaman ${idx + 1}`}
                  className={styles.brochureImg}
                  onClick={openModal}
                  title="Klik untuk memperbesar brosur"
                />
              </div>
            ))}
          </div>

          {/* Floating Actions on Top Right */}
          <div className={styles.floatingActions}>
            <button
              onClick={openModal}
              className={styles.actionBtn}
              title="Perbesar Brosur (Fullscreen)"
              aria-label="Perbesar Brosur"
            >
              <Maximize2 size={16} />
              <span>Perbesar</span>
            </button>
            <a
              href={encodeURI(currentBrochure.image)}
              download={`Brosur-SDIP-Al-Hambra-Hal-${currentIndex + 1}.jpeg`}
              className={styles.actionBtn}
              title="Unduh Gambar Brosur"
              aria-label="Unduh Gambar Brosur"
            >
              <Download size={16} />
              <span>Unduh</span>
            </a>
          </div>

          {/* Page Counter Badge on Bottom Left */}
          <div className={styles.pageBadge}>
            <span>{currentIndex + 1} / {total}</span>
          </div>

          {/* Prominent Navigation Arrows */}
          <button
            onClick={handlePrev}
            className={`${styles.navBtn} ${styles.prevBtn}`}
            aria-label="Halaman Sebelumnya"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={handleNext}
            className={`${styles.navBtn} ${styles.nextBtn}`}
            aria-label="Halaman Selanjutnya"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Carousel Bottom Controls: Dot Indicators & Zoom hint */}
        <div className={styles.bottomControls}>
          <div className={styles.indicators}>
            {brochures.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ke halaman ${index + 1}`}
              />
            ))}
          </div>

          <button onClick={openModal} className={styles.zoomHintBtn}>
            <Maximize2 size={15} /> Klik gambar untuk memperbesar
          </button>
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {isModalOpen && (
        <div className={styles.modalBackdrop} onClick={closeModal}>
          <div 
            className={styles.modalContent} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Controls Bar */}
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                Halaman {currentIndex + 1} dari {total}
              </div>
              <div className={styles.modalControls}>
                <button 
                  onClick={handleZoomIn} 
                  className={styles.modalBtn} 
                  title="Perbesar (Zoom In)"
                  aria-label="Zoom In"
                >
                  <ZoomIn size={18} />
                </button>
                <button 
                  onClick={handleZoomOut} 
                  className={styles.modalBtn} 
                  title="Perkecil (Zoom Out)"
                  aria-label="Zoom Out"
                >
                  <ZoomOut size={18} />
                </button>
                <button 
                  onClick={handleResetZoom} 
                  className={styles.modalBtn} 
                  title="Reset Ukuran"
                  aria-label="Reset Zoom"
                >
                  <RotateCcw size={18} />
                </button>
                <a
                  href={encodeURI(currentBrochure.image)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalBtn}
                  title="Buka Gambar Tab Baru"
                  aria-label="Buka Gambar Tab Baru"
                >
                  <ExternalLink size={18} />
                </a>
                <a
                  href={encodeURI(currentBrochure.image)}
                  download={`Brosur-SDIP-Al-Hambra-Hal-${currentIndex + 1}.jpeg`}
                  className={styles.modalBtn}
                  title="Unduh Brosur"
                  aria-label="Unduh Brosur"
                >
                  <Download size={18} />
                </a>
                <button 
                  onClick={closeModal} 
                  className={`${styles.modalBtn} ${styles.closeBtn}`}
                  title="Tutup (Esc)"
                  aria-label="Tutup"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable / Zoomable Image Canvas */}
            <div className={styles.modalBody}>
              <button
                onClick={handlePrev}
                className={`${styles.modalNavBtn} ${styles.modalPrevBtn}`}
                aria-label="Sebelumnya"
              >
                <ChevronLeft size={32} />
              </button>

              <div className={styles.modalImageContainer}>
                <img
                  src={encodeURI(currentBrochure.image)}
                  alt={currentBrochure.title}
                  className={styles.modalImage}
                  style={{
                    transform: `scale(${zoomLevel})`,
                    cursor: zoomLevel > 1 ? 'grab' : 'zoom-in',
                  }}
                  onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.6 : 1))}
                  title="Klik untuk zoom 1.6x atau kembali normal"
                />
              </div>

              <button
                onClick={handleNext}
                className={`${styles.modalNavBtn} ${styles.modalNextBtn}`}
                aria-label="Selanjutnya"
              >
                <ChevronRight size={32} />
              </button>
            </div>
            
            <div className={styles.modalFooter}>
              <span>Tip: Gunakan tombol zoom atau klik gambar untuk memperbesar detail teks pada brosur.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
