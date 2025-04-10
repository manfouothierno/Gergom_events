// src/components/nos-prestations/FeaturedPost.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function FeaturedPost({ title, excerpt, imageUrl, category, date, slug }) {
    return (
        <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 lg:h-full">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-[#006400] text-white text-sm px-3 py-1 rounded-full">
                        {category}
                    </div>
                </div>

                {/* Contenu */}
                <div className="p-8 flex flex-col">
                    <span className="text-gray-500 text-sm mb-2">{date}</span>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
                    <p className="text-gray-600 mb-6 flex-grow">{excerpt}</p>

                    <Link href={`/nos-prestations/${slug}`}>
                        <motion.button
                            className="inline-flex items-center text-[#006400] font-medium hover:underline"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            Lire l'article complet
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}