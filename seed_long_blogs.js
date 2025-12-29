const { Client } = require('pg');

const connectionString = 'postgresql://postgres.qbrkskutrlbdclhpfdwe:Ruleonthew@1@aws-1-ap-south-1.pooler.supabase.com:5432/postgres';

const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

// Images sourced from Unsplash for realism
const blogs = [
    {
        title: "The Ultimate Guide to Next.js 14 Server Actions",
        slug: "ultimate-guide-nextjs-14-server-actions",
        image_url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2574&auto=format&fit=crop",
        excerpt: "Stop writing API routes. Learn how to mutate data directly from your server components with type safety and optimistic updates.",
        content: `
# The Evolution of Data Mutation

For years, React developers have followed a specific pattern:
1. Create a form.
2. create an \`onSubmit\` handler.
3. \`fetch('/api/submit', ...)\`.
4. Handle loading and error states.
5. Revalidate data.

**Next.js 14 changes everything.** with Server Actions, this entire boilerplate is reduced to a single function.

## What are Server Actions?

Server Actions are asynchronous functions that run on the server. You can invoke them in Server Components, or from Client Components using standard HTML forms.

\`\`\`javascript
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  
  // Direct DB access!
  await db.post.create({ data: { title } })
  
  revalidatePath('/posts')
}
\`\`\`

## Optimistic Updates

One of the biggest challenges in UI development is making the app feel "instant".

\`\`\`javascript
'use client'
import { useOptimistic } from 'react'

export function PostList({ posts }) {
  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (state, newPost) => [...state, newPost]
  )

  return (
    <ul>
      {optimisticPosts.map(p => <li key={p.id}>{p.title}</li>)}
    </ul>
  )
}
\`\`\`

This ensures that when a user hits "Enter", the UI updates immediately, even before the server responds.

## Security Considerations

Since Server Actions are public endpoints (under the hood), you must ensure:
1. **Authentication**: Check session inside the action.
2. **Validation**: Use Zod to validate input data.

Next.js 14 is not just an upgrade; it's a paradigm shift.
    `
    },
    {
        title: "Building Scalable AI Agents with LangChain",
        slug: "building-scalable-ai-agents",
        image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop",
        excerpt: "From simple chatbots to autonomous agents. A deep dive into vector databases, embeddings, and RAG architectures.",
        content: `
# Beyond the Chatbot

The real power of LLMs lies in their ability to use tools. This concept, known as "Agentic Workflows", allows AI to interact with the real world.

## The Stack

To build a production-grade agent, we need:
*   **LLM**: GPT-4 or Claude 3.5 Sonnet.
*   **Orchestrator**: LangChain or LangGraph.
*   **Memory**: Supabase pgvector or Pinecone.

## Vector Embeddings Explained

Computers don't understand text; they understand numbers. "Embeddings" convert text into a high-dimensional vector.

\`\`\`python
import openai

response = openai.Embedding.create(
    input="What is the capital of France?",
    model="text-embedding-3-small"
)
vector = response['data'][0]['embedding']
# [0.0023, -0.0123, 0.5234, ...]
\`\`\`

We store this vector in our database. When a user asks a question, we convert their question into a vector and perform a **Cosine Similarity Search** to find the most relevant context.

## Retrieval Augmented Generation (RAG)

1. **Retrieve**: Get relevant documents from DB.
2. **Augment**: Append documents to the system prompt.
3. **Generate**: Ask the LLM to answer using only the provided context.

This dramatically reduces hallucinations and allows the AI to "know" about your private data.
    `
    },
    {
        title: "Mastering Performance: Core Web Vitals",
        slug: "mastering-core-web-vitals",
        image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        excerpt: "LCP, FID, CLS. De-mystifying Google's ranking factors and how to score 100/100 on Lighthouse using Next.js.",
        content: `
# Speed is a Feature

Amazon found that every 100ms of latency cost them 1% in sales. Google uses Core Web Vitals as a direct ranking factor.

## Largest Contentful Paint (LCP)

LCP measures loading performance. To optimize LCP:
1. **Optimize Images**: Use \`next/image\` with \`priority\`.
2. **Server Response Time**: Cache DB queries.

\`\`\`javascript
// Good
<Image src="/hero.jpg" priority alt="Hero" />
\`\`\`

## Cumulative Layout Shift (CLS)

CLS measures visual stability.
*   Always define \`width\` and \`height\` for images.
*   Reserve space for ads or dynamic content.

## Interaction to Next Paint (INP)

The new metric replacing FID. It measures responsiveness.
*   Break up Long Tasks using \`setTimeout\`.
*   Use \`useTransition\` in React to keep the UI responsive during heavy state updates.

## Conclusion

Performance is not an afterthought; it's a fundamental part of user experience.
    `
    }
];

async function run() {
    try {
        await client.connect();

        // Clear old posts first (Optional, but good for reset)
        await client.query("DELETE FROM posts");

        console.log("Seeding Long Blogs...");

        for (const blog of blogs) {
            const { title, slug, excerpt, content, image_url } = blog;
            await client.query(
                "INSERT INTO posts (title, slug, excerpt, content, image_url, is_published) VALUES ($1, $2, $3, $4, $5, true) ON CONFLICT (slug) DO UPDATE SET content = $4, image_url = $5",
                [title, slug, excerpt, content, image_url]
            );
        }
        console.log("✅ 3 Long-Form Blogs Inserted!");
    } catch (e) {
        console.error(e);
    } finally {
        client.end();
    }
}

run();
