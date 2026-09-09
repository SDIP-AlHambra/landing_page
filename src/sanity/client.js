// src/sanity/client.js
import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'fv2o6g2f',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // false agar berita yang baru di-publish langsung muncul tanpa nunggu cache
})

const builder = createImageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)