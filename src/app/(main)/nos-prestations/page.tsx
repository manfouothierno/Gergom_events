// src/app/(main)/nos-prestations/page.tsx
import React, {Suspense} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BlogHeader from '@/components/blog/BlogHeader'
import CategoryTabs from '@/components/blog/CategoryTabs'
import PostGrid from '@/components/blog/PostGrid'
import FeaturedPost from '@/components/blog/FeaturedPost'
import RecentPostsList from '@/components/blog/RecentPostsList'

export const metadata = {
    title: 'Nos Prestations | Gergom Events',
    description: 'Découvrez nos prestations événementielles en région PACA : mariages, séminaires d\'entreprise, événements sportifs, soirées privées et plus encore.',
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
// Composant de chargement pour Suspense
function LoadingUI() {
    return <div className="p-4 text-center">Chargement...</div>
}

export default function BlogPage() {
    return (
        <main className="bg-white">
            {/* En-tête du nos-prestations */}
            <BlogHeader />

            {/* Post à la une */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <FeaturedPost
                        title="Inauguration du nouveau centre commercial Le Grand Avenue"
                        excerpt="Mise en lumière spectaculaire et sonorisation pour l'inauguration du plus grand centre commercial de la région. Découvrez comment nous avons transformé cet événement corporate en une expérience immersive inoubliable."
                        imageUrl="/images/blog/featured-inauguration.jpg"
                        category="Entreprise"
                        date="15 mars 2025"
                        slug="inauguration-grand-avenue"
                    />
                </div>
            </section>

            {/* Filtres par catégorie */}
            <section className="bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <Suspense fallback={<LoadingUI />}>
                        <CategoryTabs categories={categories} />
                    </Suspense>
                </div>
            </section>

            {/* Grille principale d'articles */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Articles principaux */}
                        <div className="w-full lg:w-2/3">
                            <h2 className="text-2xl font-bold mb-8 text-gray-800">Nos dernières réalisations</h2>
                            <Suspense fallback={<LoadingUI />}>
                                <PostGrid />
                            </Suspense>
                        </div>

                        {/* Sidebar */}
                        <div className="w-full lg:w-1/3">
                            {/* Articles récents */}
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                                <h3 className="text-xl font-bold mb-6 text-gray-800">Articles récents</h3>
                                <RecentPostsList />
                            </div>

                            {/* Catégories populaires */}
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                                <h3 className="text-xl font-bold mb-6 text-gray-800">Catégories populaires</h3>
                                <ul className="space-y-3">
                                    {categories.filter(cat => cat.id !== 'all').map((category) => (
                                        <li key={category.id}>
                                            <Link
                                                href={`/nos-prestations/categorie/${category.id}`}
                                                className="flex items-center justify-between hover:text-[#006400] transition-colors"
                                            >
                                                <span>{category.name}</span>
                                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {category.id === 'corporate' ? '12' :
                              category.id === 'wedding' ? '8' :
                                  category.id === 'private' ? '6' :
                                      category.id === 'sport' ? '4' :
                                          category.id === 'institutional' ? '7' :
                                              category.id === 'show' ? '3' : '0'}
                        </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Newsletter */}
                            <div className="bg-[#006400] rounded-lg shadow-sm p-6 text-white">
                                <h3 className="text-xl font-bold mb-4">Restez informé</h3>
                                <p className="mb-4 text-white/90">
                                    Recevez nos dernières réalisations et conseils pour vos événements.
                                </p>
                                <form className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Votre email"
                                        className="w-full px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#006400]"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-white text-[#006400] font-medium py-2 rounded-md hover:bg-gray-100 transition-colors"
                                    >
                                        S'abonner
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}