// src/components/blog/CategoryTabs.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

export default function CategoryTabs({ categories }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [currentCategory, setCurrentCategory] = useState('all')

    // Utiliser useEffect pour obtenir la valeur du paramètre après le rendu initial
    useEffect(() => {
        setCurrentCategory(searchParams.get('categorie') || 'all')
    }, [searchParams])

    const handleCategoryChange = (categoryId) => {
        if (categoryId === 'all') {
            router.push('/nos-prestations')
        } else {
            router.push(`/nos-prestations?categorie=${categoryId}`)
        }
    }

    return (
        <div className="flex flex-wrap justify-center">
            {categories.map((category) => (
                <motion.button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`m-1 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                        currentCategory === category.id
                            ? 'bg-[#006400] text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {category.name}
                </motion.button>
            ))}
        </div>
    )
}