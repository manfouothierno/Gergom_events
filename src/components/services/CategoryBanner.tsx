// src/components/services/CategoryBanner.tsx
'use client'

import { motion } from 'framer-motion'
import { IconType } from 'react-icons'

interface CategoryBannerProps {
    title: string;
    bgColor: string;
    icon: IconType;
}

const CategoryBanner = ({ title, bgColor, icon: Icon }: CategoryBannerProps) => {
    return (
        <section className={`${bgColor} py-16 md:py-24 relative overflow-hidden`}>
            {/* Éléments décoratifs */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white"></div>
                <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-white"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex justify-center mb-6">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white text-3xl">
              <Icon />
            </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
                    <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
                </motion.div>
            </div>
        </section>
    )
}

export default CategoryBanner