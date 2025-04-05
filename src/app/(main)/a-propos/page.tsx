// src/app/(main)/a-propos/page.tsx
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AboutHero from '@/components/about/AboutHero'
import TeamSection from '@/components/about/TeamSection'
import ValuesSection from '@/components/about/ValuesSection'
import HistoryTimeline from '@/components/about/HistoryTimeline'
import CoverageMap from '@/components/about/CoverageMap'
import ClientsSlider from '@/components/about/ClientsSlider'
import ContactCTA from '@/components/shared/ContactCTA'

export const metadata = {
    title: 'À propos de Gergom Events | Notre histoire et nos valeurs',
    description: '15 ans d\'expertise dans l\'événementiel technique en région PACA. Découvrez l\'histoire, les valeurs et l\'équipe de Gergom Events, spécialiste en sonorisation, éclairage et matériel événementiel.',
}

export default function AboutPage() {
    return (
        <main className="bg-white">
            {/* Bannière d'introduction avec parallaxe */}
            <AboutHero />

            {/* Histoire et valeurs */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h1 className="text-4xl font-bold mb-6 text-gray-800">Notre histoire</h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Depuis 2008, Gergom Events s'est imposé comme un acteur incontournable
                            de l'événementiel technique en région PACA, au service des professionnels,
                            des institutionnels et des particuliers.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Fondée par Gérald Gomez, passionné de technique événementielle et d'expériences
                            immersives, notre entreprise a su évoluer en restant fidèle à sa vision :
                            mettre l'expertise technique au service de l'émotion et de la créativité.
                        </p>
                    </div>

                    {/* Timeline d'histoire */}
                    <HistoryTimeline />
                </div>
            </section>

            {/* Valeurs */}
            <ValuesSection />

            {/* Notre équipe */}
            <TeamSection />

            {/* Zone d'intervention */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl font-bold mb-6 text-gray-800">Notre zone d'intervention</h2>
                            <p className="text-gray-600 mb-6">
                                Basés à Salon-de-Provence, nous intervenons principalement dans toute la région PACA :
                            </p>
                            <ul className="space-y-3 text-gray-600 mb-8">
                                <li className="flex items-start">
                                    <span className="text-red-600 mr-2">•</span>
                                    <span><strong>Bouches-du-Rhône</strong> : Salon-de-Provence, Aix-en-Provence, Marseille, Arles...</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-600 mr-2">•</span>
                                    <span><strong>Vaucluse</strong> : Avignon, Cavaillon, Orange...</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-600 mr-2">•</span>
                                    <span><strong>Var</strong> : Toulon, Saint-Tropez, Hyères...</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-600 mr-2">•</span>
                                    <span><strong>Alpes-Maritimes</strong> : Nice, Cannes, Antibes...</span>
                                </li>
                            </ul>
                            <p className="text-gray-600">
                                Nous sommes également en mesure d'intervenir au-delà de ces frontières pour des événements spécifiques.
                                N'hésitez pas à nous consulter, quel que soit le lieu de votre événement.
                            </p>
                        </div>

                        {/* Carte de couverture */}
                        <div className="w-full md:w-1/2">
                            <CoverageMap />
                        </div>
                    </div>
                </div>
            </section>

            {/* Nos clients */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Ils nous font confiance</h2>
                    <ClientsSlider />

                    <div className="mt-14 max-w-3xl mx-auto text-center">
                        <p className="text-gray-600 mb-8">
                            Plus de 1000 clients nous ont fait confiance au fil des années, des institutions locales
                            aux entreprises internationales, en passant par des particuliers exigeants. Chaque événement
                            est pour nous l'occasion de créer de nouvelles relations durables basées sur la satisfaction
                            et la confiance.
                        </p>
                        <Link href="/realisations" className="inline-flex items-center text-red-600 font-medium hover:text-red-700">
                            Découvrir nos réalisations
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-10 text-gray-800">Nos certifications</h2>

                    <div className="flex flex-wrap justify-center gap-8 mb-10">
                        <div className="bg-white p-6 rounded-lg shadow-sm w-64 flex flex-col items-center">
                            <Image
                                src="/images/about/certification1.svg"
                                alt="Certification sécurité"
                                width={80}
                                height={80}
                                className="mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-2">Sécurité ERP</h3>
                            <p className="text-sm text-gray-600">Certification pour les établissements recevant du public</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm w-64 flex flex-col items-center">
                            <Image
                                src="/images/about/certification2.svg"
                                alt="Certification qualité"
                                width={80}
                                height={80}
                                className="mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-2">ISO 9001</h3>
                            <p className="text-sm text-gray-600">Management de la qualité et satisfaction client</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm w-64 flex flex-col items-center">
                            <Image
                                src="/images/about/certification3.svg"
                                alt="Certification environnement"
                                width={80}
                                height={80}
                                className="mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-2">Éco-responsable</h3>
                            <p className="text-sm text-gray-600">Engagement pour des événements à impact environnemental réduit</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <ContactCTA
                title="Prêt à donner vie à votre projet ?"
                description="Notre équipe d'experts est à votre disposition pour vous accompagner dans la réalisation de votre événement."
                buttonText="Contactez-nous"
                bgColor="#FF0000"
            />
        </main>
    )
}