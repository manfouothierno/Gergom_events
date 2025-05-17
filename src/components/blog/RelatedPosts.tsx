// src/components/blog/RelatedPosts.tsx
'use client' // Still needs client capabilities for Link? Depends.

import Link from 'next/link'
import Image from 'next/image'
import { PostListItem } from '@/types/post'; // Use the PostListItem type for related posts


// Define the props for RelatedPosts
interface RelatedPostsProps {
    // This should match the structure fetched for relatedPosts[] in the main Post query
    // Note: The type in Post (relatedPosts) has fields like slug, title, mainImageUrl.
    // We can use PostListItem here or define a smaller type if only a subset is fetched.
    // Let's use a specific type for clarity.
    posts: { // Array of objects for related posts
        _id: string;
        slug: string;
        title: string;
        mainImageUrl?: string | null;
        categoryName?: string | null; // Add category name if fetched in relatedPosts query
    }[] | null; // Array might be null


}

export default function RelatedPosts({ posts }: RelatedPostsProps) { // Accept posts prop

    // Handle cases where posts is null or empty
    if (!posts || posts.length === 0) {
        return <div className="text-gray-600 text-sm">Aucun article similaire trouvé.</div>; // Message if no related posts
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => ( // Map over the posts array
                // Use post _id as key
                <Link key={post._id} href={`/nos-prestations/${post.slug}`}> {/* Use post slug for link */}
                    <div className="flex items-center hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        {/* Image - use fetched URL */}
                        {post.mainImageUrl && (
                            <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0"> {/* Adjusted size */}
                                <Image
                                    src={post.mainImageUrl}
                                    alt={post.title} // Use post title for alt
                                    fill
                                    sizes="64px" // Specify size
                                    className="object-cover"
                                />
                            </div>
                        )}
                        {/* Content */}
                        <div className={`${post.mainImageUrl ? 'ml-3' : ''} flex-grow`}> {/* Adjusted margin based on image existence */}
                            {/* Title - use fetched title */}
                            <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{post.title}</h4>
                            {/* Optional: Show category name or other info if needed */}
                            {post.categoryName && (
                                <p className="text-xs text-gray-500 mt-1">{post.categoryName}</p>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}