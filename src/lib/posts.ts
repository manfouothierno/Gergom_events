// src/lib/posts.ts

// Assuming your Sanity client setup with sanityFetch helper is in ./sanity
import { sanityFetch } from './sanity';

// Import necessary types from your types file for posts
import { Post, PostListItem, SanityPostCategory } from '@/types/post';
// Re-import PortableTextBlock if you need to explicitly type portable text values in functions (though less common in fetch files)
// import { PortableTextBlock } from '@/types/services';


// --- Reusable GROQ Query Fragments ---
// Define common projections (sets of fields to fetch) to keep queries DRY

// Projection for displaying posts in lists (grid, featured, recent)
// Fetches fields needed for summaries. Resolves references and aliases nested data.
const POST_LIST_ITEM_PROJECTION = `
  _id, // Sanity Document ID
  _type, // Document type (should be 'post')
  title, // Post title
  "slug": slug.current, // Alias slug.current to 'slug' field for frontend simplicity
  publishedAt, // Date/time string (ISO format)
  excerpt, // Short description/summary text
  "mainImageUrl": mainImage.asset->url, // Resolve mainImage reference to its asset URL
  "category": category->slug.current, // Dereference category to get its slug
  "categoryName": category->name, // Dereference category to get its name
  isFeatured // Boolean flag (optional, used for filtering)
  // If you added tags and needed them in lists: tags[]->{_id, name} // Or just tags as string[] if schema is array of strings
`;

// Projection for related posts listed on a detail page (subset of fields)
// Assumes the relatedPosts field is an array of references to 'post' documents
const RELATED_POST_PROJECTION = `
  _id,
  _type, // Should be 'post'
  title,
  "slug": slug.current, // Alias related post slug
  "mainImageUrl": mainImage.asset->url, // Resolve image URL
  "categoryName": category->name // Get category name of the related post
`;


// Projection for fetching the full details of a single post
// Includes all list item fields plus rich text content and related posts
const POST_DETAIL_PROJECTION = `
  ${POST_LIST_ITEM_PROJECTION}, // Include all fields from the list item projection
  author, // Author name string (or reference if using an Author type)
  content, // The Portable Text array
  // Dereference the relatedPosts array, applying the RELATED_POST_PROJECTION to each item
  relatedPosts[]->{ ${RELATED_POST_PROJECTION} }
  // You might fetch other specific fields needed only for the detail page here
`;


// --- GROQ Query Building Blocks / Templates ---
// Helper function to build the base filter part of a query string
// Returns a string like `*[_type == "post" && defined(slug.current) && category._ref in *[_type=="postCategory" && slug.current == $categorySlug]._id`
// It DOES NOT include the final closing ']' or any subsequent pipeline operations.
const postListItemsBaseFilter = (filterCategorySlug?: string): string => {
    const filter = filterCategorySlug && filterCategorySlug !== 'all'
        // GROQ filter pattern to match a post's 'category' reference against a category document whose slug matches $categorySlug
        ? `&& category._ref in *[_type=="postCategory" && slug.current == $categorySlug]._id`
        : ''; // No category filter if slug is 'all' or undefined

    // Returns the opening filter bracket and basic type/slug conditions
    // DOES NOT return the final closing ']'
    return `*[_type == "post" && defined(slug.current)${filter}`;
};


// Template to build a standard post list query (e.g., for the main grid)
// Combines base filter + closing ']' + ordering + projection
const postListQueryTemplate = (filterCategorySlug?: string): string =>
    `${postListItemsBaseFilter(filterCategorySlug)}] | order(completionDate desc){ ${POST_LIST_ITEM_PROJECTION} }`; // Use the template correctly, adding ']' before |


// Template to build a standard post list query WITH A LIMIT (e.g., for recent posts)
// Combines base filter + specific filters (like non-featured) + closing ']' + ordering + slice + projection
const postListQueryWithLimitTemplate = (filterCategorySlug?: string): string =>
    `${postListItemsBaseFilter(filterCategorySlug)} && isFeatured != true] | order(completionDate desc)[0...$limit]{ ${POST_LIST_ITEM_PROJECTION} }`; // Use the template, add specific filters, ']', slice, and projection


// --- Finalized GROQ Queries (often built using templates) ---

