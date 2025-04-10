// src/components/nos-prestations/BlogHeader.tsx
'use client'

import { motion } from 'framer-motion'

export default function BlogHeader() {
    return (
        <section className="bg-[#006400] mt-16 py-24 relative overflow-hidden">
            {/* Motif de fond */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute left-0 top-0 w-full h-full bg-white"
                     style={{ backgroundImage: 'url("/images/nos-prestations/pattern.svg")', backgroundSize: '100px' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Nos Prestations</h1>
                    <p className="text-xl text-white/90">
                        Découvrez toutes nos réalisations et inspirez-vous
                        pour votre prochain événement en région PACA
                    </p>
                </motion.div>
            </div>
        </section>
    )
}