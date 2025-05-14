// src/components/services/ServicePage.tsx
'use client'; // This remains a client component

import React from 'react';
// Import necessary types from your services types file
import { SanityServiceData, PortableTextBlock, Product, Subcategory, Feature, FaqItem } from '@/types/services';

// Import your child components
import CategoryHeader from '@/components/services/CategoryHeader';
import ServiceIntro from '@/components/services/ServiceIntro';
import ProductFilters from '@/components/services/ProductFilters';
import ProductGrid from '@/components/services/ProductGrid';
import ServiceFAQ from '@/components/services/ServiceFAQ';
import ServiceCTA from '@/components/services/ServiceCTA';

// Import icons - We need all possible Fa icons to map the iconName string to a component
import * as FaIcons from 'react-icons/fa';
// You might need to map icon names here or pass the name down to the child component
// Let's add a helper function here similar to the ServicesSection list
const getIconComponent = (name?: string) => {
    if (!name || !(FaIcons as any)[name]) {
        // Return a default icon or null if name is invalid/not found
        console.warn(`Icon not found: ${name}`);
        return FaIcons.FaQuestionCircle; // Example fallback icon (make sure FaQuestionCircle is imported or in the *)
    }
    return (FaIcons as any)[name]; // Cast to any or explicitly type if possible
};


// Define the props that ServicePage expects
interface ServicePageProps {
    service: SanityServiceData; // Use the fetched Sanity type
}

const ServicePage = ({ service }: ServicePageProps) => {
    // Safely get the hex color string or use a fallback (e.g., transparent or black)
    const hexColor = service.color?.hex;

    // Get the icon component from the string name
    const ServiceIcon = getIconComponent(service.iconName);

    return (
        // Ensure this main wrapper handles scrolling/min height correctly for your layout
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

            {/* Category Header */}
            {/* Pass data shaped for the CategoryHeader component */}
            <CategoryHeader
                title={service.title}
                subtitle={service.subtitle}
                color={service.color} // Pass the hex string
                iconName={ServiceIcon} // Pass the Icon component
                bannerImage={service.bannerImage || undefined} // Pass the image URL (can be string or undefined)
            />

            {/* Service Introduction */}
            {/* Pass data shaped for the ServiceIntro component */}
            <ServiceIntro
                // Pass Portable Text array. ServiceIntro MUST be updated to render Portable Text.
                description={service.description}
                features={service.features || undefined} // Array might be optional
                applications={service.applications || undefined} // Array might be optional
                color={hexColor} // Pass the hex string
            />

            {/* Products Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
                        Notre matériel de {service.name?.toLowerCase() || 'services'}
                        {/* Fallback if service.name is missing */}
                    </h2>

                    {/* Product Filters */}
                    {/* Pass the subcategories array. ProductFilters expects Subcategory[]. */}
                    {/* You might filter here or within ProductFilters if needed */}
                    <ProductFilters categories={service.subcategories || undefined} />

                    {/* Product Grid */}
                    <div className="mt-10">
                        {/* Pass the products array. ProductGrid expects Product[]. */}
                        <ProductGrid
                            products={service.products || undefined}
                            color={hexColor} // Pass the hex string
                        />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            {/* Pass the faq array. ServiceFAQ expects FaqItem[]. */}
            {/* ServiceFAQ MUST be updated to render Portable Text for answers. */}
            <ServiceFAQ
                questions={service.faq || undefined}
                color={hexColor} // Pass the hex string
            />

            {/* Call-to-Action */}
            <ServiceCTA
                title={service.ctaTitle} // These are strings in the Sanity type
                description={service.ctaDescription} // These are strings in the Sanity type
                color={hexColor} // Pass the hex string
            />
        </main>
    );
};

export default ServicePage;