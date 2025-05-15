// src/components/layout/Footer.tsx - Improved alignment
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {FaMapMarkerAlt, FaPhone, FaEnvelope, FaIcons} from 'react-icons/fa';
import { PortableText } from '@portabletext/react';
import { SiteFooterData, FooterLink, SocialLink, FooterPartner, PortableTextBlock } from '@/types/siteSettings';

const getIconComponentByName = (name?: string | null) => {
    if (!name || typeof name !== 'string') {
        return null;
    }
    try {
        const Icon = (FaIcons as any)[name];
        if (!Icon) {
            console.warn(`Icon component not found for name: ${name}`);
            return null;
        }
        return Icon;
    } catch (error) {
        console.error(`Error getting icon component for name: ${name}`, error);
        return null;
    }
};

interface FooterProps {
    footerData: SiteFooterData | null;
}

const Footer = ({ footerData }: FooterProps) => {
    const socialIconVariants = {
        hover: { y: -5, scale: 1.1, transition: { duration: 0.3, type: 'spring', stiffness: 300 } }
    };

    if (!footerData) {
        return null;
    }

    const quickMenuLinks = footerData.quickMenuLinks || [];
    const legalMenuLinks = footerData.legalMenuLinks || [];
    const socialLinks = footerData.socialLinks || [];
    const footerPartners = footerData.footerPartners || [];

    const footerPortableTextComponents = {
        block: {
            normal: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
        },
    };

    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                {/* Main content sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Logo and description */}
                    <div className="space-y-4">
                        {footerData.logoFooter && (
                            <Link href="/" className="inline-block">
                                <Image
                                    src={footerData.logoFooter}
                                    alt={footerData.copyrightText || "Gergom Events Logo"}
                                    width={150}
                                    height={50}
                                    className="h-auto w-auto"
                                    sizes="150px"
                                />
                            </Link>
                        )}

                        {footerData.slogan && (
                            <p className="text-gray-400 italic font-semibold">
                                {footerData.slogan}
                            </p>
                        )}

                        {footerData.companyDescription && (
                            <div className="text-gray-400 text-sm">
                                {typeof footerData.companyDescription === 'string' ? (
                                    <p>{footerData.companyDescription}</p>
                                ) : (
                                    <PortableText value={footerData.companyDescription} components={footerPortableTextComponents} />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Contact information */}
                    <div className="space-y-4">
                        {footerData.contactSectionTitle && (
                            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
                                {footerData.contactSectionTitle}
                            </h3>
                        )}
                        <ul className="space-y-3 text-gray-400">
                            {footerData.address && (
                                <li className="flex items-start">
                                    <FaMapMarkerAlt className="mt-1 mr-3 text-red-600 flex-shrink-0" />
                                    {typeof footerData.address === 'string' ? (
                                        <span>{footerData.address}</span>
                                    ) : (
                                        <div className="text-gray-400 text-sm">
                                            <PortableText value={footerData.address} components={{}} />
                                        </div>
                                    )}
                                </li>
                            )}
                            {footerData.phone && (
                                <li className="flex items-center">
                                    <FaPhone className="mr-3 text-red-600 flex-shrink-0" />
                                    <a href={`tel:${footerData.phone.replace(/\s/g, '')}`} className="hover:text-red-600 transition-colors">
                                        {footerData.phone}
                                    </a>
                                </li>
                            )}
                            <li className="flex items-center">
                                <FaEnvelope className="mr-3 text-red-600 flex-shrink-0" />
                                <a href="mailto:contact@gergom-events.fr" className="hover:text-red-600 transition-colors">
                                    contact@gergom-events.fr
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick links */}
                    {quickMenuLinks.length > 0 && (
                        <div className="space-y-4">
                            {footerData.quickMenuTitle && (
                                <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
                                    {footerData.quickMenuTitle}
                                </h3>
                            )}
                            <ul className="space-y-2 text-gray-400">
                                {quickMenuLinks.map((link) => (
                                    <li key={link._key || link.text}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-red-600 transition-colors"
                                            target={link.openInNewTab ? '_blank' : '_self'}
                                            rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                                        >
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Social and legal links */}
                    <div className="space-y-6">
                        {socialLinks.length > 0 && (
                            <div className="space-y-4">
                                {footerData.socialTitle && (
                                    <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
                                        {footerData.socialTitle}
                                    </h3>
                                )}
                                <div className="flex flex-wrap gap-4">
                                    {socialLinks.map((link) => {
                                        const Icon = getIconComponentByName(link.iconName);
                                        if (!Icon) return null;

                                        return (
                                            <motion.a
                                                key={link._key || link.platform}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                                                variants={socialIconVariants}
                                                whileHover="hover"
                                            >
                                                <Icon />
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {legalMenuLinks.length > 0 && (
                            <div className="space-y-4">
                                {footerData.legalMenuTitle && (
                                    <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
                                        {footerData.legalMenuTitle}
                                    </h3>
                                )}
                                <ul className="space-y-2 text-gray-400 text-sm">
                                    {legalMenuLinks.map((link) => (
                                        <li key={link._key || link.text}>
                                            <Link
                                                href={link.href}
                                                className="hover:text-red-600 transition-colors"
                                                target={link.openInNewTab ? '_blank' : '_self'}
                                                rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                                            >
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Partners section - full width below main content */}
                {footerPartners.length > 0 && (
                    <div className="border-t border-gray-800 pt-8 pb-6">
                        {footerData.footerPartnersTitle && (
                            <h3 className="text-center text-lg font-semibold mb-6 text-white">
                                {footerData.footerPartnersTitle}
                            </h3>
                        )}
                        <div className="flex flex-wrap justify-center gap-8 grayscale opacity-70">
                            {footerPartners.map((partner) => (
                                <motion.div
                                    key={partner._key || partner.name}
                                    className="w-24 h-16 flex items-center justify-center bg-white bg-opacity-10 rounded p-2"
                                    whileHover={{
                                        filter: 'grayscale(0)',
                                        opacity: 1,
                                        scale: 1.05
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {partner.logo && (
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name || 'Partner Logo'}
                                            width={80}
                                            height={40}
                                            className="h-auto max-h-full w-auto object-contain"
                                            sizes="80px"
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Copyright section - full width at bottom */}
                {footerData.copyrightText && (
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                        <p>{footerData.copyrightText.replace(/\{year\}/g, new Date().getFullYear().toString())}</p>

                        {(footerData.developerText || footerData.developerLinkText) && (
                            <p className="mt-1">
                                {footerData.developerText}
                                {(footerData.developerLinkText && footerData.developerLinkHref) ? (
                                    <>
                                        {' '}
                                        <a
                                            href={footerData.developerLinkHref}
                                            className="text-red-600 hover:underline"
                                        >
                                            {footerData.developerLinkText}
                                        </a>
                                    </>
                                ) : (
                                    footerData.developerLinkText && <span> {footerData.developerLinkText}</span>
                                )}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </footer>
    );
};

export default Footer;