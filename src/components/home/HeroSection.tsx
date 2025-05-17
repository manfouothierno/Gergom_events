// src/components/home/HeroSection.tsx - Adapted for Sanity data and simplified animation
'use client'; // Remains a client component for the timer and state

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
// Removed useSwipeable

// Import the types
import { HeroSlide, HeroSliderData } from '@/types/homepage';

// Define props interface to accept data from Sanity
interface HeroSectionProps {
    slides: HeroSliderData; // Expects an array of HeroSlide objects
}


const HeroSection = ({ slides }: HeroSectionProps) => {
    // If no slides are provided, render nothing or a fallback
    if (!slides || slides.length === 0) {
        return null; // Or a static fallback section
    }

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // --- Auto-play timer logic ---
    useEffect(() => {
        // Do not autoplay if paused or if there's only one slide
        if (isPaused || slides.length <= 1) return;

        const timer = setTimeout(() => {
            // Simple cross-fade animation handled by AnimatePresence
            // No need for 'isAnimating' state if transition duration matches timeout slightly
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000); // Adjust slide duration as needed (from Sanity data potentially)


        return () => clearTimeout(timer); // Clear timer on cleanup (slide change or component unmount)
    }, [currentSlide, isPaused, slides.length]); // Re-run effect if currentSlide, paused state, or slides array changes

    // Handlers for manual navigation (optional - only if adding back buttons)
    // Removed goToNextSlide, goToPrevSlide, goToSlide, handlers (swipeable)
    // You can re-implement these if you add back arrow/dot navigation

    // Filter to get the current slide data
    const currentSlideData = slides[currentSlide];


    // Simplified text animation variants (optional - keeping a simple fade/y translate)
    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.6 } }
    }


    return (
        // Removed swipeable handlers from the section
        <section
            className="relative h-screen w-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)} // Keep pause on hover
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Removed background overlay - adjust if needed in design */}

            {/* Images Slider with AnimatePresence */}
            {/* Only render ONE motion.div inside AnimatePresence at a time */}
            <AnimatePresence initial={false} mode="wait">
                {/* Map over slides and ONLY render the one matching currentSlide */}
                {slides.map((slide, index) => (
                    index === currentSlide && ( // Only render the current slide's div
                        <motion.div
                            // Use slide _key for consistent identification across renders
                            // Without _key, if slides order changed, React might re-use the wrong element
                            key={slide._key || index} // Use _key from Sanity, fallback to index if needed
                            className="absolute inset-0" // Position absolute to stack
                            initial={{ opacity: 0 }} // Start faded out
                            animate={{ opacity: 1 }} // Fade in when currentSlide matches index
                            exit={{ opacity: 0 }} // Fade out when currentSlide no longer matches
                            transition={{ duration: 1 }} // Adjust transition duration
                        >
                            {/* Image de fond */}
                            {/* Use the image URL from the fetched slide data */}
                            {slide.image && ( // Check if image URL exists
                                <Image
                                    src={slide.image}
                                    alt={slide.title || `Slide ${index + 1}`} // Use title for alt, fallback to index
                                    fill
                                    priority={index === 0} // Prioritize only the first image if possible
                                    sizes="100vw" // Set size for image optimization
                                    className="object-cover"
                                />
                            )}
                        </motion.div>
                    )
                ))}
            </AnimatePresence>

            {/* Content Section - Animated based on currentSlide */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-20 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Only show content for the current slide */}
                    {currentSlideData && ( // Ensure currentSlideData exists
                        <motion.div
                            key={currentSlideData._key || currentSlide} // Key the content block by slide key or index
                            variants={contentVariants} // Use simple fade/y animation
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            // Transition applied by variants
                        >
                            {/* Use fetched title (no sequential animation here) */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                                {currentSlideData.title}
                            </h1>

                            {/* Use fetched subtitle */}
                            {currentSlideData.subtitle && (
                                <p className="text-xl md:text-2xl mb-10 text-gray-200">
                                    {currentSlideData.subtitle}
                                </p>
                            )}


                            {/* Boutons CTA - Can be hardcoded or fetched with the Hero document */}
                            {/* Kept as is for now */}
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                                {/* Replace with dynamic buttons if fetched from Sanity */}
                                {/*<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}> /!* Added a simple animation for the container *!/*/}
                                {/*    <div >*/}
                                {/*        <motion.button*/}
                                {/*            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors shadow-lg" // Using example primary color*/}
                                {/*            whileHover={{ scale: 1.05 }}*/}
                                {/*            whileTap={{ scale: 0.95 }}*/}
                                {/*        >*/}
                                {/*            Découvrir nos services*/}
                                {/*        </motion.button>*/}
                                {/*    </div>*/}
                                {/*</motion.div>*/}
                                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 }}> {/* Added a simple animation for the container with a slight delay */}
                                    <Link href="/contact">
                                        <motion.button
                                            className="bg-red-600 hover:bg-red-700 text-white backdrop-blur-sm hover:bg-opacity-30   px-6 py-3 rounded-md text-lg font-medium transition-colors shadow-lg"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Demander un devis gratuit
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </div>

                        </motion.div>
                    )}

                </div>
            </div>

            {/* Flèches de navigation - Removed as per instruction */}
            {/*
            <button className="...">...</button>
            <button className="...">...</button>
            */}

            {/* Indicateurs de slide (Dots) - Optional: Simplified, keeps the loop but removes individual motion*/}
            {/* Only show dots if there's more than one slide */}
            {slides.length > 1 && (
                <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center">
                    <div className="flex space-x-3">
                        {slides.map((_, index) => (
                            <button
                                key={index} // Index is fine for dot key
                                onClick={() => {
                                    // Only allow navigating if it's not the current slide
                                    if (index !== currentSlide) {
                                        setCurrentSlide(index);
                                        setIsPaused(true); // Optionally pause autoplay on manual navigation
                                        // You could add a setTimeout to resume after a few seconds if desired
                                    }
                                }}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    currentSlide === index
                                        ? 'w-8 bg-red-600' // Using example primary color
                                        : 'w-3 bg-white bg-opacity-50 hover:bg-opacity-80'
                                }`}
                                aria-label={`Aller au slide ${index + 1}`}
                                // Resume autoplay after hover on the dots, maybe not necessary if pauseOnHover is on section
                                // onMouseEnter={() => setIsPaused(true)}
                                // onMouseLeave={() => setIsPaused(false)}
                            ></button>
                        ))}
                    </div>
                </div>
            )}


        </section>
    );
};

export default HeroSection;