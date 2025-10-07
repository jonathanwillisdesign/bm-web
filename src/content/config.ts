import { defineCollection, z } from 'astro:content';

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string(),
    services: z.array(z.string()).optional(),
    team: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    publishedAt: z.date(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    outcome: z.string().optional(),
    duration: z.string().optional(),
  })
});

const team = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    image: z.string().optional(),
    email: z.string().email().optional(),
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    expertise: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
  })
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    icon: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    relatedCaseStudies: z.array(z.string()).optional(),
    relatedServices: z.array(z.string()).optional(),
  })
});

export const collections = {
  'case-studies': caseStudies,
  'team': team,
  'services': services,
};