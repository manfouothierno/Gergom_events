// src/components/about/CoverageMap.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function CoverageMap() {
    return (
        <motion.div
            className="relative h-[400px] rounded-lg overflow-hidden shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <Image
                src="/images/about/map-paca.jpg"
                alt="Carte de la région PACA"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-white/10"></div>

            {/* Points d'intervention */}
            <motion.div
                className="absolute top-[30%] left-[25%] w-3 h-3 bg-red-600 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: [0, 1.5, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-semibold bg-white px-2 py-0.5 rounded shadow-sm">
          Salon-de-Provence
        </span>
                <span className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-75"></span>
            </motion.div>

            <motion.div
                className="absolute top-[35%] left-[35%] w-3 h-3 bg-red-600 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: [0, 1.5, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-semibold bg-white px-2 py-0.5 rounded shadow-sm">
          Aix-en-Provence
        </span>
            </motion.div>

            <motion.div
                className="absolute top-[45%] left-[20%] w-3 h-3 bg-red-600 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: [0, 1.5, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-semibold bg-white px-2 py-0.5 rounded shadow-sm">
          Marseille
        </span>
            </motion.div>

            <motion.div
                className="absolute top-[25%] left-[60%] w-3 h-3 bg-red-600 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: [0, 1.5, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-semibold bg-white px-2 py-0.5 rounded shadow-sm">
          Nice
        </span>
            </motion.div>

            <motion.div
                className="absolute top-[60%] left-[45%] w-3 h-3 bg-red-600 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: [0, 1.5, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-semibold bg-white px-2 py-0.5 rounded shadow-sm">
          Toulon
        </span>
            </motion.div>
        </motion.div>
    )
}