// src/components/about/ClientsSlider.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Client } from '@/types/aboutSection';

interface ClientsSliderProps {
    clients?: Client[] | null;
}

export default function ClientsSlider({ clients }: ClientsSliderProps) {
    // Render nothing if no clients are provided
    if (!clients || clients.length === 0) {
        return null;
    }

    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-center gap-5">
                {clients.map((client) => (
                    <motion.div
                        key={client._key || client.name}
                        className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                    >
                        {client.logo && (
                            <Image
                                src={client.logo}
                                alt={client.name || 'Client logo'}
                                width={120}
                                height={80}
                                className="h-16 w-auto object-contain"
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}