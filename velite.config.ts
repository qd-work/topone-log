import {defineCollection, defineConfig, s} from "velite";

const serviceSpecs = s.object({
  origin: s.string(),
  destination: s.string(),
  transit: s.string(),
  schedule: s.string(),
  cutoff: s.string(),
  minVolume: s.string(),
  scope: s.string()
});

const services = defineCollection({
  name: "Service",
  pattern: "services/**/*.mdx",
  schema: s.object({
    slug: s.string(),
    language: s.enum(["en", "zh"]),
    title: s.string(),
    description: s.string(),
    keywords: s.array(s.string()),
    category: s.enum(["Sea FCL", "Sea LCL", "Air", "Land"]),
    serviceSpecs,
    cargoTypes: s.array(s.string()),
    certifications: s.array(s.string()),
    images: s.array(s.string()),
    seo: s.object({
      title: s.string(),
      description: s.string()
    }),
    faq: s.array(
      s.object({
        question: s.string(),
        answer: s.string()
      })
    ),
    body: s.mdx()
  })
});

const blog = defineCollection({
  name: "Blog",
  pattern: "blog/**/*.mdx",
  schema: s.object({
    slug: s.string(),
    language: s.enum(["en", "zh"]),
    title: s.string(),
    description: s.string(),
    date: s.string(),
    body: s.mdx()
  })
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static"
  },
  collections: {services, blog}
});
