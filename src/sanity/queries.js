import { client } from './client'

export const categoryMap = {
  kegiatan: 'Kegiatan Sekolah',
  prestasi: 'Prestasi Siswa',
  pengumuman: 'Pengumuman',
}

export function formatDate(dateString) {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return dateString
  }
}

export function extractSnippet(body, maxLength = 160) {
  if (!body || !Array.isArray(body)) return ''
  const text = body
    .filter((block) => block._type === 'block' && Array.isArray(block.children))
    .map((block) => block.children.map((child) => child.text || '').join(''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

// Fetch all posts ordered by date
export async function getAllPosts() {
  try {
    const posts = await client.fetch(
      `*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
        _id,
        title,
        "slug": slug.current,
        isFeatured,
        category,
        publishedAt,
        mainImage,
        body
      }`
    )
    return posts.map((post) => ({
      ...post,
      snippet: extractSnippet(post.body),
    }))
  } catch (error) {
    console.error('Error fetching posts from Sanity:', error)
    return []
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug) {
  if (!slug) return null
  try {
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        isFeatured,
        category,
        publishedAt,
        mainImage,
        body
      }`,
      { slug }
    )
    return post
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error)
    return null
  }
}

// Fetch recent posts excluding the active one
export async function getRecentPosts(excludeSlug, limit = 3) {
  try {
    const posts = await client.fetch(
      `*[_type == "post" && slug.current != $excludeSlug] | order(publishedAt desc, _createdAt desc)[0...$limit] {
        _id,
        title,
        "slug": slug.current,
        category,
        publishedAt,
        mainImage,
        body
      }`,
      { excludeSlug: excludeSlug || '', limit }
    )
    return posts.map((post) => ({
      ...post,
      snippet: extractSnippet(post.body, 100),
    }))
  } catch (error) {
    console.error('Error fetching recent posts:', error)
    return []
  }
}

// Fetch top 3 latest/featured news snippets for homepage preview
export async function getTopNewsSnippets(limit = 3) {
  try {
    const posts = await client.fetch(
      `*[_type == "post"] | order(isFeatured desc, publishedAt desc, _createdAt desc)[0...$limit] {
        _id,
        title,
        "slug": slug.current,
        isFeatured,
        category,
        publishedAt,
        mainImage,
        body
      }`,
      { limit }
    )
    return posts.map((post) => ({
      ...post,
      snippet: extractSnippet(post.body, 130),
    }))
  } catch (error) {
    console.error('Error fetching top news snippets:', error)
    return []
  }
}
