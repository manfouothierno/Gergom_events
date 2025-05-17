// src/app/(main)/nos-prestations/page.tsx
import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getAllPostCategories, getFeaturedPost, getRecentPosts } from '@/lib/posts';
import { SanityPostCategory } from '@/types/post';

import BlogHeader from '@/components/blog/BlogHeader';
import CategoryTabs from '@/components/blog/CategoryTabs';
import FeaturedPost from '@/components/blog/FeaturedPost';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const revalidate = 3600;

export const metadata: Metadata = {
    title: 'Nos Prestations | Gergom Events',
    description:
        "Découvrez nos prestations événementielles en région PACA : mariages, séminaires d'entreprise, événements sportifs, soirées privées et plus encore.",
};

function LoadingUI() {
    return <div className="p-4 text-center">Chargement...</div>;
}

export default async function BlogPage() {
    const [categories, featuredPost, resentPosts] = await Promise.all([
        getAllPostCategories(),
        getFeaturedPost(),
        getRecentPosts(10),
    ]);

    const allCategories = [
        { id: 'all', name: 'Tous', slug: 'all', _id: 'all', _type: 'postCategory' },
        ...categories,
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } } // Added duration for smoother transition
    }
    console.log(resentPosts);

    return (
        <main className="bg-white">
            <BlogHeader />

            <section className="py-12">
                <div className="container mx-auto px-4">
                    {featuredPost && <FeaturedPost post={featuredPost} />}
                </div>
            </section>

            <section className="bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <Suspense fallback={<LoadingUI />}>
                        <CategoryTabs categories={allCategories} />
                    </Suspense>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="w-full lg:w-2/3">
                            <h2 className="text-2xl font-bold mb-8 text-gray-800">
                                Nos dernières réalisations
                            </h2>

                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            >
                                {resentPosts.map((post) => {
                                    const formattedDate = new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                    });

                                    return (
                                        <div
                                            key={post._id}
                                            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <Link href={`/nos-prestations/${post.slug}`} className="block h-full">
                                                <div className="relative h-48">
                                                    {post.mainImageUrl && (
                                                        <Image
                                                            src={post.mainImageUrl}
                                                            alt={post.title}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            className="object-cover"
                                                        />
                                                    )}
                                                    {/*{post.categoryName && (*/}
                                                    {/*    <div className="absolute top-3 left-3 bg-[#006400] text-white text-xs px-2 py-1 rounded-full z-10">*/}
                                                    {/*        {post.categoryName}*/}
                                                    {/*    </div>*/}
                                                    {/*)}*/}
                                                </div>
                                                <div className="p-5 flex flex-col h-[calc(100%-12rem)]">
                                                    <div className="text-gray-500 text-sm mb-2">{formattedDate}</div>
                                                    <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{post.title}</h3>
                                                    <p className="text-gray-600 line-clamp-3 flex-grow">{post.excerpt}</p>
                                                    <div className="mt-4 text-[#006400] font-medium hover:underline inline-flex items-center flex-shrink-0">
                                                        Lire la suite
                                                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>

                        <div className="w-full lg:w-1/3">
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                                <h3 className="text-xl font-bold mb-6 text-gray-800">Catégories populaires</h3>
                                <ul className="space-y-3">
                                    {categories.map((category) => (
                                        <li key={category.id}>
                                            <Link
                                                href={`/nos-prestations?categorie=${category.id}`}
                                                className="flex items-center justify-between hover:text-[#006400] transition-colors"
                                            >
                                                <span>{category.name}</span>
                                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {categories.length > 0 ? Math.floor(Math.random() * 10 + 3) : '0'}
                        </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

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
