// src/components/services/ProductFilters.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaTimes } from 'react-icons/fa'

interface CategoryItem {
    id: string;
    name: string;
}

interface ProductFiltersProps {
    categories: CategoryItem[];
}

const ProductFilters = ({ categories }: ProductFiltersProps) => {
    const [activeCategory, setActiveCategory] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [showSearch, setShowSearch] = useState(false)

    return (
        <div className="relative">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                {/* Filtres par catégorie - version desktop */}
                <div className="hidden sm:flex items-center space-x-2 scrollbar-hide overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                                activeCategory === category.id
                                    ? 'bg-red-600 text-white font-medium shadow-sm'
                                    : 'bg-white hover:bg-gray-100 text-gray-700'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Filtres par catégorie - version mobile (select) */}
                <div className="sm:hidden w-full mb-4">
                    <select
                        value={activeCategory}
                        onChange={(e) => setActiveCategory(e.target.value)}
                        className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Boutons de filtres supplémentaires et recherche */}
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <motion.div
                            initial={false}
                            animate={{ width: showSearch ? 'auto' : '0px', opacity: showSearch ? 1 : 0 }}
                            className="overflow-hidden flex items-center"
                        >
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`border-0 focus:ring-0 py-2 ${showSearch ? 'w-40 sm:w-60 px-3' : 'w-0 px-0'} transition-all duration-300`}
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 text-gray-400 hover:text-gray-600"
                                >
                                    <FaTimes />
                                </button>
                            )}
                        </motion.div>

                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className={`ml-2 p-2 rounded-full ${
                                showSearch ? 'bg-red-100 text-red-600' : 'bg-white hover:bg-gray-100 text-gray-700'
                            }`}
                        >
                            <FaSearch />
                        </button>
                    </div>

                    <div className="border-l h-6 mx-2 border-gray-300 hidden sm:block"></div>

                    <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 bg-white hover:bg-gray-100 rounded-full text-gray-700 flex items-center">
                            <span className="hidden sm:inline">Disponibilité</span>
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <button className="px-4 py-2 bg-white hover:bg-gray-100 rounded-full text-gray-700 flex items-center">
                            <span className="hidden sm:inline">Tri</span>
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Filtres actifs */}
            {(searchTerm || activeCategory !== 'all') && (
                <div className="flex items-center mt-4 text-sm">
                    <span className="text-gray-500 mr-2">Filtres actifs:</span>
                    <div className="flex flex-wrap gap-2">
                        {activeCategory !== 'all' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800">
                {categories.find(c => c.id === activeCategory)?.name}
                                <button
                                    onClick={() => setActiveCategory('all')}
                                    className="ml-1 text-red-600 hover:text-red-800"
                                >
                  <FaTimes />
                </button>
              </span>
                        )}

                        {searchTerm && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800">
                Recherche: {searchTerm}
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="ml-1 text-red-600 hover:text-red-800"
                                >
                  <FaTimes />
                </button>
              </span>
                        )}

                        <button
                            onClick={() => {
                                setActiveCategory('all');
                                setSearchTerm('');
                            }}
                            className="px-3 py-1 text-gray-600 hover:text-gray-800 underline"
                        >
                            Effacer tous les filtres
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductFilters