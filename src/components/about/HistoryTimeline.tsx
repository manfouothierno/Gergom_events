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
        title: 'Signature du 1er contrat avec le RCT (Rugby Club Toulonnais)',
        description: ''
    },
    {
        year: '2017',
        title: 'Début du partenariat avec le PAUC (Pays d’Aix Université Club)',
        description: ''
    },
    {
        year: '2017',
        title: 'Lancement des After Work, une nouvelle offre événementielle',
        description: ''
    },
    {
        year: '2018',
        title: 'Lancement de la branche mobilier, élargissement de l’offre',
        description: ''
    },
    {
        year: '2018',
        title: 'Consolidation de l’activité — on garde tel quel',
        description: ''
    },
    {
        year: '2020',
        title: 'Stabilisation des services — on garde tel quel',
        description: ''
    },
    {
        year: '2022',
        title: 'Début des installations fixes en vidéo et son chez les partenaires',
        description: ''
    },
    {
        year: '2024',
        title: 'Reconduction du contrat avec le RCT',
        description: ''
    },
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