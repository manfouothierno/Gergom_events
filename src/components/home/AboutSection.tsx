// src/components/home/AboutSection.tsx
'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import HistoryTimeline from '@/components/about/HistoryTimeline';
import ValuesSection from '@/components/about/ValuesSection';
import TeamSection from '@/components/about/TeamSection';
import ClientsSlider from '@/components/about/ClientsSlider';
import { PortableText } from '@portabletext/react';
import { AboutSectionData, StatItem } from '@/types/aboutSection';
import Counter, {getIconComponentByName} from "@/components/home/Counter";

interface AboutSectionProps {
    data: AboutSectionData;
}

export default function AboutSection({ data }: AboutSectionProps) {
    const sectionRef = useRef(null);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

    // Fallback video loader timeout
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!videoLoaded) {
                setVideoError(true);
                setVideoLoaded(true);
            }
        }, 5000);
        return () => clearTimeout(timeout);
    }, [videoLoaded]);

    const stats = data.stats || [];

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-20 bg-gray-50">
            {/* Background Image */}
            <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
                <div className="absolute inset-0 bg-gray-900 bg-opacity-40 z-10"></div>
                {data.backgroundImage && (
                    <Image
                        src={data.backgroundImage}
                        alt={data.introductionTitle || 'Background'}
                        fill
                        className="object-cover"
                        unoptimized={data.backgroundImage.startsWith('http')}
                    />
                )}
            </motion.div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Video Section */}
                    {data.videoUrl && (
                        <div className="bg-white p-4 rounded-lg shadow-xl">
                            <div className="relative rounded overflow-hidden aspect-video">
                                {!videoLoaded && !videoError && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                        <span className="animate-pulse text-gray-600">Loading video...</span>
                                    </div>
                                )}

                                {/* Video */}
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                    poster={data.videoPosterImage || '/images/hero/slide1.jpg'}
                                    onLoadedData={() => setVideoLoaded(true)}
                                    onError={() => {
                                        setVideoError(true);
                                        setVideoLoaded(true);
                                    }}
                                    crossOrigin="anonymous"
                                >
                                    <source src={data.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>

                                {/* Logo Overlay */}
                                <div className="sm:hidden absolute bottom-4 right-4 bg-white bg-opacity-80 rounded p-2">
                                    <Image
                                        src="/logo_gergom.jpg"
                                        alt="Gergom Events Logo"
                                        width={80}
                                        height={30}
                                        className="h-auto w-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Introduction Text */}
                    {(data.introductionTitle || data.introductionText?.length > 0) && (
                        <div
                            className={`bg-white bg-opacity-95 p-8 rounded-lg shadow-lg ${
                                !data.videoUrl ? 'col-span-full lg:col-span-2 mx-auto' : ''
                            }`}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                {data.introductionTitle && (
                                    <h2 className="text-3xl font-bold mb-6 text-gray-800">
                                        {data.introductionTitle}
                                    </h2>
                                )}

                                {data.introductionText && data.introductionText.length > 0 && (
                                    <div className="text-gray-700 mb-4 text-lg leading-relaxed">
                                        <PortableText value={data.introductionText} />
                                    </div>
                                )}

                                {/*{data.aboutButtonText && data.aboutButtonHref && (*/}
                                {/*    <Link href={data.aboutButtonHref}>*/}
                                {/*        <motion.button*/}
                                {/*            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors shadow-md inline-flex items-center"*/}
                                {/*            whileHover={{ scale: 1.03 }}*/}
                                {/*            whileTap={{ scale: 0.98 }}*/}
                                {/*        >*/}
                                {/*            {data.aboutButtonText}*/}
                                {/*            <svg*/}
                                {/*                className="ml-2 w-4 h-4"*/}
                                {/*                fill="none"*/}
                                {/*                stroke="currentColor"*/}
                                {/*                viewBox="0 0 24 24"*/}
                                {/*            >*/}
                                {/*                <path*/}
                                {/*                    strokeLinecap="round"*/}
                                {/*                    strokeLinejoin="round"*/}
                                {/*                    strokeWidth="2"*/}
                                {/*                    d="M14 5l7 7m0 0l-7 7m7-7H3"*/}
                                {/*                />*/}
                                {/*            </svg>*/}
                                {/*        </motion.button>*/}
                                {/*    </Link>*/}
                                {/*)}*/}
                            </motion.div>
                        </div>
                    )}
                </div>

                {/* Timeline */}
                {data.timelineEvents && data.timelineEvents.length > 0 && (
                    <div className="py-16">
                        {data.timelineTitle && (
                            <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
                                {data.timelineTitle}
                            </h2>
                        )}
                        <HistoryTimeline events={data.timelineEvents} />
                    </div>
                )}

                <ValuesSection />

                {/* Team Section */}
                {data.teamMembers && data.teamMembers.length > 0 && (
                    <div className="py-16">
                        <div className="text-center mb-16">
                            {data.teamSectionTitle && (
                                <h2 className="text-3xl font-bold mb-6 text-white">
                                    {data.teamSectionTitle}
                                </h2>
                            )}
                            {data.teamSectionDescription && (
                                <p className="text-xl text-gray-100 max-w-3xl mx-auto">
                                    <PortableText value={data.teamSectionDescription} />
                                </p>
                            )}
                        </div>
                        <TeamSection members={data.teamMembers} />
                    </div>
                )}

                {/* Clients Slider */}
                {data.clients && data.clients.length > 0 && (
                    <section className="py-16 bg-gray-900">
                        <div className="container mx-auto px-4">
                            {data.clientSectionTitle && (
                                <h2 className="text-3xl font-bold mb-10 text-center text-white">
                                    {data.clientSectionTitle}
                                </h2>
                            )}
                            <ClientsSlider clients={data.clients} />
                        </div>
                    </section>
                )}

                {/* Stats Counters */}
                {stats.length > 0 && (
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {data.statsTitle && (
                            <div className="col-span-full text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-800">
                                    {data.statsTitle}
                                </h2>
                            </div>
                        )}
                        {stats.map((stat, index) => {
                            const IconComponent = getIconComponentByName(stat.iconName);
                            return (
                                <Counter
                                    key={stat._key || index}
                                    from={0}
                                    to={stat.value}
                                    duration={2.5}
                                    label={stat.label}
                                    icon={IconComponent}
                                    valueSuffix={stat.valueSuffix || '+'}
                                />
                            );
                        })}
                    </motion.div>
                )}
            </div>
        </section>
    );
}