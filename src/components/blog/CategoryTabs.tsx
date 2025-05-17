// src/components/blog/CategoryTabs.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
// Import the category type
import { SanityPostCategory } from '@/types/post';

// Define the props interface for CategoryTabs
interface CategoryTabsProps {
    categories: SanityPostCategory[]; // Expect array of SanityPostCategory type
}


export default function CategoryTabs({ categories }: CategoryTabsProps) { // Accept categories prop
    const router = useRouter();
    const searchParams = useSearchParams();
    // State for the active category filter read from URL search params
    const [currentCategorySlug, setCurrentCategorySlug] = useState('all'); // Use slug

    // Sync state with URL search parameter 'categorie' on initial render and when search params change
    useEffect(() => {
        setCurrentCategorySlug(searchParams.get('categorie') || 'all');
    }, [searchParams]);

    // Handle clicking a category tab
    const handleCategoryChange = (categorySlug: string) => { // Use slug
        // Check if category slug is 'all' or a specific slug
        if (categorySlug === 'all') {
            // Remove the 'categorie' query parameter
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.delete('categorie');
            router.push(`/nos-prestations?${newSearchParams.toString()}`);

        } else {
            // Set the 'categorie' query parameter to the specific category slug
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.set('categorie', categorySlug);
            router.push(`/nos-prestations?${newSearchParams.toString()}`);
        }
        // State update will happen automatically via the useEffect reacting to searchParams
    };

    // Handle case where categories data might not be loaded yet
    if (!categories || categories.length === 0) {
        return null; // Or show a loading/empty state
    }


    return (
        <div className="flex flex-wrap justify-center">
            {categories.map((category) => (
                // Use category slug as the unique key
                <motion.button
                    key={category.id} // Using the 'id' field which is the slug from the type
                    onClick={() => handleCategoryChange(category.id)} // Pass the category slug
                    className={`m-1 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                        // Check active state against the currentCategorySlug state
                        currentCategorySlug === category.id
                            ? 'bg-[#006400] text-white shadow-md' // Active styles
                            : 'bg-white text-gray-700 hover:bg-gray-100' // Inactive styles
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    // If category.id exists, we can enable the button
                    disabled={!category.id} // Disable if slug/id is missing
                >
                    {category.name} {/* Use category name */}
                </motion.button>
            ))}
        </div>
    );
}