// src/components/about/HistoryTimeline.tsx - Adapted for Sanity data
'use client';

import { motion } from 'framer-motion';
// Import types for Timeline Event and Portable Text
import { TimelineEvent, PortableTextBlock } from '@/types/aboutSection';
// Import Portable Text renderer
import { PortableText } from '@portabletext/react';


// Define props interface to accept timeline events from parent
interface HistoryTimelineProps {
    events?: TimelineEvent[] | null; // Accepts array of TimelineEvent, can be null/undefined
}

export default function HistoryTimeline({ events }: HistoryTimelineProps) { // Accept events as prop
    // Render nothing if no events are provided
    if (!events || events.length === 0) {
        return null;
    }

    // Assuming portableTextComponents is defined locally for rendering description (Block Content)
    const portableTextComponents = {
        // Customize as needed for your specific Portable Text content in descriptions
        // e.g., simple blocks, lists, etc.
        // Default: just renders standard blocks and simple marks
        block: {
            normal: ({children}: { children: React.ReactNode }) => <p className="text-gray-600">{children}</p>,
            // add others...
        },
        // Add marks, types, etc. if your descriptions use them
    };

    return (
        <div className="relative max-w-4xl mx-auto mt-5">
            {/* Vertical line */}
            {/* Keeping this design element, color can be dynamic via prop if added to schema */}
            <div className="absolute left-[15px] md:left-1/2 ml-px md:-ml-px transform md:-translate-x-1/2 top-0 h-full w-0.5 bg-red-100"></div>

            {/* Timeline events */}
            {events.map((event, index) => ( // Map over the passed-in events
                <motion.div
                    // Use _key from Sanity data for unique key prop, fallback to index
                    key={event._key || index}
                    className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} mb-12`}
                    // Animation variants (kept from original)
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                >
                    {/* Red point on the timeline (kept design, color could be prop) */}
                    {/* Border color matching design */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-6 md:top-1/2 w-8 h-8 rounded-full bg-white border-4 border-red-600 z-10"></div>

                    {/* Event content */}
                    <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                        <div className={`p-5 bg-white rounded-lg shadow-sm border-l-4 ${index % 2 === 0 ? 'md:text-right border-red-600' : 'border-red-600'}`}>
                            {/* Use year from data */}
                            <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded mb-2">{event.year}</span>
                            {/* Use title from data */}
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h3>
                            {/* Render description using PortableText */}
                            {event.description && event.description.length > 0 && (
                                <PortableText value={event.description} components={portableTextComponents} />
                            )}
                        </div>
                    </div>

                    {/* Empty space for the other side (kept design) */}
                    <div className="hidden md:block md:w-1/2"></div>
                </motion.div>
            ))}
        </div>
    );
}