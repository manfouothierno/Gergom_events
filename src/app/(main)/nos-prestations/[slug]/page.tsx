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

    const slug = (await params).slug;

    console.log(slug);
    // Fetch the full post data based on the slug from the URL parameters
    const postData: Post | null = (await getPostBySlug(slug)) || null; // AWAIT the async fetch

    // If no data is returned (getPostBySlug returned null), trigger a 404
    if (!postData) {
        notFound(); // Renders the closest not-found.tsx file
    }

    console.log('post data', postData);

    // If data is found, pass it to the PostDetail component for rendering
    // Since this is a Server Component, and PostDetail might be a Client Component,
    // Next.js handles the data serialization and hydration correctly.
    return <PostDetail post={postData} />;
}