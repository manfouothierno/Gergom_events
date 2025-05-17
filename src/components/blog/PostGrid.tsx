// src/components/blog/PostGrid.tsx
'use client' // Must be a client component to use useState, useEffect, useSearchParams

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation' // To read URL query parameters
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
// Import fetch function and type
import { getPosts } from '@/lib/posts'
import { PostListItem, SanityPostCategory } from '@/types/post' // Import type

interface PostGridProps {
    // If needed, pass categories to PostGrid to potentially show count per category or filter locally
    // If filtering server-side or entirely client-side, might not need this prop here
    // Passing categories to have category name mapping logic available if needed
    categories?: SanityPostCategory[]; // Receive categories as prop (optional)
}


export default function PostGrid({ categories }: PostGridProps) { // Accept categories prop
    const searchParams = useSearchParams();
    // Read the category filter from the URL search params
    const categoryFilterSlug = searchParams.get('categorie') || 'all'; // Default to 'all' if no param

    // State to hold the fetched posts
    const [posts, setPosts] = useState<PostListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Effect to fetch posts whenever the category filter changes in the URL
    useEffect(() => {
        const fetchPostsForCategory = async () => {
            try {
                setLoading(true);
                setError(null);
                // Fetch posts from Sanity using the library function
                // Pass the categoryFilterSlug to filter the query
                const fetchedPosts = await getPosts({ categorySlug: categoryFilterSlug });

                console.log('Fetching posts for category', categoryFilterSlug);
                console.log('Fetching posts ', fetchedPosts);

                setPosts(fetchedPosts); // Update state with fetched posts
            } catch (err) {
                console.error("Failed to fetch posts:", err);
                setError("Failed to load posts."); // Set error state
                setPosts([]); // Clear posts on error
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchPostsForCategory(); // Call the fetch function inside the effect

    }, [categoryFilterSlug]); // Dependency array: re-run effect when categoryFilterSlug changes


    // Determine the category name if you passed categories prop
    // const currentCategoryName = categories?.find(cat => cat.id === categoryFilterSlug)?.name || 'Toutes catégories';


    // Render states: Loading, Error, No Posts Found
    if (loading) {
        return (
            // Simple loading indicator, ideally a skeleton UI
            <div className="text-center py-12">Chargement des articles...</div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-500">{error}</div>
        );
    }

    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Aucun article trouvé dans cette catégorie.</p>
            </div>
        );
    }

    // Animation variants (kept from your original code)
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


    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show" // Animation based on state change triggered by effect
            // You could add whileInView if you only want animation when scrolling
            // viewport={{ once: true, margin: "-100px" }}
        >
            {/* Map over the state variable `posts` */}
            {posts.map((post) => {
                // Format the publication date
                const formattedDate = new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'numeric', // Use 'numeric' or 'long' based on preference
                    day: 'numeric',
                });

                // Determine category name if you need it here and passed categories prop
                // const displayCategoryName = categories?.find(cat => cat.id === post.category)?.name || post.categoryName || 'Catégorie inconnue';


                return (
                    <motion.article
                        key={post._id} // Use Sanity _id as key for stability
                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        variants={itemVariants} // Apply item animation variants
                    >
                        {/* Link uses post slug */}
                        <Link href={`/nos-prestations/${post.slug}`} className="block h-full"> {/* Make link fill container */}
                            <div className="relative h-48">
                                {/* Image - use fetched URL */}
                                {post.mainImageUrl && ( // Render image only if URL exists
                                    <Image
                                        src={post.mainImageUrl}
                                        alt={post.title} // Use post title for alt
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add appropriate sizes
                                        className="object-cover"
                                    />
                                )}

                                {/* Category badge - use fetched category name */}
                                {post.categoryName && (
                                    <div className="absolute top-3 left-3 bg-[#006400] text-white text-xs px-2 py-1 rounded-full z-10"> {/* Added z-10 */}
                                        {post.categoryName}
                                    </div>
                                )}
                            </div>
                            <div className="p-5 flex flex-col h-[calc(100%-12rem)]"> {/* Flex column and height for content */}
                                {/* Date */}
                                <div className="text-gray-500 text-sm mb-2">{formattedDate}</div> {/* Use formatted date */}
                                {/* Title */}
                                <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{post.title}</h3> {/* Use fetched title */}
                                {/* Excerpt */}
                                <p className="text-gray-600 line-clamp-3 flex-grow">{post.excerpt}</p> {/* Use fetched excerpt, flex-grow */}
                                {/* Read more link */}
                                <div className="mt-4 text-[#006400] font-medium hover:underline inline-flex items-center flex-shrink-0"> {/* Flex-shrink-0 */}
                                    Lire la suite
                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </motion.article>
                );
            })}
        </motion.div>
    );
}