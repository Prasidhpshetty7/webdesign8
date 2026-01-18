import { defineCollection, z } from 'astro:content';

export const collections = {
  blog: defineCollection({
    schema: z.object({
      title: z.string(),
      publishDate: z.date(),
      description: z.string(),
    })
  }),
  projects: defineCollection({
    schema: z.object({
      title: z.string(),
      publishDate: z.date(),
      description: z.string(),
      technologies: z.array(z.string()),
      liveUrl: z.string().optional(),
      githubUrl: z.string().optional(),
    })
  })
};
