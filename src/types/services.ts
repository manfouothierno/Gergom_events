// src/types/services.ts
import { IconType } from 'react-icons'

export interface ServiceFeature {
    title: string;
    description: string;
    iconName: string;
}

export interface CategoryItem {
    id: string;
    name: string;
}

export interface ProductSpec {
    id: number;
    name: string;
    category: string;
    image: string;
    isAvailableForRent: boolean;
    isAvailableForSale: boolean;
    price: string;
    description: string;
    specs: string[];
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface ServiceData {
    slug: string;
    name: string;
    title: string;
    subtitle: string;
    color: string;
    iconName: string;
    bannerImage: string;
    metaDescription: string;
    description: string;
    features: ServiceFeature[];
    applications: string[];
    subcategories: CategoryItem[];
    products: ProductSpec[];
    faq: FAQItem[];
    ctaTitle: string;
    ctaDescription: string;
}