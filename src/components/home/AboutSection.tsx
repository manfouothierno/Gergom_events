// src/components/home/AboutSection.tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaTrophy, FaUsers, FaCalendarAlt, FaSmile } from 'react-icons/fa'

// Composant Counter pour animer les chiffres
const Counter = ({ from = 0, to, duration = 2, label, icon: Icon }) => {
    const [count, setCount] = useState(from)
    const nodeRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: nodeRef,
        offset: ["start end", "end center"]
    })

    useEffect(() => {
        let animationFrameId = null
        let startTime = null

        const countTo = to
        const easeOutQuart = t => 1 - Math.pow(1 - t, 4)

        const step = timestamp => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
            const easedProgress = easeOutQuart(progress)
            const nextCount = Math.floor(from + (countTo - from) * easedProgress)

            setCount(nextCount)

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(step)
            }
        }

        let isVisible = false
        const unsubscribe = scrollYProgress.onChange(value => {
            // Déclencher l'animation lorsque l'élément entre dans la vue
            if (value > 0 && !isVisible) {
                isVisible = true
                animationFrameId = requestAnimationFrame(step)
            }
        })

        return () => {
            unsubscribe()
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId)
            }
        }
    }, [from, to, duration, scrollYProgress])

    return (
        <div ref={nodeRef} className="flex flex-col items-center">
            <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white text-xl">
                <Icon />
            </div>
            <div className="text-4xl font-bold mb-2 text-gray-800">
                {count}<span className="text-red-600">+</span>
            </div>
            <div className="text-gray-600">{label}</div>
        </div>
    )
}

const AboutSection = () => {
    const sectionRef = useRef(null)
    const [videoLoaded, setVideoLoaded] = useState(false)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    // Effet de parallaxe
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])

    // Statistiques
    const stats = [
        { icon: FaTrophy, value: 15, label: "années d'expérience" },
        { icon: FaUsers, value: 1000, label: "clients satisfaits" },
        { icon: FaCalendarAlt, value: 500, label: "événements par an" },
        { icon: FaSmile, value: 100, label: "% satisfaction" }
    ]

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-20 bg-gray-50">
            {/* Fond avec effet parallaxe */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y, opacity }}
            >
                <div className="absolute inset-0 bg-gray-900 bg-opacity-40 z-10"></div>
                <Image
                    src="/images/about/background.jpg"
                    alt="Gergom Events en action"
                    fill
                    className="object-cover"
                />
            </motion.div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Colonne gauche - Vidéo */}
                    <div className="bg-white p-4 rounded-lg shadow-xl">
                        <div className="relative rounded overflow-hidden aspect-video">
                            {/* Placeholder en attendant que la vidéo soit chargée */}
                            {!videoLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                    <span className="animate-pulse">Chargement de la vidéo...</span>
                                </div>
                            )}

                            {/* Vidéo de présentation */}
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                                poster="/images/about/video-poster.jpg"
                                onLoadedData={() => setVideoLoaded(true)}
                            >
                                <source src="/videos/presentation.mp4" type="video/mp4" />
                                Votre navigateur ne supporte pas la lecture de vidéos.
                            </video>

                            {/* Overlay avec logo */}
                            <div className="absolute bottom-4 right-4 bg-white bg-opacity-80 rounded p-2">
                                <Image
                                    src="/images/logo.svg"
                                    alt="Gergom Events"
                                    width={80}
                                    height={30}
                                    className="h-auto w-auto"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Colonne droite - Texte */}
                    <div className="bg-white bg-opacity-95 p-8 rounded-lg shadow-lg">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold mb-6 text-gray-800">Qui Sommes-Nous</h2>

                            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                                <span className="font-semibold">Depuis 2010, Gergom Events transforme vos idées en expériences sensorielles complètes.</span>Du conseil, de la conception à la réalisation, notre expertise dans le domaine événementiel nous permet de vous proposer des solutions adaptées à vos besoins spécifiques.
                            </p>

                            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                                <span className="font-semibold">Notre équipe de passionnés maîtrise chaque aspect technique pour vous offrir un événement à votre image, sans contrainte.</span> Nous intervenons aussi bien auprès des professionnels, des institutions que des particuliers dans toute la région PACA.
                            </p>

                            <Link href="/a-propos">
                                <motion.button
                                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors shadow-md inline-flex items-center"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    En savoir plus
                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Statistiques avec animation de compteur */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    {stats.map((stat, index) => (
                        <Counter
                            key={index}
                            from={0}
                            to={stat.value}
                            duration={2.5}
                            label={stat.label}
                            icon={stat.icon}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default AboutSection