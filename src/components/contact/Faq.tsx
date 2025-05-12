// src/components/contact/Faq.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Questions fréquentes
const faqs = [
    {
        question: 'Comment obtenir un devis pour mon événement ?',
        answer: 'Pour obtenir un devis personnalisé, vous pouvez remplir notre formulaire de contact en précisant la date, le lieu et la nature de votre événement. Vous pouvez également nous appeler directement au 06 19 53 70 90. Nous vous répondrons sous 24 à 48 heures ouvrées avec une proposition détaillée.'
    },
    {
        question: 'Quel délai prévoir pour réserver votre matériel ?',
        answer: 'Les délais de réservation varient selon la période et le type de matériel. Nous recommandons de réserver au moins 2 à 3 mois à l\'avance. Pour le reste de l\'année, pour la garantie d\'avoir le matériel disponible à la location merci de prévoir un délai de 48h minimum.'
    },
    {
        question: 'Proposez-vous une visite technique préalable à l\'événement ?',
        answer: 'Oui, pour les événements d\'importance, nous proposons systématiquement une visite technique préalable afin d\'évaluer les contraintes du lieu et optimiser notre prestation. Cette visite est généralement incluse dans le devis pour les projets dépassant un certain montant.'
    },
    {
        question: 'Comment se déroule la livraison et l\'installation du matériel ?',
        answer: 'Notre équipe se charge de la livraison, l\'installation et la configuration de tout le matériel. Nous convenons ensemble d\'un horaire d\'arrivée permettant une mise en place sereine avant le début de votre événement. À la fin, nous nous occupons également du démontage et de la récupération de l\'ensemble du matériel.'
    },
    {
        question: 'Que se passe-t-il en cas de panne pendant l\'événement ?',
        answer: 'Notre matériel est systématiquement vérifié avant chaque location. Néanmoins, en cas de problème technique pendant votre événement, un technicien d\'astreinte est toujours disponible et peut intervenir rapidement. Pour les événements importants, un technicien reste généralement sur place pendant toute la durée de la prestation. L\'installation et la configuration de tout le matériel selon les termes du devis'
    }
]

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null)

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <motion.div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="flex justify-between items-center w-full px-6 py-4 text-left bg-white focus:outline-none"
                    >
                        <span className="font-medium text-gray-800">{faq.question}</span>
                        <span className={`transition-transform duration-300 transform ${openIndex === index ? 'rotate-180' : ''}`}>
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
                    </button>

                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 pb-4 text-gray-600">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    )
}