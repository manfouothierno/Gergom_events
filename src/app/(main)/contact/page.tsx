// src/app/(main)/contact/page.tsx
import React from 'react'
import Image from 'next/image'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'
import Faq from '@/components/contact/Faq'
import MapSection from '@/components/contact/MapSection'

export const metadata = {
    title: 'Contact | Gergom Events',
    description: 'Contactez notre équipe pour organiser votre événement ou demander un devis personnalisé. Location et vente de matériel événementiel en région PACA.',
}

export default function ContactPage() {
    return (
        <main className="bg-white">
            {/* En-tête avec bannière */}
            <section className="relative h-[300px] md:h-[400px] bg-gray-900 overflow-hidden">
                <Image
                    src="/images/contact/contact-banner.jpg"
                    alt="Contactez Gergom Events"
                    fill
                    priority
                    className="object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
                        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                            Notre équipe est à votre écoute pour répondre à toutes vos questions
                        </p>
                    </div>
                </div>
            </section>

            {/* Section principale avec formulaire et informations */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Formulaire de contact */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Envoyez-nous un message</h2>
                            <ContactForm />
                        </div>

                        {/* Informations de contact */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Nos coordonnées</h2>
                            <ContactInfo />
                        </div>
                    </div>
                </div>
            </section>

            {/* Carte */}
            <MapSection />

            {/* FAQ */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Questions fréquentes</h2>
                    <div className="max-w-3xl mx-auto">
                        <Faq />
                    </div>
                </div>
            </section>

            {/* Nos autres moyens de contact */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Autres moyens de nous contacter</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {/* Service commercial */}
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Image
                                    src="/images/icons/icon-commercial.svg"
                                    alt="Commercial"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Service commercial</h3>
                            <p className="text-gray-600 mb-3">Pour toute demande de devis et information sur nos services</p>
                            <a href="mailto:commercial@gergom-events.fr" className="text-red-600 font-medium hover:text-red-700">
                                commercial@gergom-events.fr
                            </a>
                        </div>

                        {/* Support technique */}
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Image
                                    src="/images/icons/icon-support.svg"
                                    alt="Support"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Support technique</h3>
                            <p className="text-gray-600 mb-3">Pour toute question technique sur nos équipements</p>
                            <a href="mailto:technique@gergom-events.fr" className="text-red-600 font-medium hover:text-red-700">
                                technique@gergom-events.fr
                            </a>
                        </div>

                        {/* Service après-vente */}
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Image
                                    src="/images/icons/icon-sav.svg"
                                    alt="SAV"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Service après-vente</h3>
                            <p className="text-gray-600 mb-3">Pour le suivi de vos commandes et le service après-vente</p>
                            <a href="mailto:sav@gergom-events.fr" className="text-red-600 font-medium hover:text-red-700">
                                sav@gergom-events.fr
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}