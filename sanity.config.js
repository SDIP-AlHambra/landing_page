import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'SDIP Al-Hambra Admin',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'fv2o6g2f',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/admin',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})