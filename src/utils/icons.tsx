// src/utils/icons.tsx
'use client'

import {
    FaMusic, FaLightbulb, FaVideo,
    FaMagic, FaChair, FaCamera, FaGlassCheers,
    FaUsers, FaHeadphones, FaChartLine, FaRegLightbulb
} from 'react-icons/fa'

// Map de toutes les icônes utilisées
const iconMap = {
    FaMusic,
    FaLightbulb,
    FaVideo,
    FaMagic,
    FaChair,
    FaCamera,
    FaGlassCheers,
    FaUsers,
    FaHeadphones,
    FaChartLine,
    FaRegLightbulb
};

export const getIconByName = (name: string) => {
    return iconMap[name] || FaMusic; // Retourne FaMusic par défaut si l'icône n'est pas trouvée
}