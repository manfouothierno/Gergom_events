// src/components/about/TeamSection.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Données de l'équipe
const teamMembers = [
    {
        name: 'Arnaud Gergonne',
        role: 'Directeur et créateur ',
        image: '/images/team/gerald-gomez.jpg',
        bio: "Passionné par l'événementiel depuis plus de 20 ans, Arnaud a fondé Gergom Events avec la vision de créer une entreprise alliant expertise technique , créativité et  valeurs humaines. Il supervise aujourd'hui l'ensemble des opérations et le développement stratégique."
    },
    {
        name: 'Kévin 1',
        role: 'DJ',
        image: '/images/team/sophie-laurent.jpg',
        bio: "DJ passionné qui gère la partie son lumière et vidéo"
    },
    {
        name: 'Kévin 2 ',
        role: 'Responsable logistique mobilier',
        image: '/images/team/thomas-moreau.jpg',
        bio: "Ancien joueur pro de rugby, responsable logistique mobilier, ses valeurs de rugbyman collent parfaitement aux valeurs et ambitions de la société"
    },
    // {
    //     name: 'Émilie Dupont',
    //     role: 'Responsable Logistique',
    //     image: '/images/team/emilie-dupont.jpg',
    //     bio: "Émilie orchestre la préparation, l'acheminement et l'installation de notre matériel. Sa rigueur et son sens de l'organisation sont essentiels pour garantir le bon déroulement de chaque événement."
    // },
    // {
    //     name: 'Julien Petit',
    //     role: 'Technicien Son Senior',
    //     image: '/images/team/julien-petit.jpg',
    //     bio: "Expert en sonorisation live et en studio, Julien assure une qualité sonore optimale pour tous types d'événements, des concerts aux conférences, en passant par les mariages."
    // },
    // {
    //     name: 'Laura Martin',
    //     role: 'Designer Lumière',
    //     image: '/images/team/laura-martin.jpg',
    //     bio: "Spécialiste de la mise en lumière, Laura crée des ambiances uniques et personnalisées. Son expertise technique et son sens artistique transforment n'importe quel espace."
    // }
]

export default function TeamSection() {
    const [selectedMember, setSelectedMember] = useState(null)

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Notre équipe</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Des professionnels passionnés qui mettent leur expertise à votre service pour faire de votre événement une réussite.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            className="relative group cursor-pointer"
                            onClick={() => setSelectedMember(member)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="relative h-80 overflow-hidden rounded-t-lg">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90"></div>
                            </div>
                            <div className="bg-white p-5 rounded-b-lg shadow-sm">
                                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                                <p className="text-red-600 font-medium">{member.role}</p>
                                <p className="text-gray-600 mt-2 line-clamp-2">{member.bio}</p>
                                <button
                                    className="mt-3 text-sm text-red-600 hover:text-red-700 inline-flex items-center"
                                >
                                    En savoir plus
                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Modal de bio complète */}
                {selectedMember && (
                    <div
                        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedMember(null)}
                    >
                        <motion.div
                            className="bg-white rounded-lg p-6 max-w-2xl relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                                onClick={() => setSelectedMember(null)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-1/3 relative h-56 md:h-auto">
                                    <Image
                                        src={selectedMember.image}
                                        alt={selectedMember.name}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <div className="w-full md:w-2/3">
                                    <h3 className="text-2xl font-bold text-gray-800">{selectedMember.name}</h3>
                                    <p className="text-red-600 font-medium mb-4">{selectedMember.role}</p>
                                    <p className="text-gray-600">{selectedMember.bio}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    )
}