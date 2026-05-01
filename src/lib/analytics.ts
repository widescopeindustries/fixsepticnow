export function trackPhoneClick(label?: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "phone_click", {
      event_category: "conversion",
      event_label: label || "Phone Link Click",
    });
  }
}
