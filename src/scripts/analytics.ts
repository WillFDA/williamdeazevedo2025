export type TrackingProperties = Record<string, string | number>;
type AnalyticsWindow = Window & {
  rybbit?: { event?: (name: string, properties: TrackingProperties) => void };
};

// Enable only after documenting that the deployed configuration meets the
// CNIL audience-measurement exemption. The flag alone does not establish it.
export const isAudienceMeasurementEnabled =
  import.meta.env.PUBLIC_RYBBIT_EXEMPT_AUDIENCE === "true";

const rybbitScriptUrl = "https://analytics.williamdeazevedo.fr/api/script.js";
let pendingEvents: { name: string; properties: TrackingProperties }[] = [];
const getAnalyticsWindow = () => window as AnalyticsWindow;

export const sanitizeTrackingProperties = (properties: TrackingProperties) =>
  Object.fromEntries(
    Object.entries(properties).map(([key, value]) => {
      if (key === "url" && typeof value === "string") {
        try {
          const url = new URL(value);
          return [key, `${url.origin}${url.pathname}`];
        } catch {
          return [key, ""];
        }
      }
      return [key, value];
    })
  );

export const initAnalytics = () => {
  if (
    !isAudienceMeasurementEnabled ||
    document.querySelector("script[data-wui-rybbit]")
  )
    return;
  const analyticsWindow = getAnalyticsWindow();
  const script = document.createElement("script");
  script.src = rybbitScriptUrl;
  script.async = true;
  script.dataset.siteId = "9713c4825fc7";
  script.dataset.wuiRybbit = "";
  script.addEventListener(
    "load",
    () => {
      for (const event of pendingEvents.splice(0)) {
        analyticsWindow.rybbit?.event?.(event.name, event.properties);
      }
    },
    { once: true }
  );
  script.addEventListener(
    "error",
    () => {
      pendingEvents = [];
      script.remove();
    },
    { once: true }
  );
  document.head.append(script);
};

export const trackAnalytics = (
  name: string,
  properties: TrackingProperties = {}
) => {
  if (!isAudienceMeasurementEnabled) return;
  initAnalytics();
  const safeProperties = sanitizeTrackingProperties(properties);
  const analyticsWindow = getAnalyticsWindow();
  if (typeof analyticsWindow.rybbit?.event === "function") {
    analyticsWindow.rybbit.event(name, safeProperties);
  } else {
    pendingEvents = [
      ...pendingEvents,
      { name, properties: safeProperties },
    ].slice(-20);
  }
};
