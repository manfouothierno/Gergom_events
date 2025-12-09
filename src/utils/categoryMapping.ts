
// src/utils/categoryMapping.ts

export type AudienceType = 'all' | 'particulier' | 'pro';

// Map specific category slugs to an audience.
// If a category is not listed, it will default to showing for 'all' or you can decide logic.
// You should update these slugs to match your actual Sanity category slugs.
export const CATEGORY_AUDIENCE_MAP: Record<string, AudienceType> = {
    // Particuliers
    'mariage': 'particulier',
    'anniversaire': 'particulier',
    'soiree-privee': 'particulier',
    'bapteme': 'particulier',
    
    // Professionnels
    'seminaire': 'pro',
    'lancement-produit': 'pro',
    'inauguration': 'pro',
    'institutionnel': 'pro',
    'soiree-entreprise': 'pro',
    'salon': 'pro',
    'congres': 'pro',
    'team-building': 'pro',
};

// Helper to check if a category belongs to an audience
export const isCategoryForAudience = (categorySlug: string, audience: AudienceType): boolean => {
    if (audience === 'all') return true;
    
    const mappedAudience = CATEGORY_AUDIENCE_MAP[categorySlug];
    
    // If mapped, check match.
    if (mappedAudience) {
        return mappedAudience === audience;
    }
    
    // If not mapped, decide default behavior. 
    // For now, let's say unmapped categories show for everyone? 
    // Or maybe restrict them? Let's show for all for safety.
    return true; 
};
