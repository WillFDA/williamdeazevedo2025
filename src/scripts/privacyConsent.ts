export const consentStorageKey = "wui:privacy-consent:v1";
export const consentLifetimeMs = 180 * 24 * 60 * 60 * 1000;

export type PrivacyConsent = {
  audience: boolean;
  marketing: boolean;
  savedAt: number;
};

let currentConsent: PrivacyConsent | null | undefined;

export const parseConsent = (
  value: string | null,
  now = Date.now()
): PrivacyConsent | null => {
  try {
    const parsed = JSON.parse(value ?? "null");
    if (
      typeof parsed?.audience !== "boolean" ||
      typeof parsed?.marketing !== "boolean" ||
      !Number.isFinite(parsed?.savedAt) ||
      parsed.savedAt > now ||
      now - parsed.savedAt >= consentLifetimeMs
    )
      return null;
    return parsed;
  } catch {
    return null;
  }
};

export const getPrivacyConsent = (): PrivacyConsent | null => {
  // Recheck expiry even during a long-running client-router session.
  if (currentConsent !== undefined) {
    return parseConsent(JSON.stringify(currentConsent));
  }
  try {
    currentConsent = parseConsent(
      window.localStorage.getItem(consentStorageKey)
    );
  } catch {
    currentConsent = null;
  }
  return currentConsent;
};

export const savePrivacyConsent = (audience: boolean, marketing: boolean) => {
  currentConsent = { audience, marketing, savedAt: Date.now() };
  try {
    window.localStorage.setItem(
      consentStorageKey,
      JSON.stringify(currentConsent)
    );
  } catch {
    // The choice remains valid for this page if browser storage is unavailable.
  }
  return currentConsent;
};
