export type TrackingProperties = Record<string, string | number>;

type QueuedRybbitEvent = {
  eventName: string;
  properties: TrackingProperties;
};

type AnalyticsWindow = Window & {
  rybbit?: {
    event?: (eventName: string, properties: TrackingProperties) => void;
  };
  zaraz?: {
    track?: (
      eventName: string,
      properties: TrackingProperties
    ) => Promise<void> | void;
  };
};

const rybbitScriptUrl = "https://analytics.williamdeazevedo.fr/api/script.js";
const rybbitSiteId = "9713c4825fc7";
const rybbitQueueKey = "wui:rybbit-events";
const rybbitLoadDelay = 1500;
const maxQueuedEvents = 20;

let isInitialized = false;
let isRybbitLoading = false;
let queuedRybbitEvents: QueuedRybbitEvent[] | undefined;

const getAnalyticsWindow = () => window as AnalyticsWindow;

const readQueuedEvents = () => {
  if (queuedRybbitEvents) return queuedRybbitEvents;

  try {
    const storedEvents = window.sessionStorage.getItem(rybbitQueueKey);
    const parsedEvents = storedEvents ? JSON.parse(storedEvents) : [];

    queuedRybbitEvents = Array.isArray(parsedEvents)
      ? parsedEvents.slice(-maxQueuedEvents)
      : [];
  } catch {
    queuedRybbitEvents = [];
  }

  return queuedRybbitEvents;
};

const persistQueuedEvents = () => {
  try {
    const events = readQueuedEvents();

    if (events.length === 0) {
      window.sessionStorage.removeItem(rybbitQueueKey);
      return;
    }

    window.sessionStorage.setItem(rybbitQueueKey, JSON.stringify(events));
  } catch {
    // The in-memory queue remains available when storage is unavailable.
  }
};

const flushRybbitEvents = () => {
  const rybbit = getAnalyticsWindow().rybbit;
  if (typeof rybbit?.event !== "function") return;

  const events = readQueuedEvents().splice(0);
  const failedEvents: QueuedRybbitEvent[] = [];

  for (const event of events) {
    try {
      rybbit.event(event.eventName, event.properties);
    } catch {
      failedEvents.push(event);
    }
  }

  queuedRybbitEvents = failedEvents;
  persistQueuedEvents();
};

const loadRybbit = () => {
  if (typeof getAnalyticsWindow().rybbit?.event === "function") {
    flushRybbitEvents();
    return;
  }

  if (isRybbitLoading || document.querySelector("script[data-wui-rybbit]")) {
    return;
  }

  isRybbitLoading = true;

  const script = document.createElement("script");
  script.src = rybbitScriptUrl;
  script.async = true;
  script.dataset.siteId = rybbitSiteId;
  script.dataset.wuiRybbit = "";
  script.addEventListener(
    "load",
    () => {
      isRybbitLoading = false;
      flushRybbitEvents();
    },
    { once: true }
  );
  script.addEventListener(
    "error",
    () => {
      isRybbitLoading = false;
      script.remove();
    },
    { once: true }
  );
  document.head.append(script);
};

const scheduleRybbit = () => {
  window.setTimeout(loadRybbit, rybbitLoadDelay);
};

export const initAnalytics = () => {
  if (isInitialized) return;
  isInitialized = true;

  if (readQueuedEvents().length > 0) {
    loadRybbit();
    return;
  }

  if (document.readyState === "complete") {
    scheduleRybbit();
    return;
  }

  window.addEventListener("load", scheduleRybbit, { once: true });
};

export const trackAnalytics = (
  eventName: string,
  properties: TrackingProperties = {}
) => {
  initAnalytics();

  const analyticsWindow = getAnalyticsWindow();

  if (typeof analyticsWindow.zaraz?.track === "function") {
    void analyticsWindow.zaraz.track(eventName, properties);
  }

  if (typeof analyticsWindow.rybbit?.event === "function") {
    analyticsWindow.rybbit.event(eventName, properties);
    return;
  }

  const events = readQueuedEvents();
  events.push({ eventName, properties });
  queuedRybbitEvents = events.slice(-maxQueuedEvents);
  persistQueuedEvents();
  loadRybbit();
};
