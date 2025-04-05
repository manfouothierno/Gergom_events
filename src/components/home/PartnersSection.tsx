// src/components/home/PartnersSection.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'

// Données des partenaires
const partners = [
    {
        id: 1,
        name: 'RCT - Rugby Club Toulonnais',
        logo: '/images/partners/rct-logo.png'
    },
    {
        id: 2,
        name: 'PAUC Hand Aix',
        logo: '/images/partners/pauc-logo.png'
    },
    {
        id: 3,
        name: 'Istres Handball',
        logo: '/images/partners/istres-logo.png'
    },
    {
        id: 4,
        name: 'CCI 13',
        logo: '/images/partners/cci13-logo.png'
    },
    {
        id: 5,
        name: 'Mairie de Fos Sur Mer',
        logo: '/images/partners/fos-logo.png'
    },
    {
        id: 6,
        name: 'Mairie de Lançon de Provence',
        logo: '/images/partners/lancon-logo.png'
    },
    {
        id: 7,
        name: 'Mairie de Grans',
        logo: '/images/partners/grans-logo.png'
    },
    {
        id: 8,
        name: 'Montaner Pietrini',
        logo: '/images/partners/montaner-logo.png'
    },
    {
        id: 9,
        name: 'Le Fût à Mesure',
        logo: '/images/partners/fut-logo.png'
    },
    {
        id: 10,
        name: 'My Beers',
        logo: '/images/partners/mybeers-logo.png'
    }
]

// Données des témoignages
const testimonials = [
    {
        id: 1,
        name: 'Marie Laurent',
        company: 'Responsable Événementiel, CCI 13',
        content: 'Nous faisons appel à Gergom Events depuis plus de 5 ans pour nos événements professionnels. Leur expertise technique et leur réactivité sont toujours au rendez-vous, même pour les demandes de dernière minute.',
        rating: 5,
        image: '/images/testimonials/testimonial1.jpg'
    },
    {
        id: 2,
        name: 'Thomas Durand',
        company: 'Directeur Commercial, Montaner Pietrini',
        content: 'L\'équipe de Gergom a su transformer notre lancement de produit en un véritable spectacle. La qualité du son et des éclairages a été remarquée par tous nos invités. Un grand professionnalisme.',
        rating: 5,
        image: '/images/testimonials/testimonial2.jpg'
    },
    {
        id: 3,
        name: 'Sophie et Jean Moreau',
        company: 'Mariage à Salon-de-Provence',
        content: 'Notre soirée de mariage a été magique grâce à Gergom Events. Les jeux de lumières, la sonorisations et les effets spéciaux ont créé une ambiance féerique. Nous recommandons chaudement !',
        rating: 5,
        image: '/images/testimonials/testimonial3.jpg'
    },
    {
        id: 4,
        name: 'Philippe Neri',
        company: 'Adjoint à la Culture, Mairie de Grans',
        content: 'La collaboration avec Gergom Events pour nos événements culturels est toujours un succès. Leur maîtrise technique et leur capacité d\'adaptation font d\'eux un partenaire de confiance.',
        rating: 4,
        image: '/images/testimonials/testimonial4.jpg'
    }
]

// Composant pour afficher les étoiles de notation
const RatingStars = ({ rating }) => {
    return (
        <div className="flex text-yellow-400 mb-3">
            {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`${i < rating ? 'opacity-100' : 'opacity-30'} mr-1`} />
            ))}
        </div>
    )
}

const PartnersSection = () => {
    const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)

    // Animation automatique des témoignages
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length)
        }, 8000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* En-tête de section */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Ils Nous Font Confiance</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        Plus de 1000 clients nous ont fait confiance pour leurs événements.
                        Découvrez quelques-unes de nos collaborations marquantes.
                    </p>
                </motion.div>

                {/* Slider de logos partenaires */}
                {/*<motion.div*/}
                {/*    initial={{ opacity: 0 }}*/}
                {/*    whileInView={{ opacity: 1 }}*/}
                {/*    viewport={{ once: true }}*/}
                {/*    transition={{ duration: 0.8 }}*/}
                {/*    className="mb-16"*/}
                {/*>*/}
                {/*    <Swiper*/}
                {/*        modules={[Autoplay]}*/}
                {/*        spaceBetween={30}*/}
                {/*        slidesPerView={2}*/}
                {/*        breakpoints={{*/}
                {/*            640: { slidesPerView: 3 },*/}
                {/*            768: { slidesPerView: 4 },*/}
                {/*            1024: { slidesPerView: 5 }*/}
                {/*        }}*/}
                {/*        autoplay={{ delay: 2000, disableOnInteraction: false }}*/}
                {/*        loop={true}*/}
                {/*        className="py-4"*/}
                {/*    >*/}
                {/*        {partners.map((partner) => (*/}
                {/*            <SwiperSlide key={partner.id} className="flex justify-center">*/}
                {/*                <motion.div*/}
                {/*                    className="h-24 w-32 md:h-28 md:w-40 relative flex items-center justify-center p-4 bg-white rounded-lg shadow-sm"*/}
                {/*                    whileHover={{ y: -5 }}*/}
                {/*                    transition={{ duration: 0.3 }}*/}
                {/*                >*/}
                {/*                    <Image*/}
                {/*                        src={partner.logo}*/}
                {/*                        alt={partner.name}*/}
                {/*                        fill*/}
                {/*                        className="object-contain p-3 filter grayscale transition-all duration-300 hover:grayscale-0 hover:scale-110"*/}
                {/*                    />*/}
                {/*                </motion.div>*/}
                {/*            </SwiperSlide>*/}
                {/*        ))}*/}
                {/*    </Swiper>*/}
                {/*</motion.div>*/}

                {/* Section témoignages */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h3 className="text-2xl font-semibold text-center mb-10 text-gray-800">
                        Ce que disent nos clients
                    </h3>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Témoignages avec transition */}
                        <div className="overflow-hidden">
                            <div className="relative h-[360px] md:h-[300px]">
                                {testimonials.map((testimonial, index) => (
                                    <motion.div
                                        key={testimonial.id}
                                        className="absolute inset-0 flex flex-col md:flex-row items-center bg-white rounded-xl shadow-lg overflow-hidden transition-all"
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{
                                            opacity: index === activeTestimonialIndex ? 1 : 0,
                                            x: index === activeTestimonialIndex ? 0 : 100,
                                            pointerEvents: index === activeTestimonialIndex ? 'auto' : 'none'
                                        }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <div className="relative h-32 md:h-full md:w-1/3 w-full overflow-hidden">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-6 md:p-8 md:w-2/3">
                                            <FaQuoteLeft className="text-red-600 opacity-20 text-4xl absolute top-6 right-6" />
                                            <RatingStars rating={testimonial.rating} />
                                            <p className="text-gray-700 mb-4 italic">
                                                "{testimonial.content}"
                                            </p>
                                            <div className="mt-4">
                                                <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                                                <p className="text-gray-600 text-sm">{testimonial.company}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Indicateurs et navigation */}
                        <div className="flex justify-center mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTestimonialIndex(index)}
                                    className={`w-3 h-3 mx-1 rounded-full transition-all ${
                                        activeTestimonialIndex === index
                                            ? 'bg-red-600 w-6'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                    aria-label={`Témoignage ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default PartnersSection