import './globals.css';
import { siteConfig } from '../data/siteConfig';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://sdipalhambra.sch.id';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `Selamat datang di website resmi ${siteConfig.name}. ${siteConfig.tagline}. Temukan informasi visi, misi, fasilitas unggulan, ekstrakurikuler, dan pendaftaran PPDB.`,
  icons: {
    icon: [
      { url: '/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: baseUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: `Selamat datang di website resmi ${siteConfig.name}. ${siteConfig.tagline}.`,
    images: [
      {
        url: '/apple-touch-icon.png',
        width: 180,
        height: 180,
        alt: `Logo ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: `Website resmi ${siteConfig.name} Kebayoran Lama.`,
    images: ['/apple-touch-icon.png'],
  },
};

export default function RootLayout({ children }) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.name,
    url: baseUrl,
    logo: `${baseUrl}/apple-touch-icon.png`,
    image: `${baseUrl}/apple-touch-icon.png`,
    description: siteConfig.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address,
      addressLocality: 'Kebayoran Lama, Jakarta Selatan',
      addressRegion: 'DKI Jakarta',
      addressCountry: 'ID',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.whatsapp,
      contactType: 'PPDB Admission',
    },
  };

  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/icon-48x48.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/icon-96x96.png" sizes="96x96" type="image/png" />
        <link rel="icon" href="/icon-192x192.png" sizes="192x192" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
