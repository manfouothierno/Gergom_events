// src/types/siteSettings.ts
// Import Portable Text type
import { PortableTextBlock } from './services'; // Adjust path if necessary

// Define types for footer links
export interface FooterLink {
    _key: string;
    _type: 'footerLink';
    text: string;
    href: string;
    openInNewTab?: boolean | null;
}

// Define types for social links
export interface SocialLink {
    _key: string;
    _type: 'socialLink';
    platform: string;
    url: string;
    iconName: string; // String name for the icon
}

// Assuming you are REUSING the Client type from types/aboutSection.ts for footer partners
import { Client as FooterPartner } from './aboutSection'; // Alias import for clarity

// Define the type for the main Footer data document
export interface SiteFooterData {
    _id: string;
    _type: 'siteFooter';
    internalName?: string | null;

    logoFooter?: string | null; // Resolved image URL
    slogan?: string | null;
    companyDescription?: PortableTextBlock[] | string | null; // Based on schema choice (Block Content or text)

    contactSectionTitle?: string | null;
    address?: PortableTextBlock[] | string | null; // Based on schema choice (Block Content or text)
    phone?: string | null;
    email?: string | null;

    quickMenuTitle?: string | null;
    quickMenuLinks?: FooterLink[] | null;

    legalMenuTitle?: string | null;
    legalMenuLinks?: FooterLink[] | null;

    socialTitle?: string | null;
    socialLinks?: SocialLink[] | null;

    footerPartnersTitle?: string | null; // Section title
    footerPartners?: FooterPartner[] | null; // Array of Client objects (reused type)

    copyrightText?: string | null;
    developerText?: string | null;
    developerLinkText?: string | null;
    developerLinkHref?: string | null;

    // Add other top-level fields if any
}