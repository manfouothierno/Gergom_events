// src/components/home/GoogleReviewsSection.tsx - Adapted for Sanity data
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaGoogle, FaExternalLinkAlt } from 'react-icons/fa';

// Import data types for Google Reviews section
import { GoogleReviewsSectionData, ReviewItem, PortableTextBlock } from '@/types/homepage';
// Import Portable Text Renderer if needed for CTA text
import { PortableText } from '@portabletext/react'; // If schema uses blockContent


// Helper function to format "time ago" from Sanity's datetime string
// Basic implementation, consider using a library like 'date-fns' or 'moment' for robustness
const timeAgo = (dateString?: string | null): string => {
    if (!dateString) return '';
    try {
        // Parse ISO 8601 string from Sanity
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        let interval = seconds / 31536000; // Years
        if (interval > 1) return Math.floor(interval) + " ans";
        interval = seconds / 2592000; // Months
        if (interval > 1) return Math.floor(interval) + " mois";
        interval = seconds / 86400; // Days
        if (interval > 1) return Math.floor(interval) + " jours";
        interval = seconds / 3600; // Hours
        if (interval > 1) return Math.floor(interval) + " heures";
        interval = seconds / 60; // Minutes
        if (interval > 1) return Math.floor(interval) + " minutes";

        return "à l'instant";
    } catch (error) {
        console.error('Error formatting date:', dateString, error);
        return ''; // Return empty string on error
    }
};


// Component to display rating stars (remains the same)
const RatingStars = ({ rating }: { rating: number }) => {
    // Ensure rating is between 0 and 5 for rendering stars
    const safeRating = Math.max(0, Math.min(5, rating));
    return (
        <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`${i < safeRating ? 'opacity-100' : 'opacity-30'} mr-0.5`} />
            ))}
        </div>
    );
};


// Define props interface to accept the fetched data
interface GoogleReviewsSectionProps {
    data: GoogleReviewsSectionData; // Expects the full data object
}


