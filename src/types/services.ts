// src/types/services.ts

// Sanity Portable Text Type
// You can get more detailed types from @portabletext/types
// import { PortableTextRawBlock } from '@portabletext/types';

// Basic PortableText block type, suitable for most simple cases.
// If you have complex blocks (like custom components embedded in rich text),
// you'll need a more detailed union type here.
export type PortableTextBlock = {
    _key: string; // Sanity automatically adds _key to array items
    _type: string; // e.g., 'block'
    children: Array<{ // Typical children for 'block' type
        _key: string;
        _type: 'span';
        marks?: string[]; // e.g., ['strong', 'em']
        text: string;
    }>;
    markDefs?: Array<{ // Definitions for custom marks like internal/external links
        _key: string;
        _type: string; // e.g., 'link'
        [key: string]: any; // Other link properties like 'href'
    }>;
    style?: string; // e.g., 'normal', 'h1', 'blockquote'
    listItem?: string; // e.g., 'bullet', 'number'
    level?: number; // for list items
    [key: string]: any; // Other potential properties depending on your blockContent config
};


export interface Feature {
    _key?: string; // Add _key for array items
    title: string;
    description: string;
    iconName?: string;
}

export interface Subcategory {
    _key?: string; // Add _key for array items
    id: string; // This corresponds to your original unique subcategory string ID
    name: string;
}

export interface Product {
    _key?: string; // Sanity adds _key to items in arrays like products
    id: string; // This corresponds to the unique string ID you added for products
    name: string;
    category: string; // This should match the 'id' of a Subcategory
    image?: string | null; // The GROQ query fetches the URL directly
    isAvailableForRent?: boolean;
    isAvailableForSale?: boolean;
    price?: string; // Keeping as string as in original data
    description?: string; // Keeping as string based on your original product description field
    specs?: string[];
}

export interface FaqItem {
    _key?: string; // Add _key for array items
    question: string;
    answer: PortableTextBlock[]; // Sanity rich text field returns Portable Text array
}

// The main interface for a Sanity "service" document
export interface SanityServiceData {
    _id: string; // Sanity document ID (set to slug in your import script)
    _type: 'service'; // Matching the Sanity document type name
    slug: string; // The slug string from slug.current alias in the query
    name: string;
    title: string;
    subtitle?: string;
    color?: { // Sanity's color type returns an object
        _type: 'color';
        hex: string;
        // Other color properties like hsv, hsl, rgb
        [key: string]: any;
    } | null; // Can be null if not set
    iconName?: string;
    bannerImage?: string | null; // The GROQ query fetches the URL directly
    metaDescription?: string;
    description: PortableTextBlock[]; // Sanity rich text field
    features?: Feature[]; // Array of Feature objects
    applications?: string[]; // Array of strings
    subcategories?: Subcategory[]; // Array of Subcategory objects
    products?: Product[]; // Array of Product objects
    faq?: FaqItem[]; // Array of FaqItem objects
    ctaTitle?: string;
    ctaDescription?: string;
}

export interface HeaderServiceMenuItem {
    _id: string; // Sanity Document ID - good for keying lists
    name: string; // Service Name
    slug: string; // Service slug for URL
    color?: { // Sanity color type object - need hex for styling
        hex: string;
        // other color properties...
    } | null; // Color might be optional
}