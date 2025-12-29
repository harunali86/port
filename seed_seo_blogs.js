const { Client } = require('pg');

const connectionString = 'postgresql://postgres.qbrkskutrlbdclhpfdwe:Ruleonthew@1@aws-1-ap-south-1.pooler.supabase.com:5432/postgres';

const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

const blogs = [
    {
        title: "Next.js 14 Server Actions: The Ultimate Guide for 2025",
        slug: "nextjs-14-server-actions-guide-2025",
        image: "https://images.unsplash.com/photo-1618477247222-ac5912453634?q=80&w=2574&auto=format&fit=crop",
        excerpt: "Learn how to use Server Actions in Next.js 14 for seamless data mutations. Replace API routes with direct server functions for type safety and performance. Perfect for modern web development.",
        content: `
# Next.js 14 Server Actions

Server Actions are transforming React development. 

## Key Benefits
- **Zero API Boilerplate**: Write functions, not endpoints.
- **Type Safety**: Automatic types with TypeScript.
- **Progressive Enhancement**: Works without JS.

\`\`\`javascript
'use server'
export async function create(formData) {
  // Logic here
}
\`\`\`
    `
    },
    {
        title: "Generative Engine Optimization (GEO): SEO for AI Search",
        slug: "geo-generative-engine-optimization-guide",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop",
        excerpt: "Preparing for the future of search. How to rank on ChatGPT, Perplexity, and Gemini. Structured data strategies for Generative Engine Optimization.",
        content: `
# Winning the AI Search Game

SEO is evolving into GEO. AI models don't just index links; they synthesize answers.

## GEO Strategies
1. **Direct Answers**: Be concise.
2. **Authority**: Cite sources.
3. **Structure**: Use JSON-LD.
    `
    },
    {
        title: "Building Scalable RAG Agents with LangChain & OpenAI",
        slug: "building-scalable-rag-agents",
        image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2532&auto=format&fit=crop",
        excerpt: "A deep dive into Retrieval Augmented Generation. How to build AI agents that can chat with your private data using Vector Databases like Supabase.",
        content: `
# RAG Architecture

Connect your data to LLMs.

## The Stack
- **LangChain**: Orchestration.
- **Supabase pgvector**: Memory.
- **OpenAI**: Reasoner.
    `
    },
    {
        title: "Core Web Vitals 2024: Mastering INP and LCP",
        slug: "core-web-vitals-inp-lcp-guide",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        excerpt: "Google's new ranking factor INP (Interaction to Next Paint) explained. Techniques to optimize LCP and CLS for a perfect Lighthouse score.",
        content: `
# Performance = Revenue

Speed isn't just a feature; it's a requirement.

## Improving INP
- Break up long tasks.
- Use \`useTransition\`.
- Defer non-critical JS.
    `
    },
    {
        title: "Supabase vs Firebase: Why Developers are Switching to SQL",
        slug: "supabase-vs-firebase-2024-comparison",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2521&auto=format&fit=crop",
        excerpt: "A comprehensive comparison of Supabase and Firebase. Why relational databases (PostgreSQL) are winning over NoSQL for modern scalability.",
        content: `
# The SQL Renaissance

Supabase gives you the Firebase experience with the power of Postgres.

## Why Switch?
- **Relational Data**: No more denormalization.
- **Open Source**: No vendor lock-in.
- **Performance**: Native Postgres speeds.
    `
    },
    {
        title: "Framer Motion: Advanced Animation Patterns for React",
        slug: "framer-motion-advanced-patterns",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        excerpt: "Go beyond simple fades. Learn layout animations, shared layout transitions, and performance optimization with LazyMotion.",
        content: `
# Animating the Web

Motion adds meaning.

## Layout Animations
\`layoutId\` allows elements to morph across the screen.

\`\`\`javascript
<motion.div layoutId="underline" />
\`\`\`
    `
    },
    {
        title: "Docker & Kubernetes for Frontend Developers",
        slug: "docker-kubernetes-frontend-guide",
        image: "https://images.unsplash.com/photo-1667372393119-38663e420252?q=80&w=1932&auto=format&fit=crop",
        excerpt: "Containerizing Next.js applications. A practical guide to Dockerfiles and deploying to Kubernetes clusters.",
        content: `
# Containers Everywhere

Why frontend devs need to know Docker.

## The Dockerfile
Multi-stage builds reduce image size significantly.
    `
    },
    {
        title: "System Design for High-Traffic Web Apps",
        slug: "system-design-high-traffic-apps",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
        excerpt: "Load balancers, CDNs, and Caching strategies. How to design systems that handle millions of requests.",
        content: `
# Scaling Up

From 100 to 1M users.

## Strategies
- **CDN**: Edge caching.
- **DB Sharding**: Splitting data.
- **Horizontal Scaling**: More servers.
    `
    },
    {
        title: "The Future of Web Development: AI Coding Assistants",
        slug: "future-of-web-dev-ai-assistants",
        image: "https://images.unsplash.com/photo-1535378437327-b710cc151123?q=80&w=2574&auto=format&fit=crop",
        excerpt: "How tools like GitHub Copilot and Cursor are changing the workflow. Adapting to the age of AI-augmented engineering.",
        content: `
# AI Partners

AI is not replacing us; it's augmenting us.

## The New Workflow
1. Architect.
2. Prompt.
3. Review/Refine.
    `
    },
    {
        title: "Monorepo Architectures with Turborepo",
        slug: "monorepo-architectures-turborepo",
        image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2668&auto=format&fit=crop",
        excerpt: "Managing complex codebases with Monorepos. Sharing UI libraries and configs across multiple apps using Turborepo.",
        content: `
# One Repo to Rule Them All

Code sharing made easy.

## Turborepo
Fast, cached builds for monorepos. Avoid re-building unchanged packages.
    `
    }
];

async function run() {
    try {
        await client.connect();

        // Clear old posts
        await client.query("DELETE FROM posts");
        console.log("Seeding 10 SEO Blogs...");

        for (const blog of blogs) {
            const { title, slug, excerpt, content, image } = blog;
            // Add more fake content to make them longer for SEO text density
            const extendedContent = content + "\n\n" + content + "\n\n" + content;

            await client.query(
                "INSERT INTO posts (title, slug, excerpt, content, image_url, is_published) VALUES ($1, $2, $3, $4, $5, true) ON CONFLICT (slug) DO UPDATE SET content = $4, image_url = $5",
                [title, slug, excerpt, extendedContent, image]
            );
        }
        console.log("✅ 10 SEO Blogs Inserted!");
    } catch (e) {
        console.error(e);
    } finally {
        client.end();
    }
}

run();
