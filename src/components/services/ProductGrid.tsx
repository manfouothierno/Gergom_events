// src/components/services/ProductGrid.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaShoppingCart, FaInfoCircle } from 'react-icons/fa'

interface Product {
    id: number;
    name: string;
    category: string;
    image: string;
    availability: string[];
    usage: string[];
    price: string;
    description: string;
}

interface ProductGridProps {
    products: Product[];
    color: string;
}

const ProductGrid = ({ products }: ProductGridProps) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {products.map((product) => (
                <motion.div
                    key={product.id}
                    variants={item}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                    {/* Image du produit */}
                    <div className="relative h-48">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />

                        {/* Tags disponibilité */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                            { product.availability &&  product.availability.includes('location') && (
                                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                  Location
                </span>
                            )}
                            {product.availability &&  product.availability.includes('vente') && (
                                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  Vente
                </span>
                            )}
                        </div>
                    </div>

                    {/* Information produit */}
                    <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 text-gray-800">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                        <p className="font-semibold text-red-600 mb-4">{product.price}</p>

                        {/* Boutons d'action */}
                        <div className="flex justify-between">
                            <Link
                                href={`/contact}`}
                                className="px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors flex items-center"
                            >
                                <FaShoppingCart className="mr-1" />
                                Demander un devis
                            </Link>

                            <div
                                className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors flex items-center"
                            >
                                <FaInfoCircle className="mr-1" />
                                Détails
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    )
}

export default ProductGrid