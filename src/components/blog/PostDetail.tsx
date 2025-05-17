// src/components/blog/PostDetail.tsx (NEW FILE)
'use client' // Can be a client component to use PortableText renderer

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Import Portable Text Renderer
import { PortableText } from '@portabletext/react';
// Import Post type
import { Post, PostListItem } from '@/types/post'; // Also need PostListItem for related

// You might need these if related posts also have icons or specific colors you want to use
// import { getIconByName } from '@/utils/icons';

// Assume RelatedPosts component exists and accepts an array of simple post objects/links
import RelatedPosts from '@/components/blog/RelatedPosts';
// Assume ShareButtons component exists
import ShareButtons from '@/components/blog/ShareButtons';


interface PostDetailProps {
    post: Post; // Expect the full Post data from Sanity
}

const PostDetail = ({ post }: PostDetailProps) => {

    // Format date for display
    const formattedDate = new Date(post.publishedAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Custom renderers for Portable Text content
    const portableTextComponents = {
        types: {
            image: ({value}: {value: any}) => {
                // Render Sanity image blocks using Next/Image
                // Ensure your query for content[] includes { _type == "image", asset-> { url } }
                // to get the asset url in the block array
                if (!value?.asset?.url) {
                    return null; // Don't render if image asset URL is missing
                }
                return (
                    <figure className="my-8"> {/* Add margin around images */}
                        <Image
                            src={value.asset.url}
                            alt={value.alt || 'Article image'} // Use custom alt text if available, or generic
                            width={value.asset.metadata?.dimensions?.width || 800} // Get original dimensions or guess
                            height={value.asset.metadata?.dimensions?.height || 600} // Get original dimensions or guess
                            // Optional: add responsive sizes
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                            className="rounded-lg shadow-md" // Add styling
                        />
                        {/* Caption below image */}
                        {value.caption && (
                            <figcaption className="mt-2 text-center text-sm text-gray-600 italic">{value.caption}</figcaption>
                        )}
                    </figure>
                );
            },
            // Add other custom block types here if you use them (e.g. callout)
        },
        marks: {
            // Default marks: strong, em, underline, strike-through work with basic setup
            link: ({value, children}: { value: any, children: React.ReactNode }) => {
                const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
                const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
                return (
                    <a href={value?.href} target={target} rel={rel} className="text-[#006400] hover:underline"> {/* Apply consistent link styling */}
                        {children}
                    </a>
                );
            },
            // You might need a custom mark renderer for the specific Tailwind color span if you didn't convert it to 'strong'
            // styledSpan: ({value, children}) => <span style={{ color: value.color }}>{children}</span>, // Example for custom span type/mark
            strong: ({children}: { children: React.ReactNode }) => <strong className="font-bold text-gray-900">{children}</strong>, // Example specific styling for bold
            em: ({children}: { children: React.ReactNode }) => <em className="italic">{children}</em> // Example specific styling for italic
        },
        block: {
            // Default styles for text blocks
            normal: ({children}: { children: React.ReactNode }) => <p className="my-4">{children}</p>,
            h1: ({children}: { children: React.ReactNode }) => <h2 className="text-3xl md:text-4xl font-bold mt-8 mb-4">{children}</h2>,
            h2: ({children}: { children: React.ReactNode }) => <h3 className="text-2xl md:text-3xl font-bold mt-8 mb-4">{children}</h3>,
            h3: ({children}: { children: React.ReactNode }) => <h4 className="text-xl md:text-2xl font-bold mt-6 mb-3">{children}</h4>,
            h4: ({children}: { children: React.ReactNode }) => <h5 className="text-lg font-bold mt-5 mb-2">{children}</h5>,
            blockquote: ({children}: { children: React.ReactNode }) => <blockquote className="border-l-4 border-[#006400] pl-4 italic my-6 text-gray-700">{children}</blockquote>,
        },
        list: {
            // Numbered lists
            number: ({children}: { children: React.ReactNode }) => <ol className="list-decimal ml-5 my-4 space-y-2">{children}</ol>,
            // Bullet lists
            bullet: ({children}: { children: React.ReactNode }) => <ul className="list-disc ml-5 my-4 space-y-2">{children}</ul>,
        },
        listItem: {
            // @ts-ignore Sanity sometimes passes list type directly
            number: ({children}: { children: React.ReactNode }) => <li>{children}</li>,
            // @ts-ignore
            bullet: ({children}: { children: React.ReactNode }) => <li>{children}</li>,
        },
        // You can add code blocks, tables, etc. if they are in your blockContent schema
    };


    return (
        <main className="bg-white">
            {/* Bannière de l'article */}
            <section className="relative h-[400px] md:h-[500px] overflow-hidden mt-16"> {/* Adjusted margin top for fixed header */}
                <div className="absolute inset-0">
                    {/* Use fetched mainImageUrl */}
                    {post.mainImageUrl && (
                        <Image
                            src={post.mainImageUrl}
                            alt={post.title} // Use fetched title for alt
                            fill
                            priority
                            className="object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
                </div>

                <div className="container mx-auto px-4 h-full relative z-10">
                    <div className="flex flex-col justify-end h-full pb-12">
                        {/* Category badge */}
                        {post.categoryName && (
                            <div
                                className="inline-block bg-[#006400] text-white text-sm px-3 py-1 rounded-full mb-4"
                                // You could try to use the category color from Sanity here if added to the type/query
                                // style={{ backgroundColor: categoryColor }}
                            >
                                {post.categoryName} {/* Use fetched category name */}
                            </div>
                        )}


                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            {post.title} {/* Use fetched title */}
                        </h1>

                        {/* Author and Date */}
                        <div className="flex items-center text-white/90 text-sm"> {/* Adjusted font size */}
                            {post.author && (
                                <>
                                    <span>Par {post.author}</span> {/* Use fetched author */}
                                    <span className="mx-2">•</span> {/* Use mx-2 for spacing */}
                                </>
                            )}
                            <span>{formattedDate}</span> {/* Use formatted date */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contenu de l'article et Sidebar */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Article principal Content */}
                        <div className="lg:col-span-8">
                            <article className="prose lg:prose-lg max-w-none"> {/* Apply tailwind prose classes for basic article styling */}
                                {/* Render the Portable Text content */}
                                <PortableText value={post.content} components={portableTextComponents} />
                            </article>

                            {/* Tags - Implement fetching tags if you added them to schema/query */}
                            {/* Currently hardcoded, remove or fetch from Sanity */}
                            {/*
                            <div className="mt-10 pt-6 border-t border-gray-100">
                                <div className="flex flex-wrap gap-2">
                                     <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Séminaire</span>
                                     ... map fetched tags here ...
                                </div>
                            </div>
                            */}


                            {/* Partage sur réseaux sociaux - Keep as is or adapt based on new URL/title */}
                            <div className="mt-8"> {/* Adjust mt */}
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">Partager cet article</h3>
                                {/* Pass fetched slug and title */}
                                <ShareButtons url={`https://your-website.com/nos-prestations/${post.slug}`} title={post.title || 'Article'} /> {/* Replace your-website.com */}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4">
                            {/* Carte de l'auteur - Keep hardcoded if author isn't a separate doc type */}
                            {post.author && ( // Only show author card if author exists (if not using author doc type)
                                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                    <div className="flex items-center mb-4">
                                        {/* Hardcoded avatar image, replace with fetched author image if using author docs */}
                                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200"> {/* Add bg placeholder */}
                                            <Image
                                                src="/images/blog/author-avatar.jpg" // Hardcoded
                                                alt={post.author || 'Author avatar'}
                                                width={48}
                                                height={48}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{post.author}</h3> {/* Use fetched author name */}
                                            {/* Hardcoded role, replace if author doc type exists */}
                                            <p className="text-gray-600 text-sm">Expert technique événementiel</p>
                                        </div>
                                    </div>
                                    {/* Hardcoded author bio, replace if author doc type exists */}
                                    <p className="text-gray-600 text-sm">
                                        Notre équipe d'experts techniques partage son expérience et ses conseils pour réussir vos événements en PACA.
                                    </p>
                                </div>
                            )}


                            {/* Articles associés - Pass fetched related posts data */}
                            {post.relatedPosts && post.relatedPosts.length > 0 && (
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h3 className="text-xl font-bold mb-6 text-gray-800">Articles similaires</h3>
                                    {/* RelatedPosts component MUST be updated to accept the array of fetched related post *objects* */}
                                    <RelatedPosts posts={post.relatedPosts} />
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </section>

            {/* CTA - Keep as is or adapt */}
            {/* You might make this dynamic in the future */}
            <section className="bg-[#006400] py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                        Vous souhaitez organiser un événement similaire ?
                    </h2>
                    <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                        Notre équipe est à votre disposition pour étudier votre projet et vous proposer une solution technique adaptée.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-white px-8 py-3 rounded-lg text-[#006400] font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Demander un devis
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default PostDetail;