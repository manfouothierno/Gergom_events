// src/types/aboutSection.ts
// Import types for Portable Text and Image URL
import { PortableTextBlock } from './services'; // Reuse PortableText type
// import { Image } from 'sanity'; // Could use Sanity's type for image field if not resolved, but we'll fetch URL

export interface TeamMember {
    _key: string;
    _type: 'teamMember';
    name: string;
    role?: string | null;
    image?: string | null; // Resolved image URL
    bio?: PortableTextBlock[] | null; // Portable Text
}

export interface Client {
    _key: string;
    _type: 'client';
    name: string;
    logo?: string | null; // Resolved image URL
    // url?: string | null; // If you add a URL field
}

export interface TimelineEvent {
    _key: string;
    _type: 'timelineEvent';
    year: string;
    title: string;
    description?: PortableTextBlock[] | null; // Portable Text
}

export interface StatItem {
    _key: string;
    _type: 'statItem';
    value: number;
    valueSuffix?: string | null; // Optional suffix
    label: string;
    iconName: string; // String name of the icon
}

// Interface for the entire About Section data object
export interface AboutSectionData {
    _id: string;
    _type: 'aboutSection';
    internalName?: string;

    introductionTitle?: string | null;
    introductionText?: PortableTextBlock[] | null;
    aboutButtonText?: string | null;
    aboutButtonHref?: string | null;
    backgroundImage?: string | null; // Resolved image URL

    videoUrl?: string | null; // Video URL
    videoPosterImage?: string | null; // Resolved image URL

    timelineTitle?: string | null;
    timelineEvents?: TimelineEvent[] | null; // Array of Timeline Events

    teamSectionTitle?: string | null;
    teamSectionDescription?: string | null;
    teamMembers?: TeamMember[] | null; // Array of Team Members

    clientSectionTitle?: string | null;
    clientSectionText?: PortableTextBlock[] | null; // Portable Text for text below slider
    clientSectionLinkText?: string | null;
    clientSectionLinkHref?: string | null;
    clients?: Client[] | null; // Array of Clients

    statsTitle?: string | null;
    stats?: StatItem[] | null; // Array of Stats

    // Add any other top-level fields from the schema
}