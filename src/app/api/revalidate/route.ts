
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current: string };
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return new Response('Invalid Signature', { status: 401 });
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 });
    }

    // Revalidate the specific type (e.g., 'service', 'post')
    revalidateTag(body._type);
    console.log(`Revalidated tag: ${body._type}`);

    // If there's a slug, we could revalidate a specific tag if we set them up that way
    // e.g. `service:${slug}`
    if (body.slug?.current) {
        const specificTag = `${body._type}:${body.slug.current}`;
        revalidateTag(specificTag);
        console.log(`Revalidated tag: ${specificTag}`);
    }
    
    // Also revalidate homepage dependencies if likely to appear there
    const homepageTypes = ['hero', 'aboutSection', 'service', 'realisation', 'googleReviewsSection', 'ctaSection'];
    if (homepageTypes.includes(body._type)) {
       revalidateTag('homepage');
       console.log(`Revalidated tag: homepage`);
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err: any) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
}
