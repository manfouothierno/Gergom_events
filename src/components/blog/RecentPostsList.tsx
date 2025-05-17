// src/components/blog/RecentPostsList.tsx
'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Import fetch function and type
import { getRecentPosts } from '@/lib/posts';
import { PostListItem } from '@/types/post';

interface RecentPostsListProps {
    limit: number; // Expect limit prop
}


export default function RecentPostsList({ limit }: RecentPostsListProps) {
    // State to store recent posts
    const [recentPosts, setRecentPosts] = useState<PostListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch recent posts on component mount (Client-side fetch)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                // Fetch data from Sanity using the library function
                const posts = await getRecentPosts(limit);
                setRecentPosts(posts);
            } catch (err) {
                console.error("Failed to fetch recent posts:", err);
                setError("Failed to load recent posts.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [limit]); // Refetch if limit changes (unlikely but good practice)


    // Loading and Error states
    if (loading) return <div className="text-center text-gray-600">Chargement...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!recentPosts || recentPosts.length === 0) {
        return <div className="text-center text-gray-600">Aucun article récent trouvé.</div>;
    }


    return (
        <div className="space-y-4">
            {recentPosts.map((post) => {
                // Format date
                const formattedDate = new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                });

                return (
                    // Use post slug as key for stability
                    <Link key={post._id} href={`/nos-prestations/${post.slug}`}>
                        <div className="flex items-start hover:bg-gray-50 p-2 rounded-lg transition-colors">
                            {/* Image - use fetched URL */}
                            {post.mainImageUrl && (
                                <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                                    <Image
                                        src={post.mainImageUrl}
                                        alt={post.title}
                                        fill
                                        sizes="80px" // Specify size for recent post list items
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="ml-3 flex-grow"> {/* Added flex-grow for better layout */}
                                {/* Title - use fetched title */}
                                <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{post.title}</h4>
                                {/* Date - use formatted date */}
                                <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}