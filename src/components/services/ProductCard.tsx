// src/components/services/ProductCard.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaShoppingCart, FaInfoCircle, FaStar } from 'react-icons/fa'

interface ProductProps {
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

interface ProductCardProps {
    product: ProductProps;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            whileHover={{ y: -5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image du produit */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                />

                {/* Badges de disponibilité */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isAvailableForRent && (
                        <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
              Location
            </span>
                    )}
                    {product.isAvailableForSale && (
                        <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
              Vente
            </span>
                    )}
                </div>

                {/* Catégorie */}
                <div className="absolute bottom-4 right-4">
          <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {product.category}
          </span>
                </div>
            </div>

            {/* Information produit */}
            <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h3>

                {/* Specs sous forme de tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {product.specs.map((spec, index) => (
                        <span
                            key={index}
                            className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
              {spec}
            </span>
                    ))}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                    <p className="font-semibold text-red-600">{product.price}</p>
                    <div className="flex items-center text-yellow-400 text-sm">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar className="text-gray-300" />
                        <span className="text-gray-500 ml-1">(4)</span>
                    </div>
                </div>

                {/* Boutons d'action */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <Link
                        href={`/demande/devis?product=${product.id}`}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                    >
                        <FaShoppingCart className="mr-2" />
                        Devis
                    </Link>

                    <Link
                        href={`/nos-services/sonorisations/${product.id}`}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                        <FaInfoCircle className="mr-2" />
                        Détails
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard