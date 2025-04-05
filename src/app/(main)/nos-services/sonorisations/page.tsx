// src/app/(main)/nos-services/sonorisations/page.tsx
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CategoryHeader from '@/components/services/CategoryHeader'
import ProductFilters from '@/components/services/ProductFilters'
import ProductCard from '@/components/services/ProductCard'
import { FaMicrophone, FaHeadphones, FaChartLine, FaUsers } from 'react-icons/fa'

// Données des sous-catégories pour le filtre
const subcategories = [
    { id: 'all', name: 'Tous les produits' },
    { id: 'enceintes', name: 'Enceintes' },
    { id: 'caissons', name: 'Caissons de basse' },
    { id: 'packs-son', name: 'Packs son' },
    { id: 'micros', name: 'Micros' },
    { id: 'tables-mixage', name: 'Tables de mixage' },
    { id: 'platines', name: 'Platines & Contrôleurs' }
];

// Données des produits
const products = [
    {
        id: 1,
        name: 'JBL EON615',
        category: 'enceintes',
        image: '/images/products/sonorisations/enceinte-jbl-eon615.jpg',
        isAvailableForRent: true,
        isAvailableForSale: true,
        price: 'À partir de 60€/jour',
        description: `Enceinte active 15" 1000W avec DSP intégré, idéale pour tous types d'événements.`,
        specs: ['1000W', 'Bluetooth', 'DSP intégré', '15"']
    },
    {
        id: 2,
        name: 'Système Line Array Compact',
        category: 'packs-son',
        image: '/images/products/sonorisations/line-array-compact.jpg',
        isAvailableForRent: true,
        isAvailableForSale: false,
        price: 'À partir de 250€/jour',
        description: 'Système Line Array compact haute performance pour événements de moyenne envergure.',
        specs: ['4000W', 'Portée 30m', 'Subwoofer 18"', 'Processeur inclus']
    },
    {
        id: 3,
        name: 'Shure SM58',
        category: 'micros',
        image: '/images/products/sonorisations/micro-shure-sm58.jpg',
        isAvailableForRent: true,
        isAvailableForSale: true,
        price: 'À partir de 15€/jour',
        description: 'Micro vocal dynamique de référence, robuste et polyvalent.',
        specs: ['Dynamique', 'Directionnel', 'XLR', 'Anti-pop intégré']
    },
    {
        id: 4,
        name: 'Yamaha MG16XU',
        category: 'tables-mixage',
        image: '/images/products/sonorisations/table-yamaha-mg16xu.jpg',
        isAvailableForRent: true,
        isAvailableForSale: true,
        price: 'À partir de 45€/jour',
        description: 'Console de mixage 16 canaux avec effets et interface USB pour enregistrement.',
        specs: ['16 canaux', 'Préamplis D-PRE', 'Interface USB', 'Effets SPX']
    },
    {
        id: 5,
        name: 'Pioneer CDJ-3000',
        category: 'platines',
        image: '/images/products/sonorisations/pioneer-cdj-3000.jpg',
        isAvailableForRent: true,
        isAvailableForSale: false,
        price: 'À partir de 90€/jour',
        description: 'Lecteur DJ professionnel de dernière génération pour performances haut de gamme.',
        specs: ['Écran tactile HD', 'Pro DJ Link', '8 hot cues', 'Beat Sync']
    },
    {
        id: 6,
        name: 'QSC K12.2',
        category: 'enceintes',
        image: '/images/products/sonorisations/enceinte-qsc-k12.jpg',
        isAvailableForRent: true,
        isAvailableForSale: true,
        price: 'À partir de 65€/jour',
        description: 'Enceinte active 12" 2000W avec DSP avancé et design robuste.',
        specs: ['2000W', 'DSP avancé', 'Amplificateur classe D', '12"']
    }
];

export const metadata = {
    title: 'Sonorisation professionnelle | Location et vente | Gergom Events',
    description: 'Louez ou achetez du matériel de sonorisations professionnel pour vos événements. Enceintes, micros, tables de mixage de qualité professionnelle en région PACA.',
}

export default function SonorisationPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header de catégorie */}
            <CategoryHeader
                title="DONNEZ DE LA VOIX À VOS AMBITIONS"
                subtitle="Matériel de sonorisation professionnel pour tous vos événements"
                color="#FF0000"
                imagePath="/images/category-headers/sonorisation-banner.jpg"
            />

            {/* Section introduction avec cards d'avantages */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Solutions de sonorisation professionnelles</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            La <span className="text-red-600 font-semibold">sonorisation parfaite</span> est celle qu'on oublie pour ne retenir que l'émotion. Notre équipe d'experts conçoit des architectures sonores sur mesure qui s'adaptent à votre espace et vos objectifs.
                        </p>
                    </div>

                    {/* Avantages en cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                        <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                                <FaMicrophone className="text-red-500 text-xl" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Équipement Premium</h3>
                            <p className="text-gray-600">Des marques reconnues et du matériel régulièrement entretenu pour une qualité sonore irréprochable.</p>
                        </div>

                        <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                                <FaHeadphones className="text-red-500 text-xl" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Expertise technique</h3>
                            <p className="text-gray-600">Notre équipe vous accompagne dans le choix, l'installation et l'optimisation de votre sonorisation.</p>
                        </div>

                        <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                                <FaChartLine className="text-red-500 text-xl" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Performance garantie</h3>
                            <p className="text-gray-600">Des solutions adaptées à tous types d'événements, de la conférence au concert en plein air.</p>
                        </div>

                        <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                                <FaUsers className="text-red-500 text-xl" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Tous publics</h3>
                            <p className="text-gray-600">Solutions pour particuliers, professionnels et institutions avec options de location ou achat.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filtres + Catalogue produits */}
            <section className="pb-20">
                <div className="container mx-auto px-4">
                    {/* Barre de navigation de catégorie */}
                    <ProductFilters categories={subcategories} />

                    {/* Grille des produits */}
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-12 flex justify-center">
                        <div className="inline-flex items-center bg-white rounded-full shadow-sm">
                            <button className="px-4 py-2 text-gray-400 hover:text-gray-600 focus:outline-none" disabled>
                                &laquo; Précédent
                            </button>
                            <span className="w-px h-6 bg-gray-200"></span>
                            <span className="px-4 py-2 text-white bg-red-600 font-medium">1</span>
                            <span className="w-px h-6 bg-gray-200"></span>
                            <button className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                                Suivant &raquo;
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bannière guide sonorisations */}
            <section className="bg-gray-900 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/images/backgrounds/sound-waves.jpg"
                        alt="Sound waves"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Besoin d'aide pour choisir?</h2>
                        <p className="text-lg text-gray-300 mb-8">
                            Téléchargez notre guide gratuit pour sélectionner le matériel de sonorisation adapté à votre événement.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href="/guides/sonorisation.pdf"
                                target="_blank"
                                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg shadow-lg transition-colors font-medium"
                            >
                                Télécharger le guide PDF
                            </a>
                            <Link
                                href="/contact"
                                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg transition-colors font-medium backdrop-blur-sm"
                            >
                                Consulter un expert
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Questions fréquentes</h2>

                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Quel type de sonorisation pour une salle de 100m² ?</h3>
                            <p className="text-gray-600">Pour une salle de 100m² accueillant environ 80 personnes, nous recommandons un système avec deux enceintes actives de 12" (environ 1000W au total) et un petit mixeur. Pour une soirée dansante, ajoutez un caisson de basse pour renforcer les basses fréquences.</p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Quelle est la différence entre location et prestation technique ?</h3>
                            <p className="text-gray-600">La location simple comprend uniquement le matériel. La prestation technique inclut en plus l'installation, le réglage, et la présence d'un technicien pendant votre événement pour garantir un fonctionnement optimal.</p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Proposez-vous des solutions pour les événements en extérieur ?</h3>
                            <p className="text-gray-600">Oui, nous disposons d'équipements spécifiques pour les événements en extérieur : systèmes plus puissants, protection contre les intempéries, et solutions d'alimentation autonomes si nécessaire.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-red-600 to-red-700 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-white">Prêt à donner de la voix à votre événement ?</h2>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                        Nos experts sont à votre disposition pour vous conseiller et vous proposer la solution de sonorisation adaptée à votre projet.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg text-lg"
                        >
                            Demander un devis gratuit
                        </Link>

                        <a href="tel:0619537090"
                        className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors text-lg"
                        >
                        Nous appeler : 06 19 53 70 90
                    </a>
                </div>
            </div>
        </section>
</main>
)
}