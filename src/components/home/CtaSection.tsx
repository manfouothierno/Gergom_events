// src/components/home/CtaSection.tsx - Adapted for Sanity data
'use client'; // Remains client component for Framer Motion

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion'; // useScroll, useTransform for section parallax
// No need for specific Fa icons here anymore, they are in AnimatedStat and getIconComponentByName
// Import the updated AnimatedStat component
import AnimatedStat from './AnimatedStat';
// Import data types

// Import Portable Text Renderer if needed for CTA text
import { PortableText } from '@portabletext/react';
import {CtaSectionData} from "@/types/homepage";
import {getIconComponentByName} from "@/components/home/Counter"; // If schema uses blockContent


// Assuming getIconComponentByName is defined and imports react-icons/fa


// Define props interface for CtaSection
interface CtaSectionProps {
    data: CtaSectionData;
}

const CtaSection = ({ data }: CtaSectionProps) => { // Accept data as prop
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Effet de parallaxe (Apply to background container using useScroll targeting containerRef)
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

    // Access stats array from data, provide empty array fallback
    const stats = data.stats || [];

    // Portable Text components for CTA Text if schema uses blockContent
    const ctaTextPortableTextComponents = {
        block: {
            normal: ({children}: { children: React.ReactNode }) => <p>{children}</p>,
            // add others as needed
        }
        // Add marks, types, etc. if your ctaText uses them
    };


    return (
        // Attach ref for parallax effect calculation
        <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
            {/* Fond avec effet parallaxe */}
            <motion.div
                // Apply parallax styles to this background container
                className="absolute inset-0 z-0"
                style={{ y, opacity }}
            >
                {/* Overlay coloré (hardcoded) */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-red-800/80 to-black/90 z-10"></div>

                {/* Image de fond from Sanity */}
                {data.backgroundImage && (
                    <Image
                        src={data.backgroundImage}
                        alt={data.ctaTitle || "Background image"}
                        fill
                        className="object-cover"
                        priority
                    />
                )}

            </motion.div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10">
                {/* Statistiques - Only render grid if there are stats */}
                {stats.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                        {/* Optional stats title above grid */}
                        {data.statsTitle && (
                            <div className="col-span-full text-center mb-8">
                                <h2 className="text-3xl font-bold text-white">{data.statsTitle}</h2>
                            </div>
                        )}

                        {/* Map over stats from Sanity data */}
                        {stats.map((stat, index) => (
                            // Pass data specific to AnimatedStat
                            // No need for Framer Motion animation directly here, AnimatedStat component handles its own scroll animation logic
                            // We pass the necessary data from the CtaStatItem
                            <AnimatedStat
                                key={stat._key || index} // Use _key from Sanity for unique key
                                numericValue={stat.numericValue} // Pass the numeric value
                                displayValue={stat.displayValue} // Pass the string value to display
                                label={stat.label}
                                iconName={stat.iconName} // Pass the icon name string
                                // If AnimatedStat accepted duration as prop, pass it here too
                            />
                        ))}
                    </div>
                )}


                {/* Appel à l'action - Only render if CTA title or button link text exist */}
                {(data.ctaTitle || data.ctaButtonText) && (
                    <motion.div
                        className="text-center max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }} // Animation for the whole CTA block
                    >
                        {data.ctaTitle && ( // Use CTA title from Sanity
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                {data.ctaTitle}
                            </h2>
                        )}
                        {data.ctaText && ( // Use CTA text from Sanity (Portable Text)
                            <div className="text-xl text-gray-200 mb-8">
                                {/* If ctaText schema field is 'blockContent', use PortableText renderer */}
                                {typeof data.ctaText === 'string' ? (
                                    <p>{data.ctaText}</p> // Render as paragraph if it's just a string
                                ) : (
                                    <PortableText value={data.ctaText} components={ctaTextPortableTextComponents} />
                                )}
                            </div>
                        )}

                        {/* CTA Button - Only render if text and link exist */}
                        {(data.ctaButtonText && data.ctaButtonHref) && (
                            <Link href={data.ctaButtonHref}>
                                <motion.button
                                    className="px-10 py-4 bg-white text-red-600 text-xl font-semibold rounded-lg shadow-xl hover:bg-gray-100 transition-colors inline-flex items-center gap-3"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Button text from Sanity */}
                                    {data.ctaButtonText}
                                    {/* Button icon from Sanity (or keep hardcoded if only one type is ever used) */}
                                    {/* If schema has ctaButtonIconName field, look up and render icon component */}
                                    {data.ctaButtonIconName && React.createElement(getIconComponentByName(data.ctaButtonIconName))} {/* Map icon name to component */}

                                </motion.button>
                            </Link>
                        )}
                    </motion.div>
                )}


            </div>

            {/* Wavy decorative element at the bottom (hardcoded shape, could make fill dynamic) */}
            {/* Set container text color to make fill inherit */}
            <div className="absolute bottom-0 left-0 right-0 text-white">
                <svg
                    viewBox="0 0 1440 120"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                    preserveAspectRatio="none"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 48L60 54C120 60 240 72 360 78C480 84 600 84 720 72C840 60 960 36 1080 30C1200 24 1320 36 1380 42L1440 48V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V48Z"
                    />
                </svg>
            </div>
        </section>
    );
};

// Re-export the CtaSection component
export default CtaSection;