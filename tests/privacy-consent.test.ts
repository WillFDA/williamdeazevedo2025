import { beforeEach, expect, test } from "bun:test";

import {
  initAnalytics,
  sanitizeTrackingProperties,
  trackAnalytics,
} from "../src/scripts/analytics";
import {
  consentLifetimeMs,
  consentStorageKey,
  getPrivacyConsent,
  parseConsent,
  savePrivacyConsent,
} from "../src/scripts/privacyConsent";

const scripts: {
  src: string;
  dataset: Record<string, string>;
  listeners: Record<string, () => void>;
}[] = [];
const storage = new Map<string, string>();
const events: string[] = [];
const testWindow = {
  localStorage: {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
  },
  rybbit: undefined as undefined | { event: (name: string) => void },
};
Object.assign(globalThis, {
  window: testWindow,
  document: {
    querySelector: (selector: string) =>
      scripts.find((script) =>
        selector.includes("rybbit")
          ? "wuiRybbit" in script.dataset
          : "wuiZaraz" in script.dataset
      ),
    createElement: () => {
      const script = {
        src: "",
        dataset: {},
        listeners: {} as Record<string, () => void>,
        // oxlint-disable-next-line promise/prefer-await-to-callbacks -- DOM event API test double.
        addEventListener(name: string, callback: () => void) {
          this.listeners[name] = callback;
        },
        remove() {
          scripts.splice(scripts.indexOf(this), 1);
        },
      };
      return script;
    },
    head: {
      append: (script: (typeof scripts)[number]) => scripts.push(script),
    },
  },
});

beforeEach(() => {
  scripts.length = 0;
  events.length = 0;
  testWindow.rybbit = undefined;
  savePrivacyConsent(false, false);
});

test("missing, malformed, future and expired choices never grant consent", () => {
  const now = 1_000_000_000_000;
  for (const raw of [
    null,
    "{",
    "{}",
    JSON.stringify({ audience: "true", marketing: false, savedAt: now }),
    JSON.stringify({ audience: true, marketing: true, savedAt: now + 1 }),
    JSON.stringify({
      audience: true,
      marketing: true,
      savedAt: now - consentLifetimeMs,
    }),
  ]) {
    expect(parseConsent(raw, now)).toBeNull();
  }
});

test("refusing prevents script loads, event dispatch and measurement storage", () => {
  initAnalytics();
  trackAnalytics("contact_email_click");
  expect(scripts).toHaveLength(0);
  expect([...storage.keys()]).toEqual([consentStorageKey]);
});

test("audience consent loads Rybbit once and queues only post-consent events", () => {
  trackAnalytics("before-consent");
  savePrivacyConsent(true, false);
  initAnalytics();
  initAnalytics();
  expect(scripts).toHaveLength(1);
  trackAnalytics("after-consent");
  testWindow.rybbit = { event: (name: string) => events.push(name) };
  scripts[0].listeners.load();
  expect(events).toEqual(["after-consent"]);
  savePrivacyConsent(false, false);
  trackAnalytics("after-withdrawal");
  expect(events).toEqual(["after-consent"]);
});

test("an expired in-memory consent is refused even without navigation", () => {
  const consent = savePrivacyConsent(true, false);
  consent.savedAt = Date.now() - consentLifetimeMs;
  expect(getPrivacyConsent()).toBeNull();
  initAnalytics();
  expect(scripts).toHaveLength(0);
});

test("marketing alone never loads Rybbit", () => {
  savePrivacyConsent(false, true);
  initAnalytics();
  trackAnalytics("contact_phone_click");
  expect(scripts).toHaveLength(0);
});

test("outbound event URLs exclude query strings and fragments", () => {
  expect(
    sanitizeTrackingProperties({
      url: "https://example.com/contact?email=private@example.com#secret",
      location: "footer",
    })
  ).toEqual({ url: "https://example.com/contact", location: "footer" });
});
