
import { PortableTextBlock } from './services';

// src/types/homepage.ts

// Define type for a single slide object
export interface HeroSlide {
    _key: string; // Sanity adds _key to array items
    _type: 'heroSlide'; // Matches the object type name in Sanity
    image?: string | null; // Image URL after asset resolution in the query
    title: string;
    subtitle?: string | null;
}

export interface ReviewItem {
    _key: string;
    _type: 'reviewItem';
    author: string;
    rating: number; // Number from 1-5
    text: string; // Or PortableTextBlock[] if using blockContent schema field
    publishedAt?: string | null; // Datetime string (Sanity returns ISO 8601 string)
    avatar?: string | null; // Resolved image URL
}

export interface GoogleReviewsSectionData {
    _id: string;
    _type: 'googleReviewsSection';
    internalName?: string;
    sectionTitle?: string | null;
    googlePlaceUrl?: string | null; // URL string

    reviews?: ReviewItem[] | null; // Array of review objects

    ctaBannerTitle?: string | null;
    ctaBannerText?: PortableTextBlock[] | string | null; // Portable Text or string, based on schema
    ctaBannerLinkText?: string | null;
    ctaBannerLinkHref?: string | null; // URL string

    // Add other top-level fields from the schema if any
}


export interface CtaStatItem {
    _key: string;
    _type: 'ctaStatItem';
    numericValue: number; // For animation
    displayValue: string; // Text displayed
    label: string;
    iconName: string; // String name for icon
}

export interface CtaSectionData {
    _id: string;
    _type: 'ctaSection';
    internalName?: string;

    backgroundImage?: string | null; // Resolved image URL

    statsTitle?: string | null;
    stats?: CtaStatItem[] | null; // Array of CTA stats

    ctaTitle?: string | null;
    ctaText?: PortableTextBlock[] | string | null; // Portable Text for flexibility
    ctaButtonText?: string | null;
    ctaButtonHref?: string | null; // URL string
    ctaButtonIconName?: string | null; // String name for button icon

    // Add any other top-level fields from the schema
}

// Type for the full Hero data fetched from Sanity (it will be an array of slides)
// Although the document 'hero' contains the array, our fetch query will just grab the array.
export type HeroSliderData = HeroSlide[];