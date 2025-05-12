// src/components/about/HistoryTimeline.tsx
'use client'

import { motion } from 'framer-motion'

// Données de la timeline
const timelineEvents = [
    {
        year: '2010',
        title: 'Création de la société',
        description: 'Fondation de l\'entreprise par Arnaud Gerdonne à Salon-de-Provence, spécialisée initialement dans la sonorisation d\'événements.'
    },
    {
        year: '2010',
        title: 'Développement du pôle éclairage',
        description: 'Extension de notre offre avec l\'acquisition des premiers systèmes d\'éclairage professionnels pour répondre à une demande croissante.'
    },
    {
        year: '2013',
        title: 'Premiers grands événements régionaux',
        description: 'Reconnaissance de notre expertise avec la prise en charge d\'événements majeurs pour les collectivités locales et entreprises de la région.'
    },
    {
        year: '2015',
        title: 'Investissement en structures scéniques',
        description: 'Élargissement de notre parc matériel avec l\'acquisition de scènes et structures, permettant d\'offrir des solutions complètes.'
    },
    {
        year: '2018',
        title: 'Nouveau siège social',
        description: 'Installation dans nos locaux actuels avec un entrepôt modernisé et un showroom pour présenter notre matériel aux clients.'
    },
    {
        year: '2020',
        title: 'Résilience et adaptation',
        description: 'Développement de nouvelles solutions pendant la crise sanitaire : captation vidéo, streaming et événements hybrides.'
    },
    {
        year: '2023',
        title: 'Expansion et innovation',
        description: 'Investissement dans les dernières technologies audiovisuelles et renforcement de notre présence sur toute la région PACA.'
    }
]

export default function HistoryTimeline() {
    return (
        <div className="relative max-w-4xl mx-auto">
            {/* Ligne verticale */}
            <div className="absolute left-[15px] md:left-1/2 ml-px md:-ml-px transform md:-translate-x-1/2 top-0 h-full w-0.5 bg-red-100"></div>

            {/* Événements de la timeline */}
            {timelineEvents.map((event, index) => (
                <motion.div
                    key={event.year}
                    className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} mb-12`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                >
                    {/* Point rouge sur la timeline */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-6 md:top-1/2 w-8 h-8 rounded-full bg-white border-4 border-red-600 z-10"></div>

                    {/* Contenu de l'événement */}
                    <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                        <div className={`p-5 bg-white rounded-lg shadow-sm border-l-4 ${index % 2 === 0 ? 'md:text-right border-red-600' : 'border-red-600'}`}>
                            <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded mb-2">{event.year}</span>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h3>
                            <p className="text-gray-600">{event.description}</p>
                        </div>
                    </div>

                    {/* Espace vide pour l'autre côté */}
                    <div className="hidden md:block md:w-1/2"></div>
                </motion.div>
            ))}
        </div>
    )
}