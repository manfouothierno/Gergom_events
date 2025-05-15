
// src/lib/services.ts

import {HeaderServiceMenuItem, Product, SanityServiceData} from '@/types/services'; // Import the updated types
import {sanityFetch} from '@/lib/sanity';
import {CtaSectionData, GoogleReviewsSectionData, HeroSliderData} from "@/types/homepage"; // Import the configured client helper

import { AboutSectionData, TeamMember, Client, TimelineEvent, StatItem } from '@/types/aboutSection';
import {RealisationListingItem} from "@/types/realisation";
import {SiteFooterData} from "@/types/siteSettings";
import {ContactPageData} from "@/types/contactPage";

// --- New query to fetch data for the Service list on the homepage ---
const allServiceListingDataQuery = `*[_type == "service" && defined(slug.current)] | order(name asc){ // Adjust ordering as needed
    _id,
    "slug": slug.current,
    name,
    iconName,
    color, // Fetches the color object
    "bannerImage": bannerImage.asset->url, // Fetches the image URL
    metaDescription
}`;

/**
 * Fetches data for the service listing section (e.g., homepage).
 * Returns an array of ServiceListItemData.
 */
export async function getAllServiceListingData(): Promise<SanityServiceData[]> {
    // Fetch data for all services with only the required fields for the list
    // Use a tag like 'serviceList' for specific revalidation targeting just this list if needed
    // Basic data shaping/validation
    // const shapedServices = servicesList.map(service => ({
    //     _id: service._id,
    //     slug: service.slug,
    //     name: service.name,
    //     iconName: service.iconName,
    //     color: service.color, // Keep the color object
    //     bannerImageUrl: service.bannerImage,
    //     metaDescription: service.metaDescription,
    // }));


    return await sanityFetch<SanityServiceData[]>({
        query: allServiceListingDataQuery,
        tags: ['serviceList', 'service'], // Add 'service' tag as list depends on all services
    });
}

