import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BeritaClient from './BeritaClient';
import { getAllPosts } from '@/sanity/queries';
import { siteConfig } from '@/data/siteConfig';

export const metadata = {
  title: `Berita & Kegiatan - ${siteConfig.name}`,
  description: `Ikuti kabar terkini, agenda kegiatan, prestasi siswa, dan pengumuman resmi dari ${siteConfig.name}.`,
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BeritaPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Navbar />
      <main style={{ flex: '1 0 auto' }}>
        <BeritaClient posts={posts} />
      </main>
      <Footer />
    </>
  );
}
