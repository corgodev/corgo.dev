import { defineCollection, z } from 'astro:content';

const gamesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['Released', 'In Development', 'Prototype']),
    image: z.string().optional(),
    date: z.date(),
    draft: z.boolean().default(false),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    date: z.date(),
    draft: z.boolean().default(false),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    readTime: z.string().optional(),
    song: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  games: gamesCollection,
  projects: projectsCollection,
  blog: blogCollection,
};
