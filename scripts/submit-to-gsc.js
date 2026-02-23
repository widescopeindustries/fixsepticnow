/**
 * submit-to-gsc.js
 * 1. Submits/refreshes the sitemap via Google Search Console Webmasters API
 * 2. Pings Google & Bing sitemap endpoints
 * 3. Uses the Google Indexing API to fast-track new blog posts and key pages
 *
 * Run: node scripts/submit-to-gsc.js
 */

const { google } = require("googleapis");
const https = require("https");

const SITE_PROPERTY = "sc-domain:fixsepticnow.com";
const SITEMAP_URL = "https://fixsepticnow.com/sitemap.xml";
const KEY_FILE = "./gsc-service-account.json";

// URLs to submit via Indexing API (new/recently updated pages)
const URLS_TO_INDEX = [
  // New blog posts
  "https://fixsepticnow.com/blog/how-often-pump-septic-tank-texas",
  "https://fixsepticnow.com/blog/warning-signs-septic-tank-full",
  "https://fixsepticnow.com/blog/septic-tank-pumping-cost-texas",
  "https://fixsepticnow.com/blog/texas-soil-types-septic-system",
  "https://fixsepticnow.com/blog/emergency-septic-problems-what-to-do",
  "https://fixsepticnow.com/blog/new-septic-installation-texas-guide",
  // Blog listing page (new)
  "https://fixsepticnow.com/blog",
  // Homepage (updated with blog section)
  "https://fixsepticnow.com",
  // Service pages (updated with blog links)
  "https://fixsepticnow.com/services/septic-pumping",
  "https://fixsepticnow.com/services/emergency-septic-service",
  "https://fixsepticnow.com/services/septic-inspection",
  "https://fixsepticnow.com/services/septic-installation",
  "https://fixsepticnow.com/services/septic-repair",
  "https://fixsepticnow.com/services/septic-cleaning",
  "https://fixsepticnow.com/services/septic-maintenance",
  // Top city pages (highest traffic potential)
  "https://fixsepticnow.com/conroe-septic-services",
  "https://fixsepticnow.com/katy-septic-services",
  "https://fixsepticnow.com/spring-septic-services",
  "https://fixsepticnow.com/the-woodlands-septic-services",
  "https://fixsepticnow.com/new-braunfels-septic-services",
  "https://fixsepticnow.com/boerne-septic-services",
  "https://fixsepticnow.com/georgetown-septic-services",
  "https://fixsepticnow.com/dripping-springs-septic-services",
  "https://fixsepticnow.com/weatherford-septic-services",
  "https://fixsepticnow.com/waxahachie-septic-services",
];

// ─── Helper: HTTP GET (for pings) ─────────────────────────────────────────────
function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      resolve({ status: res.statusCode, url });
    }).on("error", reject);
  });
}

// ─── 1. Submit Sitemap via Webmasters API ─────────────────────────────────────
async function submitSitemap(auth) {
  console.log("\n📋 STEP 1: Submit sitemap via Webmasters API");
  const webmasters = google.webmasters({ version: "v3", auth });

  try {
    await webmasters.sitemaps.submit({
      siteUrl: SITE_PROPERTY,
      feedpath: SITEMAP_URL,
    });
    console.log(`  ✅ Sitemap submitted: ${SITEMAP_URL}`);
  } catch (err) {
    console.error(`  ✗ Sitemap submit failed: ${err.message}`);
    if (err.message.includes("403")) {
      console.log("  ℹ  Service account may need webmasters access in GSC settings");
    }
  }

  // Also retrieve sitemap status
  try {
    const info = await webmasters.sitemaps.get({
      siteUrl: SITE_PROPERTY,
      feedpath: SITEMAP_URL,
    });
    const s = info.data;
    console.log(`  📊 Sitemap status: ${s.isPending ? "pending" : "processed"}`);
    console.log(`     Submitted: ${s.submitted || "?"} URLs`);
    console.log(`     Indexed:   ${s.indexed || "?"} URLs`);
    console.log(`     Last downloaded: ${s.lastDownloaded || "never"}`);
  } catch (err) {
    console.log(`  ℹ  Could not fetch sitemap status: ${err.message}`);
  }
}

