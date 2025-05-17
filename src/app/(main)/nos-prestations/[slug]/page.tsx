// src/app/(main)/nos-prestations/[slug]/page.tsx

// This is a Server Component (no 'use client' needed)

import { notFound } from 'next/navigation'; // For showing a 404
import { Metadata } from 'next'; // Type for generateMetadata return

// Import post-specific data fetching functions
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
// Import the Post type for data consistency
import { Post } from '@/types/post';

// Import the component that renders the post details
// Assuming PostDetail might be a Client Component (due to PortableText)
import PostDetail from '@/components/blog/PostDetail';


// --- Dynamic Metadata Generation ---
// Learn more: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
export async function generateMetadata({
                                           params, // Contains the slug from the URL e.g., { slug: 'seminaire-montaner-pietrini' }
                                       }: {
    params: { slug: string };
}): Promise<Metadata> { // Indicate the return type is Metadata

    // Fetch the post data (only metadata fields needed if possible, but full data works too with caching)
    // The getPostBySlug query includes title and excerpt/metaDescription implicitly via excerpt + common use case
    const post = await getPostBySlug(params.slug); // AWAIT the async fetch

    // If no post found for this slug, return a minimal metadata (or omit)
    if (!post) {
        return {};
    }

    // Generate metadata based on fetched data
    const pageTitle = `${post.title} | Nos Prestations | Gergom Events`; // Use fetched title
    const pageDescription = post.excerpt; // Use fetched excerpt for meta description

    return {
        title: pageTitle,
        description: pageDescription,
        // Optional Open Graph & other meta tags if you have images/data for them
        // openGraph: { /* ... */ },
    };
}

// --- Static Path Generation for SSG ---
// Learn more: https://nextjs.org/docs/app/api-reference/file-conventions/generate-static-params
// This function tells Next.js which slugs to build HTML for at build time.
export async function generateStaticParams(): Promise<{ slug: string }[]> { // Indicate the return type
    // Fetch all valid post slugs from Sanity
    const slugs = await getAllPostSlugs(); // AWAIT the async fetch

    // getAllPostSlugs is designed to return [{ slug: '...' }]
    return slugs; // Directly return the result
}

// --- Default Server Component (Page Content) ---
export default async function BlogPostPage({
                                               params, // Contains the slug from the URL
                                           }: {
    params: { slug: string };
}) {
    // Fetch the full post data based on the slug from the URL parameters
    const postData: Post | null = await getPostBySlug(params.slug); // AWAIT the async fetch

    // If no data is returned (getPostBySlug returned null), trigger a 404
    if (!postData) {
        notFound(); // Renders the closest not-found.tsx file
    }

    // If data is found, pass it to the PostDetail component for rendering
    // Since this is a Server Component, and PostDetail might be a Client Component,
    // Next.js handles the data serialization and hydration correctly.
    return <PostDetail post={postData} />;
}