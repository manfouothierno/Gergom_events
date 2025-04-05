// src/components/contact/MapSection.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function MapSection() {
    const [isMapLoaded, setIsMapLoaded] = useState(false)

    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                <motion.div
                    className="relative rounded-lg overflow-hidden shadow-md h-[400px]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {!isMapLoaded && (
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                        </div>
                    )}

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2882.9651768987847!2d5.094641315535701!3d43.63964097912152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b61033bd0d208b%3A0xddd33dadfce93f36!2sBlvd%20des%20Ventadouiro%2C%2013300%20Salon-de-Provence!5e0!3m2!1sfr!2sfr!4v1675876245281!5m2!1sfr!2sfr"
                        className="w-full h-full border-0"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        onLoad={() => setIsMapLoaded(true)}
                        title="Localisation de Gergom Events"
                    ></iframe>

                    {/* Carte de visite sur la carte */}
                    <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-xs">
                        <h3 className="font-bold text-gray-800 mb-2">Gergom Events</h3>
                        <p className="text-gray-600 text-sm mb-2">Bld des Ventadouiro<br/>13300 Salon de Provence</p>
                        <a
                            href="https://goo.gl/maps/YourGoogleMapsLink"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 text-sm hover:text-red-700 inline-flex items-center"
                        >
                            Itinéraire
                            <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}