// Run against a built preview: node scripts/check-floating-email-mobile.mjs [url]
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const temp = mkdtempSync(path.join(tmpdir(), "bubble-qa-"));
const init = path.join(temp, "init.js");
writeFileSync(
  init,
  `window.__contactEvents=[];window.rybbit={event:(name,properties)=>window.__contactEvents.push({name,properties})};document.addEventListener('click',e=>{if(e.target.closest?.('a[href^="mailto:"],a[href^="tel:"]'))e.preventDefault()});`
);
const session = `bubble-regression-${process.pid}`;
const browser = (...args) =>
  JSON.parse(
    execFileSync(
      "npx",
      ["--yes", "agent-browser", "--session", session, "--json", ...args],
      { encoding: "utf-8" }
    )
  );
try {
  browser(
    "--args",
    "--no-sandbox",
    "--init-script",
    init,
    "open",
    process.argv[2] || "http://127.0.0.1:4332/"
  );
  browser("set", "viewport", "390", "844");
  const response = browser(
    "eval",
    `(async()=>{
    await document.fonts.ready;
    const result=[];
    for(const y of [0,200,400,600,800,1000,1200,1400]){
      scrollTo({top:y,behavior:'instant'});
      await new Promise(resolve=>setTimeout(resolve,500));
      const bubble=document.querySelector('[data-floating-email]');
      const rect=bubble.getBoundingClientRect();
      const overlap=[...document.querySelectorAll('main :is(a,button,p,blockquote,h1,h2,h3,h4,h5,h6,li,pre,table,img,video,details,input,textarea,select)')].filter(element=>{
        const bounds=element.getBoundingClientRect();
        let left=bounds.left,right=bounds.right,top=bounds.top,bottom=bounds.bottom;
        // A horizontally scrollable table can extend beyond its clipped panel.
        // Only its painted rectangle can collide with the floating action.
        for(let parent=element.parentElement;parent;parent=parent.parentElement){
          const style=getComputedStyle(parent),r=parent.getBoundingClientRect();
          if(style.overflowX!=='visible'){left=Math.max(left,r.left);right=Math.min(right,r.right);}
          if(style.overflowY!=='visible'){top=Math.max(top,r.top);bottom=Math.min(bottom,r.bottom);}
        }
        return right>left&&bottom>top&&left<rect.right&&right>rect.left&&top<rect.bottom&&bottom>rect.top;
      }).map(e=>e.tagName);
      result.push({y:scrollY,visibility:getComputedStyle(bubble).visibility,width:rect.width,height:rect.height,overlap});
    }
    return result;
  })()`
  );
  assert.equal(response.success, true, JSON.stringify(response));
  console.log(JSON.stringify(response.data.result, null, 2));
  for (const sample of response.data.result) {
    assert.equal(
      sample.visibility,
      "visible",
      `Mobile bubble disappeared at scrollY=${sample.y}`
    );
    assert.equal(
      sample.width,
      sample.height,
      "Touch bubble must remain circular"
    );
    assert.deepEqual(
      sample.overlap,
      [],
      `Bubble covers content at scrollY=${sample.y}`
    );
  }
  const capabilityLines = browser(
    "eval",
    `(()=>{
    const label=[...document.querySelectorAll('main span')].find(e=>e.textContent==='Performance');
    if(!label)return null;
    const range=document.createRange();range.selectNodeContents(label);
    return range.getClientRects().length;
  })()`
  ).data.result;
  if (capabilityLines !== null) {
    assert.equal(
      capabilityLines,
      1,
      "Capability labels must not split mid-word in the mobile lane"
    );
  }
  console.log(
    "PASS: stable mobile circle, no content collision at eight scroll positions"
  );
} finally {
  browser("close");
  rmSync(temp, { recursive: true, force: true });
}
