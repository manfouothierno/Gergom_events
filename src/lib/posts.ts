// src/lib/posts.ts
import { sanityFetch } from './sanity'; // Assuming your sanity client helper is here
// Import your new post types
import { Post, PostListItem, SanityPostCategory } from '@/types/post';
// Import any necessary shared types (like PortableTextBlock) if needed directly here
// import { PortableTextBlock } from '@/types/services';


// --- GROQ Queries ---

// Fetch a single post by slug
const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  slug.current, // Keep slug as object or alias
  publishedAt,
  author,
  "mainImageUrl": mainImage.asset->url, // Fetch image URL
  excerpt,
  content, // Portable Text
  "category": category->slug.current, // Get category slug from reference
  "categoryName": category->name, // Get category name from reference
  relatedPosts[]->{ // Dereference related posts and get specific fields
    _id,
    _type, // Should be 'post'
    title,
    slug.current, // keep as object or alias
    "mainImageUrl": mainImage.asset->url,
    "categoryName": category->name // Get category name of related post
  },
   isFeatured
  // include tags if added to schema
}`;

// Fetch slugs for all posts (for generateStaticParams)
const allPostSlugsQuery = `*[_type == "post" && defined(slug.current)]{
  "slug": slug.current // Alias slug.current to 'slug'
}`;

// Fetch data for PostListItem (used in grid, featured, recent)
// Added filter by category slug and sorting options
const postListItemQuery = (filterCategorySlug?: string) => {
    const filter = filterCategorySlug && filterCategorySlug !== 'all'
        ? `&& category->slug.current == $categorySlug` // Filter by category slug if provided and not 'all'
        : ''; // No filter if 'all' or not provided

    return `*[_type == "post" && defined(slug.current) ${filter}] | order(publishedAt desc){ // Order by date descending
    _id,
    _type,
    title,
    "slug": slug.current, // Alias
    publishedAt,
    excerpt,
    "mainImageUrl": mainImage.asset->url, // Image URL
    "category": category->slug.current, // Category slug
    "categoryName": category->name // Category name
    // include tags if added to schema and needed
  }`;
};

// Fetch data for the Featured Post(s) - can fetch one or more based on isFeatured flag
// Example: fetch the *first* one marked as featured
const featuredPostQuery = `*[_type == "post" && isFeatured == true] | order(publishedAt desc)[0]{ // Get the most recent featured one
   _id, _type, title, "slug": slug.current, publishedAt, excerpt, "mainImageUrl": mainImage.asset->url, "category": category->slug.current, "categoryName": category->name
}`;

// Fetch data for Recent Posts list - fetch N most recent not including potentially featured ones already shown prominently
// Example: fetch the 4 most recent that are NOT featured
const recentPostsQuery = (limit: number) => `*[_type == "post" && isFeatured != true] | order(publishedAt desc)[0...$limit]{
   _id, _type, title, "slug": slug.current, publishedAt, excerpt, "mainImageUrl": mainImage.asset->url, "category": category->slug.current, "categoryName": category->name
}`;


// Fetch all Post Categories (for tabs and popular list)
const allPostCategoriesQuery = `*[_type == "postCategory"] | order(order asc, name asc){ // Order by explicit order or name
   _id,
   name,
   "id": slug.current // Use slug.current as the 'id' for categories
   // You could also fetch post counts per category if needed here (more complex query)
   // "postCount": count(*[_type == "post" && references(^._id)])
}`;

// --- Fetching Functions ---

/**
 * Fetches a single blog post by its slug for the detail page.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
    // Pass slug as parameter, use a tag specific to this post
    const post = await sanityFetch<Post | null>({
        query: postBySlugQuery,
        params: { slug },
        tags: ['post', `post:${slug}`], // Add post specific tag
    });

    // Check if relatedPosts were fetched and shape them if needed (query does most of the work)
    if(post?.relatedPosts){
        // Ensure related posts have slug as string if query returns object
        post.relatedPosts = post.relatedPosts.map(rp => ({
            ...rp,
            slug: (rp as any).slug.current // Assuming query returns slug as { current: '...' } for related
        }));
    }

    // Check if main slug needs reshaping if query returns { current: '...' }
    // Or update the query alias if needed: "slug": slug.current

    return post;
}

/**
 * Fetches slugs for all published posts. Used by generateStaticParams.
 */
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
    // Fetch just slugs, use tag 'post'
    const slugs = await sanityFetch<{ slug: string }[]>({ query: allPostSlugsQuery, tags: ['post'] });

    // Return array of { slug: '...' } objects
    return slugs;
}

/**
 * Fetches all post categories. Used for tabs and sidebar.
 */
export async function getAllPostCategories(): Promise<SanityPostCategory[]> {
    // Fetch category documents, use tag 'postCategory'
    // Includes "Tous" category manually added in component usually
    const categories = await sanityFetch<SanityPostCategory[]>({
        query: allPostCategoriesQuery,
        tags: ['postCategory', 'post'], // Category list affects post listing pages, tag 'post'
    });

    return categories;
}

/**
 * Fetches the featured post(s).
 */
export async function getFeaturedPost(): Promise<PostListItem | null> {
    // Fetch one featured post (or first if multiple), use tag 'post'
    const featuredPost = await sanityFetch<PostListItem | null>({ query: featuredPostQuery, tags: ['post', 'featuredPost'] });

    // Need to ensure fetched object matches PostListItem shape if aliases differ in query
    if(featuredPost?.slug){
        // Query already aliases slug.current and image URLs, should match type
        return featuredPost;
    }

    return null; // Return null if no featured post found
}

/**
 * Fetches the most recent posts.
 */
export async function getRecentPosts(limit: number): Promise<PostListItem[]> {
    // Fetch recent posts, use tag 'post', include limit param
    const recentPosts = await sanityFetch<PostListItem[]>({
        query: recentPostsQuery(limit),
        params: { limit },
        tags: ['post', 'recentPosts'],
    });
    // Query alias should make this match PostListItem[] type
    return recentPosts;
}

/**
 * Fetches posts for the grid, optionally filtered by category.
 */
interface GetPostsOptions {
    categorySlug?: string; // Optional slug to filter by
    limit?: number; // Optional limit for pagination (not fully implemented here)
    // add skip, orderBy etc. for real pagination/sorting
}

export async function getPosts(options: GetPostsOptions = {}): Promise<PostListItem[]> {
    // Build query based on options
    const query = postListItemQuery(options.categorySlug);
    const params: { [key: string]: any } = {};
    if (options.categorySlug && options.categorySlug !== 'all') {
        params.categorySlug = options.categorySlug;
    }
    if (options.limit !== undefined) {
        // Modify query string to include limit if used, e.g., append [0...$limit]
        // For this example, let's just assume no limit in this base query
    }


    // Use tags for cache revalidation based on category
    const tags = options.categorySlug && options.categorySlug !== 'all'
        ? ['post', `category:${options.categorySlug}`]
        : ['post']; // 'post' tag covers all posts

    const posts = await sanityFetch<PostListItem[]>({ query, params, tags });

    // Query alias should make this match PostListItem[] type
    return posts;
}

// Helper function to fetch a single PostCategory by slug
// Useful for generating metadata for the category page if it wasn't removed
async function getPostCategoryBySlug(slug: string): Promise<SanityPostCategory | null> {
     const category = await sanityFetch<SanityPostCategory | null>({
         query: `*[_type == "postCategory" && slug.current == $slug][0]{_id, name, "id": slug.current}`,
         params: { slug },
         tags: ['postCategory', `category:${slug}`]
      });
     return category;
}