// src/app/(main)/contact/page.tsx

// This is an async Server Component for data fetching and dynamic metadata

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
// Import data fetching function
import { getContactPageData } from '@/lib/services'; // Assuming service/api file has this function
// Import types for fetched data
import { ContactPageData } from '@/types/contactPage';


// Import child components (they will now receive props)
import ContactForm from '@/components/contact/ContactForm'; // Update ContactForm if its title/text is dynamic
import ContactInfo from '@/components/contact/ContactInfo'; // Will need contact info data
import Faq from '@/components/contact/Faq'; // Will need FAQ data (array)
import MapSection from '@/components/contact/MapSection'; // Will need map config data
import OtherContactMethodsSection from '@/components/contact/OtherContactMethodsSection'; // You'll need to create/update this

// Revalidation tag setup (optional but good practice for SSG/ISR)
export const revalidate = 3600; // Revalidate contact page every hour

// --- Dynamic Metadata Generation ---
export async function generateMetadata(): Promise<Metadata> {
    // Fetch the contact page data (same data fetched for the page content)
    // Next.js automatically deduplicates fetches, so fetching here and in the component is okay
    const pageData = await getContactPageData();

    // Use data from Sanity for metadata, fallback to defaults if not found
    const defaultTitle = 'Contact | Gergom Events';
    const defaultDescription = 'Contactez notre équipe pour organiser votre événement ou demander un devis personnalisé. Location et vente de matériel événementiel en région PACA.';


    return {
        title: pageData?.metadataTitle || defaultTitle,
        description: pageData?.metadataDescription || defaultDescription,
        // Optional: Add more metadata like canonical URL, Open Graph, etc.
        openGraph: {
            title: pageData?.metadataTitle || defaultTitle,
            description: pageData?.metadataDescription || defaultDescription,
            // Add image if banner image is suitable for OG
            // images: [pageData?.bannerImage].filter(Boolean),
        },
        // Add other tags as needed
    };
}

// --- Default Server Component (Page Content) ---
export default async function ContactPage() {
    // Fetch all data for the contact page
    const pageData: ContactPageData | null = await getContactPageData();

    // If data is not found, show a 404 page
    if (!pageData) {
        notFound(); // Renders the closest not-found.tsx file
    }

    // Access data directly from the fetched pageData object
    const {
        bannerImage,
        bannerTitle,
        bannerSubtitle,
        formSectionTitle,
        infoSectionTitle,
        address,
        phone,
        email,
        mapSectionTitle,
        mapConfig,
        faqSectionTitle,
        faqItems,
        otherMethodsSectionTitle,
        otherContactMethods
    } = pageData;


    return (
        <main className="bg-white">
            {/* Banner Section */}
            {/* Only render banner if title, subtitle, or image exist */}
            {(bannerImage || bannerTitle || bannerSubtitle) && (
                <section className="relative h-[400px] md:h-[500px]  pt-5 mt-4 bg-gray-900 overflow-hidden">
                    {bannerImage && ( // Render image if URL exists
                        <img
                            src={bannerImage} // Use fetched URL
                            alt={bannerTitle || 'Contact Us'} // Alt text from banner title or default
                            priority
                            className="object-cover opacity-60"
                        />
                    )}
                    {/* Dark overlay (kept as is) */}
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-40 z-10"></div>


                    <div className="absolute inset-0 flex items-center justify-center z-20"> {/* Higher z-index for content */}
                        <div className="text-center text-white px-4">
                            {bannerTitle && ( // Title
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">{bannerTitle}</h1>
                            )}
                            {bannerSubtitle && ( // Subtitle
                                <p className="text-xl md:text-2xl max-w-2xl mx-auto">{bannerSubtitle}</p>
                            )}
                        </div>
                    </div>
                </section>
            )}


            {/* Main Section with Form and Info */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form Section */}
                        {formSectionTitle && ( // Render section if title exists
                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">{formSectionTitle}</h2>
                                {/* ContactForm component - data fetched within or gets limited props */}
                                {/* If the form itself had dynamic fields/intro text, pass props here */}
                                <ContactForm /> {/* Assuming ContactForm handles its own submission */}
                            </div>
                        )}


                        {/* Contact Informations Section */}
                        {infoSectionTitle && (
                            (address || phone || email) && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800">{infoSectionTitle}</h2>
                                    <ContactInfo address={address} phone={phone} email={email} />
                                </div>
                            )
                        )}

                    </div>
                </div>
            </section>

            {/* Map Section */}
            {/* Render section if title or embed URL exists */}
            {(mapSectionTitle || (mapConfig && mapConfig.mapEmbedUrl)) && (
                // Optional: Pass the title as a prop to MapSection if MapSection renders it
                <MapSection title={mapSectionTitle} mapConfig={mapConfig} />
                )}


            {/* FAQ Section */}
            {/* Render section if title exists AND there are FAQ items */}
            {(faqSectionTitle && faqItems && faqItems.length > 0) && (
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        {/* Use title from Sanity */}
                        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">{faqSectionTitle}</h2>
                        <div className="max-w-3xl mx-auto">
                            {/* Pass the array of FAQ items to Faq component */}
                            {/* Ensure Faq component accepts FaqItem[] and handles Portable Text */}
                            <Faq questions={faqItems} /> {/* Pass the array */}
                        </div>
                    </div>
                </section>
            )}


            {/* Other Means of Contact Section */}
            {/* Render section if title exists AND there are other contact method items */}
            {(otherMethodsSectionTitle && otherContactMethods && otherContactMethods.length > 0) && (
                <section className="py-16"> {/* Keep padding and background (white) */}
                    <div className="container mx-auto px-4">
                        {/* Use title from Sanity */}
                        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">{otherMethodsSectionTitle}</h2>
                        {/* Component to render the grid of other contact methods */}
                        {/* Ensure this component accepts ContactMethodItem[] and renders them */}
                        <OtherContactMethodsSection methods={otherContactMethods} /> {/* Pass the array */}
                    </div>
                </section>
            )}


        </main>
    );
}

// Helper component to render the Other Means of Contact Section
// You need to create this file: src/components/contact/OtherContactMethodsSection.tsx