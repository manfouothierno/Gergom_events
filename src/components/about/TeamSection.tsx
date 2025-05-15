// src/components/about/TeamSection.tsx - Adapted for Sanity data
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
// Import Portable Text renderer for biography
import { PortableText } from '@portabletext/react';

// Import types for Team Member and Portable Text
import { TeamMember, PortableTextBlock } from '@/types/aboutSection';

// Define props interface to accept team members from parent
interface TeamSectionProps {
    members?: TeamMember[] | null; // Accepts array of TeamMember, can be null/undefined
    // titles and descriptions might be passed from AboutSection, not fetched here
}

export default function TeamSection({ members }: TeamSectionProps) { // Accept members as prop
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    // Render nothing if no team members are provided
    if (!members || members.length === 0) {
        return null; // Only renders the grid section, assumes title/desc are in AboutSection
    }

    // Custom renderers for the biography Portable Text
    const bioPortableTextComponents = {
        // Customize as needed for formatting in bios (paragraphs, lists, marks)
        // Example: force standard paragraphs
        block: {
            normal: ({children}: {children: React.ReactNode}) => <p className="text-gray-600">{children}</p>,
            // Add others as needed
        },
        // Add marks (strong, em, etc.), types, etc. if your bios use them
    };

    return (
        // Removed section tag and titles, assume parent AboutSection handles this section structure
        <div className="container mx-auto px-4"> {/* Kept container and padding from original internal section div */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {members.map((member, index) => ( // Map over the passed-in members
                    // Use _key from Sanity data for unique key prop, fallback to index
                    <motion.div
                        key={member._key || index}
                        className="relative group cursor-pointer"
                        onClick={() => setSelectedMember(member)}
                        // Animation variants (kept from original)
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="relative h-80 overflow-hidden rounded-t-lg">
                            {/* Use image URL from data */}
                            {member.image && (
                                <Image
                                    src={member.image}
                                    alt={member.name || 'Team Member'} // Use name for alt text, fallback
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90"></div>
                        </div>
                        <div className="bg-white p-5 rounded-b-lg shadow-sm">
                            {/* Use name from data */}
                            <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                            {/* Use role from data */}
                            {member.role && <p className="text-red-600 font-medium">{member.role}</p>}
                            {/* Bio is now Portable Text, render summary or part */}
                            {member.bio && member.bio.length > 0 && (
                                // You could render the first block or summary here,
                                // or rely on the modal for the full bio.
                                // For the card preview, a simple text field or summary from the Portable Text might be better in schema.
                                // Keeping the current structure requires rendering PT here:
                                <div className="text-gray-600 mt-2 line-clamp-2">
                                    <PortableText value={member.bio} components={bioPortableTextComponents} /> {/* Use Portable Text for bio summary */}
                                </div>
                            )}

                            {/* "En savoir plus" Button (calls modal) */}
                            {/* Kept hardcoded for now, opens the modal */}
                            <button
                                className="mt-3 text-sm text-red-600 hover:text-red-700 inline-flex items-center"
                            >
                                En savoir plus
                                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal de bio complète - Adjusted to use Sanity data fields */}
            {selectedMember && (
                <div
                    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto" // Added overflow for long bios
                    onClick={() => setSelectedMember(null)}
                >
                    <motion.div
                        className="bg-white rounded-lg p-6 max-w-2xl w-full relative" // Added w-full max-w-2xl
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            onClick={() => setSelectedMember(null)}
                            aria-label="Close modal"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Modal image - Use image URL from data */}
                            {selectedMember.image && (
                                <div className="w-full md:w-1/3 relative h-56 md:h-auto flex-shrink-0"> {/* Flex-shrink added */}
                                    <Image
                                        src={selectedMember.image}
                                        alt={selectedMember.name || 'Team Member'}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            )}

                            {/* Modal content */}
                            <div className={`w-full md:w-2/3 ${!selectedMember.image ? 'md:w-full' : ''}`}> {/* Adjusted width if no image */}
                                {/* Use name from data */}
                                <h3 className="text-2xl font-bold text-gray-800">{selectedMember.name}</h3>
                                {/* Use role from data */}
                                {selectedMember.role && <p className="text-red-600 font-medium mb-4">{selectedMember.role}</p>}
                                {/* Use PortableText for full biography */}
                                {selectedMember.bio && selectedMember.bio.length > 0 && (
                                    <div className="text-gray-600 max-h-[60vh] overflow-y-auto"> {/* Added max height and overflow for bio */}
                                        <PortableText value={selectedMember.bio} components={bioPortableTextComponents} /> {/* Use Portable Text */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
        // Assumes Client Slider section is below and rendered in AboutSection
        // Assumes Stats Section is below and rendered in AboutSection
    );
}