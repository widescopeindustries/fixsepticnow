import { google } from "googleapis";
import { cities } from "../src/lib/cities";
import { services } from "../src/lib/services";

const SITE_URL = "https://fixsepticnow.com";
const KEY_FILE = "./gsc-service-account.json";

async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  return auth.getClient();
}

async function main() {
  const authClient = await getAuthClient();
  const searchconsole = google.searchconsole({ version: "v1", auth: authClient });

  // Check site verification
  console.log("Checking site access...\n");
  try {
    const sites = await google.webmasters({ version: "v3", auth: authClient }).sites.list();
    console.log("Sites accessible:", sites.data.siteEntry?.map(s => s.siteUrl).join(", ") || "none");
  } catch (err: any) {
    console.error("Could not list sites:", err.message);
  }

  // Inspect specific URLs
  const urlsToCheck = [
    SITE_URL,
    `${SITE_URL}/services/septic-pumping`,
    `${SITE_URL}/conroe-septic-services`,
    `${SITE_URL}/conroe-septic-pumping`,
    `${SITE_URL}/katy-septic-services`,
  ];

  console.log("\nInspecting URL indexing status:\n");

  for (const url of urlsToCheck) {
    try {
      const result = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: SITE_URL,
        },
      });

      const inspection = result.data.inspectionResult;
      const status = inspection?.indexStatusResult?.coverageState || "unknown";
      const crawled = inspection?.indexStatusResult?.lastCrawlTime || "never";
      const verdict = inspection?.indexStatusResult?.verdict || "unknown";

      console.log(`  ${url}`);
      console.log(`    Verdict: ${verdict}`);
      console.log(`    Coverage: ${status}`);
      console.log(`    Last crawled: ${crawled}\n`);
    } catch (err: any) {
      console.error(`  ✗ ${url}: ${err.message}\n`);
    }
  }
}

main();
