// src/components/contact/ContactInfo.tsx
'use client'

import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'

export default function ContactInfo() {
    return (
        <motion.div
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <div className="space-y-6">
                {/* Adresse */}
                <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <FaMapMarkerAlt className="text-red-600 text-xl" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">Notre adresse</h3>
                        <p className="text-gray-600 mt-1">Bld des Ventadouiro<br/>13300 Salon de Provence</p>
                    </div>
                </div>

                {/* Téléphone */}
                <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <FaPhone className="text-red-600 text-xl" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">Téléphone</h3>
                        <p className="text-gray-600 mt-1">
                            <a href="tel:0619537090" className="hover:text-red-600 transition-colors">
                                06 19 53 70 90
                            </a>
                        </p>
                    </div>
                </div>

                {/* Email */}
                <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <FaEnvelope className="text-red-600 text-xl" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                        <p className="text-gray-600 mt-1">
                            <a href="mailto:contact@gergom-events.fr" className="hover:text-red-600 transition-colors">
                                contact@gergom-events.fr
                            </a>
                        </p>
                    </div>
                </div>

                {/* Horaires */}
                <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <FaClock className="text-red-600 text-xl" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">Horaires d'ouverture</h3>
                        <ul className="text-gray-600 mt-1 space-y-1">
                            <li className="flex justify-between">
                                <span>Lundi - Vendredi:</span>
                                <span>9h00 - 18h00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Samedi:</span>
                                <span>9h00 - 12h00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Dimanche:</span>
                                <span>Fermé</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">

                    <a href="https://www.facebook.com/gergomsas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-colors"
                    >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77,7.46H14.5v-1.9c0-0.9,0.6-1.1,1-1.1h3V0.5h-4.33c-3.28,0-5.37,2.19-5.37,5.3v1.66H5.5v4h2.8V24h6.2V11.46h2.8L18.77,7.46z"/>
                    </svg>
                </a>

                <a href="https://www.instagram.com/gergomevents/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-colors"
                >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
            </a>

            <a href="https://www.linkedin.com/company/gergom-events"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-colors"
            >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
        </a>
</div>
</div>
</motion.div>
)
}