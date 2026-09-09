import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
import StatsBanner from './components/StatsBanner';
import PrincipalSpeech from './components/PrincipalSpeech';
import VisiMisi from './components/VisiMisi';
import Facilities from './components/Facilities';
import Extracurricular from './components/Extracurricular';
import NewsSnippet from './components/NewsSnippet';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ flex: '1 0 auto' }}>
        <Hero />
        <VideoSection />
        <StatsBanner />
        <PrincipalSpeech />
        <VisiMisi />
        <Facilities />
        <Extracurricular />
        <NewsSnippet />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
