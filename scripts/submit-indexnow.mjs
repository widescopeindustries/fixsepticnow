/**
 * Submit URLs to Bing via IndexNow for immediate crawl/indexing.
 * Usage: node scripts/submit-indexnow.mjs [url1] [url2] ...
 * Or: node scripts/submit-indexnow.mjs --ennis  (submits Ennis cluster)
 */

const API_KEY = process.env.INDEXNOW_KEY || "ed56683793774b0896e6a680bd7559d7";
const HOST = "fixsepticnow.com";
const ENDPOINT = "https://www.bing.com/indexnow";

const ENNIS_URLS = [
  "https://fixsepticnow.com/septic-services/ennis-tx/",
  "https://fixsepticnow.com/septic-services/ennis-tx/septic-pumping",
  "https://fixsepticnow.com/septic-services/ennis-tx/septic-cleaning",
  "https://fixsepticnow.com/septic-services/ennis-tx/septic-repair",
  "https://fixsepticnow.com/septic-services/ennis-tx/septic-inspection",
  "https://fixsepticnow.com/septic-services/ennis-tx/septic-installation",
  "https://fixsepticnow.com/septic-services/ennis-tx/septic-maintenance",
  "https://fixsepticnow.com/septic-services/ennis-tx/emergency-septic-service",
];

async function submitUrl(url) {
  const submitUrl = new URL(ENDPOINT);
  submitUrl.searchParams.set("url", url);
  submitUrl.searchParams.set("key", API_KEY);

  try {
    const res = await fetch(submitUrl.toString(), { method: "GET" });
    if (res.status === 200 || res.status === 202) {
      console.log(`✅ Submitted: ${url}`);
      return true;
    }
    const text = await res.text();
    console.error(`❌ Failed (${res.status}): ${url} — ${text}`);
    return false;
  } catch (err) {
    console.error(`❌ Error: ${url} — ${err.message}`);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const urls = args.includes("--ennis") ? ENNIS_URLS : args.filter((a) => a.startsWith("http"));

  if (urls.length === 0) {
    console.error("Usage: node scripts/submit-indexnow.mjs --ennis");
    console.error("   or: node scripts/submit-indexnow.mjs https://... https://...");
    process.exit(1);
  }

  console.log(`Submitting ${urls.length} URL(s) to IndexNow...`);
  const results = await Promise.all(urls.map(submitUrl));
  const success = results.filter(Boolean).length;
  console.log(`\nDone: ${success}/${urls.length} submitted successfully.`);
}

main();
