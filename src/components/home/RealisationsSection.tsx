// src/components/home/RealisationsSection.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useSwiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Types d'événements pour le filtrage
type EventType = 'all' | 'professional' | 'private' | 'institutional'

// Données des réalisations
const realisations = [
    {
        id: 1,
        title: 'Lancement Produit Tech Company',
        type: 'professional',
        typeName: 'Professionnel',
        image: '/images/realisations/realisation1.jpg',
        date: 'Octobre 2023',
        description: "Mise en scène spectaculaire pour la présentation d'un nouveau produit technologique.",
        services: ['Sonorisation', 'Éclairage', 'Vidéo']
    },
    {
        id: 2,
        title: 'Mariage au Château de Lançon',
        type: 'private',
        typeName: 'Particulier',
        image: '/images/realisations/realisation2.jpg',
        date: 'Septembre 2023',
        description: "Ambiance féerique et sonorisations complète pour une soirée d'exception.",
        services: ['Sonorisation', 'Éclairage', 'Mobilier']
    },
    {
        id: 3,
        title: 'Cérémonie des Vœux - Mairie de Grans',
        type: 'institutional',
        typeName: 'Institutionnel',
        image: '/images/realisations/realisation3.jpg',
        date: 'Janvier 2024',
        description: 'Dispositif complet pour cérémonie officielle et diffusion en direct.',
        services: ['Sonorisation', 'Vidéo', 'Structures']
    },
    {
        id: 4,
        title: 'Festival de musique - Aix-en-Provence',
        type: 'professional',
        typeName: 'Professionnel',
        image: '/images/realisations/realisation4.jpg',
        date: 'Juillet 2023',
        description: 'Scène principale et effets spéciaux pour un festival accueillant 5000 personnes.',
        services: ['Sonorisation', 'Éclairage', 'Structures', 'Effets']
    },
    {
        id: 5,
        title: "Séminaire d'Entreprise - PBTP",
        type: 'professional',
        typeName: 'Professionnel',
        image: '/images/realisations/realisation5.jpg',
        date: 'Mai 2023',
        description: "Organisation complète d'un séminaire d'entreprise avec animations interactives.",
        services: ['Sonorisation', 'Vidéo', 'Mobilier']
    },
    {
        id: 6,
        title: 'Inauguration Médiathèque',
        type: 'institutional',
        typeName: 'Institutionnel',
        image: '/images/realisations/realisation6.jpg',
        date: 'Mars 2023',
        description: "Mise en lumière et sonorisations pour l'inauguration d'un nouvel espace culturel.",
        services: ['Éclairage', 'Sonorisation', 'Vidéo']
    }
]

// Composant pour les boutons de navigation personnalisés
const NavigationButtons = () => {
    const swiper = useSwiper()

    return (
        <div className="flex space-x-2 mt-6">
            <button
                onClick={() => swiper.slidePrev()}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Projet précédent"
            >
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={() => swiper.slideNext()}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Projet suivant"
            >
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    )
}

const RealisationsSection = () => {
    const [activeFilter, setActiveFilter] = useState<EventType>('all')
    const [filteredRealisations, setFilteredRealisations] = useState(realisations)
    const swiperRef = useRef(null)

    // Filtrer les réalisations en fonction du type sélectionné
    useEffect(() => {
        if (activeFilter === 'all') {
            setFilteredRealisations(realisations)
        } else {
            setFilteredRealisations(realisations.filter(real => real.type === activeFilter))
        }
    }, [activeFilter])

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* En-tête de section */}
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

                {/* Filtres */}
                <motion.div
                    className="flex flex-wrap justify-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <button
                        onClick={() => setActiveFilter('all')}
                        className={`m-1 px-4 py-2 rounded-full transition-all ${
                            activeFilter === 'all'
                                ? 'bg-red-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Tous
                    </button>
                    <button
                        onClick={() => setActiveFilter('professional')}
                        className={`m-1 px-4 py-2 rounded-full transition-all ${
                            activeFilter === 'professional'
                                ? 'bg-red-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Professionnels
                    </button>
                    <button
                        onClick={() => setActiveFilter('private')}
                        className={`m-1 px-4 py-2 rounded-full transition-all ${
                            activeFilter === 'private'
                                ? 'bg-red-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Particuliers
                    </button>
                    <button
                        onClick={() => setActiveFilter('institutional')}
                        className={`m-1 px-4 py-2 rounded-full transition-all ${
                            activeFilter === 'institutional'
                                ? 'bg-red-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Institutionnels
                    </button>
                </motion.div>

                {/* Carousel de réalisations */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className="overflow-hidden"
                        >
                            <Swiper
                                ref={swiperRef}
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={30}
                                slidesPerView={1}
                                breakpoints={{
                                    640: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 }
                                }}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                pagination={{ clickable: true }}
                                loop={filteredRealisations.length > 3}
                                className="pb-12"
                            >
                                {filteredRealisations.map((realisation) => (
                                    <SwiperSlide key={realisation.id}>
                                        <Link href={`/realisations/${realisation.id}`}>
                                            <motion.div
                                                className="bg-white rounded-lg overflow-hidden shadow-lg h-full transition-all duration-300"
                                                whileHover={{
                                                    y: -5,
                                                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                                                }}
                                            >
                                                {/* Image */}
                                                <div className="relative h-64 overflow-hidden">
                                                    <Image
                                                        src={realisation.image}
                                                        alt={realisation.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 hover:scale-110"
                                                    />
                                                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                                                        {realisation.typeName}
                                                    </div>
                                                </div>

                                                {/* Contenu */}
                                                <div className="p-6">
                                                    <div className="text-sm text-gray-500 mb-2">{realisation.date}</div>
                                                    <h3 className="text-xl font-bold mb-3 text-gray-800">{realisation.title}</h3>
                                                    <p className="text-gray-600 text-sm mb-4">{realisation.description}</p>

                                                    {/* Services utilisés */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {realisation.services.map((service, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-block px-2 py-1 bg-gray-100 text-xs rounded"
                                                            >
                                {service}
                              </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    </SwiperSlide>
                                ))}

                                {/* Boutons de navigation personnalisés */}
                                <div className="absolute bottom-0 left-0 right-0 flex justify-center z-10">
                                    <NavigationButtons />
                                </div>
                            </Swiper>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Bouton "Voir plus" */}
                <motion.div
                    className="text-center mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <Link href="/realisations">
                        <motion.button
                            className="inline-flex items-center px-6 py-3 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Toutes nos réalisations
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

export default RealisationsSection