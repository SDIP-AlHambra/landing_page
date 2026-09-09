export const post = {
  name: 'post',
  title: 'Berita & Kegiatan',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Judul Berita',
      type: 'string',
      validation: (Rule) => Rule.required().error('Judul wajib diisi!'),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isFeatured',
      title: 'Jadikan Berita Utama / Paling Top?',
      description: 'Aktifkan jika berita ini ingin ditampilkan paling besar di bagian atas website.',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Kegiatan Sekolah', value: 'kegiatan' },
          { title: 'Prestasi Siswa', value: 'prestasi' },
          { title: 'Pengumuman', value: 'pengumuman' },
        ],
      },
    },
    {
      name: 'mainImage',
      title: 'Foto Utama',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Tanggal Rilis',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
    },
    {
      name: 'body',
      title: 'Isi Berita',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    },
  ],
}