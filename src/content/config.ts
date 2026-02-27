import { defineCollection, z } from 'astro:content';

const works = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.number(),
    authors: z.array(z.string()),
    venue: z.string().optional(),
    doi: z.string().optional(),
    url: z.string().optional(), // for non-DOI links (e.g., AAAI proceedings)
    pdf: z.string().optional(), // local PDF path in /public/papers/
    preprint: z.string().optional(), // local preprint path in /public/preprints/
    type: z.enum(['book', 'journal', 'conference', 'chapter', 'report', 'public']).optional(),
    googleScholar: z.number().optional(), // citation count
    impactFactor: z.number().optional(),
    image: z.string().optional(), // custom image path (e.g., /images/works/my-paper.png)
    themes: z.array(z.string()), // slugs of themes this work appears in
  }),
});

const themes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(), // for navigation ordering
    focus: z.string(), // e.g., "political economy, infrastructure critique"
  }),
});

const software = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.number().optional(),
    url: z.string().optional(),
    github: z.string().optional(), // e.g., "berniehogan/introducingpython"
    status: z.string().optional(), // e.g., "active", "archived"
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const students = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(), // e.g., "PhD Student", "Postdoc", "DPhil"
    years: z.string().optional(), // e.g., "2018-2022"
    currentPosition: z.string().optional(),
    url: z.string().optional(),
  }),
});

const press = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    outlet: z.string(),
    date: z.string(),
    url: z.string().optional(),
  }),
});

const consulting = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    year: z.number().optional(),
  }),
});

const artifacts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.number().optional(),
    url: z.string().optional(),
    artifactThemes: z.array(z.string()), // slugs of artifact-themes this appears in
  }),
});

const artifactThemes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(),
    focus: z.string(),
  }),
});

export const collections = { works, themes, software, students, press, consulting, artifacts, artifactThemes, blog };
