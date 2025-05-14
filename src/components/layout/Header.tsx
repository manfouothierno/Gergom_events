// src/components/layout/Header.tsx - Version adaptée à Sanity

'use client'; // This remains a client component because of state/effects/framer-motion

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

// Import the type for the service menu items from Sanity
import { HeaderServiceMenuItem } from '@/types/services';

// Types for the main menu items (can remain hardcoded if they don't come from Sanity)
type MainMenuItem = {
    name: string;
    href: string;
};


// Pages principales (can remain hardcoded or be fetched separately if they change)
const mainItems: MainMenuItem[] = [
    { name: 'Accueil', href: '/' },
    // { name: 'Réalisations', href: '/realisations' }, // Example comment out if not used
    { name: 'À Propos', href: '/a-propos' },
    { name: 'Nos Services', href: '/nos-services' }, // Link to a general services list page maybe?
    { name: 'Contact', href: '/contact' },
];

// Define props for the Header component, including the Sanity service menu items
interface HeaderProps {
    serviceMenuItems: HeaderServiceMenuItem[]; // Expect array of Sanity items
}

const Header = ({ serviceMenuItems }: HeaderProps) => { // Accept as prop
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Removed isServicesExpanded as it seems unused or could be handled with CSS/flex-wrap


    // Effect to detect scroll position
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = ''; // Clean up on unmount
        };
    }, [isMobileMenuOpen]);


    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white shadow-sm py-2' : 'bg-white/95 backdrop-blur-sm py-3' // backdrop-blur requires modern browser
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 z-50"> {/* Increased z-index for clickability on mobile overlay */}
                        {/* Adjust width/height logic if needed */}
                        <Image
                            src="/images/logo.svg"
                            alt="Gergom Events"
                            width={isScrolled ? 110 : 130}
                            height={isScrolled ? 35 : 40}
                            className="h-auto transition-all duration-300"
                            priority
                        />
                    </Link>

                    {/* Navigation principale - Desktop */}
                    <nav className="hidden lg:flex items-center space-x-7 mx-4">
                        {/* Main items remain hardcoded for now */}
                        {mainItems.map((item) => (
                            <Link
                                key={item.name} // Using name as key (assuming unique), or better add an 'id' field
                                href={item.href}
                                className="relative text-gray-800 hover:text-red-600 transition-colors font-medium px-1 py-2 group" // Example hover:text-primary, assuming primary is red-600
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span> {/* Example primary color */}
                            </Link>
                        ))}
                    </nav>

                    {/* Boutons de contact - Desktop */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <a href="tel:0619537090"
                           className="flex items-center text-red-600 hover:text-red-700 transition-colors" // Example text-primary
                        >
                            <FaPhone className="mr-2" />
                            <span className="font-medium">06 19 53 70 90</span>
                        </a>
                        <Link
                            href="/contact"
                            className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors font-medium shadow-sm flex items-center" // Example bg-primary
                        >
                            <FaEnvelope className="mr-2" />
                            Demander un devis
                        </Link>
                    </div>

                    {/* Bouton menu mobile */}
                    <button
                        className="lg:hidden flex items-center justify-center w-10 h-10 relative z-50" // Higher z-index
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    >
                        {isMobileMenuOpen ? (
                            <FaTimes className="text-gray-800 text-xl" />
                        ) : (
                            <FaBars className="text-gray-800 text-xl" />
                        )}
                    </button>
                </div>

                {/* Services menu - Desktop (adjusted for dynamic content & inline styles) */}
                <div className="hidden lg:block mt-1">
                    <div
                        className={`relative flex items-center justify-center transition-all duration-300 ${
                            isScrolled ? 'h-8 overflow-hidden' : 'h-10' // Hides or shows based on scroll
                        }`}
                    >
                        {/* Removed isServicesExpanded state/logic, using simple flex/wrap */}
                        <div className="flex items-center space-x-1 px-4 py-1 rounded-full bg-gray-50 mx-auto overflow-hidden whitespace-nowrap"> {/* Keep overflow/wrap handled by scroll state */}
                            {serviceMenuItems.map((item) => {
                                // Safely get the hex color
                                const itemHexColor = item.color?.hex || '#000000'; // Default or fallback color

                                return (
                                    <Link
                                        key={item.slug} // Using slug as key (assuming unique slugs)
                                        href={`/nos-services/${item.slug}`} // Build URL from slug
                                        className="relative group text-sm text-gray-700 font-medium px-2 py-1 flex items-center transition-colors duration-200 rounded-full hover:bg-gray-100"
                                        // Use inline style for dynamic hover text color
                                        // This requires setting text color explicitly OR using CSS variables/complex Tailwind JIT setup
                                        // Simple example: set the normal text color based on group-hover color (less flexible)
                                        style={{ '--group-hover-text-color': itemHexColor } as React.CSSProperties} // Use CSS variable name for clarity

                                    >
                                        {/* Use inline style for the colored circle background */}
                                        <span
                                            className="w-2 h-2 rounded-full mr-1.5 flex-shrink-0"
                                            style={{ backgroundColor: itemHexColor }} // Apply dynamic hex color
                                        ></span>
                                        <span>{item.name}</span> {/* Use service name */}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu mobile overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-white z-40 lg:hidden"
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'tween', duration: 0.25 }}
                    >
                        <div className="container mx-auto px-6 pt-20 pb-6 h-full overflow-y-auto">
                            {/* Menu principal */}
                            <nav className="border-b border-gray-100 pb-4 mb-4">
                                <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Menu principal</h3>
                                <ul className="space-y-3">
                                    {mainItems.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="flex items-center py-2 text-lg font-medium text-gray-800 hover:text-red-600 transition-colors" // Example hover
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <span className="border-l-2 border-red-600 h-6 mr-3"></span> {/* Example border color */}
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Services - Mobile menu */}
                            <div className="mb-8">
                                <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Nos services</h3>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                    {serviceMenuItems.map((item) => {
                                        // Safely get the hex color
                                        const itemHexColor = item.color?.hex || '#000000'; // Default color

                                        return (
                                            <Link
                                                key={item.slug} // Use slug as key
                                                href={`/nos-services/${item.slug}`} // Build URL
                                                className="flex items-center py-2 text-gray-700 hover:text-red-600 transition-colors" // Example hover color
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {/* Use inline style for the colored circle background */}
                                                <span
                                                    className={`w-2 h-2 rounded-full mr-2`}
                                                    style={{ backgroundColor: itemHexColor }} // Apply dynamic hex color
                                                ></span>
                                                <span className="text-sm font-medium">{item.name}</span> {/* Use service name */}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Contact buttons - Mobile menu */}
                            <div className="border-t border-gray-100 pt-6">
                                {/* Phone link */}
                                <a href="tel:0619537090"
                                   className="flex items-center mb-4 text-red-600 font-semibold" // Example text-primary
                                >
                                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mr-3">
                                        <FaPhone />
                                    </div>
                                    <span>06 19 53 70 90</span>
                                </a>
                                {/* Contact button */}
                                <Link
                                    href="/contact"
                                    className="flex items-center bg-red-600 text-white rounded-lg py-3 px-4 justify-center font-medium shadow-sm hover:bg-red-700 transition-colors" // Example bg-primary
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <FaEnvelope className="mr-2" />
                                    <span>Demander un devis</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;