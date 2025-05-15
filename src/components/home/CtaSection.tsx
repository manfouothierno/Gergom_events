// src/components/home/CtaSection.tsx - Improved AnimatedStat alignment
'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedStat from './AnimatedStat';
import { PortableText } from '@portabletext/react';
import { CtaSectionData } from "@/types/homepage";
import { getIconComponentByName } from "@/components/home/Counter";

interface CtaSectionProps {
    data: CtaSectionData;
}

const CtaSection = ({ data }: CtaSectionProps) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

    const stats = data.stats || [];

    const ctaTextPortableTextComponents = {
        block: {
            normal: ({children}: { children: React.ReactNode }) => <p>{children}</p>,
        }
    };

    // Calculate responsive grid columns based on number of stats
    const getGridColumns = () => {
        if (stats.length <= 2) return 'grid-cols-2';
        if (stats.length == 3) return 'grid-cols-3';
        if (stats.length <= 4) return 'grid-cols-2 md:grid-cols-4';
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6';
    };

    return (
        <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
            {/* Background with parallax effect */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y, opacity }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-red-800/80 to-black/90 z-10"></div>
                {data.backgroundImage && (
                    <Image
                        src={data.backgroundImage}
                        alt={data.ctaTitle || "Background image"}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
            </motion.div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10">
                {/* Stats section */}
                {stats.length > 0 && (
                    <div className={`mb-16 ${stats.length > 4 ? 'max-w-6xl mx-auto' : ''}`}>
                        {data.statsTitle && (
                            <h2 className="text-3xl font-bold text-white text-center mb-8">
                                {data.statsTitle}
                            </h2>
                        )}

                        <div className={`grid ${getGridColumns()} gap-6  md:gap-8`}>
                            {stats.map((stat, index) => (
                                <AnimatedStat
                                    key={stat._key || index}
                                    numericValue={stat.numericValue}
                                    displayValue={stat.displayValue}
                                    label={stat.label}
                                    iconName={stat.iconName}
                                    className="mx-auto" // Ensures each stat is centered in its grid cell
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA section */}
                {(data.ctaTitle || data.ctaButtonText) && (
                    <motion.div
                        className="text-center max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {data.ctaTitle && (
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                {data.ctaTitle}
                            </h2>
                        )}
                        {data.ctaText && (
                            <div className="text-xl text-gray-200 mb-8">
                                {typeof data.ctaText === 'string' ? (
                                    <p>{data.ctaText}</p>
                                ) : (
                                    <PortableText value={data.ctaText} components={ctaTextPortableTextComponents} />
                                )}
                            </div>
                        )}

                        {(data.ctaButtonText && data.ctaButtonHref) && (
                            <Link href={data.ctaButtonHref}>
                                <motion.button
                                    className="px-10 py-4 bg-white text-red-600 text-xl font-semibold rounded-lg shadow-xl hover:bg-gray-100 transition-colors inline-flex items-center gap-3"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {data.ctaButtonText}
                                    {data.ctaButtonIconName && React.createElement(getIconComponentByName(data.ctaButtonIconName))}
                                </motion.button>
                            </Link>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Wavy decorative element */}
            <div className="absolute bottom-0 left-0 right-0 text-white">
                <svg
                    viewBox="0 0 1440 120"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                    preserveAspectRatio="none"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 48L60 54C120 60 240 72 360 78C480 84 600 84 720 72C840 60 960 36 1080 30C1200 24 1320 36 1380 42L1440 48V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V48Z"
                    />
                </svg>
            </div>
        </section>
    );
};

export default CtaSection;