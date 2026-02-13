import { google } from "googleapis";

const KEY_FILE = "./gsc-service-account.json";
const GA_PROPERTY_ID = "524715822";

async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  });
  return auth.getClient();
}

async function runReport(authClient: any, startDate: string, endDate: string) {
  const analyticsdata = google.analyticsdata({ version: "v1beta", auth: authClient });

  // Top pages by sessions
  console.log("=== TOP PAGES BY SESSIONS ===\n");
  const pagesReport = await analyticsdata.properties.runReport({
    property: `properties/${GA_PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "pagePath" }],
      metrics: [
        { name: "sessions" },
        { name: "activeUsers" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
      ],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 25,
    },
  });

  for (const row of pagesReport.data.rows || []) {
    const path = row.dimensionValues?.[0]?.value;
    const sessions = row.metricValues?.[0]?.value;
    const users = row.metricValues?.[1]?.value;
    const bounce = (parseFloat(row.metricValues?.[2]?.value || "0") * 100).toFixed(1);
    const duration = parseFloat(row.metricValues?.[3]?.value || "0").toFixed(0);
    console.log(`  ${path} | ${sessions} sessions | ${users} users | ${bounce}% bounce | ${duration}s avg`);
  }

  // Traffic sources
  console.log("\n=== TRAFFIC SOURCES ===\n");
  const sourcesReport = await analyticsdata.properties.runReport({
    property: `properties/${GA_PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
      metrics: [{ name: "sessions" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 15,
    },
  });

  for (const row of sourcesReport.data.rows || []) {
    const source = row.dimensionValues?.[0]?.value;
    const medium = row.dimensionValues?.[1]?.value;
    const sessions = row.metricValues?.[0]?.value;
    const users = row.metricValues?.[1]?.value;
    console.log(`  ${source} / ${medium} | ${sessions} sessions | ${users} users`);
  }

  // Conversion events
  console.log("\n=== CONVERSION EVENTS ===\n");
  const eventsReport = await analyticsdata.properties.runReport({
    property: `properties/${GA_PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          inListFilter: {
            values: ["phone_click", "form_submit", "chat_open"],
          },
        },
      },
    },
  });

  for (const row of eventsReport.data.rows || []) {
    const event = row.dimensionValues?.[0]?.value;
    const count = row.metricValues?.[0]?.value;
    console.log(`  ${event}: ${count}`);
  }
  if (!eventsReport.data.rows?.length) {
    console.log("  No conversion events yet");
  }

  // Device breakdown
  console.log("\n=== DEVICE BREAKDOWN ===\n");
  const deviceReport = await analyticsdata.properties.runReport({
    property: `properties/${GA_PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "sessions" }, { name: "activeUsers" }],
    },
  });

  for (const row of deviceReport.data.rows || []) {
    const device = row.dimensionValues?.[0]?.value;
    const sessions = row.metricValues?.[0]?.value;
    console.log(`  ${device}: ${sessions} sessions`);
  }

  // Geo (cities)
  console.log("\n=== TOP CITIES ===\n");
  const geoReport = await analyticsdata.properties.runReport({
    property: `properties/${GA_PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "city" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 15,
    },
  });

  for (const row of geoReport.data.rows || []) {
    const city = row.dimensionValues?.[0]?.value;
    const sessions = row.metricValues?.[0]?.value;
    console.log(`  ${city}: ${sessions} sessions`);
  }
}

async function main() {
  const authClient = await getAuthClient();
  const startDate = process.argv[2] || "7daysAgo";
  const endDate = process.argv[3] || "today";

  console.log(`\nFix Septic Now - Analytics Report (${startDate} to ${endDate})\n`);
  console.log("=".repeat(60) + "\n");

  await runReport(authClient, startDate, endDate);

  console.log("\n" + "=".repeat(60));
  console.log("Done!\n");
}

main();
