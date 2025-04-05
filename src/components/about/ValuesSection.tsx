// src/components/about/ValuesSection.tsx
'use client'

import { motion } from 'framer-motion'
import { FaHandshake, FaLightbulb, FaTools, FaUsers } from 'react-icons/fa'

// Données des valeurs
const values = [
    {
        icon: FaHandshake,
        title: 'Excellence',
        description: `Nous nous engageons à fournir un service et des équipements de la plus haute qualité, en recherchant constamment l'amélioration continue.`
    },
    {
        icon: FaLightbulb,
        title: 'Innovation',
        description: 'Nous restons à la pointe de la technologie et des tendances événementielles pour offrir des solutions créatives et originales.'
    },
    {
        icon: FaTools,
        title: 'Fiabilité',
        description: 'La sécurité et la performance de nos installations sont notre priorité absolue, garantissant la sérénité de nos clients.'
    },
    {
        icon: FaUsers,
        title: 'Proximité',
        description: `Nous privilégions une relation personnalisée avec chaque client, basée sur l'écoute et la réactivité à chaque étape du projet.`
    }
]

export default function ValuesSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    }

    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Nos valeurs</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Ces principes guident nos actions au quotidien et définissent l'expérience que nous souhaitons offrir à nos clients.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            className="bg-white p-6 rounded-xl shadow-sm text-center"
                            variants={itemVariants}
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6">
                                <value.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                            <p className="text-gray-600">{value.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}