// src/components/about/ValuesSection.tsx
'use client'

import { motion } from 'framer-motion'
import { FaHandshake, FaLightbulb, FaTools, FaUsers } from 'react-icons/fa'

// Données des valeurs
const values = [
    {
        icon: FaHandshake,
        title: 'Respect',
        description: ` Chaque projet est abordé avec considération, assurant une écoute attentive des besoins du client.`
    },
    {
        icon: FaLightbulb,
        title: 'Solidarité',
        description: 'L\'équipe travaille en synergie, garantissant une coordination optimale pour chaque événement.'
    },
    {
        icon: FaTools,
        title: 'Combativité',
        description: 'Face aux défis, Gergom Events fait preuve de détermination pour offrir des solutions adaptées.'
    },
    {
        icon: FaUsers,
        title: 'Courage',
        description: `L'entreprise n'hésite pas à innover et à sortir des sentiers battus pour surprendre et satisfaire ses clients.`
    },
    {
        icon: FaUsers,
        title: 'Engagement',
        description: `Chaque membre de l'équipe s'investit pleinement, assurant la réussite de l'événement.`
    },
    {
        icon: FaUsers,
        title: 'Esprit d\'équipe',
        description: ` La collaboration est au cœur de leur approche, favorisant un environnement de travail harmonieux.`
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
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