// src/types/post.ts
// Import types from the service file that are reused (like PortableTextBlock)
import { PortableTextBlock } from './services';

// Type for the Post Category Document itself (if you fetch full category docs)
export interface SanityPostCategory {
    _id: string;
    _type: 'postCategory';
    name: string;
    slug: string; // The slug.current string
    order?: number;
}

// Type for a Post when listed in the grid/recent list (partial data)
export interface PostListItem {
    _id: string;
    _type: 'post';
    slug: string; // post slug
    title: string;
    excerpt: string;
    publishedAt: string; // Sanity date/time returns string by default
    mainImageUrl?: string | null; // Resolved image URL
    category: string; // category slug (ID) - adjust query to fetch slug
    categoryName: string; // category name - adjust query to fetch name from reference
}

// Type for a full Post document (detail page)
export interface Post {
    _id: string;
    _type: 'post';
    slug: string; // post slug
    title: string;
    publishedAt: string;
    author?: string | null; // Can be null
    mainImageUrl?: string | null; // Resolved image URL
    category: string; // category slug (ID)
    categoryName: string; // category name
    excerpt: string;
    content: PortableTextBlock[]; // Portable Text array for main content
    // Related posts - we fetch partial data (slug, title, image URL, maybe category name)
    relatedPosts?: {
        _id: string;
        _type: 'post'; // Should be 'post'
        slug: string;
        title: string;
        mainImageUrl?: string | null;
        categoryName?: string | null; // Name from related post's category
    }[] | null; // Array might be null or empty

    // You might include tags here if you added them to the schema
    // tags?: string[] | null;

    isFeatured?: boolean | null; // Match schema field

    [key: string]: any; // Allow for other fields not explicitly typed
}