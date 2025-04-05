// src/components/services/ServicePage.tsx
'use client'

import React from 'react'
import CategoryHeader from '@/components/services/CategoryHeader'
import ServiceIntro from '@/components/services/ServiceIntro'
import ProductFilters from '@/components/services/ProductFilters'
import ProductGrid from '@/components/services/ProductGrid'
import ServiceFAQ from '@/components/services/ServiceFAQ'
import ServiceCTA from '@/components/services/ServiceCTA'
import { ServiceData } from '@/types/services'

interface ServicePageProps {
    service: ServiceData
}

const ServicePage = ({ service }: ServicePageProps) => {
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header de catégorie */}
            <CategoryHeader
                title={service.title}
                subtitle={service.subtitle}
                color={service.color}
                icon={service.icon}
                imagePath={service.bannerImage}
            />

            {/* Introduction au service */}
            <ServiceIntro
                description={service.description}
                features={service.features}
                applications={service.applications}
                color={service.color}
            />

            {/* Filtres et produits */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-8 text-center">Notre matériel de {service.name.toLowerCase()}</h2>

                    {/* Filtres */}
                    <ProductFilters categories={service.subcategories} />

                    {/* Grille des produits */}
                    <div className="mt-10">
                        <ProductGrid products={service.products} color={service.color} />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <ServiceFAQ questions={service.faq} color={service.color} />

            {/* Call-to-Action */}
            <ServiceCTA
                title={service.ctaTitle}
                description={service.ctaDescription}
                color={service.color}
            />
        </main>
    )
}

export default ServicePage