// src/components/about/ClientsSlider.tsx - Adapted for Sanity data
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Import type for Client
import { Client } from '@/types/aboutSection';

// Define props interface to accept client data from parent
interface ClientsSliderProps {
    clients?: Client[] | null; // Accepts array of Client, can be null/undefined
    // Add duration prop if auto-play speed is configurable in Sanity
    // slideDuration?: number; // Example field in aboutSection schema
}

export default function ClientsSlider({ clients }: ClientsSliderProps) { // Accept clients as prop
    const [position, setPosition] = useState(0);
    const sliderRef = React.useRef<HTMLDivElement>(null); // Ref to measure slider width
    const [elementWidth, setElementWidth] = useState(0); // State to store combined width

    // Render nothing if no clients are provided
    if (!clients || clients.length === 0) {
        return null; // Only renders the slider, assumes title/desc/link are in AboutSection
    }

    // Animation logic requires duplicating content. Use the passed clients.
    const itemsToLoop = [...clients, ...clients]; // Duplicate for seamless loop

    // Measure the width of the content to know when to reset position
    useEffect(() => {
        const calculateWidth = () => {
            if (sliderRef.current) {
                // Measure the total width of the first *original* set of clients
                const originalClientsWidth = Array.from(sliderRef.current.children)
                    .slice(0, clients.length) // Take the first 'clients.length' elements
                    .reduce((total, el) => total + (el as HTMLElement).offsetWidth + 12, 0); // Add width and gap (12px for gap-x-12)
                setElementWidth(originalClientsWidth);
                console.log('ClientsSlider: Calculated width', originalClientsWidth);
            }
        };

        calculateWidth(); // Calculate initially
        window.addEventListener('resize', calculateWidth); // Recalculate on resize

        // Ensure images are loaded before calculating width accurately,
        // though this is tricky for dynamically rendered lists.
        // A rough estimate or ensuring logos have intrinsic size might help.
        const imageElements = sliderRef.current?.querySelectorAll('img');
        imageElements?.forEach(img => {
            if (!img.complete) {
                img.addEventListener('load', calculateWidth);
            }
        });


        return () => {
            window.removeEventListener('resize', calculateWidth);
            imageElements?.forEach(img => img.removeEventListener('load', calculateWidth));
        };
    }, [clients.length, clients]); // Recalculate if number of clients changes


    // Auto-play animation
    useEffect(() => {
        if (elementWidth <= 0) return; // Don't start animation if width is unknown

        const interval = setInterval(() => {
            setPosition((prev) => {
                // If the current position goes past the width of one full set, reset
                // Add a small tolerance
                const newPosition = prev - 1;
                if (newPosition <= -elementWidth) { // Check against the calculated width
                    //console.log('ClientsSlider: Resetting position');
                    return 0; // Reset position
                }
                return newPosition;
            });
        }, 30); // Adjust speed as needed (can be Sanity field: slideDuration?)


        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [elementWidth]); // Restart animation if calculated width changes


    return (
        // Removed section tag, assume parent handles this section structure
        <div className="w-full overflow-hidden relative">
            {/* Use ref on the inner flex container to measure its width */}
            {/* Flex item gap matching Tailwind config */}
            <div
                ref={sliderRef} // Attach ref here
                className="flex items-center gap-12 py-4 whitespace-nowrap" // Use whitespace-nowrap to keep flex items inline
                style={{ transform: `translateX(${position}px)` }}
            >
                {/* Map over the duplicated list */}
                {itemsToLoop.map((client, index) => (
                    // Use _key from original client data combined with series prefix (a/b)
                    // Or use the original index combined with prefix, safer if data order/length changes dynamically
                    <motion.div
                        // Key using client _key (if exists) + index + series prefix
                        // or just series prefix + index if clients don't have stable _key from Sanity
                        key={`${client._key || 'client'}-${index}`} // Ensure stable unique key for loop
                        className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        // Optionally add a Link/a tag here if client schema has a URL
                    >
                        {/* Use logo URL from data */}
                        {client.logo && (
                            <Image
                                src={client.logo}
                                alt={client.name || `Client ${index + 1}`} // Use name for alt, fallback
                                width={120} // Specify base width
                                height={80} // Specify base height
                                // Optional: Add sizes for responsive image optimization
                                // sizes="(max-width: 768px) 120px, 160px"
                                className="h-16 w-auto object-contain" // Maintain aspect ratio within constraints
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
        // Assumes text/link below slider is handled in AboutSection
    );
}