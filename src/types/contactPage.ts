// src/types/contactPage.ts
// Import Portable Text type
import { PortableTextBlock } from './services'; // Adjust path

// Reuse or redefine FAQ item if necessary, but reusing from services seems logical
import { FaqItem as ContactFaqItem } from './services';

// Define type for 'Autres Moyens de Contact' items
export interface ContactMethodItem {
    _key: string;
    _type: 'contactMethodItem';
    title: string;
    iconImage?: string | null; // Resolved image URL
    description?: PortableTextBlock[] | string | null; // Based on schema (blockContent or text)
    contactLinkText: string;
    contactLinkHref: string; // URL string (mailto:, tel:)
}

// Define type for Map configuration
export interface MapConfigData {
    mapEmbedUrl?: string | null; // URL for map embed
    // Add other map-related fields if any
}


// Define type for the main Contact Page document data
export interface ContactPageData {
    _id: string;
    _type: 'contactPage';
    internalName?: string | null;

    // Banner
    bannerImage?: string | null; // Resolved image URL
    bannerTitle?: string | null;
    bannerSubtitle?: string | null;

    // Form Section
    formSectionTitle?: string | null;

    // Contact Info Section
    infoSectionTitle?: string | null;
    address?: PortableTextBlock[] | string | null; // Based on schema (blockContent or text)
    phone?: string | null;
    email?: string | null;

    // Map Section
    mapSectionTitle?: string | null;
    mapConfig?: MapConfigData | null; // Nested map config data

    // FAQ Section
    faqSectionTitle?: string | null;
    faqItems?: ContactFaqItem[] | null; // Array of FaqItems (reusing type)

    // Other Contact Methods Section
    otherMethodsSectionTitle?: string | null;
    otherContactMethods?: ContactMethodItem[] | null; // Array of ContactMethodItem

    // Metadata
    metadataTitle?: string | null;
    metadataDescription?: string | null;

    // Add other top-level fields if any
}