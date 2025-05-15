// src/app/(main)/page.tsx
import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import AboutSection from '@/components/home/AboutSection'
import RealisationsSection from '@/components/home/RealisationsSection'
import PartnersSection from '@/components/home/PartnersSection'
import GoogleReviewsSection from '@/components/home/GoogleReviewsSection'
import CtaSection from '@/components/home/CtaSection'
import {
    getAboutSectionData,
    getAllServiceListingData, getCtaSectionData,
    getGoogleReviewsSectionData,
    getHeroSliderData, getRealisationsData
} from "@/lib/services";

export  default async function Home() {
    // Fetch data for both sections concurrently if possible
    const [servicesData, heroSlidesData, aboutSectionData, googleReviewsData, ctaSectionData, realisationsData] = await Promise.all([
        getAllServiceListingData(),
        getHeroSliderData(),
        getAboutSectionData(),
        getGoogleReviewsSectionData(),
        getCtaSectionData(),
        getRealisationsData() // Fetch Realisations data
    ]);

    // Handle potential errors if data fetching fails
    if (!heroSlidesData || heroSlidesData.length === 0) {
        // You might want to render a different hero or an error message
        console.error('Failed to fetch hero slider data or no slides found.');
        // Decide on a fallback UI or throw an error
        // return <div>Error loading hero section.</div>; // Example basic fallback
    }

    return (
        <>
            {heroSlidesData && heroSlidesData.length > 0 && (
                <HeroSection slides={heroSlidesData} />
            )}
            {servicesData && servicesData.length > 0 && (
                <ServicesSection services={servicesData} />
            )}
            {/* About Section (renders only if data is valid) */}
            {aboutSectionData && ( // Pass data if fetched successfully
                <AboutSection data={aboutSectionData} />
            )}

            {realisationsData && realisationsData.length > 0 && (
                <RealisationsSection realisations={realisationsData} />
            )}

            {/*<PartnersSection />*/}
            {googleReviewsData && googleReviewsData.reviews && googleReviewsData.reviews.length > 0 && (
                <GoogleReviewsSection data={googleReviewsData} />
            )}
            {ctaSectionData && ( // Check if the main document was fetched
                <CtaSection data={ctaSectionData} />
            )}
        </>
    )
}