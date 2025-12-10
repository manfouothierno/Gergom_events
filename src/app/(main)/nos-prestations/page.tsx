// src/app/(main)/nos-prestations/page.tsx
import React from 'react';
import { Metadata } from 'next';
import { getAllPostCategories, getFeaturedPost, getRecentPosts } from '@/lib/posts';
import BlogHeader from '@/components/blog/BlogHeader';
import PrestationsView from '@/components/blog/PrestationsView';

export const metadata: Metadata = {
    title: 'Prestations et séminaire | Gergom Events',
    description:
        "Découvrez nos prestations événementielles en région PACA : mariages, séminaires d'entreprise, événements sportifs, soirées privées et plus encore.",
};

export default async function BlogPage() {
    const [categories, featuredPost, resentPosts] = await Promise.all([
        getAllPostCategories(),
        getFeaturedPost(),
        getRecentPosts(20), // Increased limit to ensure we have enough for both tabs
    ]);

    return (
        <main className="bg-white">
            <BlogHeader />
            <PrestationsView 
                categories={categories} 
                featuredPost={featuredPost} 
                recentPosts={resentPosts} 
            />
        </main>
    );
}
