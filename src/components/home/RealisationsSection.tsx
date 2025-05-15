// src/components/home/RealisationsSection.tsx - Adapted for Sanity data
'use client'; // Client component due to useState, useEffect, framer-motion, swiper

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
// Import Swiper components and modules
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Import SwiperCore type
import 'swiper/css';
import 'swiper/css/navigation'; // Swiper Nav CSS
import 'swiper/css/pagination'; // Swiper Pagination CSS

// Import the types for realization data fetched from Sanity
import { RealisationListingItem, RealisationCategoryFilter } from '@/types/realisation';
// No need for EventType and hardcoded realisations array anymore

// --- Type for Filter Buttons (Derived from data) ---
// Includes the special 'all' type
type FilterButtonType = {
    slug: string; // Matches category slug or 'all'
    name: string; // Text for the button
};

// Component for custom navigation buttons (Needs access to swiper instance)
const NavigationButtons = () => {
    // Access the Swiper instance using useSwiper hook (provided by swiper/react)
    // This hook must be used inside a Swiper component.
    const swiper = useSwiper();

    // Conditionally render the buttons if swiper is available
    if (!swiper) return null;

    return (
        <div className="flex space-x-2 mt-6"> {/* mt-6 positioning might need adjustment */}
            <button
                // Check if the Swiper is not at the beginning to disable button
                onClick={() => swiper.slidePrev()}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Projet précédent"
                disabled={swiper.isBeginning && !swiper.params.loop} // Disable if not looping and at start
            >
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                // Check if the Swiper is not at the end to disable button
                onClick={() => swiper.slideNext()}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Projet suivant"
                disabled={swiper.isEnd && !swiper.params.loop} // Disable if not looping and at end
            >
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

// Define props interface to accept data from Sanity
interface RealisationsSectionProps {
    realisations: RealisationListingItem[]; // Expects array of fetched realizations
}

const RealisationsSection = ({ realisations }: RealisationsSectionProps) => { // Accept realisations as prop
    const [activeFilter, setActiveFilter] = useState<string>('all'); // Use string for slug/all
    // Initialize state with the full list received
    const [filteredRealisations, setFilteredRealisations] = useState<RealisationListingItem[]>(realisations);

    // Ref for Swiper instance if needed for imperative control (like updating slides)
    // const swiperRef = useRef<SwiperCore | null>(null);

    // Derive filter buttons from the fetched realisations data
    const filterButtons: FilterButtonType[] = React.useMemo(() => {
        const categoriesMap = new Map<string, string>(); // Map slug -> name
        realisations.forEach(realisation => {
            // Only add categories that actually exist in the fetched data and have slug/name
            if (realisation.categorySlug && realisation.categoryName) {
                categoriesMap.set(realisation.categorySlug, realisation.categoryName);
            }
        });

        // Convert map entries to button structure
        const dynamicCategories = Array.from(categoriesMap).map(([slug, name]) => ({
            slug,
            name,
        }));

        // Add the 'Tous' (All) button and sort others alphabetically by name
        return [
            { slug: 'all', name: 'Tous' },
            ...dynamicCategories.sort((a, b) => a.name.localeCompare(b.name))
        ];
    }, [realisations]); // Recalculate if the original realisations list changes


    // Effect to filter realisations based on the active filter
    useEffect(() => {
        if (activeFilter === 'all') {
            setFilteredRealisations(realisations); // Show all if filter is 'all'
        } else {
            // Filter by category slug matching active filter
            setFilteredRealisations(realisations.filter(real => real.categorySlug === activeFilter));
        }
        // If you need to reset Swiper position/reinitialize on filter change:
        // if (swiperRef.current) {
        //    swiperRef.current.update(); // Update Swiper when data changes
        //   swiperRef.current.slideTo(0, 0); // Optional: slide back to first item
        // }

    }, [activeFilter, realisations]); // Re-run effect if activeFilter or original realisations change

    // Format date utility - crude, consider using date-fns
    const formatDate = (dateString?: string | null): string => {
        if (!dateString) return 'Date inconnue';
        try {
            const date = new Date(dateString);
            // Check if date is valid before formatting
            if (isNaN(date.getTime())) throw new Error('Invalid date');
            return date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
        } catch (error) {
            console.error('Error formatting date:', dateString, error);
            return 'Date inconnue';
        }
    };


    // Ensure filtered realisations is not empty before rendering the Swiper
    if (!filteredRealisations || filteredRealisations.length === 0) {
        // Optionally show a message if filtering resulted in no items,
        // or if the initial realisations list was empty.
        return (
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center text-gray-600">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Nos Dernières Réalisations</h2>
                    <p className="text-xl max-w-3xl mx-auto">
                        Aucune réalisation trouvée pour la selection.
                    </p>
                    {/* You could add the filters back here even if no realisations */}
                    <motion.div
                        className="flex flex-wrap justify-center mt-10" // Add margin-top if filters shown above
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {filterButtons.map(filter => (
                            <button
                                key={filter.slug}
                                onClick={() => setActiveFilter(filter.slug)}
                                className={`m-1 px-4 py-2 rounded-full transition-all ${
                                    activeFilter === filter.slug
                                        ? 'bg-red-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {filter.name}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>
        );
    }


    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header (kept as is, but text could be from Sanity homepage section) */}
                {/* If you add Realisation section titles to a Sanity homepage config doc */}
                {/* <motion.div>...</motion.div> */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Nos Dernières Réalisations</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Découvrez comment nous avons transformé la vision de nos clients en réalités spectaculaires
                    </p>
                </motion.div>

                {/* Filters using dynamically generated buttons */}
                <motion.div
                    className="flex flex-wrap justify-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {filterButtons.map(filter => (
                        <button
                            key={filter.slug} // Use slug as key
                            onClick={() => setActiveFilter(filter.slug)} // Set filter state
                            className={`m-1 px-4 py-2 rounded-full transition-all ${
                                activeFilter === filter.slug
                                    ? 'bg-red-600 text-white shadow-md' // Active state classes
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200' // Inactive state classes
                            }`}
                        >
                            {filter.name} {/* Use name for button text */}
                        </button>
                    ))}
                </motion.div>

                {/* Carousel of Realizations */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative"
                >
                    <AnimatePresence mode="wait">
                        {/* Key the AnimatePresence wrapper around the Swiper based on the filter
                             so Framer Motion can animate the *change* when filters apply. */}
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }} // Animation when filtering changes
                            className="overflow-hidden" // Swiper manages overflow internally
                        >
                            <Swiper
                                // ref={swiperRef} // Attach ref if you need it
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={30}
                                slidesPerView={1}
                                breakpoints={{
                                    640: { slidesPerView: 2, spaceBetween: 20 }, // Adjust breakpoints/space
                                    1024: { slidesPerView: 3, spaceBetween: 30 }
                                }}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                pagination={{ clickable: true }}
                                loop={filteredRealisations.length > (filteredRealisations.length < 3 ? filteredRealisations.length : 3)} // Set loop if there are more items than fit view
                                className="pb-12" // Padding for pagination dots

                                // Update Swiper instance data when filteredRealisations changes
                                onSlideChange={() => { /* maybe log or update internal state if needed */ }}
                                onInit={(swiper) => { /* maybe store swiper instance */ }}
                                onUpdate={(swiper) => { /* Called when slides/settings change */ }}
                                onFromEdge={(swiper) => { /* Handle disabling nav buttons if not looping */ }} // If not looping
                                onReachBeginning={(swiper) => { /* Handle disabling prev if not looping */ }} // If not looping
                                onReachEnd={(swiper) => { /* Handle disabling next if not looping */ }} // If not looping

                            >
                                {filteredRealisations.map((realisation) => (
                                    // Use Sanity _id or slug for key if available, or unique generated string
                                    <SwiperSlide key={realisation._id}> {/* Use _id from Sanity */}
                                        {/* Check if slug exists before creating the Link */}
                                        {realisation.slug ? (
                                            <Link href={`/realisations/${realisation.slug}`}> {/* Link to detail page if slug exists */}
                                                <motion.div
                                                    className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col transition-all duration-300" // flex flex-col h-full to make cards equal height
                                                    whileHover={{
                                                        y: -5,
                                                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                                                    }}
                                                >
                                                    {/* Image from Sanity data */}
                                                    <div className="relative h-64 overflow-hidden"> {/* Fixed height for image container */}
                                                        {realisation.imageUrl && ( // Render image if URL exists
                                                            <Image
                                                                src={realisation.imageUrl}
                                                                alt={realisation.name || 'Realisation Image'} // Use realization name for alt
                                                                fill
                                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Image sizes for optimization
                                                                className="object-cover transition-transform duration-500 hover:scale-110"
                                                            />
                                                        )}

                                                        {/* Category type tag */}
                                                        {realisation.categoryName && ( // Show tag if category name exists
                                                            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                                                                {realisation.categoryName}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Content from Sanity data */}
                                                    <div className="p-6 flex-grow flex flex-col"> {/* Use flex-grow */}
                                                        {/* Formatted date */}
                                                        <div className="text-sm text-gray-500 mb-2">{formatDate(realisation.completionDate)}</div>
                                                        {/* Title */}
                                                        <h3 className="text-xl font-bold mb-3 text-gray-800">{realisation.name}</h3> {/* Use .name (aliased from title) */}
                                                        {/* Description */}
                                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{realisation.shortDescription}</p> {/* Use .shortDescription */}

                                                        {/* Services used */}
                                                        {/* Use servicesUsedNames array from Sanity */}
                                                        {realisation.servicesUsedNames && realisation.servicesUsedNames.length > 0 && (
                                                            <div className="flex flex-wrap gap-2 mt-auto"> {/* mt-auto pushes services to bottom */}
                                                                {realisation.servicesUsedNames.map((serviceName, serviceIndex) => (
                                                                    // Use serviceName as key, or maybe _key if the Sanity query gave _key
                                                                    // As it's name[] array, index is simplest key option here
                                                                    <span
                                                                        key={serviceIndex}
                                                                        className="inline-block px-2 py-1 bg-gray-100 text-xs rounded"
                                                                    >
                                                                        {serviceName}
                                                                     </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            </Link>
                                        ) : (
                                            // If slug doesn't exist, render just the card without the link
                                            // Or maybe filter these out in the fetch function?
                                            <motion.div /* ... classes and motion as above but without Link ... */ >
                                                {/* ... content rendering ... */}
                                            </motion.div>
                                        )}
                                    </SwiperSlide>
                                ))}

                                {/* Pass NavigationButtons *inside* Swiper, but place its content
                                    *outside* the Swiper dom structure if you want custom buttons */}
                                {/* Swiper automatically handles navigation buttons if you enable the module and pass true to the `navigation` option.
                                     If you want CUSTOM button *elements*, you pass an object: navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}.
                                     If you define buttons outside, they need refs pointing into the Swiper DOM, or control it via swiper instance obtained from onInit or a custom context.
                                     The NavigationButtons component using useSwiper HOOK requires being rendered *inside* the Swiper wrapper itself.
                                     Let's put NavigationButtons inside, its output won't be standard nav markup.
                                 */}
                                {/* Hide NavigationButtons if only 1 slide in the filtered view, or less than needed for looping */}
                                {filteredRealisations.length > (filteredRealisations.length < 3 ? 1 : 3) && (
                                    <div className="absolute bottom-0 left-0 right-0 flex justify-center z-10">
                                        <NavigationButtons /> {/* This uses useSwiper hook */}
                                    </div>
                                )}


                            </Swiper>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>


                {/* "View All Realisations" Button (Link to the /realisations page) */}
                {/* Kept as is, href remains hardcoded or can come from a global config Sanity doc */}
                <motion.div
                    className="text-center mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <Link href="/realisations"> {/* Link remains static for now */}
                        <motion.button
                            className="inline-flex items-center px-6 py-3 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Toutes nos réalisations {/* Text is hardcoded */}
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </motion.button>
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default RealisationsSection;