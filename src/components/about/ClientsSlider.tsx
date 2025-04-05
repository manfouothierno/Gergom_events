// src/components/about/ClientsSlider.tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Liste des clients/partenaires
const clients = [
    { name: 'RCT', logo: '/images/clients/rct-logo.png' },
    { name: 'PAUC Hand Aix', logo: '/images/clients/pauc-logo.png' },
    { name: 'Istres Handball', logo: '/images/clients/istres-logo.png' },
    { name: 'CCI 13', logo: '/images/clients/cci13-logo.png' },
    { name: 'Mairie de Fos Sur Mer', logo: '/images/clients/fos-logo.png' },
    { name: 'Mairie de Lançon de Provence', logo: '/images/clients/lancon-logo.png' },
    { name: 'Mairie de Grans', logo: '/images/clients/grans-logo.png' },
    { name: 'Montaner Pietrini', logo: '/images/clients/montaner-logo.png' },
    { name: 'Le Fût à Mesure', logo: '/images/clients/fut-logo.png' },
    { name: 'My Beers', logo: '/images/clients/mybeers-logo.png' }
]

export default function ClientsSlider() {
    const [position, setPosition] = useState(0)

    // Animation automatique
    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((prev) => prev - 1)
        }, 30)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full overflow-hidden relative">
            <div
                className="flex items-center gap-12 py-4"
                style={{ transform: `translateX(${position}px)` }}
            >
                {/* Première série de logos */}
                {clients.map((client, index) => (
                    <motion.div
                        key={`a-${index}`}
                        className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                    >
                        <Image
                            src={client.logo}
                            alt={client.name}
                            width={120}
                            height={80}
                            className="h-16 w-auto object-contain"
                        />
                    </motion.div>
                ))}

                {/* Seconde série de logos pour effet continu */}
                {clients.map((client, index) => (
                    <motion.div
                        key={`b-${index}`}
                        className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                    >
                        <Image
                            src={client.logo}
                            alt={client.name}
                            width={120}
                            height={80}
                            className="h-16 w-auto object-contain"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}