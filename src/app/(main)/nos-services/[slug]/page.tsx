// src/app/(main)/nos-services/[slug]/page.tsx

// This is a Server Component by default in the App Router.
// The "use server" directive is typically for Server Actions/Mutations,
// data fetching works naturally with async/await in Page/Layout/Component files.
// Removing it to avoid potential confusion, but keeping `async/await`.
// "use server";

import { notFound } from 'next/navigation'; // For showing a 404 page
import { Metadata } from 'next'; // Type for generateMetadata return

// Import data fetching functions from your library
import { getAllServiceSlugs, getServiceData } from '@/lib/services';
import { SanityServiceData } from '@/types/services'; // Import the type for the service data

// Import your component that will display the service data
// Assuming ServicePage is a Client Component if it needs interactivity,
// otherwise, it could also be a Server Component.
// Let's assume it might be a Client Component for flexibility.
import ServicePage from '@/components/services/ServicePage';

// --- Dynamic Metadata Generation ---
// Learn more: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
export async function generateMetadata({
                                           params, // Contains the slug from the URL e.g., { slug: 'sonorisation' }
                                       }: {
    params: { slug: string };
}): Promise<Metadata> { // Indicate the return type is Metadata

    // Fetch the data for this specific service slug
    const service = await getServiceData(params.slug); // AWAIT the async fetch

    // If no service found for this slug, return a minimal metadata (or could omit, Next.js handles basic fallback)
    if (!service) {
        return {};
    }

    // Generate metadata based on fetched data
    const pageTitle = `${service.title} | Gergom Events`; // Use the fetched title
    const pageDescription = service.metaDescription; // Use the fetched meta description

    return {
        title: pageTitle,
        description: pageDescription,
        // Open Graph (optional but good for sharing on social media)
        // Depends on how you structure images/data for OG
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: `https://your-website.com/nos-services/${service.slug}`, // Replace with your domain
            siteName: 'Gergom Events', // Replace with your site name
            // images: [service.bannerImage?.url].filter(Boolean), // If you want to use the banner image as OG image
        },
        // You can add more meta tags here (keywords, Twitter cards, etc.)
    };
}

// --- Static Path Generation for SSG ---
// Learn more: https://nextjs.org/docs/app/api-reference/file-conventions/generate-static-params
// This function tells Next.js which slugs to build HTML for at build time.
export async function generateStaticParams(): Promise<{ slug: string }[]> { // Indicate the return type
    // Fetch all service slugs from Sanity
    const slugs = await getAllServiceSlugs(); // AWAIT the async fetch

    // The getAllServiceSlugs function from the last step already returns [{ slug: '...' }]
    // If it returned string[], you would map it like:
    // return slugs.map(s => ({ slug: s }));
    // Since it returns the correct format, just return the result:
    return slugs;
}

export default async function DynamicServicePage({
                                                     params, // Contains the slug from the URL
                                                 }: {
    params: { slug: string };
}) {
    // Fetch the full service data based on the slug from the URL parameters
    const {slug} =  await  params;
    const serviceData: SanityServiceData | null = await getServiceData(slug); // AWAIT the async fetch
    console.log('serviceData', serviceData);


    // If no data is returned (getServiceData returned null), trigger a 404
    if (!serviceData) {
        notFound(); // Renders the closest not-found.tsx file
    }

    // If data is found, pass it to the ServicePage component for rendering
    // Since this is a Server Component, and ServicePage is likely a Client Component,
    // Next.js handles the transition/passing data down correctly.
    return <ServicePage service={serviceData} />;
}