// ─── 2. Ping Endpoints ────────────────────────────────────────────────────────
async function pingSitemapEndpoints() {
  console.log("\n📡 STEP 2: Ping sitemap endpoints");

  const endpoints = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  ];

  for (const url of endpoints) {
    try {
      const result = await httpGet(url);
      const engine = url.includes("google") ? "Google" : "Bing";
      console.log(`  ✅ ${engine} ping: HTTP ${result.status}`);
    } catch (err) {
      console.error(`  ✗ Ping failed: ${err.message}`);
    }
  }
}

// ─── 3. Submit URLs via Google Indexing API ───────────────────────────────────
async function submitUrlsForIndexing(auth) {
  console.log("\n🚀 STEP 3: Submit URLs via Google Indexing API");
  console.log("  (Fast-tracks Googlebot crawl of new/updated pages)\n");

  const indexing = google.indexing({ version: "v3", auth });

  let successCount = 0;
  let failCount = 0;

  for (const url of URLS_TO_INDEX) {
    try {
      await indexing.urlNotifications.publish({
        requestBody: {
          url,
          type: "URL_UPDATED",
        },
      });
      console.log(`  ✅ ${url}`);
      successCount++;
      // Small delay to avoid rate limiting
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      const msg = err.message || "";
      if (msg.includes("403")) {
        console.log(`  ⚠  ${url} — 403 (Indexing API needs domain owner verification)`);
      } else if (msg.includes("429")) {
        console.log(`  ⏳ ${url} — rate limited, skipping`);
      } else {
        console.log(`  ✗  ${url} — ${msg.split("\n")[0]}`);
      }
      failCount++;
    }
  }

  console.log(`\n  Summary: ${successCount} submitted, ${failCount} failed`);
}

// ─── 4. Check which pages are currently indexed ───────────────────────────────
async function checkIndexStatus(auth) {
  console.log("\n🔍 STEP 4: Check index status of key pages");

  const searchconsole = google.searchconsole({ version: "v1", auth });

  const urlsToCheck = [
    "https://fixsepticnow.com",
    "https://fixsepticnow.com/blog",
    "https://fixsepticnow.com/blog/how-often-pump-septic-tank-texas",
    "https://fixsepticnow.com/services/septic-pumping",
    "https://fixsepticnow.com/conroe-septic-services",
    "https://fixsepticnow.com/conroe-septic-pumping",
  ];

  for (const url of urlsToCheck) {
    try {
      const result = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: SITE_PROPERTY,
        },
      });
      const r = result.data.inspectionResult?.indexStatusResult;
      const verdict = r?.verdict || "UNKNOWN";
      const crawled = r?.lastCrawlTime
        ? new Date(r.lastCrawlTime).toLocaleDateString()
        : "never";
      const icon = verdict === "PASS" ? "✅" : verdict === "NEUTRAL" ? "⚠ " : "❌";
      console.log(`  ${icon} ${url}`);
      console.log(`     Verdict: ${verdict} | Last crawled: ${crawled}`);
    } catch (err) {
      console.log(`  ✗ ${url} — ${err.message?.split("\n")[0]}`);
    }
    await new Promise((r) => setTimeout(r, 500));
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🦞 Fix Septic Now — GSC Submission Script");
  console.log("==========================================");

  // Auth for Webmasters + Search Console (readonly + webmasters)
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: [
      "https://www.googleapis.com/auth/webmasters",
      "https://www.googleapis.com/auth/indexing",
    ],
  });

  const client = await auth.getClient();
  google.options({ auth: client });

  await submitSitemap(client);
  await pingSitemapEndpoints();
  await submitUrlsForIndexing(client);
  await checkIndexStatus(client);

  console.log("\n✅ Done. Google will process these over the next few hours.");
  console.log("   Check GSC Coverage report in 24-48h for indexation status.\n");
}

main().catch((err) => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
