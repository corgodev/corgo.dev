import { defineCollection, z } from 'astro:content';

const gamesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['Released', 'In Development', 'Prototype']),
    image: z.string().optional(),
    date: z.date(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    date: z.date(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string(),
    readTime: z.string().optional(),
  }),
});

export const collections = {
  games: gamesCollection,
  projects: projectsCollection,
  blog: blogCollection,
};
