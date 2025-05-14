// src/components/services/ServiceIntro.tsx
import React from 'react';
import { PortableText } from '@portabletext/react'; // Import the Portable Text renderer
// Import the specific types expected
import { Feature, PortableTextBlock } from '@/types/services';

// Assuming '@/utils/icons' has a utility function named `getIconByName`
// that correctly maps a string name (e.g., "FaMusic") to the actual React Icon component
// If you used the getIconComponentByName helper I provided before, ensure that's accessible or duplicate it here.
import { getIconByName } from "@/utils/icons"; // Or use a local helper

// Define the props based on the relevant fields from SanityServiceData
interface ServiceIntroProps {
    // description is now Portable Text
    description: PortableTextBlock[];
    // features is an array of the Feature type
    features?: Feature[]; // Made optional as per Sanity type
    // applications is still an array of strings
    applications?: string[]; // Made optional as per Sanity type
    // color is the hex string passed from the parent (or null/undefined)
    color?: string | null; // Accepted as hex string or null
}

const ServiceIntro = ({ description, features, applications, color }: ServiceIntroProps) => {

    // Safely get the hex color, providing a fallback for styling
    const hexColor = color || '#FF0000'; // Use the color if provided, else default to red


    // You might need custom renderers for your Portable Text if you have specific styling
    // (like the text-[#...] font-semibold span).
    // Example custom components for Portable Text:
    const portableTextComponents = {
        // Add custom components here if needed
        // types: { /* Custom block types */ },
        // markDefs: { /* Custom mark definitions like links */ },
        marks: {
            // Handle the 'strong' mark from your simple converter for spans
            // Frontend styling for text-[#...] will depend on your Tailwind setup or custom CSS
            // For basic bold:
            strong: ({children}: { children: React.ReactNode }) => <strong className="font-semibold">{children}</strong>,

            // Example if you needed a custom span with specific styling:
            // span: ({value, children}: { value: any, children: React.ReactNode }) => {
            //    // If you passed custom marks or block types
            //     if (value.spanType === 'colored') {
            //         return <span style={{ color: value.color }}>{children}</span>;
            //     }
            //     return <span>{children}</span>;
            // },
        },
        // block: {
        //     // Handle different block styles if needed
        //     normal: ({children}: { children: React.ReactNode }) => <p className="text-lg text-gray-600 leading-relaxed">{children}</p>,
        //     // Add H1, H2, blockquote, etc. as defined in your blockContent schema
        // },
        // list: { bullet: ({children}: { children: React.ReactNode }) => <ul className="list-disc ml-5">{children}</ul> },
        // listItem: { bullet: ({children}: { children: React.ReactNode }) => <li>{children}</li> },
        // ... add others like hardBreak, container, etc.
    };


    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Solutions professionnelles</h2>
                    {/* Render description using PortableText */}
                    <div className="text-lg text-gray-600 leading-relaxed">
                        {/* Pass the Portable Text value (the array of blocks) */}
                        <PortableText value={description} components={portableTextComponents} />
                    </div>
                </div>

                {/* Caractéristiques */}
                {/* Render features if the array exists and has items */}
                {features && features.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 justify-around">
                        {features.map((feature) => { // No need for index key if _key is present in data
                            // Ensure the Feature object from Sanity has _key for list keys
                            const featureKey = feature._key || feature.title; // Use _key if available, fallback to title

                            // Ensure getIconByName works or replace its usage
                            const IconComponent = getIconByName(feature.iconName || undefined); // Safely pass name string

                            return (
                                // Use the generated key
                                <div key={featureKey} className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                    <div
                                        className="w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:bg-opacity-70 transition-colors"
                                        // Use inline style with the hex color for background opacity
                                        style={{ backgroundColor: `${hexColor}15` }} // Appends '15' for 15% opacity in hex
                                    >
                                        {/* Render the fetched icon component if it exists */}
                                        {IconComponent && <IconComponent style={{ color: hexColor }} className="text-xl" />} {/* Apply hex color style directly */}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p> {/* Assuming feature.description is plain text */}
                                </div>
                            );
                        })}
                    </div>
                )}


                {/* Applications */}
                {/* Render applications if the array exists and has items */}
                {applications && applications.length > 0 && (
                    <div className="mt-16 bg-gray-50 rounded-xl p-8">
                        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Domaines d'application</h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {applications.map((application, index) => (
                                <div
                                    key={index} // Use index as key if applications are simple strings without _key
                                    className="text-center p-4 rounded-lg bg-white shadow-sm"
                                    // Use inline style with the hex color for the border
                                    style={{ borderLeft: `3px solid ${hexColor}` }}
                                >
                                    <span className="text-gray-700">{application}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ServiceIntro;