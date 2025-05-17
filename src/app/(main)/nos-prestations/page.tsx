// src/app/(main)/nos-prestations/page.tsx
import React, {Suspense} from 'react' // Keep Suspense if PostGrid fetches client-side async

import { Metadata } from 'next' // Import Metadata type

// Import new fetch functions
import { getAllPostCategories, getFeaturedPost } from '@/lib/posts'
// Import the types needed for passing data
import { SanityPostCategory, PostListItem } from '@/types/post';

// Import components
import BlogHeader from '@/components/blog/BlogHeader'; // No props needed by BlogHeader typically
import CategoryTabs from '@/components/blog/CategoryTabs'; // Will receive categories as prop
import PostGrid from '@/components/blog/PostGrid'; // Will fetch internally based on URL params
import FeaturedPost from '@/components/blog/FeaturedPost'; // Will receive featured post data as prop
import RecentPostsList from '@/components/blog/RecentPostsList';
import Link from "next/link"; // Will fetch internally

// Revalidate the page data (categories, featured post) at most every hour
export const revalidate = 3600;

// Metadata should be static for the main page
export const metadata: Metadata = {
    title: 'Nos Prestations | Gergom Events', // Use your static title
    description: 'Découvrez nos prestations événementielles en région PACA : mariages, séminaires d\'entreprise, événements sportifs, soirées privées et plus encore.', // Use your static description
}

// Component de chargement pour Suspense (might still be useful if PostGrid takes time)
function LoadingUI() {
    return <div className="p-4 text-center">Chargement...</div>
}

export default async function BlogPage() { // Make async to await fetches
    // Fetch categories and featured post data Server-Side
    const [categories, featuredPost] = await Promise.all([
        getAllPostCategories(),
        getFeaturedPost(),
    ]);

    // Add 'Tous' category manually for the tabs if not in Sanity categories
    // Assume Sanity categories do *not* include an 'all' category
    const allCategories = [{ id: 'all', name: 'Tous', slug: 'all', _id: 'all', _type: 'postCategory' }, ...categories];


    return (
        <main className="bg-white">
            {/* Header du nos-prestations */}
            {/* BlogHeader is likely purely presentational and doesn't need Sanity data props */}
            <BlogHeader />

            {/* Post à la une - Pass fetched data */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {featuredPost && ( // Only render if a featured post exists
                        <FeaturedPost post={featuredPost} />
                    )}
                </div>
            </section>

            {/* Filtres par catégorie - Pass fetched categories */}
            <section className="bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    {/* CategoryTabs should handle its own state for the active category */}
                    {/* Pass all categories, including the manually added 'Tous' */}
                    {/* Wrap CategoryTabs with Suspense IF it does client-side data fetching
                         or requires dynamic rendering features */}
                    <Suspense fallback={<LoadingUI />}> {/* Keep Suspense for CategoryTabs */}
                        <CategoryTabs categories={allCategories} />
                    </Suspense>
                </div>
            </section>

            {/* Grille principale d'articles + Sidebar */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Articles principaux */}
                        <div className="w-full lg:w-2/3">
                            <h2 className="text-2xl font-bold mb-8 text-gray-800">Nos dernières réalisations</h2>
                            {/* PostGrid now fetches its OWN data based on URL param */}
                            {/* Wrap with Suspense since PostGrid fetches asynchronously client-side */}
                            <Suspense fallback={<LoadingUI />}>
                                <PostGrid categories={categories} /> {/* Pass categories for category name mapping if needed */}
                            </Suspense>
                        </div>

                        {/* Sidebar */}
                        <div className="w-full lg:w-1/3">
                            {/* Articles récents - RecentPostsList now fetches its OWN data */}
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                                <h3 className="text-xl font-bold mb-6 text-gray-800">Articles récents</h3>
                                <RecentPostsList limit={5} /> {/* Specify a limit */}
                            </div>

                            {/* Catégories populaires - Use fetched categories counts (requires schema/query updates) */}
                            {/* For now, just list categories from fetched data without counts */}
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                                <h3 className="text-xl font-bold mb-6 text-gray-800">Catégories populaires</h3>
                                <ul className="space-y-3">
                                    {/* Exclude the "all" category from this list */}
                                    {categories.map((category) => (
                                        <li key={category.id}> {/* Use category slug as ID/key */}
                                            {/* Link should navigate back to the main /nos-prestations page with query param */}
                                            <Link
                                                href={`/nos-prestations?categorie=${category.id}`} // Use category slug
                                                className="flex items-center justify-between hover:text-[#006400] transition-colors"
                                            >
                                                <span>{category.name}</span> {/* Use category name */}
                                                {/* !!! IMPORTANT: Dynamic counts from Sanity requires a more complex query and update to the type/component */}
                                                {/* This span will show a static count or be removed for now */}
                                                {/* To show dynamic count: need to fetch `count(*[_type == "post" && references(^._id)])` in getAllPostCategories and add `postCount` field to SanityPostCategory type */}
                                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                                     {/* Hardcoded placeholder, remove or replace with fetched count */}
                                                    {categories.length > 0 ? Math.floor(Math.random() * 10 + 3) : '0'} {/* Placeholder Random count */}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Newsletter - Can remain static */}
                            <div className="bg-[#006400] rounded-lg shadow-sm p-6 text-white">
                                <h3 className="text-xl font-bold mb-4">Restez informé</h3>
                                <p className="mb-4 text-white/90">
                                    Recevez nos dernières réalisations et conseils pour vos événements.
                                </p>
                                <form className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Votre email"
                                        className="w-full px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#006400]"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-white text-[#006400] font-medium py-2 rounded-md hover:bg-gray-100 transition-colors"
                                    >
                                        S'abonner
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

// Keep LoadingUI if you're using Suspense elsewhere.