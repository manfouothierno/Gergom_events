// src/components/home/CtaSection.tsx
'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaHeadset, FaCalendarCheck, FaTools, FaUsers } from 'react-icons/fa'

// Composant pour un compteur animé
const AnimatedStat = ({ icon: Icon, value, label }) => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end center"]
    })

    const count = useTransform(scrollYProgress, [0, 1], [0, value])

    return (
        <motion.div
            ref={ref}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <Icon className="text-2xl text-white" />
            </div>
            <motion.div className="text-4xl font-bold text-white">
                {count.get().toString().includes('+') && <span>+</span>}
                {value.toString().includes('+') && <span>+</span>}
            </motion.div>
            <div className="text-gray-100 mt-1">{label}</div>
        </motion.div>
    )
}

const CtaSection = () => {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Effet de parallaxe
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])

    // Statistiques
    const stats = [
        { icon: FaCalendarCheck, value: 500, label: "Événements / an" },
        { icon: FaHeadset, value: "15+", label: "Années d'expérience" },
        { icon: FaUsers, value: 1000, label: "Clients satisfaits" },
        // { icon: FaTools, value: 48, label: "Heures d'intervention max" }
    ]

    return (
        <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
            {/* Fond avec effet parallaxe */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y, opacity }}
            >
                {/* Overlay coloré */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-red-800/80 to-black/90 z-10"></div>

                {/* Image de fond */}
                <Image
                    src="/images/cta/event-background.jpg"
                    alt="Événement spectaculaire"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Statistiques */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {stats.map((stat, index) => (
                        <AnimatedStat
                            key={index}
                            icon={stat.icon}
                            value={stat.value}
                            label={stat.label}
                        />
                    ))}
                </div>

                {/* Appel à l'action */}
                <motion.div
                    className="text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                        Prêt à créer votre événement d'exception ?
                    </h2>
                    <p className="text-xl text-gray-200 mb-8">
                        Notre équipe de professionnels transforme vos idées en réalités spectaculaires.
                        Faites-nous part de votre projet, nous nous occupons du reste.
                    </p>

                    <Link href="/contact">
                        <motion.button
                            className="px-10 py-4 bg-white text-red-600 text-xl font-semibold rounded-lg shadow-xl hover:bg-gray-100 transition-colors inline-flex items-center gap-3"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FaHeadset />
                            Contactez nous
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            {/* Vague décorative en bas */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 48L60 54C120 60 240 72 360 78C480 84 600 84 720 72C840 60 960 36 1080 30C1200 24 1320 36 1380 42L1440 48V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V48Z"
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    )
}

export default CtaSection