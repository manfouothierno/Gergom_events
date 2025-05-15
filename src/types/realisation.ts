
// src/types/realisation.ts
// Import relevant types if needed

// Type for data needed for the category filters
export interface RealisationCategoryFilter {
    name: string; // e.g., "Professionnel"
    slug: string; // e.g., "professional"
}

// Type for data needed for a single Realisation list item on the homepage slider
export interface RealisationListingItem {
    _id: string;
    _type: 'realisation';
    slug?: string | null; // URL slug for potential detail page
    name: string; // Corresponds to Sanity 'title' field
    categorySlug?: string | null; // slug from the category reference
    categoryName?: string | null; // name from the category reference
    imageUrl?: string | null; // URL from the mainImage asset reference
    completionDate?: string | null; // ISO date string from 'date' type field
    shortDescription?: string | null; // Text description field
    servicesUsedNames?: string[] | null; // Array of service names (dereferenced in query)

    // Add other fields here needed for the listing item (e.g., services images/colors)
    // If you need service slugs/IDs instead of names: servicesUsed[]{ _ref, service->slug.current }
}