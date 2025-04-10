// src/components/nos-prestations/RelatedPosts.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function RelatedPosts({ posts }) {
    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <motion.div
                    key={post.id}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link href={`/nos-prestations/${post.slug}`}>
                        <div className="flex items-start">
                            <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="ml-4">
                                <div className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full inline-block mb-1">
                                    {post.category}
                                </div>
                                <h4 className="text-gray-800 font-medium leading-snug">{post.title}</h4>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    )
}