// src/components/nos-prestations/ShareButtons.tsx
'use client'

import { motion } from 'framer-motion'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'

export default function ShareButtons({ url, title }) {
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)

    return (
        <div className="flex space-x-3">
            <motion.a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Partager sur Facebook"
            >
                <FaFacebookF />
            </motion.a>

            <motion.a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Partager sur Twitter"
            >
                <FaTwitter />
            </motion.a>

            <motion.a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Partager sur LinkedIn"
            >
                <FaLinkedinIn />
            </motion.a>

            <motion.a
                href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
                className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Partager par email"
            >
                <FaEnvelope />
            </motion.a>
        </div>
    )
}