// src/components/home/ServicesSection.tsx
'use client'; // This remains a client component

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Import *all* potentially used icons. You'll need to ensure the string names
// in your Sanity data ('iconName' field) match the exported names from react-icons/fa
import * as FaIcons from 'react-icons/fa';

// Import the type definition for the data the component receives
import { SanityServiceData } from '@/types/services';

// Define props interface
interface ServicesSectionProps {
    services: SanityServiceData[];
}

// Helper to get icon component by name
const getIconComponent = (name?: string) => {
    if (!name || !FaIcons[name as keyof typeof FaIcons]) {
        // Return a default icon or null if name is invalid/not found
        console.warn(`Icon not found: ${name}`);
        return FaIcons.FaQuestionCircle; // Example fallback icon
    }
    return FaIcons[name as keyof typeof FaIcons];
};


// Animation variants (kept from your original code)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6
        }
    }
}

const ServicesSection = ({ services }: ServicesSectionProps) => { // Accept services as a prop

    console.log('ServicesSection', services);

    return (
        <section className="bg-gradient-to-b from-gray-100 to-white py-20">
            <div className="container mx-auto px-4">
                {/* Bande rouge décorative */}
                <div className="flex justify-center mb-10">
                    <div className="w-20 h-1 bg-red-600 rounded-full"></div>
                </div>

                {/* Titre de section */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-wider mb-4 text-gray-800">
                        CRÉATEURS D'EXPÉRIENCES INOUBLIABLES
                    </h2>
                    <p className="text-xl max-w-3xl mx-auto text-gray-600">
                        Notre expertise s'adapte à tous vos besoins événementiels
                    </p>
                </motion.div>

                {/* Grille des services */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Map over the services prop */}
                    {services.map((service) => {
                        const ServiceIcon = getIconComponent(service.iconName); // Get the icon component
                        const hexColor = service.color?.hex || '#000000'; // Use hex color from Sanity data, fallback to black

                        return (
                            <motion.div
                                key={service._id} // Use Sanity's _id for a stable key
                                variants={itemVariants}
                            >
                                {/* Use service.slug for the URL */}
                                <Link href={`/nos-services/${service.slug}`}>
                                    <div className="group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl cursor-pointer h-64 transition-all duration-300 transform hover:-translate-y-1">
                                        {/* Image section */}
                                        <div className="absolute inset-0 transition-all duration-500 transform">
                                            {/* Use bannerImageUrl from Sanity */}
                                            {service.bannerImage && (
                                                <div className="absolute inset-0 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110">
                                                    <Image
                                                        src={service.bannerImage}
                                                        alt={service.name} // Use service name for alt text
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" // Add appropriate sizes
                                                    />
                                                </div>
                                            )}


                                            {/* Overlay dégradé */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                                        </div>

                                        {/* Content section */}
                                        <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                                            <div className="flex items-center mb-3">
                                                {/* Icône with dynamic background color from Sanity data */}
                                                {ServiceIcon && (
                                                    <motion.div
                                                        // Use inline style for dynamic background color
                                                        style={{ backgroundColor: hexColor }}
                                                        className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-md`}
                                                        whileHover={{ rotate: 360 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        {/* Render the fetched icon component */}
                                                        <ServiceIcon className="w-5 h-5 text-white" />
                                                    </motion.div>
                                                )}

                                                {/* Service title */}
                                                {/* Use inline style for dynamic hover text color */}
                                                <h3
                                                    className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-current"
                                                    style={{ '--group-hover-text-color': hexColor } as React.CSSProperties} // Use CSS variable for hover color
                                                >
                                                    {service.name} {/* Use service.name for title */}
                                                </h3>
                                            </div>

                                            {/* Description (use metaDescription from Sanity) */}
                                            {service.metaDescription && (
                                                <p className="text-gray-200 text-sm">
                                                    {service.metaDescription}
                                                </p>
                                            )}


                                            {/* "Learn More" button/link animation */}
                                            {/* Simplified approach using a visible element instead of overflow hide/motion */}
                                            <div className="mt-4">
                                                <div className="flex items-center text-sm font-medium text-white transition-all duration-300 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                                    En savoir plus
                                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* "Discover All Services" button (kept from original code) */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <Link href="/nos-services">
                        <motion.button
                            className="bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Découvrir tous nos services
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export default ServicesSection;