// Query for a single post by slug (using the base query + [0] + projection)
// Already defined as a direct string, which is fine
const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{ ${POST_DETAIL_PROJECTION} }`;

// Query for all post slugs for generateStaticParams
const allPostSlugsQuery = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;

// Query for all post categories
const allPostCategoriesQuery = `*[_type == "postCategory"] | order(order asc, name asc){ _id, name, "id": slug.current }`;

// Query for the featured post - Uses a template with additional filter and limit [0]
const featuredPostQuery = `${postListItemsBaseFilter(undefined)} && isFeatured == true] | order(completionDate desc)[0]{ ${POST_LIST_ITEM_PROJECTION} }`;

// No need for separate query string constants for recent and getPosts as they use the templates directly

// --- Fetching Functions (using sanityFetch and query templates) ---

/**
 * Fetches a single blog post by its slug for the detail page.
 * Includes full content and related posts.
 * Returns null if not found.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
    // Calls sanityFetch with the direct postBySlugQuery string and slug parameter.
    // Applies 'post' and post-specific tags for revalidation.
    const post = await sanityFetch<Post | null>({
        query: postBySlugQuery,
        params: { slug }, // Pass slug parameter $slug to the query
        tags: ['post', `post:${slug}`], // Tags for general posts and specific post slug
    });

    // The POST_DETAIL_PROJECTION and RELATED_POST_PROJECTION fragments
    // ensure the fetched 'post' object matches the 'Post' TypeScript type structure,
    // including string slugs, image URLs, portable text, and structured related posts.
    // Basic check if a document was found
    if (post && post._id && post.slug) {
        return post;
    }

    return null; // Return null if the fetch did not return a valid post object
}

/**
 * Fetches slugs for all published posts.
 * Used by Next.js's `generateStaticParams` function for SSG.
 * Returns an array of { slug: string } objects.
 */
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
    // Calls sanityFetch with the simple allPostSlugsQuery and 'post' tag.
    const slugs = await sanityFetch<{ slug: string }[]>({
        query: allPostSlugsQuery,
        tags: ['post'], // Tag all slugs fetch with 'post'
    });

    // Query returns [{ slug: '...' }], which directly matches the expected type.
    return slugs;
}

/**
 * Fetches all post categories, ordered as defined in the schema.
 * Used for category tabs and lists (like popular categories sidebar).
 * Returns an array of SanityPostCategory objects.
 */
export async function getAllPostCategories(): Promise<SanityPostCategory[]> {
    // Calls sanityFetch with the allPostCategoriesQuery and 'postCategory', 'post' tags.
    const categories = await sanityFetch<SanityPostCategory[]>({
        query: allPostCategoriesQuery,
        tags: ['postCategory', 'post'], // Tag categories fetch with categories and posts (as category list relates to posts)
    });

    // Query includes aliases for id/slug, name, etc., should match SanityPostCategory type.
    return categories;
}

/**
 * Fetches the single featured post, ordered by date.
 * Used for displaying a prominent "featured" article (e.g., top banner on blog page).
 * Returns null if no post is marked as featured.
 */
export async function getFeaturedPost(): Promise<PostListItem | null> {
    // Calls sanityFetch with the constructed featuredPostQuery string.
    const featuredPost = await sanityFetch<PostListItem | null>({
        query: featuredPostQuery,
        tags: ['post', 'featuredPost'], // Tag with 'post' and specific 'featuredPost'
    });

    // Check if a valid post list item was returned.
    if (featuredPost?.slug) { // Using .slug as a core indicator of valid PostListItem data
        return featuredPost;
    }

    return null; // Return null if no featured post was found
}

/**
 * Fetches the most recent posts (excluding featured ones) up to a specified limit.
 * Used for the "Recent Posts" sidebar list.
 * Returns an array of PostListItem objects.
 */
export async function getRecentPosts(limit: number): Promise<PostListItem[]> {
    // Uses the postListQueryWithLimitTemplate to build the query with filter and limit.
    const recentPosts = await sanityFetch<PostListItem[]>({
        query: postListQueryWithLimitTemplate(undefined), // Template includes filter (non-featured) and limit placeholder
        params: { limit }, // Pass the limit value as a parameter $limit to the query
        tags: ['post', 'recentPosts'], // Tag with 'post' and 'recentPosts'
    });

    // Query uses POST_LIST_ITEM_PROJECTION and alias, should match PostListItem[] type.
    return recentPosts;
}

/**
 * Fetches a list of posts for the main grid, optionally filtered by category.
 * This function is typically called client-side from PostGrid based on URL query params.
 * Returns an array of PostListItem objects.
 */
interface GetPostsOptions {
    categorySlug?: string; // Optional slug to filter by
    // For pagination, add parameters like:
    // limit?: number; // Number of items per page
    // offset?: number; // Number of items to skip (page * limit)
    // orderBy?: string; // Can override default ordering if needed
}

export async function getPosts(options: GetPostsOptions = {}): Promise<PostListItem[]> {
    // Builds the query using the postListQueryTemplate based on the optional category slug filter.
    const query = postListQueryTemplate(options.categorySlug);

    // Prepare parameters. Includes categorySlug if provided, and pagination params if added to query template.
    const params: { [key: string]: any } = {};
    if (options.categorySlug && options.categorySlug !== 'all') {
        params.categorySlug = options.categorySlug; // Pass categorySlug as $categorySlug parameter if filtering
    }
    // Add pagination parameters if the query template was updated to use $limit and $offset
    // if (options.limit !== undefined) params.limit = options.limit;
    // if (options.offset !== undefined) params.offset = options.offset;


    // Use tags for cache revalidation based on active category filter or default 'post'
    const tags = options.categorySlug && options.categorySlug !== 'all'
        ? ['post', `category:${options.categorySlug}`] // Tag specifically with the category slug if filtering
        : ['post']; // General 'post' tag if fetching all posts


    const posts = await sanityFetch<PostListItem[]>({ query, params, tags });

    // Query uses POST_LIST_ITEM_PROJECTION and alias, should match PostListItem[] type.
    return posts;
}


// Helper function to fetch a single PostCategory by slug (optional use)
// Useful for generating metadata for the category page if needed, but main blog page doesn't necessarily need it.
// export async function getPostCategoryBySlug(slug: string): Promise<SanityPostCategory | null> {
//      const category = await sanityFetch<SanityPostCategory | null>({
//          query: `*[_type == "postCategory" && slug.current == $slug][0]{_id, name, "id": slug.current}`,
//          params: { slug },
//          tags: ['postCategory', `category:${slug}`]
//       });
//      return category;
// }

// --- Export all public fetching functions ---
