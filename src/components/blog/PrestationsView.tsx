// src/components/blog/PrestationsView.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PostListItem, SanityPostCategory } from '@/types/post';
import FeaturedPost from '@/components/blog/FeaturedPost';
import { AudienceType, isCategoryForAudience } from '@/utils/categoryMapping';

interface PrestationsViewProps {
    categories: SanityPostCategory[];
    featuredPost: PostListItem | null;
    recentPosts: PostListItem[];
}

export default function PrestationsView({ categories, featuredPost, recentPosts }: PrestationsViewProps) {
    const [selectedAudience, setSelectedAudience] = useState<AudienceType>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Filter categories based on audience
    const visibleCategories = useMemo(() => {
        return categories.filter(cat => isCategoryForAudience(cat.slug, selectedAudience));
    }, [categories, selectedAudience]);

    // Reset selected category if it disappears from the list when audience changes
    React.useEffect(() => {
        if (selectedCategory !== 'all' && !visibleCategories.find(c => c.slug === selectedCategory)) {
            setSelectedCategory('all');
        }
    }, [selectedAudience, visibleCategories, selectedCategory]);

    // Filter posts
    const filteredPosts = useMemo(() => {
        let posts = recentPosts;

        // 1. Filter by Audience (via category mapping)
        if (selectedAudience !== 'all') {
            posts = posts.filter(post => {
                 // We need the category slug for the post to check audience.
                 // The PostListItem interface has 'category' which is the slug (check types/post.ts)
                 return isCategoryForAudience(post.category, selectedAudience);
            });
        }

        // 2. Filter by Selected Category
        if (selectedCategory !== 'all') {
            posts = posts.filter(post => post.category === selectedCategory);
        }

        return posts;
    }, [recentPosts, selectedAudience, selectedCategory]);


    return (
        <>
            {/* Audience Filter Toggles */}
            <section className="bg-gray-50 py-8 border-b border-gray-100 sticky top-[72px] z-30 shadow-sm">
                <div className="container mx-auto px-4 flex justify-center">
                    <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-gray-200">
                        <button
                            onClick={() => setSelectedAudience('all')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                                selectedAudience === 'all'
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Tout voir
                        </button>
                        <button
                            onClick={() => setSelectedAudience('particulier')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                                selectedAudience === 'particulier'
                                    ? 'bg-red-600 text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Particuliers
                        </button>
                        <button
                            onClick={() => setSelectedAudience('pro')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                                selectedAudience === 'pro'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Professionnels
                        </button>
                    </div>
                </div>
            </section>

             {/* Featured Post (Only show if 'all' or if it matches current filter?) 
                 For simplicity, always show featured on 'all', otherwise hide to focus on list?
                 Or check if featured post matches audience.
             */}
            {featuredPost && selectedAudience === 'all' && selectedCategory === 'all' && (
                <section className="py-12 border-b border-gray-100">
                    <div className="container mx-auto px-4">
                        <FeaturedPost post={featuredPost} />
                    </div>
                </section>
            )}

            {/* Category Filter Tabs */}
            <section className="py-8">
                 <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                                selectedCategory === 'all'
                                    ? 'bg-gray-800 text-white border-gray-800'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            Tous
                        </button>
                        {visibleCategories.map(cat => (
                            <button
                                key={cat._id}
                                onClick={() => setSelectedCategory(cat.slug)}
                                className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                                    selectedCategory === cat.slug
                                        ? 'bg-gray-800 text-white border-gray-800'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>


            {/* Content Grid */}
            <section className="py-8 pb-16">
                <div className="container mx-auto px-4">
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post) => {
                                 const formattedDate = new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    });
                                return (
                                    <motion.div
                                        key={post._id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group border border-gray-100"
                                    >
                                        <Link href={`/nos-prestations/${post.slug}`} className="block h-full flex flex-col">
                                            <div className="relative h-56 overflow-hidden">
                                                {post.mainImageUrl ? (
                                                    <Image
                                                        src={post.mainImageUrl}
                                                        alt={post.title}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                                        No Image
                                                    </div>
                                                )}
                                                <div className="absolute top-3 right-3">
                                                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                                                        {post.categoryName}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="text-gray-400 text-xs mb-3 font-medium uppercase tracking-wide">
                                                    {formattedDate}
                                                </div>
                                                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                                                    {post.excerpt}
                                                </p>
                                                <span className="inline-flex items-center text-red-600 text-sm font-semibold mt-auto">
                                                    Lire la suite
                                                    <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                         <div className="text-center py-20 bg-gray-50 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-600">Aucune prestation trouvée</h3>
                            <p className="text-gray-500 mt-2">Essayez de changer les filtres.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
