// src/components/shared/ContactCTA.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface ContactCTAProps {
    title: string;
    description: string;
    buttonText: string;
    bgColor?: string;
}

export default function ContactCTA({ title, description, buttonText, bgColor = '#FF0000' }: ContactCTAProps) {
    return (
        <section className="py-16" style={{ backgroundColor: bgColor }}>
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{title}</h2>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                        {description}
                    </p>
                    <Link href="/contact">
                        <motion.button
                            className="px-8 py-4 bg-white font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg text-xl"
                            style={{ color: bgColor }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {buttonText}
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}