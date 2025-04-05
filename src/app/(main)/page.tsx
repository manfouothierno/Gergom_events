// src/app/(main)/page.tsx
import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import AboutSection from '@/components/home/AboutSection'
import RealisationsSection from '@/components/home/RealisationsSection'
import PartnersSection from '@/components/home/PartnersSection'
import GoogleReviewsSection from '@/components/home/GoogleReviewsSection'
import CtaSection from '@/components/home/CtaSection'

export default function Home() {
    return (
        <>
            <HeroSection />
            <ServicesSection />
            <AboutSection />
            <RealisationsSection />
            <PartnersSection />
            <GoogleReviewsSection />
            <CtaSection />
        </>
    )
}