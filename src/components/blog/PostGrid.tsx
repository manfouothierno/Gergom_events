// src/components/nos-prestations/PostGrid.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Données des articles du nos-prestations
const blogPosts = [
    {
        id: 1,
        title: 'Séminaire annuel pour Montaner Pietrini',
        slug: 'seminaire-montaner-pietrini',
        category: 'corporate',
        categoryName: 'Entreprise',
        excerpt: 'Installation complète pour le séminaire annuel de Montaner Pietrini : sonorisation, projection et éclairage sur 2 jours.',
        image: '/images/nos-prestations/seminaire-entreprise.jpg',
        date: '12 février 2025'
    },
    {
        id: 2,
        title: 'Cérémonie de commémoration du 11 novembre',
        slug: 'ceremonie-commemoration-11-novembre',
        category: 'institutional',
        categoryName: 'Institutionnel',
        excerpt: 'Sonorisation de la cérémonie officielle de commémoration du 11 novembre pour la Mairie de Salon-de-Provence.',
        image: '/images/nos-prestations/ceremonie-commemoration.jpg',
        date: '11 novembre 2024'
    },
    {
        id: 3,
        title: 'Soirée privée 40 ans au Domaine de la Rose',
        slug: 'soiree-privee-40-ans',
        category: 'private',
        categoryName: 'Soirée privée',
        excerpt: 'Organisation technique complète pour un anniversaire de 40 ans avec DJ, éclairage immersif et effets spéciaux.',
        image: '/images/nos-prestations/soiree-privee.jpg',
        date: '5 février 2025'
    },
    {
        id: 4,
        title: 'Soirée de gala annuelle pour CCI Aix',
        slug: 'soiree-gala-cci-aix',
        category: 'corporate',
        categoryName: 'Entreprise',
        excerpt: 'Équipement son, lumière et vidéo pour la soirée de gala de la CCI d\'Aix-en-Provence au Château La Coste.',
        image: '/images/nos-prestations/soiree-entreprise.jpg',
        date: '20 janvier 2025'
    },
    {
        id: 5,
        title: 'Match de handball PAUC vs PSG',
        slug: 'match-handball-pauc-psg',
        category: 'sport',
        categoryName: 'Événement sportif',
        excerpt: 'Installation sonore et éclairage d\'ambiance pour le match de gala PAUC vs PSG à l\'Arena du Pays d\'Aix.',
        image: '/images/nos-prestations/evenement-sportif.jpg',
        date: '15 décembre 2024'
    },
    {
        id: 6,
        title: 'Conférence avec speaker international',
        slug: 'conference-speaker-international',
        category: 'corporate',
        categoryName: 'Entreprise',
        excerpt: 'Sonorisation et captation vidéo pour une conférence avec traduction simultanée au Palais des Congrès de Marseille.',
        image: '/images/nos-prestations/conference-speaker.jpg',
        date: '3 février 2025'
    },
    {
        id: 7,
        title: 'Mariage au Château de Richebois',
        slug: 'mariage-chateau-richebois',
        category: 'wedding',
        categoryName: 'Mariage',
        excerpt: 'Organisation technique complète pour un mariage de 150 personnes : cérémonie, cocktail et soirée dansante.',
        image: '/images/nos-prestations/mariage.jpg',
        date: '12 septembre 2024'
    },
    {
        id: 8,
        title: 'Baptême en plein air à Lourmarin',
        slug: 'bapteme-lourmarin',
        category: 'private',
        categoryName: 'Soirée privée',
        excerpt: 'Sonorisation discrète pour une cérémonie de baptême en extérieur, suivie d\'une réception avec ambiance musicale.',
        image: '/images/nos-prestations/bapteme.jpg',
        date: '4 octobre 2024'
    },
    {
        id: 9,
        title: 'Soirée dansante annuelle du Rotary Club',
        slug: 'soiree-dansante-rotary',
        category: 'private',
        categoryName: 'Soirée privée',
        excerpt: 'Équipement complet pour la soirée caritative du Rotary Club avec DJ, effets lumineux et piste de danse.',
        image: '/images/nos-prestations/soiree-dansante.jpg',
        date: '22 novembre 2024'
    }
];

// Suite des articles
const blogPosts2 = [
    {
        id: 10,
        title: 'Afterwork My Beers avec concert live',
        slug: 'afterwork-my-beers',
        category: 'private',
        categoryName: 'Soirée privée',
        excerpt: 'Installation son et lumière pour un afterwork avec concert live dans les locaux de My Beers à Aix-en-Provence.',
        image: '/images/nos-prestations/afterwork.jpg',
        date: '30 janvier 2025'
    },
    {
        id: 11,
        title: 'Lancement de la nouvelle gamme Renault',
        slug: 'lancement-gamme-renault',
        category: 'corporate',
        categoryName: 'Entreprise',
        excerpt: 'Mise en scène technique pour le lancement presse de la nouvelle gamme Renault au Garage Central de Salon.',
        image: '/images/nos-prestations/lancement-produit.jpg',
        date: '25 janvier 2025'
    },
    {
        id: 12,
        title: 'Inauguration de la boutique Sephora',
        slug: 'inauguration-boutique-sephora',
        category: 'corporate',
        categoryName: 'Entreprise',
        excerpt: 'Mise en lumière et sonorisation pour l\'inauguration de la nouvelle boutique Sephora au centre commercial Val de Durance.',
        image: '/images/nos-prestations/inauguration-magasin.jpg',
        date: '18 janvier 2025'
    },
    {
        id: 13,
        title: 'Cérémonie des vœux de la Mairie de Lançon',
        slug: 'ceremonie-voeux-lancon',
        category: 'institutional',
        categoryName: 'Institutionnel',
        excerpt: 'Équipement audiovisuel complet pour la cérémonie des vœux du maire de Lançon-de-Provence à la population.',
        image: '/images/nos-prestations/ceremonie-voeux.jpg',
        date: '10 janvier 2025'
    },
    {
        id: 14,
        title: 'Spectacle humoristique "Greg Empêche Moi"',
        slug: 'spectacle-greg-empeche-moi',
        category: 'show',
        categoryName: 'Spectacle',
        excerpt: 'Installation technique complète pour le one-man-show de Greg "Empêche Moi" à l\'auditorium de Salon-de-Provence.',
        image: '/images/nos-prestations/spectacle-humoristique.jpg',
        date: '7 février 2025'
    }
];

// Tous les articles combinés
const allPosts = [...blogPosts, ...blogPosts2];

export default function PostGrid() {
    const searchParams = useSearchParams()
    const categoryFilter = searchParams.get('categorie') || 'all'
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (categoryFilter === 'all') {
            setPosts(allPosts)
        } else {
            setPosts(allPosts.filter(post => post.category === categoryFilter))
        }
    }, [categoryFilter])

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    if (posts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Aucun article trouvé dans cette catégorie.</p>
            </div>
        )
    }

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {posts.map((post) => (
                <motion.article
                    key={post.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    variants={item}
                >
                    <Link href={`/nos-prestations/${post.slug}`}>
                        <div className="relative h-48">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-3 left-3 bg-[#006400] text-white text-xs px-2 py-1 rounded-full">
                                {post.categoryName}
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="text-gray-500 text-sm mb-2">{post.date}</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{post.title}</h3>
                            <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                            <div className="mt-4 text-[#006400] font-medium hover:underline inline-flex items-center">
                                Lire la suite
                                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                </motion.article>
            ))}
        </motion.div>
    )
}