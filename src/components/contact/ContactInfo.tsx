// src/components/contact/ContactInfo.tsx - Adapted for Sanity data

'use client';

import React from 'react'; // Import React if not already
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
// Import Portable Text renderer if fields like address are blockContent
import { PortableText } from '@portabletext/react';
// Import necessary types
import { PortableTextBlock, SocialLink } from '@/types/contactPage'; // Reusing types
// Import necessary Font Awesome icons dynamically (reuse the helper)
import * as FaIcons from 'react-icons/fa'; // Or import specific icons needed


// Helper to dynamically get the icon component from iconName string
// (Make sure this helper exists and imports needed react-icons/fa components,
// or duplicate the getIconComponentByName logic from previous examples here)
// We need a local implementation if this component is self-contained
const getIconComponentByName = (name?: string | null) => {
    if (!name || typeof name !== 'string') {
        // console.warn(`Icon name is null, undefined, or not a string:`, name);
        return null; // Return null if name is invalid or not provided
    }
    // Look up the icon in the react-icons/fa export
    const Icon = (FaIcons as any)[name]; // Use FaIcons alias, cast to any

    if (!Icon) {
        console.warn(`Icon component not found for name: ${name}`);
        // Consider returning a fallback icon component instead of null if preferred
        // Example: return FaIcons.FaQuestionCircle; // Needs FaQuestionCircle imported
        return null;
    }
    return Icon;
};


// Define props interface based on fields needed from ContactPageData
interface ContactInfoProps {
    // Basic Contact Info
    address?: PortableTextBlock[] | string | null; // Address text
    phone?: string | null;                       // Phone string
    email?: string | null;                       // Email string

    // Social Links array
    socialLinks?: SocialLink[] | null; // Array of SocialLink objects

    // Optional: if section titles were passed down instead of hardcoded
    // infoSectionTitle?: string | null;
    // socialSectionTitle?: string | null;
    // legalSectionTitle?: string | null; // if you moved legal to this block

    // Note: Opening Hours are HARDCODED in this component's V2 logic and are NOT in Sanity schema.
    // We will keep them hardcoded.
}


const ContactInfo = ({ address, phone, email, socialLinks }: ContactInfoProps) => { // Accept props

    // Render nothing if essential info is missing (e.g., all fields are empty)
    // Adjust condition based on what is mandatory for this component
    if (!address && !phone && !email && (!socialLinks || socialLinks.length === 0)) {
        return null;
    }


    // Portable Text components for the address if it's a blockContent field
    const addressPortableTextComponents = {
        // Custom renderers if needed for specific styling in the address (e.g., force line breaks)
        block: {
            normal: ({children}: {children: React.ReactNode}) => <p>{children}</p>,
            // If you need explicit line breaks per Portable Text block:
            // normal: ({children}: {children: React.ReactNode}) => <span>{children}<br/></span>, // Renders each block child on a new line visually
        },
        // Add mark definitions (bold, italic) if the address might use them
        // Add hardBreak renderer if converter inserted \n or your text input allowed <br>
        // hardBreak: () => <br />,
        // marks: {...}
    };

    // Placeholder Social Links (in case socialLinks is null/empty OR to show specific ones)
    // If you always want fetched social links, remove this
    // If you want to blend fetched links with potential hardcoded ones, logic is more complex
    /*
    const hardcodedSocialsFallback = [
         { platform: 'Facebook', url: 'https://www.facebook.com/gergomsas', iconName: 'FaFacebookF', _key: 'fb-fallback' },
         { platform: 'Instagram', url: 'https://www.instagram.com/gergomevents/', iconName: 'FaInstagram', _key: 'insta-fallback' },
         { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/gergom-events', iconName: 'FaLinkedinIn', _key: 'linkedin-fallback' },
         // Add others if needed
    ];
    */

    const displaySocialLinks = socialLinks || []; // Use fetched links, fallback to empty array


    return (
        // motion.div for the initial animation of the entire info block
        <motion.div
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100" // Styling from V2
            initial={{ opacity: 0, y: 20 }} // Initial animation
            animate={{ opacity: 1, y: 0 }} // Animation state
            transition={{ duration: 0.6, delay: 0.2 }} // Transition details
        >
            <div className="space-y-6">
                {/* Adresse */}
                {address && ( // Render if address data exists
                    <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center"> {/* Styling hardcoded */}
                            <FaMapMarkerAlt className="text-red-600 text-xl" /> {/* Icon hardcoded */}
                        </div>
                        <div className="ml-4">
                            {/* Title is HARDCODED */}
                            <h3 className="text-lg font-semibold text-gray-800">Notre adresse</h3>
                            {/* Address text - render using PortableText or plain string */}
                            <div className="text-gray-600 mt-1"> {/* Container for text */}
                                {typeof address === 'string' ? (
                                    <span>{address.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</span> // Render plain text with manual breaks
                                ) : (
                                    // Render Portable Text
                                    <PortableText value={address} components={addressPortableTextComponents} />
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Téléphone */}
                {phone && ( // Render if phone data exists
                    <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center"> {/* Styling hardcoded */}
                            <FaPhone className="text-red-600 text-xl" /> {/* Icon hardcoded */}
                        </div>
                        <div className="ml-4">
                            {/* Title is HARDCODED */}
                            <h3 className="text-lg font-semibold text-gray-800">Téléphone</h3>
                            <p className="text-gray-600 mt-1">
                                {/* Link and text from Sanity phone number */}
                                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-red-600 transition-colors">
                                    {phone}
                                </a>
                            </p>
                        </div>
                    </div>
                )}

                {/* Email */}
                {email && ( // Render if email data exists
                    <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center"> {/* Styling hardcoded */}
                            <FaEnvelope className="text-red-600 text-xl" /> {/* Icon hardcoded */}
                        </div>
                        <div className="ml-4">
                            {/* Title is HARDCODED */}
                            <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                            <p className="text-gray-600 mt-1">
                                {/* Link and text from Sanity email */}
                                <a href={`mailto:${email}`} className="hover:text-red-600 transition-colors">
                                    {email}
                                </a>
                            </p>
                        </div>
                    </div>
                )}

                {/* Horaires - HARDCODED - NOT FROM SANITY */}
                {/* Render this section as is */}
                <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <FaClock className="text-red-600 text-xl" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">Horaires d'ouverture</h3>
                        {/* These times are HARDCODED */}
                        <ul className="text-gray-600 mt-1 space-y-1">
                            <li className="flex justify-between">
                                <span>Lundi - Samedi:</span>
                                <span>8h00 - 19h00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Dimanche:</span>
                                <span>Fermé</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Réseaux sociaux - Render if there are social links to display */}
            {displaySocialLinks.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                    {/* Title is HARDCODED */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Suivez-nous</h3>
                    <div className="flex space-x-4">
                        {/* Map over fetched social links */}
                        {displaySocialLinks.map((link) => {
                            // Dynamically get icon component using name from data
                            const Icon = getIconComponentByName(link.iconName);

                            if (!Icon) return null; // Skip if icon not found

                            return (
                                <a
                                    key={link._key || link.platform} // Use _key from Sanity, fallback to platform/index
                                    href={link.url} // Use URL from data
                                    target="_blank" // Assume all social links are external
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-colors" // Styling hardcoded
                                >
                                    {/* Render the icon component */}
                                    <Icon className="w-5 h-5" /> {/* Icon size */}
                                    {/* If original used custom SVG inline, consider replacing it dynamically */}
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}

        </motion.div>
    );
};

export default ContactInfo;