// src/components/contact/Faq.tsx - Adapted for Sanity data
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
// Import Portable Text renderer
import { PortableText } from '@portabletext/react';
// Import the FAQ Item type (should be the same as in services)
import { FaqItem } from '@/types/contactPage'; // Reused type, ensure path is correct
// import { FaqItem } from '@/types/services'; // If FAQ item type is ONLY in services types

// Define props to accept FAQ items from parent
interface FaqProps {
    questions?: FaqItem[] | null; // Array of FaqItem, can be null/undefined
    // Add color prop if needed for accordion items design
    // color?: string | null;
}


// Portable Text components for rendering the FAQ answer
// (Reusing or adapting from ServiceFAQ if you had one for services page)
const faqPortableTextComponents = {
    // Add renderers for blocks, marks, types etc. as needed for your FAQ answers
    block: {
        normal: ({children}: {children: React.ReactNode}) => <p className="text-gray-600 mt-2">{children}</p>, // Example styling
        // Add lists, blockquotes etc if your answers use them
    },
    // Add marks (strong, em, links), types, etc.
};


const Faq = ({ questions }: FaqProps) => { // Accept questions array prop
    // Render nothing if no questions provided
    if (!questions || questions.length === 0) {
        return null; // Only renders the FAQ list, assumes parent has the section title
    }

    // State to manage which question is currently open (can be null for none open)
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Function to toggle accordion item
    const toggleQuestion = (index: number) => {
        setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        // This component renders the accordion list, assumed parent has section title and wrapper
        <div className="space-y-4">
            {questions.map((item, index) => ( // Map over the fetched questions array
                // Use _key for stable unique key, fallback to index
                <div key={item._key || index} className="border-b border-gray-200">
                    {/* Question button/header */}
                    <motion.button
                        className="flex justify-between items-center w-full text-left py-4 font-semibold text-gray-800"
                        onClick={() => toggleQuestion(index)} // Toggle open/closed state
                    >
                        {item.question} {/* Display question from Sanity */}
                        {/* Chevron icon, rotated based on state */}
                        <motion.div
                            animate={{ rotate: openIndex === index ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FaChevronDown />
                        </motion.div>
                    </motion.button>

                    {/* Answer content - uses AnimatePresence for smooth mount/unmount */}
                    <AnimatePresence initial={false}>
                        {openIndex === index && (
                            <motion.div
                                className="overflow-hidden" // Hides content when collapsed
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                {/* Render answer using PortableText */}
                                {item.answer && ( // Check if answer data exists
                                    <div className="pb-4">
                                        <PortableText value={item.answer} components={faqPortableTextComponents} />
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

export default Faq;