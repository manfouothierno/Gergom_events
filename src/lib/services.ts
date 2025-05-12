// src/lib/services.ts

import { ServiceData } from '@/types/services'

const servicesData: Record<string, ServiceData> = {
    'sonorisation': {
        slug: 'sonorisation',
        name: 'Sonorisation',
        title: 'DONNEZ DE LA VOIX À VOS AMBITIONS',
        subtitle: 'Matériel de sonorisation professionnel pour tous vos événements',
        color: '#FF0000',
        iconName: 'FaMusic',
        bannerImage: '/images/services/sonorisations.jpg',
        metaDescription: `Location et vente de matériel de sonorisation professionnel en région PACA. Enceintes, micros, tables de mixage pour tous types d'événements.`,
        description: 'La <span class="text-[#FF0000] font-semibold">sonorisation parfaite</span> est celle qu\'on oublie pour ne retenir que l\'émotion. Notre équipe d\'experts conçoit des architectures sonores sur mesure qui s\'adaptent à votre espace et vos objectifs.',

        features: [
            {
                title: 'Équipement Premium',
                description: 'Des marques reconnues et du matériel régulièrement entretenu pour une qualité sonore irréprochable.',
                iconName: 'FaMusic'
            },
            {
                title: 'Expertise technique',
                description: 'Notre équipe vous accompagne dans le choix, l\'installation et l\'optimisation de votre sonorisation.',
                iconName: 'FaHeadphones'
            },
            {
                title: 'Performance garantie',
                description: 'Des solutions adaptées à tous types d\'événements, de la conférence au concert en plein air.',
                iconName: 'FaChartLine'
            },
            {
                title: 'Pour tous publics',
                description: 'Solutions pour particuliers, professionnels et institutions avec options de location ou achat.',
                iconName: 'FaUsers'
            }
        ],

        applications: [
            'Concerts et spectacles',
            'Mariages et cérémonies',
            'Conférences et séminaires',
            'Événements sportifs',
            'Soirées dansantes',
            'Festivals en plein air',
            'Inaugurations',
            'Cérémonies officielles'
        ],

        subcategories: [
            { id: 'all', name: 'Tous les produits' },
            { id: 'enceintes', name: 'Enceintes' },
            { id: 'caissons', name: 'Caissons de basse' },
            { id: 'packs-son', name: 'Packs son' },
            { id: 'micros', name: 'Micros' },
            { id: 'tables-mixage', name: 'Tables de mixage' },
            { id: 'platines', name: 'Platines & Contrôleurs' }
        ],

        products: [
            {
                id: 1,
                name: 'JBL EON615',
                category: 'enceintes',
                image: '/images/products/sonorisation/enceinte-jbl-eon615.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 60€/jour',
                description: `Enceinte active 15" 1000W avec DSP intégré, idéale pour tous types d'événements.`,
                specs: ['1000W', 'Bluetooth', 'DSP intégré', '15"']
            },
            {
                id: 2,
                name: 'QSC K12.2',
                category: 'enceintes',
                image: '/images/products/sonorisation/enceinte-qsc-k12.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 65€/jour',
                description: `Enceinte active 12" 2000W avec DSP avancé et design robuste pour une performance optimale.`,
                specs: ['2000W', 'DSP avancé', 'Amplificateur classe D', '12"']
            },
            {
                id: 3,
                name: 'Shure SM58',
                category: 'micros',
                image: '/images/products/sonorisation/micro-shure-sm58.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 15€/jour',
                description: `Micro vocal dynamique de référence, robuste et polyvalent pour tous types de voix et d'applications.`,
                specs: ['Dynamique', 'Directionnel', 'XLR', 'Anti-pop intégré']
            },
            {
                id: 4,
                name: 'Système Line Array Compact',
                category: 'packs-son',
                image: '/images/products/sonorisation/line-array-compact.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 250€/jour',
                description: `Système Line Array compact haute performance pour événements de moyenne envergure jusqu'à 500 personnes.`,
                specs: ['4000W', 'Portée 30m', 'Subwoofer 18"', 'Processeur inclus']
            },
            {
                id: 5,
                name: 'Yamaha MG16XU',
                category: 'tables-mixage',
                image: '/images/products/sonorisation/table-yamaha-mg16xu.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 45€/jour',
                description: `Console de mixage 16 canaux avec effets et interface USB pour enregistrement, idéale pour les configurations moyennes.`,
                specs: ['16 canaux', 'Préamplis D-PRE', 'Interface USB', 'Effets SPX']
            },
            {
                id: 6,
                name: 'Pioneer CDJ-3000',
                category: 'platines',
                image: '/images/products/sonorisation/pioneer-cdj-3000.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 90€/jour',
                description: `Lecteur DJ professionnel de dernière génération pour performances haut de gamme avec écran tactile et fonctionnalités avancées.`,
                specs: ['Écran tactile HD', 'Pro DJ Link', '8 hot cues', 'Beat Sync']
            },
            {
                id: 7,
                name: 'JBL SRX828SP',
                category: 'caissons',
                image: '/images/products/sonorisation/caisson-jbl-srx828sp.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 80€/jour',
                description: `Caisson de basses actif 2x18" haute puissance, idéal pour renforcer les basses fréquences lors d'événements importants.`,
                specs: ['2000W', 'Double 18"', 'DSP intégré', 'Wi-Fi pour contrôle à distance']
            },
            {
                id: 8,
                name: 'Pack Sonorisation Conférence',
                category: 'packs-son',
                image: '/images/products/sonorisation/pack-conference.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 150€/jour',
                description: `Ensemble complet pour conférences et séminaires incluant 2 enceintes, table de mixage, micros sans fil et câblage.`,
                specs: ['2 enceintes 12"', '2 micros sans fil', 'Table de mixage', 'Installation incluse']
            }
        ],

        faq: [
            {
                question: 'Quel type de sonorisation pour une salle de 100m² ?',
                answer: 'Pour une salle de 100m² accueillant environ 80 personnes, nous recommandons un système avec deux enceintes actives de 12" (environ 1000W au total) et un petit mixeur. Pour une soirée dansante, ajoutez un caisson de basse pour renforcer les basses fréquences.'
            },
            {
                question: 'Quelle est la différence entre location et prestation technique ?',
                answer: 'La location simple comprend uniquement le matériel. La prestation technique inclut en plus l\'installation, le réglage, et la présence d\'un technicien pendant votre événement pour garantir un fonctionnement optimal et résoudre tout problème technique potentiel.'
            },
            {
                question: 'Proposez-vous des solutions pour les événements en extérieur ?',
                answer: 'Oui, nous disposons d\'équipements spécifiques pour les événements en extérieur : systèmes plus puissants, protection contre les intempéries, et solutions d\'alimentation autonomes si nécessaire. Nous pouvons également fournir des conseils sur la gestion sonore en milieu extérieur.'
            },
            {
                question: 'Faut-il prévoir une alimentation électrique spécifique ?',
                answer: 'Pour les petites configurations (jusqu\'à 2000W), une prise électrique standard 16A est généralement suffisante. Pour les configurations plus importantes, des alimentations triphasées ou plusieurs lignes dédiées peuvent être nécessaires. Nous vous conseillons précisément selon votre projet.'
            },
            {
                question: 'Comment choisir entre des enceintes passives ou actives ?',
                answer: 'Les enceintes actives intègrent leur propre amplification, ce qui simplifie l\'installation et réduit le matériel nécessaire. Les enceintes passives nécessitent des amplificateurs externes mais offrent plus de flexibilité pour les configurations complexes. Pour la plupart des événements ponctuels, nous recommandons des systèmes actifs.'
            }
        ],

        ctaTitle: 'Prêt à donner de la voix à votre événement ?',
        ctaDescription: 'Nos experts sont à votre disposition pour vous conseiller et vous proposer la solution de sonorisation adaptée à votre projet.'
    },

    'eclairage': {
        slug: 'eclairage',
        name: 'Éclairage',
        title: 'METTEZ EN LUMIÈRE VOS PLUS BELLES IDÉES',
        subtitle: 'Solutions d\'éclairage professionnel pour sublimer vos événements',
        color: '#FFA500',
        iconName: 'FaLightbulb',
        bannerImage: '/images/category-headers/eclairage-banner.jpg',
        metaDescription: `Location et vente de matériel d'éclairage événementiel en région PACA. Projecteurs, lyres, jeux de lumière et contrôleurs DMX pour tous types d'événements.`,
        description: 'L\'<span class="text-[#FFA500] font-semibold">éclairage est la signature visuelle</span> qui donne vie à votre événement. Notre expertise en design lumineux transforme n\'importe quel espace en un univers qui vous ressemble, de l\'éclairage architectural subtil aux ambiances festives dynamiques.',

        features: [
            {
                title: 'Solutions LED avancées',
                description: 'Des équipements basse consommation à haute puissance lumineuse pour un impact visuel optimal.',
                iconName: 'FaLightbulb'
            },
            {
                title: 'Programmation personnalisée',
                description: 'Création de séquences lumineuses sur mesure adaptées à votre thème et votre scénographie.',
                iconName: 'FaRegLightbulb'
            },
            {
                title: 'Techniciens spécialisés',
                description: 'Une équipe d\'experts en éclairage pour installer et piloter vos systèmes lumineux.',
                iconName: 'FaUsers'
            },
        ],

        applications: [
            'Soirées et événements privés',
            'Concerts et spectacles',
            'Défilés de mode',
            'Salons professionnels',
            'Éclairage architectural',
            'Lancements de produits',
            'Mises en valeur d\'espaces',
            'Événements corporate'
        ],

        subcategories: [
            { id: 'all', name: 'Tous les produits' },
            { id: 'lyres', name: 'Lyres' },
            { id: 'projecteurs', name: 'Projecteurs LED' },
            { id: 'par-led', name: 'PAR LED' },
            { id: 'effets', name: 'Effets lumineux' },
            { id: 'laser', name: 'Lasers' },
            { id: 'controle', name: 'Contrôleurs' },
            { id: 'structures', name: 'Structures et pieds' },
            { id: 'lumières', name: 'Machines à lumières' },
        ],

        products: [
            {
                id: 1,
                name: 'Lyre Beam RGBW 200W',
                category: 'lyres',
                image: '/images/products/eclairage/lyre-beam-200w.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 55€/jour',
                description: `Lyre à faisceau ultra-rapide avec 14 couleurs, prisme et effet stroboscopique pour des effets dynamiques spectaculaires.`,
                specs: ['200W', 'RGBW', '14 couleurs', 'Pan 540° / Tilt 270°']
            },
            {
                id: 2,
                name: 'Projecteur LED Wash 108W',
                category: 'projecteurs',
                image: '/images/products/eclairage/projecteur-wash-108w.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 30€/jour',
                description: `Projecteur LED pour éclairage de surface avec mélange de couleurs RGBWA+UV parfait pour donner de la profondeur à vos espaces.`,
                specs: ['108W', 'RGBWA+UV', 'DMX 7 canaux', 'Angle 25°']
            },
            {
                id: 3,
                name: 'PAR LED 18x10W',
                category: 'par-led',
                image: '/images/products/eclairage/par-led-18x10w.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 20€/jour',
                description: `PAR LED compact et puissant, idéal pour l'éclairage d'ambiance et la mise en couleur de vos espaces avec un faible encombrement.`,
                specs: ['18x10W', 'RGBW', 'DMX', 'Angle 25°-45°']
            },
            {
                id: 4,
                name: 'Laser RGB 1.5W',
                category: 'laser',
                image: '/images/products/eclairage/laser-rgb-1.5w.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 70€/jour',
                description: `Laser professionnel RGB pour effets volumétriques spectaculaires, idéal pour les soirées dansantes et les concerts.`,
                specs: ['1.5W', 'RGB', 'DMX', 'ILDA', 'Sécurité classe 4']
            },
            {
                id: 5,
                name: 'Contrôleur DMX 512',
                category: 'controle',
                image: '/images/products/eclairage/controleur-dmx-512.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 40€/jour',
                description: `Contrôleur DMX professionnel pour piloter jusqu'à 32 appareils indépendamment avec 16 faders et programmation de séquences.`,
                specs: ['512 canaux', '32 appareils', '16 faders', '30 banques']
            },
            {
                id: 6,
                name: 'Structure en T 3 mètres',
                category: 'structures',
                image: '/images/products/eclairage/structure-t-3m.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 35€/jour',
                description: `Structure en T robuste pour l'accroche de vos éclairages, jusqu'à 100kg de charge avec pieds télescopiques de 3 mètres.`,
                specs: ['Charge 100kg', 'Hauteur max 3m', 'Largeur 4m', 'Avec supports']
            },
            {
                id: 7,
                name: 'Effet Derby LED RGBW',
                category: 'effets',
                image: '/images/products/eclairage/effet-derby-led.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 25€/jour',
                description: `Effet lumineux derby avec LED RGBW pour une couverture maximale de la piste de danse avec rotation continue.`,
                specs: ['30W', 'RGBW', 'DMX ou Auto', 'Rotation continue']
            },
            {
                id: 8,
                name: 'Pack Éclairage DJ',
                category: 'all',
                image: '/images/products/eclairage/pack-dj.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 120€/jour',
                description: `Pack complet pour DJ comprenant 2 lyres, 4 PAR LED, 1 laser, 1 machine à fumée et 1 contrôleur DMX.`,
                specs: ['2 lyres Beam', '4 PAR LED', 'Laser RGB', 'Machine à fumée', 'Contrôleur DMX']
            },
            {
                id: 9,
                name: 'Projecteur Architectural 150W',
                category: 'projecteurs',
                image: '/images/products/eclairage/projecteur-architectural.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 45€/jour',
                description: `Projecteur puissant IP65 pour éclairage extérieur architectural, idéal pour mettre en valeur façades et monuments.`,
                specs: ['150W', 'RGBW', 'IP65', 'DMX', 'Angle réglable']
            }
        ],

        faq: [
            {
                question: 'Quelle surface peut être couverte par votre équipement d\'éclairage ?',
                answer: 'Notre équipement peut couvrir des espaces de toutes tailles. Pour une piste de danse standard (environ 50m²), un pack de 4 à 6 projecteurs est généralement suffisant. Pour des événements plus importants ou des mises en lumière architecturales, nous dimensionnons précisément le matériel selon la surface et les effets souhaités.'
            },
            {
                question: 'Faut-il une machine à fumée avec les éclairages ?',
                answer: 'Une machine à fumée n\'est pas obligatoire mais fortement recommandée pour les éclairages à faisceaux (lyres beam, lasers), car elle permet de matérialiser les rayons lumineux dans l\'air. Pour un éclairage d\'ambiance ou architectural, la fumée n\'est généralement pas nécessaire.'
            },
            {
                question: 'Proposez-vous un service de programmation des éclairages ?',
                answer: 'Oui, nous proposons un service de programmation sur mesure. Notre technicien peut créer des séquences lumineuses synchronisées avec votre événement, que ce soit pour suivre une chronologie précise (cérémonie, défilé) ou pour s\'adapter à l\'ambiance musicale (concerts, soirées).'
            },
            {
                question: 'Vos éclairages sont-ils adaptés pour l\'extérieur ?',
                answer: 'Nous disposons d\'équipements spécifiques IP65 pour l\'extérieur, résistants aux intempéries. Pour les événements en extérieur, nous recommandons toujours ces modèles, même sous tente ou chapiteau, pour garantir la sécurité et la fiabilité de l\'installation.'
            },
            {
                question: 'Comment choisir entre des lyres Spot, Beam ou Wash ?',
                answer: 'Les lyres Beam produisent des faisceaux concentrés très nets, parfaits pour les effets dynamiques. Les lyres Spot offrent des faisceaux plus larges avec possibilité de gobos (motifs). Les lyres Wash servent à "laver" de lumière une zone plus large. L\'idéal est souvent de combiner ces différents types pour un éclairage complet.'
            }
        ],

        ctaTitle: 'Illuminez votre prochain événement avec notre expertise',
        ctaDescription: 'Transformez votre vision en une réalité lumineuse. Nos techniciens spécialisés vous accompagnent de la conception à la réalisation.'
    },

    'video': {
        slug: 'video',
        name: 'Ecran & Vidéos',
        title: 'IMMORTALISEZ DES SOUVENIRS EN HAUTE DÉFINITION',
        subtitle: 'Solutions audiovisuelles professionnelles pour capturer et projeter vos moments forts',
        color: '#c4d602',
        iconName: 'FaVideo',
        bannerImage: '/images/category-headers/video-banner.jpg',
        metaDescription: `Location et vente de matériel audiovisuel professionnel en région PACA. Vidéoprojecteurs, écrans, caméras et solutions de diffusion pour tous types d'événements.`,
        description: 'L\'<span class="text-[#c4d602] font-semibold">image est au cœur de votre message</span>. Qu\'il s\'agisse de projeter, diffuser, filmer ou retransmettre, nos solutions audiovisuelles professionnelles transforment votre contenu en expérience immersive et mémorable pour votre public.',

        features: [
            {
                title: 'Haute résolution',
                description: 'Des équipements 4K/Full HD pour une qualité d\'image exceptionnelle adaptée aux exigences professionnelles.',
                iconName: 'FaVideo'
            },
            {
                title: 'Systèmes plug & play',
                description: 'Des solutions simples à installer et à utiliser, même pour les non-initiés, avec support technique disponible.',
                iconName: 'FaRegLightbulb'
            },
            {
                title: 'Retransmission live',
                description: 'Capacité de diffusion en direct sur écrans multiples ou en streaming pour les participants à distance.',
                iconName: 'FaHeadphones'
            },
            {
                title: 'Compatibilité universelle',
                description: 'Nos équipements s\'adaptent à toutes les sources et formats pour une intégration parfaite à votre événement.',
                iconName: 'FaChartLine'
            }
        ],

        applications: [
            'Conférences et séminaires',
            'Salons professionnels',
            'Projections cinéma plein air',
            'Retransmissions sportives',
            'Mariages et événements privés',
            'Stands et showrooms',
            'Diffusion multi-écrans',
            'Vidéo mapping'
        ],

        subcategories: [
            { id: 'all', name: 'Tous les produits' },
            { id: 'videoprojecteurs', name: 'Vidéoprojecteurs' },
            { id: 'ecrans', name: 'Écrans de projection' },
            { id: 'cameras', name: 'Caméras' },
            { id: 'melangeurs', name: 'Mélangeurs vidéo' },
            { id: 'moniteurs', name: 'Moniteurs' },
            { id: 'streaming', name: 'Matériel streaming' },
            { id: 'accessoires', name: 'Accessoires vidéo' }
        ],

        products: [
            {
                id: 7,
                name: 'Écran LED 3x2m P3.9 (indoor et outdoor)',
                category: 'ecrans',
                image: '/images/products/video/ecran-led-3x2m.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 350€/jour',
                description: `Mur d'images LED haute résolution pour affichage intérieur, modularité permettant différentes tailles et formats selon besoin.`,
                specs: ['Pitch 3.9mm', '3x2 mètres', 'Luminosité 1200nits', 'Angle vision 160°']
            },
            {
                id: 1,
                name: 'Vidéoprojecteur Laser 7000 Lumens',
                category: 'videoprojecteurs',
                image: '/images/products/video/videoprojecteur-laser-7000.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 150€/jour',
                description: `Vidéoprojecteur laser haute luminosité pour projection même en environnement lumineux, idéal pour grandes salles et événements professionnels.`,
                specs: ['7000 Lumens', 'Full HD 1080p', 'Contraste 100 000:1', 'HDMI/USB/VGA']
            },

            {
                id: 3,
                name: 'Caméra Professionnelle Sony',
                category: 'cameras',
                image: '/images/products/video/camera-sony-pro.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 120€/jour',
                description: `Caméra d'épaule professionnelle pour captation événementielle, équipée d'un capteur large et d'optiques interchangeables pour une qualité broadcast.`,
                specs: ['4K 60fps', 'XLR audio', 'Capteur Super 35mm', 'Enregistrement SDI/HDMI']
            },
            {
                id: 4,
                name: 'Mélangeur vidéo ATEM mini',
                category: 'melangeurs',
                image: '/images/products/video/melangeur-atem-mini.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 45€/jour',
                description: `Mélangeur vidéo compact et puissant pour gestion multi-caméras en direct, idéal pour streaming et productions événementielles.`,
                specs: ['4 entrées HDMI', 'Streaming direct', 'Transitions pro', 'Incrustation chroma']
            },
            {
                id: 5,
                name: 'Moniteur de production 24"',
                category: 'moniteurs',
                image: '/images/products/video/moniteur-production-24.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 40€/jour',
                description: `Moniteur professionnel calibré pour vérification des flux vidéo en temps réel, avec entrées multiples et fonctions d'analyse.`,
                specs: ['24 pouces', 'Full HD', 'HDMI/SDI', 'LUT intégrées']
            },
            {
                id: 6,
                name: 'Kit Streaming Professionnel',
                category: 'streaming',
                image: '/images/products/video/kit-streaming-pro.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 180€/jour',
                description: `Ensemble complet pour diffusion live incluant caméra, mélangeur, micros, encodeur et connexion internet dédiée.`,
                specs: ['Caméra Full HD', 'Mélangeur', 'Encodeur', 'Connexion 4G secours']
            },

            {
                id: 8,
                name: 'Vidéoprojecteur Courte Focale 4K',
                category: 'videoprojecteurs',
                image: '/images/products/video/videoprojecteur-courte-focale.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 130€/jour',
                description: `Vidéoprojecteur à ultra-courte focale permettant une grande image même à faible distance du mur, idéal pour petits espaces.`,
                specs: ['4K UHD', '3500 lumens', 'Ratio 0.3:1', 'HDR10']
            },
            {
                id: 9,
                name: 'Accessoires Caméra Complets',
                category: 'accessoires',
                image: '/images/products/video/accessoires-camera.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 30€/jour',
                description: `Ensemble complet d'accessoires de stabilisation pour caméras incluant trepieds, monopodes, sliders et gimbals pour des mouvements fluides.`,
                specs: ['Trépied pro', 'Slider 1m', 'Gimbal 3 axes', 'Follow focus']
            },
            {
                id: 10,
                name: 'Pack Projection Événementiel',
                category: 'all',
                image: '/images/products/video/pack-projection-evenementiel.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 250€/jour',
                description: `Solution complète pour projection événementielle comprenant vidéoprojecteur laser, grand écran, système audio et lecteur multimédia.`,
                specs: ['Vidéoprojecteur 5000lm', 'Écran 3m', 'Système son 2.1', 'Technicien inclus']
            }
        ],

        faq: [
            {
                question: 'Quelle taille d\'écran choisir pour ma salle ?',
                answer: 'Pour une expérience optimale, la largeur de l\'écran devrait être d\'environ 1/2 de la distance entre l\'écran et le spectateur le plus éloigné. Par exemple, pour une salle de 10m de profondeur, un écran de 5m de large est idéal. Nous pouvons vous conseiller précisément selon la configuration de votre espace.'
            },
            {
                question: 'Puis-je connecter mon ordinateur à votre matériel ?',
                answer: 'Oui, tous nos équipements disposent de connectiques standards (HDMI, VGA, DisplayPort) compatibles avec la plupart des ordinateurs. Nous fournissons également les adaptateurs nécessaires pour les MacBook et autres appareils spécifiques. Nous vérifions systématiquement la compatibilité lors de la préparation.'
            },
            {
                question: 'Proposez-vous des techniciens pour gérer la régie vidéo ?',
                answer: 'Absolument, nous disposons de techniciens vidéo expérimentés qui peuvent prendre en charge l\'installation, les réglages et la régie pendant votre événement. Ce service est fortement recommandé pour les événements complexes, les conférences multi-intervenants ou les retransmissions en direct.'
            },
            {
                question: 'Quelle puissance de vidéoprojecteur pour une projection en journée ?',
                answer: 'Pour une projection en conditions lumineuses, nous recommandons au minimum 5000 lumens, idéalement 7000 lumens ou plus selon la taille de l\'image et le niveau de lumière ambiante. Pour les projections en plein jour à l\'extérieur, des solutions LED sont souvent plus adaptées qu\'un vidéoprojecteur.'
            },
            {
                question: 'Pouvez-vous assurer une retransmission en direct sur internet ?',
                answer: 'Oui, notre service de streaming professionnel permet la diffusion en direct sur toutes les plateformes (YouTube, Facebook, Twitch, sites privés). Nous proposons différentes configurations, de la simple webcam HD jusqu\'à la production multi-caméras avec régie complète et diffusion sécurisée.'
            }
        ],

        ctaTitle: 'Votre message mérite la meilleure image',
        ctaDescription: 'Faites-nous part de vos besoins audiovisuels et nous concevrons une solution adaptée à votre événement, votre budget et vos objectifs de communication.'
    },

    'structures': {
        slug: 'structures',
        name: 'Scènes & Structures',
        title: 'CONSTRUISEZ LE CADRE DE VOS AMBITIONS',
        subtitle: 'Solutions modulaires professionnelles pour structurer et sécuriser vos événements',
        color: '#FFC0CB',
        iconName: 'FaStage',
        bannerImage: '/images/category-headers/structures-banner.jpg',
        metaDescription: `Location et vente de scènes, podiums et structures scéniques en région PACA. Solutions adaptées pour concerts, événements corporate et cérémonies de toutes tailles.`,
        description: 'Les <span class="text-[#FFC0CB] font-semibold">structures constituent la colonne vertébrale</span> de votre événement. De la petite estrade à la scène de festival, nos solutions modulaires s\'adaptent à vos besoins pour créer des espaces fonctionnels, sécurisés et esthétiques.',

        features: [
            {
                title: 'Modularité totale',
                description: 'Structures adaptables aux contraintes de votre lieu et aux spécificités de votre événement.',
                iconName: 'FaStage'
            },
            {
                title: 'Installation rapide',
                description: 'Systèmes conçus pour un montage et démontage efficaces par nos équipes qualifiées.',
                iconName: 'FaChartLine'
            },
            {
                title: 'Sécurité certifiée',
                description: 'Matériel aux normes européennes avec documentation technique complète et tests de charge.',
                iconName: 'FaRegLightbulb'
            },
            {
                title: 'Adaptabilité maximale',
                description: 'Solutions pour tous types de terrains et configurations, intérieures comme extérieures.',
                iconName: 'FaUsers'
            }
        ],

        applications: [
            'Concerts et spectacles',
            'Discours et cérémonies',
            'Salons et expositions',
            'Événements sportifs',
            'Défilés de mode',
            'Mariages et cérémonies',
            'Festivals plein air',
            'Événements corporate'
        ],

        subcategories: [
            { id: 'all', name: 'Tous les produits' },
            { id: 'scenes-podiums', name: 'Scènes et podiums' },
            { id: 'praticables', name: 'Praticables' },
            { id: 'trusses', name: 'Structures aluminium' },
            { id: 'tribunes', name: 'Tribunes' },
            { id: 'barrieres', name: 'Barrières' },
            { id: 'supports', name: 'Supports et pieds' },
            { id: 'accessoires', name: 'Accessoires scéniques' }
        ],

        products: [
            {
                id: 1,
                name: 'Scène modulaire 6x4m',
                category: 'scenes-podiums',
                image: '/images/products/structures/scene-modulaire-6x4.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 450€/jour',
                description: `Scène modulaire professionnelle pour événements de moyenne envergure, livrée avec escalier, garde-corps et jupe de scène noire.`,
                specs: ['6x4 mètres', 'Hauteur réglable 0.8-1.2m', 'Capacité 750kg/m²', 'Montage inclus']
            },
            {
                id: 2,
                name: 'Praticable 2x1m',
                category: 'praticables',
                image: '/images/products/structures/praticable-2x1.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 20€/jour',
                description: `Praticable individuel multi-usage, idéal pour créer des espaces surélevés ou des plateformes pour instruments ou matériel.`,
                specs: ['2x1 mètres', 'Hauteur 20, 40, 60 ou 80cm', 'Capacité 500kg/m²', 'Surface antidérapante']
            },
            {
                id: 3,
                name: 'Structure alu carrée 30cm',
                category: 'trusses',
                image: '/images/products/structures/structure-alu-30cm.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 12€/mètre/jour',
                description: `Structure en aluminium carré de 30cm type Prolyte, pour accrocher éclairages, enceintes ou décors, disponible en segments de différentes longueurs.`,
                specs: ['Section 30x30cm', 'Charge max 450kg/m', 'Segments multiples', 'Angles et bases disponibles']
            },
            {
                id: 4,
                name: 'Tribune 50 places',
                category: 'tribunes',
                image: '/images/products/structures/tribune-50-places.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 500€/jour',
                description: `Tribune gradins pour public, configuration standard 5 rangs de 10 places, modulable selon besoins, avec garde-corps et escaliers d'accès.`,
                specs: ['50 places assises', '5 rangs', 'Norme ERP 1-3', 'Installation professionnelle']
            },
            {
                id: 5,
                name: 'Barrière anti-pression',
                category: 'barrieres',
                image: '/images/products/structures/barriere-anti-pression.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 8€/unité/jour',
                description: `Barrière Vauban et anti-pression pour sécurisation d'événements, gestion de foule et délimitation de zones.`,
                specs: ['Longueur 2m', 'Hauteur 1.1m', 'Acier galvanisé', 'Pieds stabilisateurs']
            },
            {
                id: 6,
                name: 'Pied de levage 5m',
                category: 'supports',
                image: '/images/products/structures/pied-levage-5m.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 25€/jour',
                description: `Pied de levage télescopique pour élévation d'enceintes, éclairages ou structures légères, avec treuil de sécurité et adaptateurs.`,
                specs: ['Hauteur max 5m', 'Charge max 150kg', 'Treuil auto-freiné', 'Base pliable']
            },
            {
                id: 7,
                name: 'Podium discours',
                category: 'scenes-podiums',
                image: '/images/products/structures/podium-discours.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 80€/jour',
                description: `Podium élégant pour conférencier ou intervenant, habillage personnalisable aux couleurs de votre événement.`,
                specs: ['Dimensions 1x1m', 'Hauteur 30cm', 'Panneau avant personnalisable', 'Micro intégrable']
            },
            {
                id: 8,
                name: 'Accessoires scéniques complets',
                category: 'accessoires',
                image: '/images/products/structures/accessoires-sceniques.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 50€/jour',
                description: `Ensemble d'accessoires pour compléter votre installation scénique : escaliers, garde-corps, jupes de scène, tapis, colliers et élingues de sécurité.`,
                specs: ['Escaliers modulables', 'Garde-corps', 'Jupes de scène', 'Accessoires d\'accroche']
            },
            {
                id: 9,
                name: 'Scène couverte 8x6m',
                category: 'scenes-podiums',
                image: '/images/products/structures/scene-couverte-8x6.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 850€/jour',
                description: `Scène extérieure couverte complète avec toit, plancher, habillage et système d'accroche pour éclairage et son.`,
                specs: ['Surface 8x6m', 'Hauteur plancher réglable', 'Couverture imperméable', 'Équipe de montage incluse']
            },
            {
                id: 10,
                name: 'Pack Festival Medium',
                category: 'all',
                image: '/images/products/structures/pack-festival-medium.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 1800€/jour',
                description: `Solution complète pour festival ou concert incluant scène couverte 8x6m, praticables, structures d'éclairage, barrières et régie technique.`,
                specs: ['Scène 8x6m couverte', 'Structure pour éclairage', 'Praticables musiciens', 'Barrières de sécurité', 'Montage/démontage inclus']
            }
        ],

        faq: [
            {
                question: 'Quelle taille de scène pour 10 musiciens ?',
                answer: 'Pour un groupe de 10 musiciens avec leurs instruments, nous recommandons une scène d\'au moins 8x6 mètres (48m²), soit environ 4-5m² par musicien. Cette surface peut varier selon le type d\'instruments (batterie, piano à queue, etc.) et la mise en scène souhaitée. Nous pouvons réaliser un plan de scène précis avec vous.'
            },
            {
                question: 'Vos structures sont-elles adaptées pour l\'extérieur ?',
                answer: 'Oui, toutes nos structures sont conçues pour une utilisation extérieure et répondent aux normes de sécurité en vigueur. Pour les événements en extérieur, nous proposons des scènes couvertes, des lests adaptés aux sols meubles et des certificats de stabilité au vent. Un repérage préalable du lieu est recommandé.'
            },
            {
                question: 'Combien de temps faut-il pour monter une scène ?',
                answer: 'Le temps de montage dépend de la taille et de la complexité de la structure. À titre indicatif, une scène standard 6x4m sans couverture nécessite environ 3 heures avec 2 techniciens. Une scène couverte 8x6m demande généralement une demi-journée avec 3-4 techniciens. Nous planifions toujours le montage en amont de votre événement.'
            },
            {
                question: 'Proposez-vous une étude technique pour mon lieu ?',
                answer: 'Absolument, nous réalisons des études techniques gratuites pour tous les projets d\'envergure. Cela inclut une visite sur site, la prise de mesures, l\'analyse des contraintes techniques (accès, électricité, ancrage), et l\'élaboration d\'un plan 3D de l\'installation. Cette étape est essentielle pour garantir la sécurité et l\'adéquation de notre solution.'
            },
            {
                question: 'Quelles sont les normes de sécurité pour vos structures ?',
                answer: 'Toutes nos structures sont conformes aux normes européennes en vigueur (EN 13814 pour les structures temporaires). Nous fournissons systématiquement les documents de conformité, tests de charge, et plans d\'installation. Pour les événements recevant du public (ERP), nous pouvons également fournir les documents nécessaires au passage de la commission de sécurité.'
            }
        ],

        ctaTitle: 'Donnez une structure solide à votre projet événementiel',
        ctaDescription: 'Nos ingénieurs et techniciens sont à votre disposition pour concevoir la solution scénique idéale adaptée à vos contraintes techniques et à votre budget.'
    },

    'effets': {
        slug: 'effets',
        name: 'Effets',
        title: 'CRÉEZ LA SURPRISE ET L\'ÉMOTION',
        subtitle: 'Effets spéciaux spectaculaires pour marquer les esprits et sublimer vos événements',
        color: '#800080',
        iconName: 'FaMagic',
        bannerImage: '/images/category-headers/effets-banner.jpg',
        metaDescription: `Location et vente d'effets spéciaux professionnels en région PACA. Machines à fumée, étincelles à froid, confettis, neige artificielle et autres effets spectaculaires pour tous vos événements.`,
        description: 'Les <span class="text-[#800080] font-semibold">effets spéciaux créent ces moments magiques</span> dont vos invités se souviendront. Des flammes aux confettis, en passant par la fumée lourde ou les étincelles, notre gamme d\'effets professionnels apporte le facteur "wow" indispensable aux grands événements.',

        features: [
            {
                title: 'Impact émotionnel',
                description: 'Des effets spectaculaires parfaitement synchronisés pour créer des moments mémorables.',
                iconName: 'FaMagic'
            },
            {
                title: 'Sécurité maximale',
                description: 'Matériel professionnel contrôlé, utilisé par des techniciens formés et certifiés.',
                iconName: 'FaRegLightbulb'
            },
            {
                title: 'Personnalisation',
                description: 'Solutions adaptées à votre scénographie, votre thème et vos contraintes de lieu.',
                iconName: 'FaUsers'
            },
            {
                title: 'Technologie avancée',
                description: 'Machines de dernière génération avec contrôle DMX et programmation précise.',
                iconName: 'FaChartLine'
            }
        ],

        applications: [
            'Mariages et cérémonies',
            'Concerts et spectacles',
            'Soirées dansantes',
            'Événements corporate',
            'Lancements de produits',
            'Défilés de mode',
            'Clips et tournages',
            'Inaugurations'
        ],

        subcategories: [
            { id: 'all', name: 'Tous les produits' },
            { id: 'fumee', name: 'Machines à fumée' },
            { id: 'etincelles', name: 'Étincelles et flammes' },
            { id: 'confettis', name: 'Confettis et serpentins' },
            { id: 'neige', name: 'Neige artificielle' },
            { id: 'bulles', name: 'Machines à bulles' },
            { id: 'brouillard', name: 'Brouillard lourd' },
            { id: 'co2', name: 'Jets CO2 et cryo' }
        ],

        products: [
            {
                id: 1,
                name: 'Machine à fumée 1500W',
                category: 'fumee',
                image: '/images/products/effets/machine-fumee-1500w.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 40€/jour',
                description: `Machine à fumée puissante pour créer une atmosphère ou mettre en valeur les faisceaux lumineux, avec télécommande et contrôle DMX.`,
                specs: ['1500W', 'Volume 600m³/min', 'DMX', 'Liquide inclus']
            },
            {
                id: 2,
                name: 'Sparkular Mini',
                category: 'etincelles',
                image: '/images/products/effets/sparkular-pro.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 150€/jour',
                description: `Système professionnel d'étincelles froides sans risque d'incendie, hauteur réglable jusqu'à 5 mètres, idéal pour intérieur.`,
                specs: ['Hauteur 2-5m', 'Sans flamme', 'Usage intérieur', 'DMX compatible']
            },
            {
                id: 3,
                name: 'Canon à confettis à air comprimé',
                category: 'comprimé',
                image: '/images/products/effets/canon-confettis-dmx.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 35€/jour',
                description: `Canon à confettis électrique déclenchable à distance, idéal pour moments clés et finales. Différentes couleurs de confettis disponibles.`,
                specs: ['Portée 8m', 'Capacité 1kg', 'Contrôle DMX', 'Diverses couleurs']
            },
            {
                id: 4,
                name: 'Machine à neige 1200W',
                category: 'neige',
                image: '/images/products/effets/machine-neige-1200w.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 45€/jour',
                description: `Machine produisant un effet de neige réaliste, idéale pour événements hivernaux, Noël ou ambiances féeriques.`,
                specs: ['1200W', 'DMX', 'Liquide fourni', 'Volume réglable']
            },
            {
                id: 5,
                name: 'Générateur brouillard lourd',
                category: 'brouillard',
                image: '/images/products/effets/generateur-brouillard-lourd.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 80€/jour',
                description: `Machine à fumée lourde créant un effet de brouillard restant au sol, parfaite pour danses, premières entrées ou effets mystérieux.`,
                specs: ['Avec glace carbonique', 'Hauteur 40cm', 'Volume réglable', 'Télécommande']
            },
            {
                id: 6,
                name: 'Machine à bulles professionnelle',
                category: 'bulles',
                image: '/images/products/effets/machine-bulles-pro.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 25€/jour',
                description: `Machine à bulles haute performance produisant des milliers de bulles par minute, parfaite pour animations enfants et ambiances festives.`,
                specs: ['Double turbine', 'Volume réglable', 'Liquide inclus', 'Télécommande']
            },
            {
                id: 7,
                name: 'Canon à T-shirts à air comprimé',
                category: 'co2',
                image: '/images/products/effets/jet-co2-dmx.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 120€/jour',
                description: `Système de canon à T-shirts à air comprimé pour effets spectaculaires instantanés, idéal pour moments forts, climax musicaux ou DJ sets.`,
                specs: ['Jet vertical 5-8m', 'Contrôle DMX', 'Bonbonne incluse', 'Technicien requis']
            },
            {
                id: 8,
                name: 'Lanceur serpentins électrique',
                category: 'confettis',
                image: '/images/products/effets/lanceur-serpentins.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 30€/jour',
                description: `Lanceur de serpentins électrique pour finales spectaculaires, portée jusqu'à 10 mètres avec déclenchement à distance.`,
                specs: ['Serpentins 5m', 'Portée 10m', 'Télécommande', 'Recharges disponibles']
            },
            {
                id: 9,
                name: 'Kit flammes propres DMX',
                category: 'etincelles',
                image: '/images/products/effets/kit-flammes-propres.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 280€/jour',
                description: `Système d'effet flamme sécurisé sans combustion réelle, créant un effet visuel de flammes réalistes contrôlable via DMX.`,
                specs: ['Hauteur 1.5m', 'Sans danger', 'Technicien inclus', 'Contrôle DMX']
            },
            {
                id: 10,
                name: 'Pack Mariage Premium',
                category: 'all',
                image: '/images/products/effets/pack-mariage-premium.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 350€',
                description: `Ensemble complet d'effets pour mariage incluant machine à fumée lourde pour première danse, canons à confettis pour entrée des mariés et jets d'étincelles pour moments clés.`,
                specs: ['Brouillard lourd', 'Confettis blancs', 'Étincelles 4 points', 'Technicien inclus']
            }
        ],

        faq: [
            {
                question: 'Les effets spéciaux peuvent-ils être utilisés en intérieur ?',
                answer: 'La plupart de nos effets sont conçus pour une utilisation intérieure sécurisée. Les machines à fumée, bulles, confettis et étincelles froides (Sparkular) sont parfaitement adaptées aux espaces clos. Nous vérifions systématiquement la compatibilité avec les détecteurs de fumée et les restrictions du lieu. Certains effets comme les jets CO2 nécessitent une bonne ventilation.'
            },
            {
                question: 'Les effets risquent-ils de déclencher les alarmes incendie ?',
                answer: 'Ce risque existe avec certains effets comme les machines à fumée. Pour y remédier, nous proposons plusieurs solutions : utilisation de machines à brouillard (haze) à faible densité, isolation temporaire des détecteurs (avec autorisation préalable) ou utilisation d\'effets sans particules comme les étincelles froides ou les jets CO2. Nous abordons toujours cette question lors de la préparation de l\'événement.'
            },
            {
                question: 'Comment sont synchronisés les effets avec la musique ou le déroulé de l\'événement ?',
                answer: 'Nous proposons plusieurs niveaux de synchronisation : déclenchement manuel par un technicien à des moments prédéfinis, contrôle via système DMX pour une intégration aux consoles lumière, ou programmation précise sur timeline permettant une synchronisation parfaite avec la musique ou les moments clés. Pour les événements complexes, un technicien dédié est recommandé.'
            },
            {
                question: 'Les confettis et la neige artificielle sont-ils faciles à nettoyer ?',
                answer: 'Nous utilisons des confettis et de la neige qui se dissolvent facilement et ne tachent pas. Pour le nettoyage, nous pouvons soit inclure la prestation dans notre service, soit vous fournir des conseils pour un nettoyage efficace. Dans tous les cas, prévoyez un temps supplémentaire après l\'événement pour la remise en état. Des options biodégradables sont également disponibles.'
            },
            {
                question: 'Quelle est la différence entre une machine à fumée et un brumisateur (hazer) ?',
                answer: 'Une machine à fumée produit une fumée dense et visible composée de plus grosses particules, idéale pour créer des effets ponctuels ou mettre en valeur les faisceaux lumineux. Un brumisateur (hazer) produit une brume fine et homogène qui reste en suspension dans l\'air, créant une atmosphère subtile qui rend les faisceaux lumineux visibles sans effet de "nuage". Le hazer est généralement préféré pour les événements où la discrétion est importante.'
            }
        ],

        ctaTitle: 'Ajoutez la magie des effets spéciaux à votre événement',
        ctaDescription: 'Surprenez vos invités avec des moments spectaculaires et créez des souvenirs inoubliables grâce à nos solutions d\'effets professionnels.'
    },

    'mobilier': {
        slug: 'mobilier',
        name: 'Mobilier',
        title: 'AMÉNAGEZ DES ESPACES QUI VOUS RESSEMBLENT',
        subtitle: 'Mobilier design et fonctionnel pour créer des ambiances uniques',
        color: '#0000FF',
        iconName: 'FaChair',
        bannerImage: '/images/category-headers/mobilier-banner.jpg',
        metaDescription: `Location de mobilier événementiel en région PACA. Tables, chaises, mange-debout, mobilier lumineux et lounge pour vos réceptions, salons professionnels et événements privés.`,
        description: 'Le <span class="text-[#0000FF] font-semibold">mobilier définit l\'atmosphère</span> de votre événement et influence directement l\'expérience de vos invités. Notre collection allie esthétique contemporaine et fonctionnalité pour créer des espaces accueillants, confortables et visuellement cohérents.',

        features: [
            {
                title: 'Design contemporain',
                description: 'Des pièces modernes et élégantes qui subliment vos espaces et renforcent votre image.',
                iconName: 'FaChair'
            },
            {
                title: 'Gammes complètes',
                description: 'Collections cohérentes pour créer des aménagements harmonieux et parfaitement coordonnés.',
                iconName: 'FaRegLightbulb'
            },
            {
                title: 'Flexibilité totale',
                description: 'Solutions modulables qui s\'adaptent à tous types d\'espaces et de configurations.',
                iconName: 'FaChartLine'
            },
            {
                title: 'Livraison et installation',
                description: 'Service complet incluant livraison, installation et reprise selon vos horaires.',
                iconName: 'FaUsers'
            }
        ],

        applications: [
            'Réceptions et cocktails',
            'Mariages et cérémonies',
            'Salons professionnels',
            'Espaces VIP',
            'Lounge et chill-out',
            'Conférences et séminaires',
            'Showrooms temporaires',
            'Terrasses événementielles'
        ],

        subcategories: [
            { id: 'all', name: 'Tous les produits' },
            { id: 'mange-debout', name: 'Mange-debout' },
            { id: 'assises', name: 'Chaises et tabourets' },
            { id: 'tables', name: 'Tables' },
            { id: 'lounge', name: 'Mobilier lounge' },
            { id: 'lumineux', name: 'Mobilier lumineux' },
            { id: 'comptoirs', name: 'Comptoirs et bars' },
            { id: 'accessoires', name: 'Accessoires déco' }
        ],

        products: [
            {
                id: 1,
                name: 'Mange-debout Premium',
                category: 'mange-debout',
                image: '/images/products/mobilier/mange-debout-premium.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 18€/jour',
                description: `Mange-debout haut de gamme avec plateau en bois massif et pied chrome, idéal pour cocktails et réceptions élégantes.`,
                specs: ['Ø 80cm', 'Hauteur 110cm', 'Finition bois massif', 'Pied chromé']
            },
            {
                id: 2,
                name: 'Tabouret Bar Design',
                category: 'assises',
                image: '/images/products/mobilier/tabouret-bar-design.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 12€/jour',
                description: `Tabouret de bar au design contemporain, assise confortable en similicuir et structure en métal, parfait pour accompagner les mange-debout.`,
                specs: ['Hauteur 75cm', 'Similicuir blanc ou noir', 'Pied chromé', 'Repose-pieds']
            },
            {
                id: 3,
                name: 'Table ronde 8 personnes',
                category: 'tables',
                image: '/images/products/mobilier/table-ronde-8.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 22€/jour',
                description: `Table ronde pour repas assis, stable et élégante, compatible avec nappage et décoration florale.`,
                specs: ['Ø 150cm', 'Hauteur 75cm', '8 personnes', 'Pliable']
            },
            {
                id: 4,
                name: 'Chaise Napoleon Transparente',
                category: 'assises',
                image: '/images/products/mobilier/chaise-napoleon-transparente.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 8€/jour',
                description: `Chaise élégante style Napoleon en polycarbonate transparent, allie tradition et modernité, parfaite pour cérémonies et dîners de gala.`,
                specs: ['Style Napoleon', 'Polycarbonate transparent', 'Empilable', 'Usage intérieur/extérieur']
            },
            {
                id: 5,
                name: 'Set Lounge Blanc',
                category: 'lounge',
                image: '/images/products/mobilier/set-lounge-blanc.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 180€/jour',
                description: `Ensemble lounge comprenant canapé deux places, deux fauteuils et table basse, parfait pour créer un espace détente raffiné.`,
                specs: ['Canapé 2 places', '2 fauteuils', 'Table basse', 'Similicuir blanc']
            },
            {
                id: 6,
                name: 'Cube Lumineux LED',
                category: 'lumineux',
                image: '/images/products/mobilier/cube-lumineux-led.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 25€/jour',
                description: `Cube lumineux multicolore à LED, utilisable comme table basse, assise ou élément décoratif, télécommande pour changement de couleur.`,
                specs: ['40x40x40cm', 'LED RGB', 'Batterie rechargeable', 'Télécommande incluse']
            },
            {
                id: 7,
                name: 'Comptoir d\'accueil lumineux',
                category: 'comptoirs',
                image: '/images/products/mobilier/comptoir-accueil-lumineux.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 85€/jour',
                description: `Comptoir d'accueil design avec façade lumineuse personnalisable, idéal pour réceptions, salons et points d'information.`,
                specs: ['160x60x110cm', 'LED intégrées', 'Stickage personnalisable', 'Rangement intérieur']
            },
            {
                id: 8,
                name: 'Bar modulaire',
                category: 'comptoirs',
                image: '/images/products/mobilier/bar-modulaire.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 120€/jour',
                description: `Système de bar modulaire permettant différentes configurations, façade personnalisable et éclairage LED intégré.`,
                specs: ['Modules courbes et droits', 'LED RGB', 'Étagères intérieures', 'Hauteur 110cm']
            },
            {
                id: 9,
                name: 'Ensemble Terrasse Rotin',
                category: 'lounge',
                image: '/images/products/mobilier/ensemble-terrasse-rotin.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 150€/jour',
                description: `Ensemble de mobilier extérieur en rotin synthétique résistant aux intempéries, comprenant canapé, fauteuils et table basse.`,
                specs: ['Rotin synthétique', 'Coussins waterproof', 'Canapé + 2 fauteuils + table', 'Usage extérieur']
            },
            {
                id: 10,
                name: 'Pack Salon Pro 50 personnes',
                category: 'all',
                image: '/images/products/mobilier/pack-salon-pro.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 750€/jour',
                description: `Solution complète pour salons professionnels comprenant comptoirs d'accueil, ensemble de mange-debout avec tabourets, mobilier lounge et accessoires.`,
                specs: ['2 comptoirs', '10 mange-debout', '30 tabourets', '2 espaces lounge', 'Livraison et installation']
            },
            {
                id: 11,
                name: 'Tapis lounge gris',
                category: 'accessoires',
                image: '/images/products/mobilier/tapis-lounge-gris.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 35€/jour',
                description: `Grand tapis contemporain pour délimiter des espaces lounge et ajouter confort et chaleur à vos configurations d'assises.`,
                specs: ['200x300cm', 'Poils courts', 'Gris anthracite', 'Nettoyage professionnel']
            },
            {
                id: 12,
                name: 'Table basse Design',
                category: 'tables',
                image: '/images/products/mobilier/table-basse-design.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 30€/jour',
                description: `Table basse au design épuré avec plateau en verre et piétement chromé, parfaite pour espaces lounge et VIP.`,
                specs: ['100x60cm', 'Hauteur 40cm', 'Plateau verre', 'Structure chromée']
            }
        ],

        faq: [
            {
                question: 'Puis-je personnaliser le mobilier avec mon logo ou mes couleurs ?',
                answer: 'Oui, plusieurs éléments de notre gamme sont personnalisables, notamment les comptoirs d\'accueil, les bars modulaires et certains éléments lumineux. Nous proposons des services de stickage temporaire ou d\'habillage textile aux couleurs de votre événement. Pour des projets spécifiques, nous pouvons également créer des pièces sur mesure avec un délai supplémentaire.'
            },
            {
                question: 'Comment choisir la bonne quantité de mobilier pour mon événement ?',
                answer: 'Voici quelques règles générales : pour un cocktail debout, prévoyez 1 mange-debout pour 6-8 personnes. Pour un dîner assis, une table ronde de 150cm accueille 8 personnes confortablement. Pour un espace lounge, comptez environ 3m² par personne. Notre équipe peut réaliser un plan d\'implantation précis selon votre espace et le nombre d\'invités.'
            },
            {
                question: 'Le mobilier est-il adapté pour l\'extérieur ?',
                answer: 'Une partie de notre mobilier est spécifiquement conçue pour l\'extérieur, comme nos ensembles en résine tressée, nos chaises en polypropylène ou notre mobilier en métal traité. Pour le mobilier non prévu pour l\'extérieur, nous recommandons de prévoir un espace couvert ou une solution de repli en cas d\'intempéries. N\'hésitez pas à préciser vos besoins extérieurs lors de votre demande.'
            },
            {
                question: 'Quels sont les délais de livraison et d\'installation ?',
                answer: 'Pour les commandes standard, nous effectuons la livraison et l\'installation la veille ou le matin de votre événement, selon vos préférences et les contraintes du lieu. Le démontage se fait généralement le soir même ou le lendemain. Pour les grands événements, nous pouvons organiser une installation progressive sur plusieurs jours. Une coordination préalable avec le lieu de réception est toujours effectuée.'
            },
            {
                question: 'Comment le mobilier est-il livré et installé ?',
                answer: 'Notre équipe logistique se charge de tout : livraison avec camions adaptés, déchargement, installation selon le plan défini, et bien sûr reprise à la fin de l\'événement. Le mobilier est minutieusement vérifié avant chaque livraison et nous apportons un soin particulier à la protection des sols et accès pendant l\'installation. Un chef d\'équipe sera votre contact sur place pour toute demande de dernière minute.'
            }
        ],

        ctaTitle: 'Créez l\'ambiance parfaite avec notre mobilier événementiel',
        ctaDescription: 'Nos designers vous accompagnent dans la sélection et l\'aménagement d\'espaces fonctionnels et esthétiques adaptés à votre événement et votre image.'
    },

    'photobooth': {
        slug: 'photobooth',
        name: 'Photobooth',
        title: 'CAPTUREZ DES SOUVENIRS INOUBLIABLES',
        subtitle: 'Solutions photo interactives et ludiques pour animer vos événements',
        color: '#4B0082',
        iconName: 'FaCamera',
        bannerImage: '/images/category-headers/photobooth-banner.jpg',
        metaDescription: `Location de photobooths et animations photo interactives en région PACA. Bornes photos, miroirs magiques et accessoires pour mariages, événements d'entreprise et soirées privées.`,
        description: 'Les <span class="text-[#4B0082] font-semibold">photobooths créent des moments de partage</span> et d\'amusement tout en offrant à vos invités un souvenir tangible de votre événement. Nos solutions interactives, personnalisables et technologiquement avancées garantissent une animation appréciée par tous les publics.',

        features: [
            {
                title: 'Personnalisation complète',
                description: 'Designs et templates aux couleurs de votre événement, avec logos et messages personnalisés.',
                iconName: 'FaCamera'
            },
            {
                title: 'Technologie intuitive',
                description: 'Interfaces simples et conviviales pour que tous vos invités puissent participer facilement.',
                iconName: 'FaRegLightbulb'
            },
            {
                title: 'Partage instantané',
                description: 'Options de partage immédiat sur réseaux sociaux et par email pour une portée maximale.',
                iconName: 'FaChartLine'
            },
            {
                title: 'Animations exclusives',
                description: 'Fonctionnalités innovantes comme la réalité augmentée, les GIFs animés ou les mosaïques photos.',
                iconName: 'FaUsers'
            }
        ],

        applications: [
            'Mariages et fêtes',
            'Soirées d\'entreprise',
            'Salons professionnels',
            'Lancements de produits',
            'Événements promotionnels',
            'Galas et cérémonies',
            'Anniversaires',
            'Festivals et concerts'
        ],

        subcategories: [
            { id: 'all', name: 'Tous les produits' },
            { id: 'bornes', name: 'Bornes photo' },
            { id: 'miroirs', name: 'Miroirs magiques' },
            { id: 'selfie', name: 'Stations selfie' },
            { id: 'impressions', name: 'Solutions d\'impression' },
            { id: 'accessoires', name: 'Accessoires photo' },
            { id: 'backdrops', name: 'Fonds et décors' },
            { id: 'animations', name: 'Animations spéciales' }
        ],

        products: [
            {
                id: 1,
                name: 'Borne Photobooth Classic',
                category: 'bornes',
                image: '/images/products/photobooth/borne-classic.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 390€/jour',
                description: `Borne photo traditionnelle avec écran tactile, impression instantanée et personnalisation complète de l'interface et des impressions.`,
                specs: ['Écran tactile 22"', 'Imprimante sublimation', 'Personnalisation complète', 'Assistant inclus']
            },
            {
                id: 2,
                name: 'Miroir Magique XL',
                category: 'miroirs',
                image: '/images/products/photobooth/miroir-magique-xl.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 490€/jour',
                description: `Miroir interactif grand format qui interagit avec vos invités, propose des animations sur l'écran et imprime des photos haute qualité.`,
                specs: ['Miroir 65"', 'Animations interactives', 'Signature tactile', 'Partage instantané']
            },
            {
                id: 3,
                name: 'Bornes selfies',
                category: 'selfie',
                image: '/images/products/photobooth/station-selfie-360.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 590€/jour',
                description: `Plateforme rotative filmant vos invités à 360 degrés pour créer des vidéos spectaculaires au ralenti, effet Matrix garanti.`,
                specs: ['Rotation 360°', 'Vidéos slow-motion', 'Éclairage LED intégré', 'Partage immédiat']
            },
            {
                id: 4,
                name: 'Imprimante Photo Portable',
                category: 'impressions',
                image: '/images/products/photobooth/imprimante-portable.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 120€/jour',
                description: `Solution d'impression portable pour smartphones, permettant à vos invités d'imprimer directement leurs propres photos via une application dédiée.`,
                specs: ['Format 10x15cm', 'Connexion WiFi', 'Batterie autonome', 'Application iOS/Android']
            },
            {
                id: 11,
                name: 'Installation d\'équipement',
                category: 'impressions',
                image: '/images/products/photobooth/imprimante-portable.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 120€/jour',
                description: `Installation d'equipement de sons et limiteurs sonores, lumières et écrans vidéos`,
                specs: ['Format 10x15cm', 'Connexion WiFi', 'Batterie autonome', 'Application iOS/Android']
            },
            {
                id: 5,
                name: 'Pack Accessoires Deluxe',
                category: 'accessoires',
                image: '/images/products/photobooth/pack-accessoires-deluxe.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 60€/jour',
                description: `Ensemble complet de plus de 50 accessoires photo premium : chapeaux, lunettes, masques, cadres, messages et accessoires thématiques.`,
                specs: ['50+ accessoires', 'Support inclus', 'Personnalisation possible', 'Thèmes variés']
            },
            {
                id: 6,
                name: 'Fond Sequin Réversible',
                category: 'backdrops',
                image: '/images/products/photobooth/fond-sequin-reversible.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 80€/jour',
                description: `Toile de fond en sequins réversibles (doré/argenté) créant un effet scintillant et changeant selon le toucher, idéal pour photos glamour.`,
                specs: ['2.5x2.5m', 'Sequins réversibles', 'Support inclus', 'Installation rapide']
            },
            {
                id: 7,
                name: 'Animation GIF Boomerang',
                category: 'animations',
                image: '/images/products/photobooth/animation-gif-boomerang.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 350€/jour',
                description: `Station photo créant des GIFs animés et effets boomerang, partageable instantanément par email ou sur les réseaux sociaux.`,
                specs: ['GIFs animés', 'Effet boomerang', 'Tablette tactile', 'Galerie en ligne']
            },
            {
                id: 8,
                name: 'Borne Holographique 3D',
                category: 'animations',
                image: '/images/products/photobooth/borne-holographique.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 750€/jour',
                description: `Technologie de pointe créant un hologramme 3D de vos invités, capturé et visualisable sous tous les angles, effet "wahou" garanti.`,
                specs: ['Capture 3D', 'Visualisation 360°', 'Technologie holographique', 'Technicien dédié']
            },
            {
                id: 9,
                name: 'Décor LED Photo Corner',
                category: 'backdrops',
                image: '/images/products/photobooth/decor-led-corner.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 150€/jour',
                description: `Espace photo complet avec mur de fleurs artificielles, cadre géant personnalisable et éclairage LED ambiance, parfait pour les zones photo Instagram.`,
                specs: ['Mur 2x2m', 'Éclairage LED', 'Cadre personnalisable', 'Installation incluse']
            },
            {
                id: 10,
                name: 'Pack Photobooth Mariage',
                category: 'all',
                image: '/images/products/photobooth/pack-photobooth-mariage.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 550€',
                description: `Solution complète pour mariage comprenant borne photo personnalisée, livre d'or digital, accessoires thématiques et technicien pour toute la soirée.`,
                specs: ['Borne photo tactile', 'Livre d\'or digital', 'Accessoires personnalisés', 'Technicien dédié 6h']
            }
        ],

        faq: [
            {
                question: 'Comment personnaliser les impressions et l\'interface du photobooth ?',
                answer: 'Nous adaptons entièrement l\'interface et les impressions à votre événement : couleurs, logo, messages personnalisés, template d\'impression spécifique... Vous nous transmettez simplement votre charte graphique ou vos souhaits, et nous créons un design sur mesure. Une validation préalable vous est systématiquement proposée avant l\'événement.'
            },
            {
                question: 'Combien d\'espace faut-il prévoir pour installer un photobooth ?',
                answer: 'Selon le modèle choisi, l\'espace nécessaire varie : environ 2x2m pour une borne classique, 3x3m pour un miroir magique avec zone pour les invités, et 4x4m minimum pour une station 360°. Il faut également prévoir un accès à une prise électrique standard. Nous pouvons adapter nos installations à vos contraintes d\'espace avec une visite technique préalable si nécessaire.'
            },
            {
                question: 'Un technicien reste-t-il présent pendant l\'événement ?',
                answer: 'Oui, pour la plupart de nos offres, un technicien reste présent durant tout l\'événement. Son rôle est de veiller au bon fonctionnement de l\'équipement, d\'encourager les invités à participer, d\'aider à l\'utilisation des accessoires et de résoudre immédiatement tout problème technique. Pour certaines solutions simples, nous proposons aussi une option sans technicien avec une hotline dédiée.'
            },
            {
                question: 'Est-il possible de récupérer toutes les photos après l\'événement ?',
                answer: 'Absolument. Toutes les photos sont enregistrées dans une qualité supérieure à celle de l\'impression. Après l\'événement, nous vous fournissons une galerie en ligne sécurisée où vous pouvez télécharger individuellement ou en lot toutes les photos. Sur demande, nous pouvons également fournir une clé USB ou un lien de téléchargement. Les photos restent disponibles pendant 3 mois.'
            },
            {
                question: 'Proposez-vous des formules avec partage sur réseaux sociaux ?',
                answer: 'Oui, la plupart de nos photobooths proposent des fonctionnalités de partage immédiat vers les réseaux sociaux (Instagram, Facebook, Twitter) ou par email. Nous pouvons configurer des hashtags personnalisés et même créer une galerie en ligne dédiée à votre événement. Cette option est particulièrement appréciée pour les événements d\'entreprise et les lancements de produits pour augmenter la visibilité sur les réseaux.'
            }
        ],

        ctaTitle: 'Offrez une expérience photo mémorable à vos invités',
        ctaDescription: 'Nos solutions interactives créent des moments de partage et d\'amusement tout en renforçant l\'image de votre événement. Contactez nos experts pour une animation photo sur mesure.'
    },

    'equipements': {
        slug: 'equipements',
        name: 'Équipements Festifs',
        title: 'DYNAMISEZ VOS ÉVÉNEMENTS AVEC DES ANIMATIONS LUDIQUES',
        subtitle: 'Machines à sensations et animations gourmandes pour tous vos événements',
        color: '#87CEEB',
        iconName: 'FaGlassCheers',
        bannerImage: '/images/category-headers/equipements-banner.jpg',
        metaDescription: `Location de machines alimentaires et animations festives en région PACA. Machines à barbe à papa, pop-corn, crêpes, hot-dogs, skydancers et autres équipements pour animer vos événements.`,
        description: 'Les <span class="text-[#87CEEB] font-semibold">équipements festifs apportent cette touche d\'originalité</span> qui transforme un simple événement en expérience mémorable. Nos machines alimentaires et animations ludiques créent des pôles d\'attraction et des moments de convivialité appréciés par tous les publics.',

        features: [
            {
                title: 'Animations conviviales',
                description: 'Créez des espaces interactifs qui favorisent les échanges et l\'amusement entre participants.',
                iconName: 'FaGlassCheers'
            },
            {
                title: 'Équipements professionnels',
                description: 'Machines de qualité professionnelle, entretenues et certifiées pour une utilisation en événementiel.',
                iconName: 'FaRegLightbulb'
            },
            {
                title: 'Personnalisation possible',
                description: 'Adaptez les animations à votre thème avec des options de personnalisation et décoration.',
                iconName: 'FaChartLine'
            },
            {
                title: 'Service clé en main',
                description: 'Personnel qualifié pour l\'installation, le service et la gestion complète de l\'animation.',
                iconName: 'FaUsers'
            }
        ],

        applications: [
            'Festivals et foires',
            'Événements d\'entreprise',
            'Salons professionnels',
            'Anniversaires et fêtes',
            'Événements sportifs',
            'Mariages',
            'Lancements de produits',
            'Animations commerciales'
        ],

        subcategories: [
            { id: 'all', name: 'Tous les produits' },
            { id: 'sucre', name: 'Machines sucrées' },
            { id: 'sale', name: 'Machines salées' },
            { id: 'boissons', name: 'Fontaines et boissons' },
            { id: 'gonflables', name: 'Structures gonflables' },
            { id: 'jeux', name: 'Jeux géants' },
            { id: 'sport', name: 'Animations sportives' },
            { id: 'enfants', name: 'Animations enfants' }
        ],

        products: [
            {
                id: 1,
                name: 'Machine à Barbe à Papa Professionnelle',
                category: 'sucre',
                image: '/images/products/equipements/machine-barbe-papa.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 180€/jour',
                description: `Machine professionnelle à barbe à papa avec chariot décoré, préparation en continu et différentes saveurs disponibles, animation gourmande idéale pour tous publics.`,
                specs: ['Production continue', 'Personnalisation possible', 'Personnel inclus', 'Consommables fournis']
            },
            {
                id: 2,
                name: 'Machine à Pop-corn Vintage',
                category: 'sucre',
                image: '/images/products/equipements/machine-popcorn-vintage.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 150€/jour',
                description: `Chariot pop-corn au style rétro américain, production en continu avec différentes saveurs (sucré, salé, caramel), cornet personnalisable aux couleurs de votre événement.`,
                specs: ['Style rétro', '100 portions/heure', 'Personnel inclus', 'Cornets personnalisables']
            },
            {
                id: 3,
                name: 'Machine à Hot-dogs Professionnelle',
                category: 'sale',
                image: '/images/products/equipements/machine-hotdogs.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 220€/jour',
                description: `Équipement complet pour la préparation de hot-dogs avec grill pour saucisses et chauffe-pains, accompagnements et sauces variés disponibles.`,
                specs: ['150 hot-dogs/heure', 'Serveur inclus', 'Variété de sauces', 'Personnalisation possible']
            },
            {
                id: 4,
                name: 'Fontaine à Chocolat 5 étages',
                category: 'boissons',
                image: '/images/products/equipements/fontaine-chocolat.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 190€/jour',
                description: `Impressionnante fontaine à chocolat cascade pour trempage de fruits, guimauves et autres délices, idéale pour buffets et réceptions élégantes.`,
                specs: ['5 étages', 'Chocolat premium', 'Accompagnements variés', 'Personnel inclus']
            },
            {
                id: 5,
                name: 'Skydancer 6m',
                category: 'gonflables',
                image: '/images/products/equipements/skydancer.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 180€/jour',
                description: `Bonhomme gonflable animé de 6 mètres attirant l'attention avec ses mouvements aléatoires, personnalisable aux couleurs de votre marque ou événement.`,
                specs: ['Hauteur 6m', 'Personnalisable', 'Utilisable extérieur', 'Installation incluse']
            },
            {
                id: 6,
                name: 'Machine à Crêpes Professionnelle',
                category: 'sucre',
                image: '/images/products/equipements/machine-crepes.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 200€/jour',
                description: `Station de préparation de crêpes fraîches avec une large variété de garnitures sucrées, personnel qualifié inclus pour la préparation.`,
                specs: ['Double plaque', '120 crêpes/heure', 'Personnel inclus', '10 garnitures au choix']
            },
            {
                id: 7,
                name: 'Machine à Granités 3 bacs',
                category: 'boissons',
                image: '/images/products/equipements/machine-granites.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 170€/jour',
                description: `Appareil à granités/slush professionnel avec trois bacs pour différentes saveurs rafraîchissantes, parfait pour événements estivaux.`,
                specs: ['3 bacs x 12L', 'Multiples saveurs', 'Gobelet personnalisable', 'Personnel inclus']
            },
            {
                id: 8,
                name: 'Jeux en Bois Géants',
                category: 'jeux',
                image: '/images/products/equipements/jeux-bois-geants.jpg',
                isAvailableForRent: true,
                isAvailableForSale: true,
                price: 'À partir de 250€/jour',
                description: `Collection de jeux traditionnels en bois format XXL (Jenga géant, Mikado, puissance 4, palet...), idéals pour animations conviviales en intérieur ou extérieur.`,
                specs: ['10 jeux différents', 'Format géant', 'Animateur inclus', 'Intérieur/extérieur']
            },
            {
                id: 9,
                name: 'Château Gonflable Multiactivités',
                category: 'enfants',
                image: '/images/products/equipements/chateau-gonflable.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 290€/jour',
                description: `Structure gonflable sécurisée avec multiples activités (toboggan, obstacles, trampoline) pour enfants de 3 à 12 ans, surveillance incluse.`,
                specs: ['5x5m', 'Jusqu\'à 10 enfants', 'Superviseur inclus', 'Certificat sécurité']
            },
            {
                id: 10,
                name: 'Baby-foot Humain',
                category: 'sport',
                image: '/images/products/equipements/babyfoot-humain.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 350€/jour',
                description: `Version grandeur nature du baby-foot où les joueurs sont les figurines, animation ludique et sportive idéale pour team building et événements festifs.`,
                specs: ['12 joueurs', 'Dimensions 10x5m', 'Animateur inclus', 'Intérieur/extérieur']
            },
            {
                id: 11,
                name: 'Bar à Smoothies Vélo',
                category: 'boissons',
                image: '/images/products/equipements/velo-smoothies.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 320€/jour',
                description: `Concept original où les participants pédalent pour mixer leur propre smoothie, animation interactive alliant fun et sensibilisation écologique.`,
                specs: ['2 vélos mixeurs', 'Fruits frais inclus', 'Personnel inclus', 'Personnalisation possible']
            },
            {
                id: 12,
                name: 'Pack Animation Fête Foraine',
                category: 'all',
                image: '/images/products/equipements/pack-fete-foraine.jpg',
                isAvailableForRent: true,
                isAvailableForSale: false,
                price: 'À partir de 750€/jour',
                description: `Ensemble complet d'animations type fête foraine comprenant machine à barbe à papa, pop-corn, pêche aux canards et jeux d'adresse, avec personnel.`,
                specs: ['4 animations', '2 animateurs inclus', 'Décoration thématique', 'Lots pour gagnants']
            }
        ],

        faq: [
            {
                question: 'Quel espace faut-il prévoir pour ces équipements ?',
                answer: 'L\'espace nécessaire varie selon les équipements : comptez environ 3x2m pour une machine alimentaire avec son opérateur, 6x6m minimum pour un château gonflable, et 10x5m pour un baby-foot humain. Pour les animations complexes comme le pack fête foraine, un espace de 30-50m² est recommandé. Nous pouvons réaliser un plan d\'implantation sur demande et adapter certaines animations aux contraintes spatiales.'
            },
            {
                question: 'Les machines nécessitent-elles des arrivées électriques spécifiques ?',
                answer: 'La plupart de nos machines fonctionnent sur alimentation standard 220V/16A. Pour certains équipements plus puissants (comme plusieurs machines alimentaires simultanées), des besoins spécifiques peuvent s\'appliquer. Nous vérifions toujours en amont les disponibilités électriques du lieu et pouvons fournir des adaptateurs ou rallonges si nécessaire. Pour les sites sans électricité, des solutions autonomes sont envisageables.'
            },
            {
                question: 'Comment se passe l\'installation de ces équipements ?',
                answer: 'Nos équipes se chargent intégralement de l\'installation et du démontage. Nous arrivons généralement 1h à 3h avant le début de l\'animation (selon la complexité) pour tout mettre en place. Le démontage s\'effectue immédiatement après la fin, sauf accord contraire. Pour les structures gonflables et équipements volumineux, un accès facile (sans nombreux escaliers) est nécessaire.'
            },
            {
                question: 'Les consommables sont-ils inclus dans le prix de location ?',
                answer: 'Oui, pour la plupart de nos offres, les consommables de base sont inclus dans le prix (ex: sucre et arômes pour barbe à papa, maïs pour pop-corn, pâte à crêpes). Nous calculons les quantités en fonction du nombre de participants annoncé. Des options de consommables premium ou personnalisés peuvent être proposées en supplément. Pour les événements de grande envergure, des forfaits spécifiques sont établis.'
            },
            {
                question: 'Est-il possible de personnaliser ces animations aux couleurs de notre événement ?',
                answer: 'Absolument ! De nombreuses options de personnalisation sont disponibles : habillage des chariots aux couleurs de votre événement, personnalisation des contenants (cornets, gobelets), impression de votre logo sur certains produits, ou même création de formes et couleurs spécifiques pour les barbes à papa ou smoothies. Pour les structures gonflables et skydancers, des options de personnalisation graphique sont également possibles avec un délai supplémentaire.'
            }
        ],

        ctaTitle: 'Ajoutez une touche festive à votre événement',
        ctaDescription: 'Surprenez vos invités avec des animations ludiques et gourmandes qui rendront votre événement inoubliable. Nos experts vous aideront à sélectionner les équipements parfaitement adaptés à votre public.'
    },

}

export function getServiceData(slug: string): ServiceData | null {
    return servicesData[slug] || null
}

export function getAllServiceSlugs(): string[] {
    return Object.keys(servicesData)
}