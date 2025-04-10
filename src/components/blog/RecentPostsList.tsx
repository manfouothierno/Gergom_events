// src/components/nos-prestations/RecentPostsList.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'

// Articles récents (simplifiés)
const recentPosts = [
    {
        id: 1,
        title: 'Spectacle humoristique "Greg Empêche Moi"',
        slug: 'spectacle-greg-empeche-moi',
        date: '7 février 2025',
        image: '/images/nos-prestations/spectacle-humoristique.jpg'
    },
    {
        id: 2,
        title: 'Séminaire annuel pour Montaner Pietrini',
        slug: 'seminaire-montaner-pietrini',
        date: '12 février 2025',
        image: '/images/nos-prestations/seminaire-entreprise.jpg'
    },
    {
        id: 3,
        title: 'Soirée privée 40 ans au Domaine de la Rose',
        slug: 'soiree-privee-40-ans',
        date: '5 février 2025',
        image: '/images/nos-prestations/soiree-privee.jpg'
    },
    {
        id: 4,
        title: 'Conférence avec speaker international',
        slug: 'conference-speaker-international',
        date: '3 février 2025',
        image: '/images/nos-prestations/conference-speaker.jpg'
    }
]

export default function RecentPostsList() {
    return (
        <div className="space-y-4">
            {recentPosts.map((post) => (
                <Link key={post.id} href={`/nos-prestations/${post.slug}`}>
                    <div className="flex items-start hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="ml-3">
                            <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{post.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}