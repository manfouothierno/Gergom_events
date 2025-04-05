// src/components/layout/Footer.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    // Animation pour les icônes de réseaux sociaux
    const socialIconVariants = {
        hover: {
            y: -5,
            scale: 1.1,
            transition: {
                duration: 0.3,
                type: 'spring',
                stiffness: 300
            }
        }
    }

    // Liste des partenaires/clients
    const partners = [
        { name: 'RCT', logo: '/images/partners/rct-logo.png' },
        { name: 'PAUC Hand Aix', logo: '/images/partners/pauc-logo.png' },
        { name: 'Istres Handball', logo: '/images/partners/istres-logo.png' },
        { name: 'CCI 13', logo: '/images/partners/cci13-logo.png' },
        { name: 'Mairie de Fos Sur Mer', logo: '/images/partners/fos-logo.png' }
    ]

    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                {/* Section principale */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Logo et présentation */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <Image
                                src="/images/logo-white.svg" // Logo en version blanche pour le footer
                                alt="Gergom Events"
                                width={150}
                                height={50}
                                className="h-auto"
                            />
                        </Link>
                        <p className="text-gray-400 mb-4 italic">
                            <span className="text-primary font-semibold">15 ans</span> d'expertise événementielle
                        </p>
                        <p className="text-gray-400 text-sm">
                            Gergom Events transforme vos projets en expériences sensorielles inoubliables.
                            Notre expertise technique et notre passion pour l'événementiel se mettent au service de votre créativité.
                        </p>
                    </div>

                    {/* Coordonnées */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contactez-nous</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="mt-1 mr-3 text-primary flex-shrink-0" />
                                <span>Bld des Ventadouiro<br/>13300 Salon de Provence</span>
                            </li>
                            <li className="flex items-center">
                                <FaPhone className="mr-3 text-primary flex-shrink-0" />
                                <a href="tel:0619537090" className="hover:text-primary transition-colors">
                                    06 19 53 70 90
                                </a>
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="mr-3 text-primary flex-shrink-0" />
                                <a href="mailto:contact@gergom-events.fr" className="hover:text-primary transition-colors">
                                    contact@gergom-events.fr
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Menu rapide */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Menu rapide</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="/" className="hover:text-primary transition-colors">
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link href="/nos-services" className="hover:text-primary transition-colors">
                                    Nos services
                                </Link>
                            </li>
                            <li>
                                <Link href="/realisations" className="hover:text-primary transition-colors">
                                    Nos réalisations
                                </Link>
                            </li>
                            <li>
                                <Link href="/a-propos" className="hover:text-primary transition-colors">
                                    À propos
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Réseaux sociaux */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Suivez-nous</h3>
                        <div className="flex space-x-4 mb-6">
                            <motion.a
                                href="https://www.facebook.com/gergomsas"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-primary transition-colors"
                                variants={socialIconVariants}
                                whileHover="hover"
                            >
                                <FaFacebookF />
                            </motion.a>
                            <motion.a
                                href="https://www.instagram.com/gergomevents/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-primary transition-colors"
                                variants={socialIconVariants}
                                whileHover="hover"
                            >
                                <FaInstagram />
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com/company/gergom-events"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-primary transition-colors"
                                variants={socialIconVariants}
                                whileHover="hover"
                            >
                                <FaLinkedinIn />
                            </motion.a>
                            <motion.a
                                href="https://www.youtube.com/channel/UCxxxxxxxxxxx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-primary transition-colors"
                                variants={socialIconVariants}
                                whileHover="hover"
                            >
                                <FaYoutube />
                            </motion.a>
                        </div>

                        <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Mentions légales</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>
                                <Link href="/mentions-legales" className="hover:text-primary transition-colors">
                                    Mentions légales
                                </Link>
                            </li>
                            <li>
                                <Link href="/politique-confidentialite" className="hover:text-primary transition-colors">
                                    Politique de confidentialité
                                </Link>
                            </li>
                            <li>
                                <Link href="/cgv" className="hover:text-primary transition-colors">
                                    CGV
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Section partenaires */}
                <div className="border-t border-gray-800 pt-8 pb-6">
                    <h3 className="text-center text-lg font-semibold mb-6">Ils nous font confiance</h3>
                    <div className="flex flex-wrap justify-center gap-8 grayscale opacity-70">
                        {partners.map((partner, index) => (
                            <motion.div
                                key={index}
                                className="w-24 h-16 flex items-center justify-center bg-white bg-opacity-10 rounded p-2"
                                whileHover={{
                                    filter: 'grayscale(0)',
                                    opacity: 1,
                                    scale: 1.05
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    width={80}
                                    height={40}
                                    className="h-auto max-h-full w-auto object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} Gergom Events. Tous droits réservés.</p>
                    <p className="mt-1">Site conçu et développé par <a href="#" className="text-primary hover:underline">Votre Agence</a></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer