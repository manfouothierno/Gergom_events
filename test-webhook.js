#!/usr/bin/env node

// Test webhook functionality locally
// This script simulates the webhook payload without the signature validation

const crypto = require('crypto');

// Generate a test webhook signature ( Sanity uses HMAC-SHA256 )
function generateSignature(secret, body) {
  const timestamp = Math.floor(Date.now() / 1000);
  const payload = `t=${timestamp}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return `t=${timestamp},v1=${signature}`;
}

const secret = '1A5ncsfyeKp8BjPiW57PvUSUmr4J3E9K47LkHo2Qrgc=';

const testPayload = {
  _type: 'service',
  slug: { current: 'test-service' },
  operation: 'update'
};

const signature = generateSignature(secret, JSON.stringify(testPayload));

console.log('Test Webhook Payload:');
console.log('Body:', JSON.stringify(testPayload, null, 2));
console.log('Signature:', signature);
console.log('');
console.log('You can test this with:');
console.log(`curl -X POST http://localhost:3000/api/revalidate \\`);
console.log(`  -H "Content-Type: application/json" \\`);
console.log(`  -H "sanity-webhook-signature: ${signature}" \\`);
console.log(`  -d '${JSON.stringify(testPayload)}'`);
console.log('');
console.log('Note: This signature will not work without proper Sanity webhook implementation.');
