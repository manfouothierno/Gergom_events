// src/components/blog/FeaturedPost.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PostListItem } from '@/types/post' // Import type

interface FeaturedPostProps {
    post: PostListItem; // Expect a PostListItem type prop
}


export default function FeaturedPost({ post }: FeaturedPostProps) { // Accept post prop
    // Handle case where post might be null if getFeaturedPost returns null
    if (!post) return null;

    // Optional: Format date if not doing it in query
    const formattedDate = new Date(post.publishedAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }} // Added whileInView
            viewport={{ once: true, margin: "-100px" }} // Configure viewport
            transition={{ duration: 0.7 }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image */}
                {post.mainImageUrl && ( // Only render image if URL exists
                    <div className="relative h-64 lg:h-full">
                        <Image
                            src={post.mainImageUrl} // Use fetched image URL
                            alt={post.title} // Use fetched title for alt
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw" // Add responsive sizes
                            className="object-cover"
                        />
                        {/* Use fetched category name for the badge */}
                        {post.categoryName && (
                            <div className="absolute top-4 left-4 bg-[#006400] text-white text-sm px-3 py-1 rounded-full z-10"> {/* Added z-10 */}
                                {post.categoryName}
                            </div>
                        )}
                    </div>
                )}


                {/* Contenu */}
                <div className="p-8 flex flex-col">
                    <span className="text-gray-500 text-sm mb-2">{formattedDate}</span> {/* Use formatted date */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h2> {/* Use fetched title */}
                    <p className="text-gray-600 mb-6 flex-grow">{post.excerpt}</p> {/* Use fetched excerpt */}

                    {/* Link uses fetched slug */}
                    <Link href={`/nos-prestations/${post.slug}`} className="block mt-auto"> {/* Add block/mt-auto for better layout */}
                        <motion.button
                            className="inline-flex items-center text-[#006400] font-medium hover:underline"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            Lire l'article complet

                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}