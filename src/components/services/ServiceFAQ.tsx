// src/components/services/ServiceFAQ.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQItem } from '@/types/services'
import { FaChevronDown } from 'react-icons/fa'
import { PortableText } from '@portabletext/react'

interface ServiceFAQProps {
    questions: FAQItem[];
    color: string;
}

const ServiceFAQ = ({ questions, color }: ServiceFAQProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0)

    const toggleQuestion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Questions fréquentes</h2>

                <div className="max-w-3xl mx-auto space-y-4">
                    {questions.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-xl overflow-hidden"
                            style={{ borderLeft: activeIndex === index ? `4px solid ${color}` : '4px solid transparent' }}
                        >
                            <button
                                className="flex justify-between items-center w-full p-5 text-left"
                                onClick={() => toggleQuestion(index)}
                            >
                                <h3 className="text-lg font-bold text-gray-800">{faq.question}</h3>
                                <motion.div
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ color: activeIndex === index ? color : '#666' }}
                                >
                                    <FaChevronDown />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-5 pt-0 text-gray-600">
                                            <PortableText value={faq.answer} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServiceFAQ