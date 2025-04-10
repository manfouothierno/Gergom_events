// src/app/(main)/nos-prestations/[slug]/page.tsx
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RelatedPosts from '@/components/blog/RelatedPosts'
import ShareButtons from '@/components/blog/ShareButtons'

// Fonction pour simuler la récupération d'un article par son slug
function getPostBySlug(slug) {
    // Dans une application réelle, cette donnée viendrait d'une API ou d'une base de données
    return {
        title: 'Séminaire annuel pour Montaner Pietrini',
        slug: 'seminaire-montaner-pietrini',
        category: 'corporate',
        categoryName: 'Entreprise',
        date: '12 février 2025',
        author: 'Équipe Gergom Events',
        image: '/images/nos-prestations/seminaire-entreprise.jpg',
        content: `
      <p>L'organisation du séminaire annuel est un moment clé pour toute entreprise. C'est l'occasion de renforcer la cohésion d'équipe, de faire le point sur les réalisations passées et de se projeter dans l'avenir. Pour Montaner Pietrini, l'un des leaders dans le secteur du BTP en région PACA, ce moment se devait d'être à la hauteur de leurs ambitions.</p>
      
      <h2>Un cadre exceptionnel pour un événement d'exception</h2>
      
      <p>Situé au cœur du Luberon, le Domaine de Fontenille a été choisi pour accueillir les 120 collaborateurs de Montaner Pietrini pendant ces deux jours intenses. Notre mission ? Transformer cet espace déjà magnifique en un lieu parfaitement adapté aux besoins techniques d'un séminaire professionnel de haut niveau.</p>
      
      <figure>
        <img src="/images/blog/detail-seminaire-1.jpg" alt="Salle de conférence équipée" />
        <figcaption>La salle plénière entièrement équipée pour les présentations</figcaption>
      </figure>
      
      <h2>Une solution technique complète</h2>
      
      <p>Nous avons déployé une solution complète pour répondre aux différents besoins de cet événement :</p>
      
      <ul>
        <li><strong>Sonorisation</strong> : Système Line Array compact pour la salle plénière, assurant une couverture sonore homogène pour tous les participants.</li>
        <li><strong>Vidéoprojection</strong> : Vidéoprojecteur laser 7000 lumens avec écran 5×3m pour une visibilité optimale des présentations.</li>
        <li><strong>Éclairage</strong> : Mise en lumière de la salle adaptée aux différents moments de la journée (conférences, ateliers, soirée).</li>
        <li><strong>Captation vidéo</strong> : Enregistrement multicaméra des interventions principales pour diffusion interne ultérieure.</li>
        <li><strong>Support technique</strong> : Une équipe de 3 techniciens présents en permanence pour assurer le bon déroulement de l'événement.</li>
      </ul>
      
      <p>Pour la soirée de gala qui clôturait la première journée, nous avons transformé la salle de réception avec un éclairage d'ambiance aux couleurs de l'entreprise et un système audio adapté à la soirée dansante qui a suivi le dîner.</p>
      
      <figure>
        <img src="/images/blog/detail-seminaire-2.jpg" alt="Soirée de gala" />
        <figcaption>La salle de réception transformée pour la soirée de gala</figcaption>
      </figure>
      
      <h2>Les défis relevés</h2>
      
      <p>L'organisation d'un tel événement ne va pas sans quelques défis. Le principal était d'assurer une transition fluide entre les différentes configurations de la journée : de la salle plénière aux salles d'ateliers, puis à la configuration soirée. Grâce à une préparation minutieuse et à notre expérience, ces transitions se sont déroulées sans accroc, permettant aux participants de profiter pleinement de leur séminaire.</p>
      
      <p>Le second défi concernait la captation vidéo des interventions, qui nécessitait une discrétion absolue pour ne pas perturber les échanges, tout en garantissant une qualité professionnelle. Notre équipe a su se faire oublier tout en produisant un contenu de grande qualité qui servira à la communication interne de l'entreprise.</p>
      
      <h2>Un succès partagé</h2>
      
      <blockquote>
        "L'équipe de Gergom Events a parfaitement compris nos besoins et y a répondu avec professionnalisme. La qualité technique était irréprochable et leur présence discrète mais efficace a contribué au succès de notre séminaire annuel."
        <cite>- Thomas Durand, Directeur Marketing, Montaner Pietrini</cite>
      </blockquote>
      
      <p>Ce séminaire illustre parfaitement notre philosophie : proposer des solutions techniques sur mesure qui s'adaptent aux besoins spécifiques de chaque client, en privilégiant la qualité et la discrétion de notre intervention.</p>
      
      <p>Vous souhaitez organiser un séminaire d'entreprise et bénéficier de notre expertise ? N'hésitez pas à <a href="/contact">nous contacter</a> pour discuter de votre projet.</p>
    `,
        relatedPosts: [
            {
                id: 4,
                title: 'Soirée de gala annuelle pour CCI Aix',
                slug: 'soiree-gala-cci-aix',
                image: '/images/nos-prestations/soiree-entreprise.jpg',
                category: 'Entreprise'
            },
            {
                id: 6,
                title: 'Conférence avec speaker international',
                slug: 'conference-speaker-international',
                image: '/images/nos-prestations/conference-speaker.jpg',
                category: 'Entreprise'
            },
            {
                id: 11,
                title: 'Lancement de la nouvelle gamme Renault',
                slug: 'lancement-gamme-renault',
                image: '/images/nos-prestations/lancement-produit.jpg',
                category: 'Entreprise'
            }
        ]
    }
}

