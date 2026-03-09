/**
 * Run once to generate your TOTP secret and QR code.
 *
 *   node scripts/generate-totp-secret.mjs
 *
 * Then:
 *  1. Add CMS_TOTP_SECRET=<secret> to your .env.local
 *  2. Add CMS_TOTP_SECRET=<secret> to Vercel environment variables
 *  3. Scan the QR code (or enter the secret manually) in Google Authenticator
 */

import { authenticator } from "otplib";

const secret = authenticator.generateSecret();
const account = "KMSchool Staff";
const issuer = "KMSchool CMS";
const otpauthUrl = authenticator.keyuri(account, issuer, secret);

console.log("\n================================================");
console.log("  KMSchool CMS — TOTP 2FA Setup");
console.log("================================================\n");
console.log("Your secret key (save this safely!):");
console.log(`\n  CMS_TOTP_SECRET=${secret}\n`);
console.log("Steps:");
console.log("  1. Add the line above to your .env.local file");
console.log("  2. Add CMS_TOTP_SECRET=" + secret + " to Vercel env vars");
console.log("  3. Open Google Authenticator on your phone");
console.log('  4. Tap "+" → "Enter a setup key"');
console.log(`  5. Account name: ${account}`);
console.log(`  6. Key: ${secret}`);
console.log('  7. Type: Time-based → tap "Add"');
console.log("\nOr scan this QR code URL in any QR scanner app:");
console.log(`\n  ${otpauthUrl}\n`);
console.log("================================================\n");
console.log("Test it — current valid code right now:");
console.log(`  ${authenticator.generate(secret)}\n`);
