// src/components/home/ServicesSection.tsx (version améliorée)
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {FaMusic, FaLightbulb, FaVideo, FaMagic, FaChair, FaCamera, FaGlassCheers, FaAd} from 'react-icons/fa'

// Données des services
const services = [
    {
        id: 'sonorisations',
        title: 'Sonorisation',
        icon: FaMusic,
        color: '#FF0000',
        colorClass: 'bg-[#FF0000]',
        hoverClass: 'group-hover:text-[#FF0000]',
        image: '/images/services/sonorisations.jpg',
        description: "Solutions audio professionnelles pour tous types d'événements"
    },
    {
        id: 'eclairage',
        title: 'Éclairage',
        icon: FaLightbulb,
        color: '#FFA500',
        colorClass: 'bg-[#FFA500]',
        hoverClass: 'group-hover:text-[#FFA500]',
        image: '/images/services/eclairage.jpg',
        description: 'Mise en lumière sur-mesure pour sublimer vos espaces'
    },
    {
        id: 'video',
        title: 'Ecrans et vidéos',
        icon: FaVideo,
        color: '#FFFF00',
        colorClass: 'bg-[#FFFF00]',
        hoverClass: 'group-hover:text-[#FFFF00]',
        image: '/images/services/video.jpg',
        description: 'Projection, captation et retransmission haute définition'
    },
    {
        id: 'structures',
        title: 'Installation d\'équipements',
        icon: FaAd,
        color: '#FFC0CB',
        colorClass: 'bg-[#FFC0CB]',
        hoverClass: 'group-hover:text-[#FFC0CB]',
        image: '/images/services/structures.jpg',
        description: 'Équipements professionnels pour tous vos événements'
    },
    {
        id: 'effets',
        title: 'Effets spéciaux',
        icon: FaMagic,
        color: '#800080',
        colorClass: 'bg-[#800080]',
        hoverClass: 'group-hover:text-[#800080]',
        image: '/images/services/effets.jpg',
        description: 'Effets visuels spectaculaires pour marquer les esprits'
    },
    {
        id: 'mobilier',
        title: 'Mobilier',
        icon: FaChair,
        color: '#0000FF',
        colorClass: 'bg-[#0000FF]',
        hoverClass: 'group-hover:text-[#0000FF]',
        image: '/images/services/mobilier.jpg',
        description: 'Mobilier design et fonctionnel pour vos espaces événementiels'
    },
    {
        id: 'photobooth',
        title: 'Photobooth',
        icon: FaCamera,
        color: '#4B0082',
        colorClass: 'bg-[#4B0082]',
        hoverClass: 'group-hover:text-[#4B0082]',
        image: '/images/services/photobooth.jpg',
        description: 'Créez des souvenirs mémorables pour vos invités'
    },
    {
        id: 'equipements',
        title: 'Équipements festifs',
        icon: FaGlassCheers,
        color: '#87CEEB',
        colorClass: 'bg-[#87CEEB]',
        hoverClass: 'group-hover:text-[#87CEEB]',
        image: '/images/services/equipements.jpg',
        description: 'Animations et équipements pour dynamiser vos événements'
    }
]

// Animation pour l'apparition des éléments au scroll
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

const ServicesSection = () => {
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
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={itemVariants}
                        >
                            <Link href={`/nos-services/${service.id}`}>
                                <div className="group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl cursor-pointer h-64 transition-all duration-300 transform hover:-translate-y-1">
                                    {/* Image en N&B qui se colorise au survol */}
                                    <div className="absolute inset-0 transition-all duration-500 transform">
                                        {/* Image N&B */}
                                        <div className="absolute inset-0 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110">
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Overlay dégradé */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                                    </div>

                                    {/* Contenu de la carte */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                                        <div className="flex items-center mb-3">
                                            {/* Icône avec animation */}
                                            <motion.div
                                                className={`w-10 h-10 rounded-full ${service.colorClass} flex items-center justify-center mr-3 shadow-md`}
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <service.icon className="w-5 h-5 text-white" />
                                            </motion.div>

                                            {/* Titre du service */}
                                            <h3 className="text-xl font-bold text-white transition-colors duration-300">
                                                {service.title}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-200 text-sm">
                                            {service.description}
                                        </p>

                                        {/* Bouton "En savoir plus" qui apparaît au survol */}
                                        <div className="mt-4 overflow-hidden h-8">
                                            <motion.div
                                                initial={{ y: 30, opacity: 0 }}
                                                whileHover={{ y: 0, opacity: 1 }}
                                                className="flex items-center text-sm font-medium text-white"
                                            >
                                                En savoir plus
                                                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bouton "Tous nos services" */}
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
    )
}

export default ServicesSection