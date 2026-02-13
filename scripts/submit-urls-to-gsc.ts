import { google } from "googleapis";
import { cities } from "../src/lib/cities";
import { services } from "../src/lib/services";

const SITE_URL = "https://fixsepticnow.com";
const KEY_FILE = "./gsc-service-account.json";

// GSC Indexing API has a quota of 200 requests/day
// We'll batch and respect that limit

async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });
  return auth.getClient();
}

function getAllUrls(): string[] {
  const urls: string[] = [];

  // Homepage
  urls.push(SITE_URL);

  // Service pages
  for (const service of services) {
    urls.push(`${SITE_URL}/services/${service.slug}`);
  }

  // City pages
  for (const city of cities) {
    urls.push(`${SITE_URL}/${city.slug}-septic-services`);
  }

  // City+Service combo pages
  for (const city of cities) {
    for (const service of services) {
      urls.push(`${SITE_URL}/${city.slug}-${service.slug}`);
    }
  }

  // Static pages
  urls.push(`${SITE_URL}/about`);
  urls.push(`${SITE_URL}/contact`);
  urls.push(`${SITE_URL}/blog`);

  return urls;
}

async function submitUrl(authClient: any, url: string): Promise<boolean> {
  try {
    const indexing = google.indexing({ version: "v3", auth: authClient });
    await indexing.urlNotifications.publish({
      requestBody: {
        url,
        type: "URL_UPDATED",
      },
    });
    return true;
  } catch (err: any) {
    console.error(`  ✗ Failed: ${url} - ${err.message}`);
    return false;
  }
}

async function main() {
  const authClient = await getAuthClient();
  const allUrls = getAllUrls();

  console.log(`Total URLs to submit: ${allUrls.length}`);
  console.log(`GSC Indexing API quota: 200/day`);

  // Check for --batch flag to limit to 200
  const batchMode = process.argv.includes("--batch");
  const offset = parseInt(process.argv.find(a => a.startsWith("--offset="))?.split("=")[1] || "0");
  const limit = batchMode ? 200 : allUrls.length;
  const urlsToSubmit = allUrls.slice(offset, offset + limit);

  console.log(`Submitting ${urlsToSubmit.length} URLs (offset: ${offset})...\n`);

  let success = 0;
  let failed = 0;

  for (const url of urlsToSubmit) {
    const ok = await submitUrl(authClient, url);
    if (ok) {
      success++;
      console.log(`  ✓ ${url}`);
    } else {
      failed++;
    }
    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 100));
  }

  console.log(`\nDone! Submitted: ${success}, Failed: ${failed}`);
  if (offset + limit < allUrls.length) {
    console.log(`\nNext batch: npx tsx scripts/submit-urls-to-gsc.ts --batch --offset=${offset + limit}`);
  }
}

main();
