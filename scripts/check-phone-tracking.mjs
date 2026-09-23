import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const base = new URL(process.argv[2] || "http://127.0.0.1:4340/");
assert.ok(
  ["localhost", "127.0.0.1", "[::1]"].includes(base.hostname),
  "Only local previews are allowed; never test production conversions"
);
const temp = mkdtempSync(path.join(tmpdir(), "phone-tracking-"));
const init = path.join(temp, "init.js");
writeFileSync(
  init,
  `window.__tracking={zaraz:[],rybbit:[]};
  window.zaraz={track:(name,properties)=>window.__tracking.zaraz.push({name,properties})};
  window.rybbit={event:(name,properties)=>window.__tracking.rybbit.push({name,properties})};
  document.addEventListener('click',event=>{
    if(event.target.closest?.('a[href^="tel:"],a[href^="mailto:"]'))event.preventDefault();
  },{capture:true});`
);
const session = `phone-tracking-${process.pid}`;
const browser = (...args) => {
  const response = JSON.parse(
    execFileSync(
      "npx",
      ["--yes", "agent-browser", "--session", session, "--json", ...args],
      {
        encoding: "utf-8",
        timeout: 60000,
      }
    )
  );
  assert.equal(response.success, true, JSON.stringify(response));
  return response.data;
};
const evaluate = (code) => browser("eval", code).result;
const reset = () =>
  evaluate("window.__tracking.zaraz=[];window.__tracking.rybbit=[];true");
const checkEvent = (name, pathname, location) => {
  const events = evaluate("window.__tracking");
  assert.equal(events.zaraz.length, 1, "Exactly one Zaraz event per click");
  assert.deepEqual(
    events.zaraz,
    events.rybbit,
    "Both destinations receive the same event"
  );
  assert.equal(events.zaraz[0].name, name);
  assert.equal(events.zaraz[0].properties.path, pathname);
  assert.ok(events.zaraz[0].properties.label);
  if (location) assert.equal(events.zaraz[0].properties.location, location);
  if (name.endsWith("phone_click")) assert.ok(events.zaraz[0].properties.phone);
};

try {
  browser("--args", "--no-sandbox", "--init-script", init, "open", base.href);
  for (const width of [1440, 390]) {
    browser("set", "viewport", String(width), "844");
    browser("open", base.href);
    // Wait for the bundled layout script, not merely the server-rendered link.
    evaluate(`(async()=>{
      for(let i=0;i<100;i++){
        if(window.__wuiContactClickTrackingReady)return true;
        await new Promise(resolve=>setTimeout(resolve,50));
      }
      throw new Error('Contact listener did not initialise');
    })()`);
    assert.deepEqual(
      evaluate("window.__tracking.zaraz"),
      [],
      "No contact event on load"
    );
    if (width < 1024) {
      browser("click", "[data-mobile-menu-button]");
    }
    browser(
      "click",
      width < 1024
        ? "[data-mobile-menu] [data-navbar-phone]"
        : ".nav-contact-cta[data-navbar-phone]"
    );
    checkEvent("navbar_phone_click", base.pathname);

    reset();
    evaluate(`(()=>{
      const link=document.createElement('a');link.href='tel:+33100000000';
      link.dataset.analyticsLocation='test_fixture';link.textContent='Appeler';
      const span=document.createElement('span');span.textContent=' téléphone';link.append(span);
      document.body.append(link);span.click();link.remove();return true;
    })()`);
    checkEvent("contact_phone_click", base.pathname, "test_fixture");

    reset();
    evaluate(`(()=>{
      const link=document.createElement('a');link.href='mailto:test@example.invalid';
      link.textContent='Email test';document.body.append(link);link.click();link.remove();return true;
    })()`);
    checkEvent("contact_email_click", base.pathname);

    reset();
    // Preserve a marker to prove this is ClientRouter navigation, not a reload.
    evaluate(`window.__phoneNavigationMarker='preserved';
      document.querySelector('a[href="/services/"]').click();true`);
    assert.equal(
      evaluate(`(async()=>{
      for(let i=0;i<100;i++){
        if(location.pathname==='/services/'&&document.querySelector('[data-navbar-phone]'))return true;
        await new Promise(resolve=>setTimeout(resolve,50));
      }
      return false;
    })()`),
      true,
      "Client navigation completed"
    );
    assert.equal(evaluate("window.__phoneNavigationMarker"), "preserved");
    assert.deepEqual(
      evaluate("window.__tracking.zaraz"),
      [],
      "No conversion on navigation"
    );
    if (width < 1024) {
      browser("click", "[data-mobile-menu-button]");
    }
    browser(
      "click",
      width < 1024
        ? "[data-mobile-menu] [data-navbar-phone]"
        : ".nav-contact-cta[data-navbar-phone]"
    );
    checkEvent("navbar_phone_click", "/services/");
    console.log(
      `PASS ${width}px: navbar, generic tel, email exclusion, ClientRouter without duplicates`
    );
  }
} finally {
  try {
    browser("close");
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}
