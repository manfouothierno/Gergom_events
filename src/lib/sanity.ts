// src/lib/sanity.ts
import { createClient } from 'next-sanity';
// Optional: Import these from a shared sanity.env file if you set one up
// import { apiVersion, dataset, projectId, useCdn } from '../../sanity.env';

// Define these as environment variables in your .env.local file
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8hsiwezp'; // Required
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';   // Required
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-13'; // Default to latest
const useCdn = process.env.NODE_ENV === 'production';       // Use CDN in production
const readToken = process.env.SANITY_API_READ_TOKEN;       // Required for non-public datasets

if (!projectId || !dataset) {
    throw new Error(
        'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET environment variables.'
    );
}

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    token: readToken,
    // Sanity Visual Editing
    // studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL, // Optional, but needed for visual editing
});

// This client can be used for fetching data

// If you need a client for authenticated/write operations (less common in frontend apps)
// export const previewClient = createClient({ /* ... same config but likely with a preview token ... */ });

// --- Data Fetching Wrapper (Optional but recommended for consistent options) ---

interface SanityFetchOptions {
    query: string;
    params?: { [key: string]: any };
    // next-sanity adds specific caching/revalidation options here
    // Learn more: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#options
    // And https://www.sanity.io/docs/api-versioning
    revalidate?: number | false; // Number of seconds, or false to never revalidate
    tags?: string[]; // Used for on-demand revalidation
    cache?: RequestCache; // e.g., 'no-store', 'force-cache'
}

// A helper wrapper function using the default client
export async function sanityFetch<T>({
                                         query,
                                         params = {},
                                         revalidate = 3600, // Default cache for 1 hour (adjust as needed)
                                         tags = [],
                                         cache
                                     }: SanityFetchOptions): Promise<T> {
    return client.fetch<T>(query, params, {
        next: {
            // revalidate: cache === 'no-store' ? 0 : revalidate, // 'no-store' bypasses caching
            tags
        },
        // cache: cache // Pass explicit cache option if provided ('no-store', 'force-cache', etc.)
    });
}