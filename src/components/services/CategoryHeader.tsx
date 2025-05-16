// src/components/services/CategoryHeader.tsx
'use client' // This remains a client component

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Import necessary icon types and potentially the lookup utility
// You need ALL potential FaIcons available to your getIconByName function
import * as FaIcons from 'react-icons/fa';

// Helper to dynamically get the icon component (You can replace getIconByName implementation if needed)
// Assumes `name` matches an export from 'react-icons/fa'
const getIconComponentByName = (name?: string) => {
    if (!name || !(FaIcons as any)[name]) {
        console.warn(`Icon component not found for name: ${name}`);
        return FaIcons.FaQuestionCircle; // Fallback Icon
    }
    return (FaIcons as any)[name];
};

// Import the type definition for the service data fetched from Sanity
// We need only the relevant fields from SanityServiceData
import { SanityServiceData } from '@/types/services';

// Define the props CategoryHeader expects, based on SanityServiceData fields
interface CategoryHeaderProps {
    // Match the field names and types from SanityServiceData
    title: string;
    subtitle?: string | null; // Make optional as per schema
    color?: { hex: string } | null; // Sanity color is an object, just need hex for styling
    iconName?: string | null; // Icon name string
    bannerImage?: string | null; // Image URL string after asset resolution
}

// Removed the isVisible state and useEffect - will rely on Framer Motion defaults or parent animation control
const CategoryHeader = ({ title, subtitle, color, iconName, bannerImage }: CategoryHeaderProps) => {

    // Safely extract hex color for background gradient, fallback to a default if not available
    const hexColor = color?.hex || '#000000'; // Default to black if color is null/undefined

    // Get the actual icon component based on the string name
    const ServiceIcon = getIconComponentByName(iconName || undefined); // Pass name string

    return (
        <section className="relative h-80 sm:h-96 md:h-[450px] mt-5 overflow-hidden">
            {/* Image de fond avec overlay */}
            <div className="absolute inset-0">
                {/* Use bannerImage URL and safely check if it exists */}
                {bannerImage && (
                    <Image
                        src={bannerImage}
                        alt={title || 'Category image'} // Use title for alt text, with fallback
                        fill
                        priority // Set to true for LCP image if this is high up on the page
                        className="object-cover object-center"
                    />
                )}

                {/* Overlay dégradé using dynamic hex color */}
                {/* Added opacity levels 70 & 40, adjust as needed */}
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: `linear-gradient(to right, ${hexColor}b3 0%, ${hexColor}66 50%, rgba(0,0,0,0.6) 100%)`
                    }}
                ></div>

            </div>

            {/* Contenu */}
            <div className="container mx-auto px-4 h-full relative z-10">
                <div className="flex flex-col justify-center h-full max-w-2xl">
                    {/* Icône - Safely render the icon component */}
                    {/*{ServiceIcon && (*/}
                    {/*    <motion.div*/}
                    {/*        className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white text-3xl mb-6"*/}
                    {/*        // Simple mount animation (opacity & scale)*/}
                    {/*        initial={{ opacity: 0, scale: 0.8 }}*/}
                    {/*        animate={{ opacity: 1, scale: 1 }}*/}
                    {/*        transition={{ duration: 0.6 }}*/}
                    {/*    >*/}
                    {/*        <ServiceIcon /> /!* Render the dynamically determined icon *!/*/}
                    {/*    </motion.div>*/}
                    {/*)}*/}


                    {/* Titre */}
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {title} {/* Use title prop */}
                    </motion.h1>

                    {/* Sous-titre - Safely render subtitle if it exists */}
                    {subtitle && (
                        <motion.p
                            className="text-lg sm:text-xl text-white/90"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {subtitle} {/* Use subtitle prop */}
                        </motion.p>
                    )}

                </div>
            </div>

            {/* Vague décorative - Kept as is */}
            {/* Note: The fill color should match the background color of the next section (likely the gray/white gradient starting with white). */}
            {/* This SVG's fill="#F9FAFB" matches Tailwind's gray-50, assuming that's the color below */}
            <div className="absolute bottom-0 left-0 right-0 text-[#F9FAFB]"> {/* Set text color to make fill inherit */}
                <svg
                    viewBox="0 0 1440 80"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                    preserveAspectRatio="none"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 32L60 36C120 40 240 48 360 52C480 56 600 56 720 48C840 40 960 24 1080 20C1200 16 1320 24 1380 28L1440 32V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V32Z"
                        // Remove fill here
                    />
                </svg>
            </div>
        </section>
    );
};

export default CategoryHeader;