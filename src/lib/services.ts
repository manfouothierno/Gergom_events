
// src/lib/services.ts

import {HeaderServiceMenuItem, Product, SanityServiceData} from '@/types/services'; // Import the updated types
import {sanityFetch} from '@/lib/sanity'; // Import the configured client helper


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