// GROQ query to fetch a single service by slug, tailored to match SanityServiceData
const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0]{
  _id,
  _type,
  name,
  title,
  subtitle,
  color, // This will fetch the color object { _type: 'color', hex: '...', ...}
  iconName,
  "bannerImage": bannerImage.asset->url, // Fetch the raw image URL
  metaDescription,
  description, // Fetches Portable Text array
  features[]{
    title,
    description,
    iconName
  },
  applications,
  subcategories[]{
    id,
    name
  },
  products[]{
    _key, // Important for list stability in React/arrays when data changes
    id, // Fetch the unique string ID you added
    name,
    category,
    "image": image.asset->url, // Fetch the raw image URL
    isAvailableForRent,
    isAvailableForSale,
    price,
    description, // Assuming product description is simple string
    specs
  },
  faq[]{
    _key, // Important for lists
    question,
    answer // Fetches Portable Text array
  },
  ctaTitle,
  ctaDescription
}`;

// GROQ query to fetch slugs for all services
// Note: Using slug.current requires index on slug field for efficiency
const allServiceSlugsQuery = `*[_type == "service" && defined(slug.current)]{
  "slug": slug.current
}`;

// Consider adding tags for potential future revalidation via webhooks
const serviceTags = (slug?: string) => ['service', ...(slug ? [`service:${slug}`] : [])];


/**
 * Fetches data for a single service by its slug.
 * Returns null if the service is not found.
 */
export async function getServiceData(slug: string): Promise<SanityServiceData | null> {
    // next-sanity's fetch includes caching options specific to Next.js data fetching
    console.log(serviceTags(slug))
    const service = await sanityFetch<SanityServiceData | null>({
        query: serviceBySlugQuery,
        params: { slug },
        tags: serviceTags(slug), // Add relevant tags for revalidation
        cache: 'force-cache', // Use 'force-cache' for SSG, 'no-store' for pure SSR/Dynamic
        revalidate: 3600 // Or define revalidation time
    });

    console.log(service);

    // You might still want basic checks if the query can return partial data
    if (service && service._id) {
        // Sanity query already fetched the slug.current into the 'slug' field
        return service;
    }

    return null; // Return null if service not found
}


/**
 * Fetches all service slugs for use in dynamic routes (e.g., generateStaticParams).
 * Only fetches published slugs that are defined.
 */
export async function getAllServiceSlugs(): Promise<{ slug: string }[]> { // Returning objects { slug: string } is typical for generateStaticParams
    // Adding 'service' tag allows revalidation of all service-related pages via a webhook
    const slugs = await sanityFetch<{ slug: string }[]>({ query: allServiceSlugsQuery, tags: ['service'] });

    // Filter out any null or undefined slugs if necessary, although query filters for defined
    return slugs.filter(item => typeof item?.slug === 'string'); // Ensure slug is a string and not null
}


// Example for fetching products by subcategory within a service, using the helper

const productsByCategoryQuery = `*[_type == "service" && slug.current == $serviceSlug][0]{
    products[category == $categoryId]{ // Filter products array
       _key,
       id,
       name,
       category,
       "image": image.asset->url,
       isAvailableForRent,
       isAvailableForSale,
       price,
       description,
       specs
    }
}.products`; // .products to extract the filtered array

export async function getProductsForServiceByCategory(serviceSlug: string, categoryId: string): Promise<Product[] | null> {
    // Use tags specific to the service and category for granular revalidation
    const tags = serviceTags(serviceSlug).concat(`category:${categoryId}`);
    const products = await sanityFetch<Product[] | null>({
         query: productsByCategoryQuery,
         params: { serviceSlug, categoryId },
         tags,
         revalidate: 600 // Products might change more often than service details
    });
    return products;
}


// Selects service documents ordered by name, only if slug is defined.
const headerServiceMenuQuery = `*[_type == "service" && defined(slug.current)] | order(name asc){
  _id,
  name,
  "slug": slug.current, // Alias slug.current to 'slug' field
  color // Fetch the color object
}`;

/**
 * Fetches data specifically for the service menu in the Header component.
 * Returns an array of HeaderServiceMenuItem.
 */
export async function getHeaderServiceMenuItems(): Promise<HeaderServiceMenuItem[]> {
    // Use a tag like 'headerMenu' or 'service' for revalidation purposes
    const items = await sanityFetch<HeaderServiceMenuItem[]>({
        query: headerServiceMenuQuery,
        tags: ['service', 'headerMenu'], // These tags can be used with webhooks for revalidation
    });

    // Return the fetched array - should match HeaderServiceMenuItem type due to query
    return items;
}


const heroSliderQuery = `*[_type == "hero" && _id == "homepageHero"][0]{
  slides[]{
    _key, // Essential for list key
    _type, // should be 'heroSlide'
    title,
    subtitle,
    "image": image.asset->url // Resolve image asset to get URL
  }
}.slides`; // Projecting '.slides' will return the array directly

/**
 * Fetches data for the Hero section slider on the homepage.
 * Assumes a singleton 'hero' document with _id 'homepageHero'.
 * Returns an array of HeroSlide objects.
 */
export async function getHeroSliderData(): Promise<HeroSliderData> {
    // Fetch the slides array. Add tags for potential revalidation.
    const slides = await sanityFetch<HeroSliderData>({
        query: heroSliderQuery,
        tags: ['hero', 'homepage'], // Tags for revalidation (e.g., via webhook)
    });

    // Return the array of slides. It could be null if no document/slides found.
    // Let's return an empty array in that case for safer component mapping.
    return slides || [];
}


const aboutSectionQuery = `*[_type == "aboutSection" && _id == "aboutSectionHomepage"][0]{
  _id,
  _type,
  internalName,

  introductionTitle,
  introductionText, // Portable Text
  aboutButtonText,
  aboutButtonHref,
  "backgroundImage": backgroundImage.asset->url, // Resolved URL

  videoUrl, // String URL
  "videoPosterImage": videoPosterImage.asset->url, // Resolved URL

  timelineTitle,
  timelineEvents[]{
    _key,
    _type,
    year,
    title,
    description // Portable Text
  },

  teamSectionTitle,
  teamSectionDescription,
  teamMembers[]{
    _key,
    _type,
    name,
    role,
    "image": image.asset->url, // Resolved URL
    bio // Portable Text
  },

  clientSectionTitle,
  clientSectionText, // Portable Text
  clientSectionLinkText,
  clientSectionLinkHref,
  clients[]{
    _key,
    _type,
    name,
    "logo": logo.asset->url, // Resolved URL
     // url // if you added a url field to client schema
  },

  statsTitle,
  stats[]{
     _key,
     _type,
     value,
     valueSuffix,
     label,
     iconName
  }
  // Add other top-level fields here
}`;

/**
 * Fetches all data for the singleton About Section on the homepage.
 * Assumes a singleton 'aboutSection' document with _id 'aboutSectionHomepage'.
 * Returns AboutSectionData object or null if not found.
 */
export async function getAboutSectionData(): Promise<AboutSectionData | null> {
    // Use tags for revalidation purposes
    const data = await sanityFetch<AboutSectionData | null>({
        query: aboutSectionQuery,
        tags: ['aboutSection', 'homepage'], // Tags for revalidation (e.g., via webhook)
    });

    // Returning the data object. It will be null if no document matched the ID.
    return data;
}

const googleReviewsSectionQuery = `*[_type == "googleReviewsSection" && _id == "googleReviewsHomepage"][0]{
  _id,
  _type,
  internalName,
  sectionTitle,
  googlePlaceUrl,

  reviews[]{
    _key,
    _type,
    author,
    rating,
    text, // Fetch plain text if schema uses 'text'
    // If schema used blockContent for review text:
    // text[] { ... block content projection ... },
    publishedAt,
    "avatar": avatar.asset->url // Resolve image URL
  },

  ctaBannerTitle,
   // Fetch Portable Text if schema uses 'blockContent', or plain text if schema uses 'text'
  ctaBannerText, // Assume blockContent for CTA text for richer formatting
  ctaBannerLinkText,
  ctaBannerLinkHref,
  // Add other fields if any
}`;

/**
 * Fetches all data for the singleton Google Reviews Section on the homepage.
 * Assumes a singleton 'googleReviewsSection' document with _id 'googleReviewsHomepage'.
 * Returns GoogleReviewsSectionData object or null if not found.
 */
export async function getGoogleReviewsSectionData(): Promise<GoogleReviewsSectionData | null> {
    // Use tags for revalidation purposes
    const data = await sanityFetch<GoogleReviewsSectionData | null>({
        query: googleReviewsSectionQuery,
        tags: ['googleReviewsSection', 'homepage'], // Tags for revalidation
    });

    // The reviews array might be null or undefined if no reviews were added in Sanity
    // or if the main document/field is missing. Provide empty array fallback in component.
    return data;
}

const ctaSectionQuery = `*[_type == "ctaSection" && _id == "ctaSectionHomepage"][0]{
  _id,
  _type,
  internalName,
  "backgroundImage": backgroundImage.asset->url, // Resolved URL

  statsTitle,
  stats[]{
     _key,
     _type,
     numericValue, // Fetch numeric value
     displayValue, // Fetch display string
     label,
     iconName
  },

  ctaTitle,
  ctaText, // Fetch Block Content (if schema uses it)
  ctaButtonText,
  ctaButtonHref,
  ctaButtonIconName,
  // Add other fields if any
}`;

/**
 * Fetches all data for the singleton CTA Section on the homepage.
 * Assumes a singleton 'ctaSection' document with _id 'ctaSectionHomepage'.
 * Returns CtaSectionData object or null if not found.
 */
export async function getCtaSectionData(): Promise<CtaSectionData | null> {
    const data = await sanityFetch<CtaSectionData | null>({
        query: ctaSectionQuery,
        tags: ['ctaSection', 'homepage'], // Tags for revalidation
    });

    // Returning the data object.
    return data;
}

const realisationsListingQuery = `*[_type == "realisation"] | order(completionDate desc){
  _id,
  _type,
  "slug": slug.current, // Get the slug string
  "name": title, // Use 'title' field for the listing 'name'
  // Dereference the 'category' reference and get its name and slug
  category->{
      "categorySlug": slug.current,
      "categoryName": name
  },
  "imageUrl": mainImage.asset->url, // Dereference mainImage asset to get its URL
  completionDate, // Fetch date field (ISO string)
  shortDescription, // Text field
  // Dereference the 'servicesUsed' references to get an array of service names
  "servicesUsedNames": servicesUsed[]->name
}`;

/**
 * Fetches a list of all Realisations needed for the homepage section.
 * Returns an array of RealisationListingItem.
 */
export async function getRealisationsData(): Promise<RealisationListingItem[]> {
    // Use tags for potential revalidation
    const realisations = await sanityFetch<RealisationListingItem[]>({
        query: realisationsListingQuery,
        tags: ['realisation', 'realisationList', 'homepage'], // Add tags for revalidation
    });

    // Return the array. It could be null/undefined if no realisations, return empty array fallback.
    return realisations || [];
}


const siteFooterQuery = `*[_type == "siteFooter" && _id == "siteFooter"][0]{
  _id,
  _type,
  internalName,

  "logoFooter": logoFooter.asset->url, // Resolve logo image URL
  slogan,
  companyDescription, // Fetches Block Content or text based on schema

  contactSectionTitle,
  address, // Fetches Block Content or text
  phone,
  email,

  quickMenuTitle,
  quickMenuLinks[]{ // Array projection
    _key,
    _type,
    text,
    href, // Fetches string URL
    openInNewTab
  },

  legalMenuTitle,
  legalMenuLinks[]{ // Array projection
    _key,
    _type,
    text,
    href,
     openInNewTab
  },

  socialTitle,
  socialLinks[]{ // Array projection
    _key,
    _type,
    platform,
    url, // Fetches string URL
    iconName // Fetches string icon name
  },

  footerPartnersTitle,
  footerPartners[]{ // Reusing client object structure, resolve logo
     _key,
     _type,
     name,
     "logo": logo.asset->url, // Resolve logo image URL for partner
     // url // if you added a url field to the client schema
  },

  copyrightText,
  developerText,
  developerLinkText,
  developerLinkHref, // Fetches string URL

  // Add other top-level fields
}`;

/**
 * Fetches all data for the singleton Site Footer configuration document.
 * Assumes a singleton 'siteFooter' document with _id 'siteFooter'.
 * Returns SiteFooterData object or null if not found.
 */
export async function getFooterData(): Promise<SiteFooterData | null> {
    // Use tags for revalidation purposes
    const data = await sanityFetch<SiteFooterData | null>({
        query: siteFooterQuery,
        tags: ['siteSettings', 'footer'], // Tags for revalidation
    });

    // Returning the data object.
    return data;
}


const contactPageQuery = `*[_type == "contactPage" && _id == "contactPage"][0]{
  _id,
  _type,
  internalName,

  // Banner
  "bannerImage": bannerImage.asset->url, // Resolved URL
  bannerTitle,
  bannerSubtitle,

  // Form Section
  formSectionTitle,

  // Contact Info Section
  infoSectionTitle,
  address, // Fetches Block Content or text based on schema
  phone,
  email,

  // Map Section
  mapSectionTitle,
  mapConfig{ // Nested object projection
     mapEmbedUrl
  },

  // FAQ Section
  faqSectionTitle,
  faqItems[]{ // Array projection (reusing faqItem type from service schema)
    _key,
    _type, // should be 'faqItem'
    question,
    answer // Portable Text
  },

  // Other Contact Methods Section
  otherMethodsSectionTitle,
  otherContactMethods[]{ // Array projection
    _key,
    _type, // should be 'contactMethodItem'
    title,
    "iconImage": iconImage.asset->url, // Resolved URL for icon
    description, // Fetches Block Content or text
    contactLinkText,
    contactLinkHref
  },

  // Metadata
  metadataTitle,
  metadataDescription,

  // Add other fields if any
}`;

/**
 * Fetches all data for the singleton Contact Page document.
 * Assumes a singleton 'contactPage' document with _id 'contactPage'.
 * Returns ContactPageData object or null if not found.
 */
export async function getContactPageData(): Promise<ContactPageData | null> {
    // Use tags for revalidation purposes
    const data = await sanityFetch<ContactPageData | null>({
        query: contactPageQuery,
        tags: ['contactPage'], // Tag specific to the contact page
    });

    // Returning the data object.
    return data;
}