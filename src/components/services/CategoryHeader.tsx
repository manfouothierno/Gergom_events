// src/components/services/CategoryHeader.tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { getIconByName } from '@/utils/icons'

interface CategoryHeaderProps {
    title: string;
    subtitle: string;
    color: string;
    iconName: string;
    imagePath: string;
}

const CategoryHeader = ({ title, subtitle, color, iconName, imagePath }: CategoryHeaderProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const Icon = getIconByName(iconName);

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <section className="relative h-80 sm:h-96 md:h-[450px] overflow-hidden">
            {/* Image de fond avec overlay */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: `linear-gradient(to right, ${color}dd 0%, ${color}99 50%, rgba(0,0,0,0.6) 100%)`
                    }}
                ></div>
                <Image
                    src={imagePath}
                    alt={title}
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            {/* Contenu */}
            <div className="container mx-auto px-4 h-full relative z-10">
                <div className="flex flex-col justify-center h-full max-w-2xl">
                    {/* Icône */}
                    <motion.div
                        className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white text-3xl mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Icon />
                    </motion.div>

                    {/* Titre et sous-titre */}
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        className="text-lg sm:text-xl text-white/90"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {subtitle}
                    </motion.p>
                </div>
            </div>

            {/* Vague décorative */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                    preserveAspectRatio="none"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 32L60 36C120 40 240 48 360 52C480 56 600 56 720 48C840 40 960 24 1080 20C1200 16 1320 24 1380 28L1440 32V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V32Z"
                        fill="#F9FAFB"
                    />
                </svg>
            </div>
        </section>
    )
}

export default CategoryHeader