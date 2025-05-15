// src/components/home/AboutSection.tsx - Adapted for Sanity data
'use client'; // Remains a client component for effects/state

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
// Remove Fa icons import here, they are used by child Counter

import HistoryTimeline from "@/components/about/HistoryTimeline"; // Expects timelineEvents prop
import TeamSection from "@/components/about/TeamSection";         // Expects team data props
import ClientsSlider from "@/components/about/ClientsSlider";       // Expects clients array prop
import Counter, {getIconComponentByName} from "./Counter";                                  // Ensure Counter component exists and imports Fa Icons

// Import Sanity data types
import { AboutSectionData, StatItem } from '@/types/aboutSection';
// Import Portable Text Renderer (needed here if intro text is blockContent)
import { PortableText } from '@portabletext/react'; // If your intro text is Block Content


// Assume Counter component is separate and expects StatItem structure,
// along with the actual Icon component mapping from iconName.
// Make sure Counter component accepts { from, to, duration, label, icon: IconComponent }


// Define props interface for AboutSection
interface AboutSectionProps {
    data: AboutSectionData; // Receives the full AboutSectionData object
}

const AboutSection = ({ data }: AboutSectionProps) => { // Accept data as prop
    const sectionRef = useRef(null);
    const [videoLoaded, setVideoLoaded] = useState(false); // State for video loaded status
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Effet de parallaxe (Keep as is, applies to background container)
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

    // Access stats directly from data
    const stats = data.stats || []; // Use empty array fallback if stats is null


    return (
        <section ref={sectionRef} className="relative overflow-hidden py-20 bg-gray-50">
            {/* Fond avec effet parallaxe */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y, opacity }} // Apply parallax styles
            >
                {/* Background overlay (kept as is) */}
                <div className="absolute inset-0 bg-gray-900 bg-opacity-40 z-10"></div>
                {/* Background image from Sanity data */}
                {data.backgroundImage && (
                    <Image
                        src={data.backgroundImage}
                        alt={data.introductionTitle || "Section background"} // Use title for alt text, fallback
                        fill
                        className="object-cover"
                    />
                )}
            </motion.div>

            {/* Content container */}
            {/* Use padding-bottom mb-5? maybe safer to just let internal padding space things out */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Colonne gauche - Vidéo */}
                    {/* Render video section only if video URL exists */}
                    {data.videoUrl && (
                        <div className="bg-white p-4 rounded-lg shadow-xl">
                            <div className="relative rounded overflow-hidden aspect-video">
                                {/* Placeholder en attendant que la vidéo soit chargée */}
                                {/* Keep loading state if video URL exists */}
                                {!videoLoaded && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                        <span className="animate-pulse text-gray-600">Chargement de la vidéo...</span>
                                    </div>
                                )}

                                {/* Vidéo de présentation */}
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                    // Use poster image from Sanity if available
                                    poster={data.videoPosterImage || undefined} // Sanity URL or undefined
                                    onLoadedData={() => setVideoLoaded(true)} // Hide placeholder when video loads
                                >
                                    {/* Use video URL from Sanity */}
                                    <source src={data.videoUrl} type="video/mp4" /> {/* Assume MP4 type, adjust if needed */}
                                    Votre navigateur ne supporte pas la lecture de vidéos.
                                </video>

                                {/* Overlay with logo (kept hardcoded, adjust if needed) */}
                                <div className="absolute bottom-4 right-4 bg-white bg-opacity-80 rounded p-2">
                                    <Image
                                        src="/images/logo.svg" // Still hardcoded
                                        alt="Gergom Events Logo" // Alt text
                                        width={80}
                                        height={30}
                                        className="h-auto w-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Colonne droite - Introduction Text */}
                    {/* Render if introduction title or text exists */}
                    {(data.introductionTitle || (data.introductionText && data.introductionText.length > 0)) && (
                        <div className={`bg-white bg-opacity-95 p-8 rounded-lg shadow-lg ${!data.videoUrl ? 'col-span-full lg:col-span-2 mx-auto' : ''}`}>
                            {/* Adjusted layout if no video */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                {/* Use introduction title from Sanity */}
                                {data.introductionTitle && (
                                    <h2 className="text-3xl font-bold mb-6 text-gray-800">{data.introductionTitle}</h2>
                                )}

                                {/* Use PortableText for introduction text from Sanity */}
                                {data.introductionText && data.introductionText.length > 0 && (
                                    // You'll need portableTextComponents defined locally if your text has specific formatting
                                    <div className="text-gray-700 mb-4 text-lg leading-relaxed">
                                        <PortableText value={data.introductionText} components={{/* Portable Text Components */}} />
                                    </div>
                                )}

                                {/* "Learn More" Button - Render if button text and link exist */}
                                {(data.aboutButtonText && data.aboutButtonHref) && (
                                    <Link href={data.aboutButtonHref}>
                                        <motion.button
                                            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors shadow-md inline-flex items-center"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {data.aboutButtonText}
                                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </motion.button>
                                    </Link>
                                )}
                            </motion.div>
                        </div>
                    )}
                </div>

                {/* History Timeline - Pass timelineEvents data */}
                {/* Render section only if timeline events exist */}
                {data.timelineEvents && data.timelineEvents.length > 0 && (
                    <div className="mt-20"> {/* Added some margin top to separate sections */}
                        {data.timelineTitle && ( // Optional title for timeline
                            <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">{data.timelineTitle}</h2>
                        )}
                        <HistoryTimeline events={data.timelineEvents} /> {/* Pass the array of events */}
                    </div>
                )}

                {/* Team Section - Pass team data */}
                {/* Render section only if team members exist */}
                {data.teamMembers && data.teamMembers.length > 0 && (
                    <div className="py-16"> {/* Keep padding */}
                        <div className="text-center mb-16">
                            {data.teamSectionTitle && ( // Use title from Sanity
                                <h2 className="text-3xl font-bold mb-6 text-gray-800">{data.teamSectionTitle}</h2>
                            )}
                            {data.teamSectionDescription && ( // Use description from Sanity
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.teamSectionDescription}</p>
                            )}
                        </div>
                        {/* Pass the array of team members */}
                        <TeamSection members={data.teamMembers} />
                    </div>
                )}


                {/* Clients Section */}
                {data.clients && data.clients.length > 0 && (
                    <section className="py-16 bg-gray-900"> {/* Background matches original client section */}
                        <div className="container mx-auto px-4">
                            {data.clientSectionTitle && ( // Use title from Sanity
                                // Text color set to white to match original design
                                <h2 className="text-3xl font-bold mb-10 text-center text-white">{data.clientSectionTitle}</h2>
                            )}
                            {/* Pass the clients array to the slider */}
                            <ClientsSlider clients={data.clients} />

                            {/* Text below slider - Render if text and link exist */}
                            {(data.clientSectionText || data.clientSectionLinkText) && (
                                <div className="mt-14 max-w-3xl mx-auto text-center">
                                    {data.clientSectionText && data.clientSectionText.length > 0 && ( // Use PortableText for the paragraph
                                        <div className="text-gray-100 mb-8">
                                            <PortableText value={data.clientSectionText} components={{/* Portable Text Components */}} />
                                        </div>
                                    )}
                                    {(data.clientSectionLinkText && data.clientSectionLinkHref) && (
                                        <Link href={data.clientSectionLinkHref} className="inline-flex items-center text-red-600 font-medium hover:text-red-700">
                                            {data.clientSectionLinkText}
                                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>
                )}


                {/* Statistiques avec animation de compteur - Pass stats data */}
                {stats.length > 0 && ( // Render section only if stats exist
                    <motion.div
                        // Margin top and background white from the original design
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        {data.statsTitle && ( // Optional title for stats section
                            <div className="col-span-full text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-800">{data.statsTitle}</h2>
                            </div>
                        )}
                        {/* Map over the stats array from data */}
                        {stats.map((stat, index) => (
                            <Counter
                                key={stat._key || index} // Use _key for array items
                                from={0} // Starting from 0 seems fine based on your counter
                                to={stat.value}
                                duration={2.5} // Kept duration, could make this a field in Sanity too
                                label={stat.label}
                                icon={getIconComponentByName(stat.iconName || undefined)} // Map iconName string to component
                                valueSuffix={stat.valueSuffix || '+'} // Use fetched suffix or fallback
                            />
                        ))}
                    </motion.div>
                )}


            </div>
        </section>
    );
};

export default AboutSection;