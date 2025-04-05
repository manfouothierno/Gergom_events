// src/components/services/ServiceCTA.tsx
import Link from 'next/link'
import { FaHeadphones } from 'react-icons/fa'

interface ServiceCTAProps {
    title: string;
    description: string;
    color: string;
}

const ServiceCTA = ({ title, description, color }: ServiceCTAProps) => {
    // Convertir l'hexadécimal en RGB pour l'utiliser dans rgba
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    const rgb = hexToRgb(color);
    const gradientStart = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
    const gradientEnd = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;

    return (
        <section
            className="py-16"
            style={{
                background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`
            }}
        >
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6 text-white">{title}</h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                    {description}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        href="/contact"
                        className="px-8 py-4 bg-white font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg text-lg"
                        style={{ color: color }}
                    >
                        Demander un devis gratuit
                    </Link>

                    <a href="tel:0619537090"
                    className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors text-lg"
                    >
                    <FaHeadphones className="inline mr-2" />
                    Nous appeler
                </a>
            </div>
        </div>
</section>
)
}

export default ServiceCTA