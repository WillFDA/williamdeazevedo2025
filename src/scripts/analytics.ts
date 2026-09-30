import { getPrivacyConsent } from "./privacyConsent";

export type TrackingProperties = Record<string, string | number>;
type AnalyticsWindow = Window & {
  rybbit?: { event?: (name: string, properties: TrackingProperties) => void };
  zaraz?: {
    track?: (
      name: string,
      properties: TrackingProperties
    ) => Promise<void> | void;
    set?: (name: string, value: Record<string, string>) => void;
    consent?: {
      APIReady?: boolean;
      set: (choices: Record<string, boolean>) => void;
    };
  };
};

const audiencePurpose = import.meta.env.PUBLIC_ZARAZ_AUDIENCE_PURPOSE ?? "";
const marketingPurpose = import.meta.env.PUBLIC_ZARAZ_MARKETING_PURPOSE ?? "";
const googleEnabled = Boolean(audiencePurpose && marketingPurpose);

const applyGoogleConsent = () => {
  const zaraz = getAnalyticsWindow().zaraz;
  if (!googleEnabled || !zaraz?.consent?.APIReady) return;
  const latest = getPrivacyConsent();
  zaraz.set?.("google_consent_update", {
    analytics_storage: latest?.audience ? "granted" : "denied",
    ad_storage: latest?.marketing ? "granted" : "denied",
    ad_user_data: latest?.marketing ? "granted" : "denied",
    ad_personalization: "denied",
  });
  zaraz.consent.set({
    [audiencePurpose]: latest?.audience ?? false,
    [marketingPurpose]: latest?.marketing ?? false,
  });
};

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
  const consent = getPrivacyConsent();
  if (!consent) return;
  const analyticsWindow = getAnalyticsWindow();

  // Zaraz auto-injection must be disabled in Cloudflare before deployment.
  // Only load the manual entry point after a positive choice for Google tools.
  if (googleEnabled && (consent.audience || consent.marketing)) {
    applyGoogleConsent();
    if (!document.querySelector("script[data-wui-zaraz]")) {
      document.addEventListener("zarazConsentAPIReady", applyGoogleConsent, {
        once: true,
      });
      const script = document.createElement("script");
      script.src = "/cdn-cgi/zaraz/i.js";
      script.referrerPolicy = "origin";
      script.async = true;
      script.dataset.wuiZaraz = "";
      script.addEventListener("load", applyGoogleConsent, { once: true });
      script.addEventListener("error", () => script.remove(), { once: true });
      document.head.append(script);
    }
  }

  if (!consent.audience || document.querySelector("script[data-wui-rybbit]"))
    return;
  const script = document.createElement("script");
  script.src = rybbitScriptUrl;
  script.async = true;
  script.dataset.siteId = "9713c4825fc7";
  script.dataset.wuiRybbit = "";
  script.addEventListener(
    "load",
    () => {
      if (!getPrivacyConsent()?.audience) {
        pendingEvents = [];
        return;
      }
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
  const consent = getPrivacyConsent();
  if (!consent?.audience && !consent?.marketing) return;
  initAnalytics();
  const safeProperties = sanitizeTrackingProperties(properties);
  const analyticsWindow = getAnalyticsWindow();
  // Only the booking conversion is eligible for the marketing category.
  // Cloudflare must associate GA4 and Ads actions with their respective purposes.
  if (
    googleEnabled &&
    analyticsWindow.zaraz?.consent?.APIReady &&
    (consent.audience || (consent.marketing && name === "cal_booking_success"))
  ) {
    void analyticsWindow.zaraz?.track?.(name, safeProperties);
  }
  if (!consent.audience) return;
  if (typeof analyticsWindow.rybbit?.event === "function") {
    analyticsWindow.rybbit.event(name, safeProperties);
  } else {
    pendingEvents = [
      ...pendingEvents,
      { name, properties: safeProperties },
    ].slice(-20);
  }
};
