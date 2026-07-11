const mobileViewport = window.matchMedia("(max-width: 767px)");

const footerBoundaryWindow = window as Window & {
  __wuiMobileFooterBoundaryReady?: boolean;
};

let footerObserver: IntersectionObserver | undefined;
let clampFrame = 0;
let lastTouchY = 0;
let isTouchMoveListening = false;

const getFooter = () =>
  document.querySelector<HTMLElement>("[data-site-footer]");

const isOverlayInteraction = (target: EventTarget | null) =>
  target instanceof Element &&
  Boolean(
    target.closest("dialog[open]") ||
    target.closest("[data-mobile-menu]:not([hidden])") ||
    target.closest("[data-floating-contact-panel][aria-hidden='false']")
  );

const getViewportMetrics = () => {
  const viewport = window.visualViewport;

  return {
    height: viewport?.height ?? window.innerHeight,
    offsetTop: viewport?.offsetTop ?? 0,
  };
};

const getFooterBottom = (footer: HTMLElement) =>
  footer.getBoundingClientRect().bottom + window.scrollY;

const isAtFooterBoundary = () => {
  const footer = getFooter();
  if (!footer) return false;

  const viewport = getViewportMetrics();
  const viewportBottom = window.scrollY + viewport.offsetTop + viewport.height;

  return viewportBottom >= getFooterBottom(footer) - 2;
};

const clampScrollToFooter = () => {
  clampFrame = 0;

  if (!mobileViewport.matches) return;
  if (document.querySelector("dialog[open]")) return;

  const footer = getFooter();
  if (!footer) return;

  const viewport = getViewportMetrics();
  const maxScrollY = Math.max(
    0,
    getFooterBottom(footer) - viewport.height - viewport.offsetTop
  );

  if (window.scrollY <= maxScrollY + 2) return;

  window.scrollTo({
    behavior: "auto",
    left: window.scrollX,
    top: maxScrollY,
  });
};

const scheduleFooterClamp = () => {
  if (clampFrame) return;
  clampFrame = window.requestAnimationFrame(clampScrollToFooter);
};

const handleTouchStart = (event: TouchEvent) => {
  if (event.touches.length !== 1) return;
  lastTouchY = event.touches[0]?.clientY ?? 0;
};

const handleTouchMove = (event: TouchEvent) => {
  if (event.touches.length !== 1 || isOverlayInteraction(event.target)) return;

  const currentTouchY = event.touches[0]?.clientY ?? lastTouchY;
  const isSwipingPastTheEnd = currentTouchY < lastTouchY;
  lastTouchY = currentTouchY;

  if (!isSwipingPastTheEnd || !isAtFooterBoundary()) return;
  if (!event.cancelable) return;

  event.preventDefault();
  scheduleFooterClamp();
};

const setTouchMoveListener = (shouldListen: boolean) => {
  if (shouldListen === isTouchMoveListening) return;

  if (shouldListen) {
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
  } else {
    document.removeEventListener("touchmove", handleTouchMove);
  }

  isTouchMoveListening = shouldListen;
};

const observeFooter = () => {
  footerObserver?.disconnect();
  footerObserver = undefined;
  setTouchMoveListener(false);

  if (!mobileViewport.matches) return;

  const footer = getFooter();
  if (!footer) return;

  footerObserver = new IntersectionObserver((entries) => {
    setTouchMoveListener(Boolean(entries[0]?.isIntersecting));
  });
  footerObserver.observe(footer);
  scheduleFooterClamp();
};

export const initMobileFooterBoundary = () => {
  if (footerBoundaryWindow.__wuiMobileFooterBoundaryReady) return;

  document.addEventListener("touchstart", handleTouchStart, { passive: true });
  document.addEventListener("astro:page-load", observeFooter);
  window.addEventListener("pageshow", observeFooter);
  window.addEventListener("orientationchange", scheduleFooterClamp);
  window.addEventListener("scroll", scheduleFooterClamp, { passive: true });
  window.visualViewport?.addEventListener("resize", scheduleFooterClamp);
  window.visualViewport?.addEventListener("scroll", scheduleFooterClamp);
  mobileViewport.addEventListener("change", observeFooter);

  observeFooter();
  footerBoundaryWindow.__wuiMobileFooterBoundaryReady = true;
};
