// src/components/contact/OtherContactMethodsSection.tsx
'use client'; // Client component for Image and potentially PortableText

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Or use <a> tags for external links
// Import Portable Text renderer if description is blockContent
import { PortableText } from '@portabletext/react';

// Import necessary type
import { ContactMethodItem, PortableTextBlock } from '@/types/contactPage';

// Define props for this component
interface OtherContactMethodsSectionProps {
    methods?: ContactMethodItem[] | null; // Array of contact method items
}

export default function OtherContactMethodsSection({ methods }: OtherContactMethodsSectionProps) {
    // Render nothing if no methods are provided
    if (!methods || methods.length === 0) {
        return null;
    }

    // Portable Text components for the description field
    const descriptionPortableTextComponents = {
        block: {
            normal: ({children}: { children: React.ReactNode }) => <p>{children}</p>,
            // Add others as needed (e.g., line breaks)
        },
        // Add marks, types etc if used in your Portable Text field
    };


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {methods.map((method, index) => (
                // Use _key for list stability
                <div key={method._key || index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                    {method.iconImage && ( // Render icon image if URL exists
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"> {/* Background color is hardcoded */}
                            <Image
                                src={method.iconImage}
                                alt={method.title || 'Contact Method'} // Alt text from method title
                                width={32} // Define base size for optimization
                                height={32} // Define base size
                                className="w-8 h-8 object-contain" // Maintain size and aspect ratio
                            />
                        </div>
                    )}

                    {method.title && ( // Render title
                        <h3 className="text-xl font-bold mb-2 text-gray-800">{method.title}</h3>
                    )}

                    {method.description && ( // Render description (Portable Text)
                        <div className="text-gray-600 mb-3">
                            {/* Render description using PortableText or plain string */}
                            {typeof method.description === 'string' ? (
                                <p>{method.description}</p>
                            ) : (
                                <PortableText value={method.description} components={descriptionPortableTextComponents} />
                            )}
                        </div>
                    )}


                    {/* Render the contact link */}
                    {(method.contactLinkText && method.contactLinkHref) && (
                        <a href={method.contactLinkHref} className="text-red-600 font-medium hover:text-red-700"> {/* Link color hardcoded */}
                            {method.contactLinkText} {/* Link text */}
                        </a>
                    )}

                </div>
            ))}
        </div>
    );
}