const GoogleReviewsSection = ({ data }: GoogleReviewsSectionProps) => { // Accept data as prop

    // Access the reviews array, provide empty array fallback
    const reviews = data.reviews || [];

    // Calculate stats based on the fetched reviews
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews : 0;


    const [visibleReviewsCount, setVisibleReviewsCount] = useState(3); // Renamed state variable for clarity
    const [isViewAll, setIsViewAll] = useState(false);


    // Determine number of reviews to display based on window size and 'isViewAll' state
    useEffect(() => {
        const handleResize = () => {
            let baseVisible = 1; // Default for small screens
            if (window.innerWidth >= 768) baseVisible = 2; // MD
            if (window.innerWidth >= 1024) baseVisible = 3; // LG

            // Display all if 'isViewAll' is true, otherwise use baseVisible for screen size
            setVisibleReviewsCount(isViewAll ? totalReviews : baseVisible);
        };

        handleResize(); // Call initially on mount
        window.addEventListener('resize', handleResize); // Add listener
        return () => window.removeEventListener('resize', handleResize); // Clean up
    }, [isViewAll, totalReviews]); // Re-run if isViewAll or the total number of reviews changes

    // Handle clicking the "View All/Less" button
    const toggleViewAll = () => {
        setIsViewAll(!isViewAll);
    };


    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Use section title from Sanity data */}
                    <div className="inline-flex items-center mb-6">
                        <FaGoogle className="text-4xl text-blue-500 mr-3" />
                        {data.sectionTitle && <h2 className="text-3xl font-bold text-gray-800">{data.sectionTitle}</h2>}
                    </div>

                    {/* Display calculated average rating and total reviews */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                        {totalReviews > 0 && ( // Only show stats if there are reviews
                            <div className="flex items-center">
                                {/* Display average rating rounded to 1 decimal */}
                                <span className="text-5xl font-bold text-gray-800 mr-3">{averageRating.toFixed(1)}</span>
                                <div>
                                    {/* Display stars based on rounded average */}
                                    <RatingStars rating={Math.round(averageRating)} />
                                    {/* Display total reviews count */}
                                    <span className="text-gray-600 text-sm">{totalReviews} avis</span>
                                </div>
                            </div>
                        )}


                        {/* Link to leave a review on Google (Use URL from Sanity) */}
                        {data.googlePlaceUrl && ( // Only show button if URL is provided
                            <a
                                href={data.googlePlaceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                <FaStar className="mr-2" />
                                Laisser un avis
                                <FaExternalLinkAlt className="ml-2 text-xs" />
                            </a>
                        )}
                    </div>
                </motion.div>

                {/* Reviews Grid */}
                {/* Use reviews array sliced by visibleReviewsCount */}
                {reviews.length > 0 && ( // Only show grid if there are reviews
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.slice(0, visibleReviewsCount).map((review, index) => (
                            <motion.div
                                // Use _key for list stability, fallback to index
                                key={review._key || index}
                                className="bg-white rounded-lg shadow-md p-6 flex flex-col"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }} // Apply delay
                            >
                                <div className="flex items-start mb-4">
                                    {/* Display avatar image from Sanity URL */}
                                    {review.avatar && (
                                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                                            <img
                                                src={review.avatar}
                                                alt={review.author || 'Review author'} // Use author for alt, fallback
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        {/* Display author */}
                                        <h4 className="font-semibold text-gray-800">{review.author}</h4>
                                        <div className="flex items-center">
                                            {/* Display stars for this review's rating */}
                                            <RatingStars rating={review.rating} />
                                            {/* Display time ago */}
                                            <span className="text-gray-500 text-sm ml-2">
                                                 {review.publishedAt ? `Il y a ${timeAgo(review.publishedAt)}` : 'Date inconnue'} {/* Use formatted date or message */}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Display review text */}
                                {/* If review.text is Block Content, use PortableText renderer here */}
                                <p className="text-gray-600 mb-4 flex-grow">
                                    "{review.text}" {/* Assuming plain text field in schema */}
                                    {/* If Block Content: <PortableText value={review.text} components={{...}} /> */}
                                </p>

                                <div className="flex items-center text-xs text-gray-500 mt-2">
                                    <FaGoogle className="mr-1" />
                                    {/* Source text could potentially also be a field in reviewItem schema */}
                                    <span>Publié sur Google</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}


                {/* "View All/Less" button - Show if there are more reviews than currently visible */}
                {totalReviews > visibleReviewsCount && ( // Condition simplified
                    <motion.div
                        className="text-center mt-10"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {/* Use toggleViewAll handler */}
                        <button
                            onClick={toggleViewAll}
                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            {isViewAll ? `Voir moins d'avis (${visibleReviewsCount})` : `Voir tous les avis (${totalReviews})`} {/* Updated text based on state */}
                        </button>
                    </motion.div>
                )}


                {/* CTA Banner below reviews - Render if banner title or link exists */}
                {(data.ctaBannerTitle || data.ctaBannerLinkText) && (
                    <motion.div
                        className="bg-blue-50 rounded-lg p-6 mt-16 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {data.ctaBannerTitle && (
                            <h3 className="text-xl font-semibold mb-3 text-gray-800">{data.ctaBannerTitle}</h3>
                        )}
                        {data.ctaBannerText && (
                            // If ctaBannerText is Block Content, use PortableText renderer here
                            <div className="text-gray-600 mb-4 max-w-2xl mx-auto">
                                {typeof data.ctaBannerText === 'string' ? (
                                    <p>{data.ctaBannerText}</p> // Render as paragraph if it's just a string
                                ) : (
                                    <PortableText value={data.ctaBannerText} components={{/* Portable Text Components */}} /> // Render Portable Text
                                )}
                            </div>
                        )}

                        {/* CTA Button - Render if link text and URL exist */}
                        {(data.ctaBannerLinkText && data.ctaBannerLinkHref) && (
                            <a
                                href={data.ctaBannerLinkHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm"
                            >
                                {data.ctaBannerLinkText}
                                <FaExternalLinkAlt className="ml-2 text-xs" />
                            </a>
                        )}
                    </motion.div>
                )}

            </div>
        </section>
    );
};

export default GoogleReviewsSection;