# Sanity Studio Webhook Configuration

This guide will help you configure the webhook so that when you update content in Sanity Studio, your production website automatically updates.

## 🎯 Problem Solved
Your Next.js application uses caching to improve performance, but this means changes in Sanity Studio don't immediately appear on production. The webhook automatically clears the cache when content is updated.

## ✅ What's Been Fixed
- ✅ Environment variables configured (`.env.local`)
- ✅ Webhook endpoint enhanced with better logging
- ✅ Automatic revalidation for all content types
- ✅ Better error handling and debugging

## 🔧 Setup Instructions

### 1. Deploy Your Application
First, ensure your application is deployed to production:
```bash
npm run deploy
```

### 2. Get Your Production URL
After deployment, note your production URL:
- Cloudflare Workers: `https://frontend.<your-subdomain>.workers.dev`
- Custom domain: `https://your-domain.com`
- Other platform: Your specific deployment URL

### 3. Configure Sanity Webhook

#### A. Go to Sanity Project Settings
1. Visit [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to the **API** tab

#### B. Create Webhook
1. Scroll down to **Webhooks** section
2. Click **Add webhook**
3. Configure with these settings:

**Webhook Configuration:**
- **Name**: `Production Revalidation`
- **URL**: `https://YOUR-PRODUCTION-URL/api/revalidate`
  - Replace `YOUR-PRODUCTION-URL` with your actual deployment URL
- **Secret**: `1A5ncsfyeKp8BjPiW57PvUSUmr4J3E9K47LkHo2Qrgc=`
  - This secret is already configured in your `.env.local` file
- **Trigger on**: All document types (leave default)
- **HTTP Method**: POST
- **Filter Settings**: Leave empty (trigger on all changes)
- **Include draft**: ✅ (recommended for preview)

#### C. Save and Test
1. Click **Save webhook**
2. Click the webhook name to view details
3. Click **Trigger test** to verify it works

## 🧪 Testing the Webhook

### 1. Test in Sanity Studio
1. Open your Sanity Studio
2. Edit any document (service, post, etc.)
3. Save the changes
4. Check your production website - changes should appear within seconds

### 2. Monitor Logs
You can check webhook activity in:
- Sanity Manage → Your project → API → Webhooks → Webhook name
- Your deployment platform's logs (Cloudflare Workers logs)
- Next.js application logs

### 3. Manual Test (Optional)
You can manually test the webhook endpoint:
```bash
curl -X POST https://YOUR-PRODUCTION-URL/api/revalidate \
  -H "Content-Type: application/json" \
  -H "sanity-webhook-signature: t=1710000000,v1=YOUR_SIGNATURE" \
  -d '{"_type": "service", "slug": {"current": "test"}}'
```

## 🔍 How It Works

1. **Content Update**: You edit and save content in Sanity Studio
2. **Webhook Trigger**: Sanity sends a POST request to `/api/revalidate`
3. **Signature Verification**: Your app verifies the request using the secret
4. **Cache Invalidation**: Using `revalidateTag()`, it clears relevant cached data
5. **Immediate Update**: Next request to your site fetches fresh data

## 📋 What Gets Revalidated

When you update different content types, the webhook automatically clears related caches:

| Content Type | Tags Revalidated | Affected Pages |
|--------------|------------------|----------------|
| `service` | `service`, `service:slug`, `serviceList`, `headerMenu`, `homepage` | Service pages, homepage, navigation |
| `post` | `post`, `post:slug`, `postList`, `featuredPost` | Blog pages, blog listing |
| `hero` | `hero`, `homepage` | Homepage hero section |
| `aboutSection` | `aboutSection`, `homepage` | Homepage about section |
| `realisation` | `realisation`, `realisationList`, `homepage` | Portfolio pages, homepage |
| `siteFooter` | `siteFooter`, `footer`, `siteSettings` | Site footer everywhere |
| `contactPage` | `contactPage`, `contact` | Contact page |

## 🚨 Troubleshooting

### Webhook Not Working?
1. **Check URL**: Ensure your production URL is correct
2. **Verify Secret**: Confirm the secret matches exactly (no extra spaces)
3. **Check Logs**: Look for webhook errors in Sanity Manage
4. **Test Manually**: Use the webhook test button in Sanity

### Changes Not Appearing?
1. **Wait 30 seconds**: Some CDNs take a moment to clear
2. **Hard Refresh**: Use Ctrl+Shift+R (or Cmd+Shift+R) to bypass browser cache
3. **Check Logs**: Verify webhook succeeded in your platform logs

### Getting "Invalid Signature"?
1. **Secret Mismatch**: Double-check the secret in both locations
2. **Copy Issues**: Re-copy the secret to avoid hidden characters
3. **Environment Variables**: Ensure `.env.local` is deployed correctly

## 🔒 Security Considerations

- The webhook secret prevents unauthorized cache clearing
- Your `.env.local` should never be committed to version control
- Consider using different secrets for development and production
- Monitor webhook logs for suspicious activity

## 🆘 Need Help?

If you encounter issues:

1. Check the Sanity webhook documentation: [sanity.io/docs/webhooks](https://www.sanity.io/docs/webhooks)
2. Verify your deployment platform supports Next.js API routes
3. Check environment variables are properly set in production
4. Review application logs for error messages

---

**✨ All set!** Your Sanity Studio updates should now immediately appear on your production website.
