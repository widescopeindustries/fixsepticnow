const SITE_URL = "https://fixsepticnow.com";
const API_KEY = ""; // PageSpeed Insights API works without a key (lower quota)

interface PageSpeedResult {
  url: string;
  strategy: string;
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
  fcp: string;
  lcp: string;
  cls: string;
  tbt: string;
  si: string;
}

async function runPageSpeed(url: string, strategy: "mobile" | "desktop"): Promise<PageSpeedResult | null> {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance&category=seo&category=accessibility&category=best-practices${API_KEY ? `&key=${API_KEY}` : ""}`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      console.error(`  ✗ ${strategy} failed for ${url}: ${res.status}`);
      return null;
    }
    const data = await res.json();
    const cats = data.lighthouseResult?.categories;
    const audits = data.lighthouseResult?.audits;

    return {
      url,
      strategy,
      performance: Math.round((cats?.performance?.score || 0) * 100),
      seo: Math.round((cats?.seo?.score || 0) * 100),
      accessibility: Math.round((cats?.accessibility?.score || 0) * 100),
      bestPractices: Math.round((cats?.["best-practices"]?.score || 0) * 100),
      fcp: audits?.["first-contentful-paint"]?.displayValue || "n/a",
      lcp: audits?.["largest-contentful-paint"]?.displayValue || "n/a",
      cls: audits?.["cumulative-layout-shift"]?.displayValue || "n/a",
      tbt: audits?.["total-blocking-time"]?.displayValue || "n/a",
      si: audits?.["speed-index"]?.displayValue || "n/a",
    };
  } catch (err: any) {
    console.error(`  ✗ Error: ${url} - ${err.message}`);
    return null;
  }
}

function printResult(r: PageSpeedResult) {
  const perf = r.performance >= 90 ? `✓ ${r.performance}` : r.performance >= 50 ? `~ ${r.performance}` : `✗ ${r.performance}`;
  console.log(`  ${r.strategy.toUpperCase().padEnd(8)} | Perf: ${perf.padEnd(5)} | SEO: ${r.seo} | A11y: ${r.accessibility} | BP: ${r.bestPractices}`);
  console.log(`           FCP: ${r.fcp} | LCP: ${r.lcp} | CLS: ${r.cls} | TBT: ${r.tbt} | SI: ${r.si}`);
}

async function main() {
  const urlsToTest = [
    SITE_URL,
    `${SITE_URL}/services/septic-pumping`,
    `${SITE_URL}/services/emergency-septic-service`,
    `${SITE_URL}/conroe-septic-services`,
    `${SITE_URL}/katy-septic-services`,
    `${SITE_URL}/conroe-septic-pumping`,
    `${SITE_URL}/conroe-emergency-septic-service`,
  ];

  // Allow custom URL via CLI arg
  if (process.argv[2] && process.argv[2].startsWith("http")) {
    urlsToTest.length = 0;
    urlsToTest.push(process.argv[2]);
  }

  console.log(`\nFix Septic Now - PageSpeed Audit`);
  console.log("=".repeat(70) + "\n");

  for (const url of urlsToTest) {
    console.log(`${url}`);
    const [mobile, desktop] = await Promise.all([
      runPageSpeed(url, "mobile"),
      runPageSpeed(url, "desktop"),
    ]);
    if (mobile) printResult(mobile);
    if (desktop) printResult(desktop);
    console.log("");
    // Rate limit - PSI allows ~25 req/100s without key
    await new Promise((r) => setTimeout(r, 3000));
  }

  console.log("=".repeat(70));
  console.log("Done!\n");
}

main();
