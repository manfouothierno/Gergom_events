// src/components/layout/Header.tsx - Version optimisée
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPhone, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa'

// Types pour les éléments du menu
type MenuItem = {
    name: string;
    href: string;
    color?: string;
    hoverClass?: string;
};

// Services avec leurs couleurs associées
const serviceItems: MenuItem[] = [
    { name: 'Sonorisation', href: '/nos-services/sonorisations', color: 'bg-[#FF0000]', hoverClass: 'hover:text-[#FF0000]' },
    { name: 'Éclairage', href: '/nos-services/eclairage', color: 'bg-[#FFA500]', hoverClass: 'hover:text-[#FFA500]' },
    { name: 'Images & Vidéos', href: '/nos-services/video', color: 'bg-[#FFFF00]', hoverClass: 'hover:text-[#FFFF00]' },
    { name: 'Scènes', href: '/nos-services/structures', color: 'bg-[#FFC0CB]', hoverClass: 'hover:text-[#FFC0CB]' },
    { name: 'Effets', href: '/nos-services/effets', color: 'bg-[#800080]', hoverClass: 'hover:text-[#800080]' },
    { name: 'Mobilier', href: '/nos-services/mobilier', color: 'bg-[#0000FF]', hoverClass: 'hover:text-[#0000FF]' },
    { name: 'Photobooth', href: '/nos-services/photobooth', color: 'bg-[#4B0082]', hoverClass: 'hover:text-[#4B0082]' },
    { name: 'Équipements', href: '/nos-services/equipements', color: 'bg-[#87CEEB]', hoverClass: 'hover:text-[#87CEEB]' }
];

// Pages principales
const mainItems: MenuItem[] = [
    { name: 'Accueil', href: '/' },
    // { name: 'Réalisations', href: '/realisations' },
    { name: 'À Propos', href: '/a-propos' },
    { name: 'Contact', href: '/contact' },

];

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isServicesExpanded, setIsServicesExpanded] = useState(false)

    // Détecter le scroll pour changer l'apparence du menu
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white shadow-sm py-2' : 'bg-white/95 backdrop-blur-sm py-3'
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 z-10">
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
                        {mainItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative text-gray-800 hover:text-primary transition-colors font-medium px-1 py-2 group"
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Boutons de contact - Desktop */}
                    <div className="hidden lg:flex items-center space-x-4">

                        <a href="tel:0619537090"
                        className="flex items-center text-primary hover:text-red-700 transition-colors"
                        >
                        <FaPhone className="mr-2" />
                        <span className="font-medium">06 19 53 70 90</span>
                    </a>
                    <Link
                        href="/contact"
                        className="px-4 py-2 bg-primary text-white rounded text-sm hover:bg-red-700 transition-colors font-medium shadow-sm flex items-center"
                    >
                        <FaEnvelope className="mr-2" />
                        Demander un devis
                    </Link>
                </div>

                {/* Bouton menu mobile */}
                <button
                    className="lg:hidden flex items-center justify-center w-10 h-10 relative z-10"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Menu"
                >
                    {isMobileMenuOpen ? (
                        <FaTimes className="text-gray-800 text-xl" />
                    ) : (
                        <FaBars className="text-gray-800 text-xl" />
                    )}
                </button>
            </div>

            {/* Menu des services - Desktop */}
            <div className="hidden lg:block mt-1">
                <div
                    className={`relative flex items-center justify-center transition-all duration-300 ${
                        isScrolled ? 'h-8 overflow-hidden' : 'h-10'
                    }`}
                >
                    <button
                        className={`absolute left-0 px-2 py-1 text-xs rounded-full flex items-center z-10 ${
                            isServicesExpanded
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                        onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                    >
                        {isServicesExpanded ? 'Réduire' : 'Tous nos services'}
                        <svg
                            className={`ml-1 w-3 h-3 transition-transform ${isServicesExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <div
                        className={`flex items-center space-x-1 transition-all px-4 py-1 rounded-full bg-gray-50 mx-auto ${
                            isServicesExpanded ? 'overflow-visible flex-wrap justify-center gap-2 max-w-3xl' : 'overflow-hidden whitespace-nowrap'
                        }`}
                    >
                        {serviceItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative group ${item.hoverClass} text-sm text-gray-700 font-medium px-2 py-1 flex items-center transition-colors duration-200 rounded-full hover:bg-gray-100`}
                            >
                                <span className={`w-2 h-2 rounded-full ${item.color} mr-1.5 flex-shrink-0`}></span>
                                <span>{item.name}</span>
                            </Link>
                        ))}
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
                                        className="flex items-center py-2 text-lg font-medium text-gray-800 hover:text-primary transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <span className="border-l-2 border-primary h-6 mr-3"></span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Services */}
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Nos services</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                            {serviceItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center py-2 text-gray-700 hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className={`w-2 h-2 rounded-full ${item.color} mr-2`}></span>
                                    <span className="text-sm font-medium">{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="border-t border-gray-100 pt-6">

                        <a href="tel:0619537090"
                        className="flex items-center mb-4 text-primary font-semibold"
                        >
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mr-3">
                            <FaPhone />
                        </div>
                        <span>06 19 53 70 90</span>
                    </a>
                    <Link
                        href="/contact"
                        className="flex items-center bg-primary text-white rounded-lg py-3 px-4 justify-center font-medium shadow-sm"
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
)
}

export default Header