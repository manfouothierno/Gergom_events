// src/app/(main)/nos-services/[slug]/page.tsx

"use server";

import { notFound } from 'next/navigation'
import ServicePage from '@/components/services/ServicePage'
import {getAllServiceSlugs, getServiceData} from '@/lib/services'

// Types pour les métadonnées dynamiques
export async function generateMetadata({ params }) {
    const service = getServiceData(params.slug)

    if (!service) return {}

    return {
        title: `${service.title} | Gergom Events`,
        description: service.metaDescription,
    }
}

// Générer statiquement toutes les pages services possibles
export async function generateStaticParams() {
    const slugs = getAllServiceSlugs()

    return slugs.map(slug => ({
        slug: slug,
    }))
}

export  default async function DynamicServicePage({ params }) {
    const serviceData = getServiceData(params.slug)

    // Rediriger vers 404 si le service n'existe pas
    if (!serviceData) {
        notFound()
    }

    return <ServicePage service={serviceData} />
}