export async function generateMetadata({ params }) {
    const post = getPostBySlug(params.slug)

    return {
        title: `${post.title} | Gergom Events`,
        description: `Découvrez notre prestation pour ${post.title}. Solutions techniques professionnelles pour événements en région PACA.`,
    }
}

export default function BlogPostPage({ params }) {
    const post = getPostBySlug(params.slug)

    return (
        <main className="bg-white">
            {/* Bannière de l'article */}
            <section className="relative h-[400px] md:h-[500px] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
                </div>

                <div className="container mx-auto px-4 h-full relative z-10">
                    <div className="flex flex-col justify-end h-full pb-12">
                        <div
                            className="inline-block bg-[#006400] text-white text-sm px-3 py-1 rounded-full mb-4"
                        >
                            {post.categoryName}
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            {post.title}
                        </h1>

                        <div className="flex items-center text-white/90">
                            <span>Par {post.author}</span>
                            <span className="mx-3">•</span>
                            <span>{post.date}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contenu de l'article */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Article principal */}
                        <div className="lg:col-span-8">
                            <article className="prose lg:prose-lg max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </article>

                            {/* Tags */}
                            <div className="mt-10 pt-6 border-t border-gray-100">
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Séminaire</span>
                                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Entreprise</span>
                                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Sonorisation</span>
                                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Vidéoprojection</span>
                                </div>
                            </div>

                            {/* Partage sur réseaux sociaux */}
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">Partager cet article</h3>
                                <ShareButtons url={`https://gergom-events.fr/nos-prestations/${post.slug}`} title={post.title} />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4">
                            {/* Carte de l'auteur */}
                            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                                        <Image
                                            src="/images/blog/author-avatar.jpg"
                                            alt={post.author}
                                            width={48}
                                            height={48}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{post.author}</h3>
                                        <p className="text-gray-600 text-sm">Expert technique événementiel</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Notre équipe d'experts techniques partage son expérience et ses conseils pour réussir vos événements en PACA.
                                </p>
                            </div>

                            {/* Articles associés */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-xl font-bold mb-6 text-gray-800">Articles similaires</h3>
                                <RelatedPosts posts={post.relatedPosts} />
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#006400] py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                        Vous souhaitez organiser un événement similaire ?
                    </h2>
                    <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                        Notre équipe est à votre disposition pour étudier votre projet et vous proposer une solution technique adaptée.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-white px-8 py-3 rounded-lg text-[#006400] font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Demander un devis
                    </Link>
                </div>
            </section>
        </main>
    )
}