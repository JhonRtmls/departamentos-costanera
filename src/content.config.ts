import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const attractions = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "src/content/attractions" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    category: z.enum(["urbano", "imperdibles"]),
    dist: z.string().optional(),
    lang: z.enum(["es", "en", "zh"]),
    lat: z.number().optional(),
    lng: z.number().optional(),
    address: z.string().optional(),
  }),
});

export const collections = { attractions };
