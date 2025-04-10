// src/app/(main)/nos-prestations/categorie/[category]/page.tsx
import React from 'react'
import Link from 'next/link'
import CategoryTabs from '@/components/blog/CategoryTabs'
import PostGrid from '@/components/blog/PostGrid'

// Mapping des catégories
const categoryMap = {
    'corporate': 'Entreprise',
    'wedding': 'Mariage',
    'private': 'Soirée privée',
    'sport': 'Événement sportif',
    'institutional': 'Institutionnel',
    'show': 'Spectacle'
}

// Catégories de prestations
const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'corporate', name: 'Entreprise' },
    { id: 'wedding', name: 'Mariage' },
    { id: 'private', name: 'Soirée privée' },
    { id: 'sport', name: 'Événement sportif' },
    { id: 'institutional', name: 'Institutionnel' },
    { id: 'show', name: 'Spectacle' }
]

export async function generateMetadata({ params }) {
    const categoryName = categoryMap[params.category] || 'Événements'

    return {
        title: `${categoryName} | Nos Prestations | Gergom Events`,
        description: `Découvrez nos prestations événementielles pour ${categoryName.toLowerCase()} en région PACA. Solutions techniques professionnelles adaptées à vos besoins.`,
    }
}

export default function CategoryPage({ params }) {
    const categoryName = categoryMap[params.category] || 'Événements'

    return (
        <main className="bg-white">
            {/* En-tête de catégorie */}
            <section className="bg-[#006400] py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute left-0 top-0 w-full h-full bg-white"
                         style={{ backgroundImage: 'url("/images/nos-prestations/pattern.svg")', backgroundSize: '100px' }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{categoryName}</h1>
                        <p className="text-xl text-white/90">
                            Découvrez nos prestations pour {categoryName.toLowerCase()}
                            et laissez-vous inspirer pour votre prochain événement
                        </p>
                    </div>
                </div>
            </section>

            {/* Filtres par catégorie */}
            <section className="bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <CategoryTabs categories={categories} />
                </div>
            </section>

            {/* Articles de la catégorie */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <PostGrid />

                    {/* Pagination */}
                    <div className="mt-12 flex justify-center">
                        <div className="inline-flex rounded-md shadow-sm">
              <span className="px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-l-md">
                Précédent
              </span>
                            <span className="px-4 py-2 text-white bg-[#006400] border border-[#006400]">
                1
              </span>
                            <span className="px-4 py-2 text-gray-700 bg-white border border-gray-300">
                2
              </span>
                            <span className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-r-md">
                Suivant
              </span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}