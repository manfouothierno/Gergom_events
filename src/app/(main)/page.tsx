// src/app/(main)/page.tsx
import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import AboutSection from '@/components/home/AboutSection'
import RealisationsSection from '@/components/home/RealisationsSection'
import PartnersSection from '@/components/home/PartnersSection'
import GoogleReviewsSection from '@/components/home/GoogleReviewsSection'
import CtaSection from '@/components/home/CtaSection'
import {getAllServiceListingData} from "@/lib/services";

export  default async function Home() {
    const servicesData = await getAllServiceListingData();

    // If no data, maybe show a message or handle error
    if (!servicesData || servicesData.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center text-gray-600">
                Could not load services data at this time.
            </div>
        );
    }
    return (
        <>
            <HeroSection />
            <ServicesSection services={servicesData} />
            <AboutSection />
            <RealisationsSection />
            <PartnersSection />
            <GoogleReviewsSection />
            <CtaSection />
        </>
    )
}