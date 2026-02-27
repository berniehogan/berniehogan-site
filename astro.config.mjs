import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://berniehogan.me',
  integrations: [react()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },

  content: {
    collections: {
      works: {
        schema: ({ z }) => ({
          title: z.string(),
          year: z.number(),
          authors: z.array(z.string()),
          venue: z.string().optional(),
          doi: z.string().optional(),
          pdf: z.string().optional(),
          themes: z.array(z.string()),
        }),
      },
      themes: {
        schema: ({ z }) => ({
          title: z.string(),
          order: z.number(),
          focus: z.string(),
        }),
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});