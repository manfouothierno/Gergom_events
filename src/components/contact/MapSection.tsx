// src/components/contact/MapSection.tsx - Adapted for Sanity data
'use client'; // Client component for the map iframe

import React from 'react';
import { motion } from 'framer-motion'; // For animation if used


// Import type for map configuration data
import { MapConfigData } from '@/types/contactPage';


// Define props to accept map data and optional title
interface MapSectionProps {
    title?: string | null; // Optional section title
    mapConfig?: MapConfigData | null; // Map configuration object or null
}


const MapSection = ({ title, mapConfig }: MapSectionProps) => { // Accept props
    // Get the map embed URL safely, fallback to null
    const mapEmbedUrl = mapConfig?.mapEmbedUrl || null;

    // Render nothing if no map data (specifically no embed URL) is provided
    if (!mapEmbedUrl) {
        // Render the section title even if no map URL? Or nothing? Let's render title if exists.
        if (title) {
            return (
                <section className="py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">{title}</h2>
                        <p className="text-gray-600">Carte non disponible actuellement.</p>
                    </div>
                </section>
            );
        }
        return null; // Render nothing if no title and no map
    }


    return (
        <section className="py-16"> {/* Keep padding and background (white) */}
            <div className="container mx-auto px-4">
                {title && ( // Render section title if provided
                    <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">{title}</h2>
                )}

                {/* Map iframe - Use fetched embed URL */}
                {/* motion.div wraps iframe for animation if desired */}
                <motion.div
                    className="w-full rounded-lg shadow-xl overflow-hidden aspect-video" // Responsive aspect ratio
                    // Simple mount animation for the map container
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }} // Trigger when map enters view
                    transition={{ duration: 0.6 }}
                >
                    <iframe
                        src={mapEmbedUrl} // Use the fetched embed URL
                        width="100%"
                        height="100%"
                        style={{ border: 0 }} // Remove default iframe border
                        allowFullScreen={false} // Allow or disallow fullscreen
                        loading="lazy" // Lazy load the map
                        // Example Security sandbox - refine if needed based on embed source requirements
                        // sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
                    ></iframe>
                </motion.div>
            </div>
        </section>
    );
};

export default MapSection;