// src/components/home/GoogleReviewsSection.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaGoogle, FaExternalLinkAlt } from 'react-icons/fa'

// Données simulées d'avis Google (à remplacer par l'intégration API réelle)
const googleReviews = [
    {
        id: 1,
        author: 'Alexandre Martin',
        rating: 5,
        text: 'Excellent prestataire pour notre soirée d\'entreprise ! Matériel de qualité, équipe réactive et professionnelle. Je recommande vivement Gergom Events pour tous vos événements.',
        date: '1 mois',
        avatar: '/images/reviews/avatar1.jpg'
    },
    {
        id: 2,
        author: 'Émilie Dubois',
        rating: 5,
        text: 'Nous avons fait appel à Gergom Events pour notre mariage et nous ne regrettons absolument pas ce choix. Éclairage parfait, son impeccable et équipe à l\'écoute. Merci !',
        date: '2 mois',
        avatar: '/images/reviews/avatar2.jpg'
    },
    {
        id: 3,
        author: 'Julien Blanc',
        rating: 4,
        text: 'Très bonne prestation pour notre séminaire d\'entreprise. Matériel de qualité et installation rapide. Un petit bémol sur la réactivité des échanges en amont, mais sinon parfait.',
        date: '3 mois',
        avatar: '/images/reviews/avatar3.jpg'
    },
    {
        id: 4,
        author: 'Sophia Leroy',
        rating: 5,
        text: 'Je recommande à 100% ! Notre festival a été une réussite grâce à Gergom Events. Sonorisation parfaite, éclairage spectaculaire et équipe super sympa.',
        date: '1 mois',
        avatar: '/images/reviews/avatar4.jpg'
    },
    {
        id: 5,
        author: 'Pierre Gauthier',
        rating: 5,
        text: 'Ça fait 3 ans que nous travaillons avec Gergom pour nos événements et c\'est toujours un plaisir. Professionnalisme, qualité et bonne humeur sont au rendez-vous.',
        date: '2 semaines',
        avatar: '/images/reviews/avatar5.jpg'
    }
]

// Calcul de la note moyenne
const averageRating = googleReviews.reduce((acc, review) => acc + review.rating, 0) / googleReviews.length
const totalReviews = googleReviews.length

// Composant pour afficher les étoiles de notation
const RatingStars = ({ rating }) => {
    return (
        <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`${i < rating ? 'opacity-100' : 'opacity-30'} mr-0.5`} />
            ))}
        </div>
    )
}

const GoogleReviewsSection = () => {
    const [visibleReviews, setVisibleReviews] = useState(3)
    const [isViewAll, setIsViewAll] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setVisibleReviews(isViewAll ? googleReviews.length : 3)
            } else if (window.innerWidth >= 768) {
                setVisibleReviews(isViewAll ? googleReviews.length : 2)
            } else {
                setVisibleReviews(isViewAll ? googleReviews.length : 1)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [isViewAll])

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                {/* En-tête de section */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center mb-6">
                        <FaGoogle className="text-4xl text-blue-500 mr-3" />
                        <h2 className="text-3xl font-bold text-gray-800">Avis Google</h2>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                        <div className="flex items-center">
                            <span className="text-5xl font-bold text-gray-800 mr-3">{averageRating.toFixed(1)}</span>
                            <div>
                                <RatingStars rating={Math.round(averageRating)} />
                                <span className="text-gray-600 text-sm">{totalReviews} avis</span>
                            </div>
                        </div>

                        <a
                            href="https://g.page/r/gergom-events/review"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                            <FaStar className="mr-2" />
                            Laisser un avis
                            <FaExternalLinkAlt className="ml-2 text-xs" />
                        </a>
                    </div>
                </motion.div>

                {/* Grille des avis */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {googleReviews.slice(0, visibleReviews).map((review, index) => (
                        <motion.div
                            key={review.id}
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="flex items-start mb-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                                    <img
                                        src={review.avatar}
                                        alt={review.author}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">{review.author}</h4>
                                    <div className="flex items-center">
                                        <RatingStars rating={review.rating} />
                                        <span className="text-gray-500 text-sm ml-2">Il y a {review.date}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-4 flex-grow">
                                "{review.text}"
                            </p>

                            <div className="flex items-center text-xs text-gray-500 mt-2">
                                <FaGoogle className="mr-1" />
                                <span>Publié sur Google</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bouton "Voir plus" */}
                {googleReviews.length > visibleReviews && (
                    <motion.div
                        className="text-center mt-10"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <button
                            onClick={() => setIsViewAll(!isViewAll)}
                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            {isViewAll ? 'Voir moins d\'avis' : 'Voir tous les avis'}
                        </button>
                    </motion.div>
                )}

                {/* Bannière d'avis */}
                <motion.div
                    className="bg-blue-50 rounded-lg p-6 mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        Votre avis compte pour nous !
                    </h3>
                    <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
                        Vous avez fait appel à nos services ? Partagez votre expérience et aidez-nous à nous améliorer.
                        Votre témoignage est précieux pour notre équipe et les futurs clients.
                    </p>
                    <a
                        href="https://g.page/r/gergom-events/review"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm"
                    >
                        <FaStar className="mr-2" />
                        Laisser un avis Google
                        <FaExternalLinkAlt className="ml-2 text-xs" />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

export default GoogleReviewsSection