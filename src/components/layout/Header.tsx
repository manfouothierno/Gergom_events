// src/components/layout/Header.tsx - With active route highlighting
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

// Import the type for the service menu items from Sanity
import { HeaderServiceMenuItem } from '@/types/services';

// Types for the main menu items
type MainMenuItem = {
    name: string;
    href: string;
};

const mainItems: MainMenuItem[] = [
    { name: 'Accueil', href: '/' },
    { name: 'Nos Prestations', href: '/nos-prestations' },
    { name: 'Contact', href: '/contact' },
];

interface HeaderProps {
    serviceMenuItems: HeaderServiceMenuItem[];
}

const Header = ({ serviceMenuItems }: HeaderProps) => {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Check if a route is active
    const isActiveRoute = (href: string) => {
        if (href === '/') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    // Check if a service route is active
    const isActiveService = (slug: string) => {
        return pathname === `/nos-services/${slug}`;
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white shadow-sm py-2' : 'bg-white/95 backdrop-blur-sm py-3'
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0  z-50">
                        <Image
                            src="/logo_gergom.jpg"
                            alt="Gergom Events"
                            width={isScrolled ? 110 : 130}
                            height={isScrolled ? 35 : 40}
                            className="h-auto transition-all duration-300"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-7 mx-4">
                        {mainItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative font-medium px-1 py-2 group transition-colors ${
                                    isActiveRoute(item.href)
                                        ? 'text-red-600'
                                        : 'text-gray-800 hover:text-red-600'
                                }`}
                            >
                                {item.name}
                                <span
                                    className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
                                        isActiveRoute(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}
                                ></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Contact Buttons */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <a
                            href="tel:0619537090"
                            className="flex items-center text-red-600 hover:text-red-700 transition-colors"
                        >
                            <FaPhone className="mr-2" />
                            <span className="font-medium">06 19 53 70 90</span>
                        </a>
                        <Link
                            href="/contact"
                            className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors font-medium shadow-sm flex items-center"
                        >
                            <FaEnvelope className="mr-2" />
                            Demander un devis
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden flex items-center justify-center w-10 h-10 relative z-50"
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

                {/* Desktop Services Menu */}
                <div className="hidden lg:block mt-1">
                    <div
                        className={`relative flex items-center justify-center transition-all duration-300 ${
                            isScrolled ? 'h-8 overflow-hidden' : 'h-10'
                        }`}
                    >
                        <div className="flex items-center space-x-1 px-4 py-1 rounded-full bg-gray-50 mx-auto overflow-hidden whitespace-nowrap">
                            {serviceMenuItems.map((item) => {
                                const itemHexColor = item.color?.hex || '#000000';

                                return (
                                    <Link
                                        key={item.slug}
                                        href={`/nos-services/${item.slug}`}
                                        className={`relative group text-sm font-medium px-2 py-1 flex items-center transition-colors duration-200 rounded-full ${
                                            isActiveService(item.slug)
                                                ? 'bg-gray-100 font-semibold'
                                                : 'hover:bg-gray-100'
                                        }`}
                                        style={{ '--group-hover-text-color': itemHexColor } as React.CSSProperties}
                                    >
                                        <span
                                            className="w-2 h-2 rounded-full mr-1.5 flex-shrink-0"
                                            style={{ backgroundColor: itemHexColor }}
                                        ></span>
                                        <span className={isActiveService(item.slug) ? 'text-red-600' : 'text-gray-700'}>
                                            {item.name}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
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
                            {/* Main Menu */}
                            <nav className="border-b border-gray-100 pb-4 mb-4">
                                <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                                    Menu principal
                                </h3>
                                <ul className="space-y-3">
                                    {mainItems.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={`flex items-center py-2 text-lg font-medium transition-colors ${
                                                    isActiveRoute(item.href)
                                                        ? 'text-red-600'
                                                        : 'text-gray-800 hover:text-red-600'
                                                }`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <span
                                                    className={`border-l-2 h-6 mr-3 ${
                                                        isActiveRoute(item.href)
                                                            ? 'border-red-600'
                                                            : 'border-transparent'
                                                    }`}
                                                ></span>
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Services Menu */}
                            <div className="mb-8">
                                <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                                    Nos services
                                </h3>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                    {serviceMenuItems.map((item) => {
                                        const itemHexColor = item.color?.hex || '#000000';

                                        return (
                                            <Link
                                                key={item.slug}
                                                href={`/nos-services/${item.slug}`}
                                                className={`flex items-center py-2 transition-colors ${
                                                    isActiveService(item.slug)
                                                        ? 'text-red-600 font-semibold'
                                                        : 'text-gray-700 hover:text-red-600'
                                                }`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <span
                                                    className="w-2 h-2 rounded-full mr-2"
                                                    style={{ backgroundColor: itemHexColor }}
                                                ></span>
                                                <span className="text-sm font-medium">{item.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Contact Buttons */}
                            <div className="border-t border-gray-100 pt-6">
                                <a
                                    href="tel:0619537090"
                                    className="flex items-center mb-4 text-red-600 font-semibold"
                                >
                                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mr-3">
                                        <FaPhone />
                                    </div>
                                    <span>06 19 53 70 90</span>
                                </a>
                                <Link
                                    href="/contact"
                                    className="flex items-center bg-red-600 text-white rounded-lg py-3 px-4 justify-center font-medium shadow-sm hover:bg-red-700 transition-colors"
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