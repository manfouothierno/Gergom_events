
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    // Log incoming request for debugging
    console.log('Webhook received:', {
      method: req.method,
      url: req.url,
      headers: Object.fromEntries(req.headers.entries())
    });

    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current: string };
      operation?: 'create' | 'update' | 'delete';
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      console.error('Invalid webhook signature received');
      return new Response('Invalid Signature', { status: 401 });
    }

    if (!body?._type) {
      console.error('Webhook missing _type field');
      return new Response('Bad Request: Missing _type field', { status: 400 });
    }

    console.log('Processing webhook for:', { type: body._type, slug: body.slug?.current, operation: body.operation });

    // Revalidate the specific type (e.g., 'service', 'post')
    revalidateTag(body._type);
    console.log(`✅ Revalidated tag: ${body._type}`);

    // If there's a slug, revalidate the specific document tag
    if (body.slug?.current) {
        const specificTag = `${body._type}:${body.slug.current}`;
        revalidateTag(specificTag);
        console.log(`✅ Revalidated tag: ${specificTag}`);
    }
    
    // Also revalidate homepage dependencies if likely to appear there
    const homepageTypes = ['hero', 'aboutSection', 'service', 'realisation', 'googleReviewsSection', 'ctaSection'];
    if (homepageTypes.includes(body._type)) {
       revalidateTag('homepage');
       console.log(`✅ Revalidated tag: homepage`);
    }

    // Additional revalidation based on document type
    const revalidationMap: Record<string, string[]> = {
      'service': ['serviceList', 'headerMenu'],
      'post': ['postList', 'featuredPost'],
      'siteFooter': ['footer', 'siteSettings'],
      'contactPage': ['contact']
    };

    if (revalidationMap[body._type]) {
      for (const tag of revalidationMap[body._type]) {
        revalidateTag(tag);
        console.log(`✅ Revalidated dependent tag: ${tag}`);
      }
    }

    console.log('✅ Webhook processing completed successfully');

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body: {
        type: body._type,
        slug: body.slug?.current,
        operation: body.operation
      }
    });
  } catch (err: any) {
    console.error('❌ Webhook error:', err);
    return new Response(`Webhook error: ${err.message}`, { status: 500 });
  }
}
