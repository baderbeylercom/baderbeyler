import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    excerpt: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    featuredImage: z.string(),
    featuredImageAlt: z.string().default(''),
    draft: z.boolean().default(false),
    featured: z.boolean().default(true),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    city: z.string(),
    venue: z.string(),
    address: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    timeLabel: z.string(),
    status: z.enum(['upcoming', 'completed']),
    featured: z.boolean().default(true),
    registrationUrl: z.string().url().optional(),
    mapUrl: z.string().url().optional(),
    mapEmbedUrl: z.string().url().optional(),
  }),
});

const agenda = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    date: z.coerce.date(),
    location: z.string(),
    audience: z.string(),
    relatedEventSlug: z.string().optional(),
    featured: z.boolean().default(true),
  }),
});

export const collections = {
  blog,
  events,
  agenda,
};
