// src/components/home/HeroSection.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'

// Données des slides
const heroSlides = [
    {
        id: 1,
        image: '/images/hero/slide1.jpg',
        title: 'Sublimez vos événements avec Gergom Events',
        subtitle: 'Sonorisation • Éclairage • Vidéo • Structures'
    },
    {
        id: 2,
        image: '/images/hero/slide2.jpg',
        title: "L'expertise technique au service de votre créativité",
        subtitle: 'Professionnels • Institutions • Particuliers'
    },
    {
        id: 3,
        image: '/images/hero/slide3.jpg',
        title: "15 ans d'expérience au service de vos émotions",
        subtitle: 'Plus de 1000 clients satisfaits en région PACA'
    }
]

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    // Gestion du défilement automatique du slider
    useEffect(() => {
        if (isPaused) return

        const timer = setTimeout(() => {
            if (!isAnimating) {
                goToNextSlide()
            }
        }, 6000)

        return () => clearTimeout(timer)
    }, [currentSlide, isAnimating, isPaused])

    // Navigation entre les slides
    const goToNextSlide = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setTimeout(() => setIsAnimating(false), 1000)
    }

    const goToPrevSlide = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
        setTimeout(() => setIsAnimating(false), 1000)
    }

    const goToSlide = (index: number) => {
        if (isAnimating || index === currentSlide) return
        setIsAnimating(true)
        setCurrentSlide(index)
        setTimeout(() => setIsAnimating(false), 1000)
    }

    // Configuration du swipe pour mobile
    const handlers = useSwipeable({
        onSwipedLeft: () => goToNextSlide(),
        onSwipedRight: () => goToPrevSlide(),
        // preventDefaultTouchmoveEvent: true,
        trackMouse: true
    })

    // Variantes d'animation pour le texte de frappe séquentielle
    const titleVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: 0.3
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100
            }
        }
    }

    return (
        <section
            className="relative h-screen w-full overflow-hidden"
            {...handlers}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Images du slider */}
            <AnimatePresence mode="wait">
                {heroSlides.map((slide, index) => (
                    index === currentSlide && (
                        <motion.div
                            key={slide.id}
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            {/* Overlay sombre */}
                            {/*<div className="absolute inset-0 bg-black bg-opacity-80 z-10"></div>*/}

                            {/* Image de fond */}
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                priority
                                sizes="100vw"
                                className="object-cover"
                            />
                        </motion.div>
                    )
                ))}
            </AnimatePresence>

            {/* Contenu du slide */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-20 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    {heroSlides.map((slide, index) => (
                        index === currentSlide && (
                            <AnimatePresence mode="wait" key={slide.id}>
                                <div>
                                    {/* Titre avec animation de frappe séquentielle */}
                                    <motion.h1
                                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                                        variants={titleVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        {slide.title.split('').map((char, charIndex) => (
                                            <motion.span
                                                key={`${slide.id}-${charIndex}`}
                                                variants={letterVariants}
                                                className="inline-block"
                                            >
                                                {char === ' ' ? '\u00A0' : char}
                                            </motion.span>
                                        ))}
                                    </motion.h1>

                                    {/* Sous-titre */}
                                    <motion.p
                                        className="text-xl md:text-2xl mb-10 text-gray-200"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.6, delay: 0.8 }}
                                    >
                                        {slide.subtitle}
                                    </motion.p>
                                </div>
                            </AnimatePresence>
                        )
                    ))}

                    {/* Boutons CTA */}
                    <motion.div
                        className="flex flex-col sm:flex-row justify-center gap-4 mt-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                    >
                        <Link href="/nos-services">
                            <motion.button
                                className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Découvrir nos services
                            </motion.button>
                        </Link>
                        <Link href="/contact">
                            <motion.button
                                className="bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 text-black border border-white px-6 py-3 rounded-md text-lg font-medium transition-colors shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Demander un devis gratuit
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Flèches de navigation */}
            <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 text-white p-3 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 transition-all hidden md:block"
                onClick={goToPrevSlide}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
            <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 text-white p-3 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 transition-all hidden md:block"
                onClick={goToNextSlide}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

            {/* Indicateurs de slide */}
            <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center">
                <div className="flex space-x-3">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                currentSlide === index
                                    ? 'w-8 bg-primary'
                                    : 'w-3 bg-white bg-opacity-50 hover:bg-opacity-80'
                            }`}
                            aria-label={`Aller au slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroSection