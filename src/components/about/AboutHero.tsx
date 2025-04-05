// src/components/about/AboutHero.tsx
'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function AboutHero() {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 150])
    const opacity = useTransform(scrollY, [0, 300], [1, 0.5])

    return (
        <section className="relative h-[500px] overflow-hidden">
            {/* Image avec effet parallaxe */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y, opacity }}
            >
                <Image
                    src="/images/about/hero-about.jpg"
                    alt="L'équipe Gergom Events en action"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10"></div>
            </motion.div>

            {/* Contenu */}
            <div className="container mx-auto px-4 h-full relative z-20 flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        À propos de Gergom Events
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl">
                        15 ans d'expertise technique au service de vos émotions.
                        Découvrez notre histoire, nos valeurs et notre passion pour l'événementiel.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}