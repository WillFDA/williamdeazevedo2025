type DotPoint = {
  direction: -1 | 1;
  opacity: number;
  speed: number;
  x: number;
  y: number;
};

type DotCanvasState = {
  buckets: DotPoint[][];
  canvas: HTMLCanvasElement;
  color: string;
  context: CanvasRenderingContext2D;
  dotSize: number;
  frame?: number;
  fps: number;
  height: number;
  lastPaint: number;
  maxOpacity: number;
  minOpacity: number;
  points: DotPoint[];
  reducedMotion: boolean;
  resizeObserver?: ResizeObserver;
  speed: number;
  visible: boolean;
  visibilityObserver?: IntersectionObserver;
  width: number;
};

const windowWithDotCanvas = window as Window & {
  __wuiDotCanvasLifecycleReady?: boolean;
  __wuiDotCanvasStates?: Set<DotCanvasState>;
};
const activeDotCanvasStates =
  windowWithDotCanvas.__wuiDotCanvasStates ?? new Set<DotCanvasState>();
windowWithDotCanvas.__wuiDotCanvasStates = activeDotCanvasStates;

const dotCanvasStateByCanvas = new WeakMap<HTMLCanvasElement, DotCanvasState>();

const parseNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseFloat(value ?? "");

  return Number.isFinite(parsed) ? parsed : fallback;
};

const resizeDotCanvas = (state: DotCanvasState) => {
  const { canvas } = state;
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(
    window.devicePixelRatio || 1,
    parseNumber(canvas.dataset.dotPixelRatio, 1.25)
  );
  const width = Math.max(1, Math.round(rect.width * ratio));
  const height = Math.max(1, Math.round(rect.height * ratio));
  const dotSize = Math.max(
    1,
    Math.round(parseNumber(canvas.dataset.dotSize, 1) * ratio)
  );
  const gap = Math.max(
    1,
    Math.round(parseNumber(canvas.dataset.dotGap, 7) * ratio)
  );
  const step = dotSize + gap;
  const minOpacity = parseNumber(canvas.dataset.dotMinOpacity, 0.04);
  const maxOpacity = parseNumber(canvas.dataset.dotMaxOpacity, 0.48);

  canvas.width = width;
  canvas.height = height;
  state.width = width;
  state.height = height;
  state.dotSize = dotSize;
  state.minOpacity = minOpacity;
  state.maxOpacity = maxOpacity;
  state.color = canvas.dataset.dotColor || "#111827";
  state.fps = parseNumber(canvas.dataset.dotFps, 24);
  state.speed = parseNumber(canvas.dataset.dotSpeed, 0.006);
  state.points = [];

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      state.points.push({
        direction: Math.random() > 0.5 ? 1 : -1,
        opacity: minOpacity + Math.random() * (maxOpacity - minOpacity),
        speed: state.speed * (0.45 + Math.random()),
        x,
        y,
      });
    }
  }
};

const paintDotCanvas = (state: DotCanvasState, animate: boolean) => {
  const { buckets, context, dotSize, height, maxOpacity, minOpacity, width } =
    state;

  context.clearRect(0, 0, width, height);
  context.fillStyle = state.color;
  buckets.forEach((bucket) => {
    bucket.length = 0;
  });

  state.points.forEach((point) => {
    if (animate) {
      point.opacity += point.speed * point.direction;

      if (point.opacity >= maxOpacity || point.opacity <= minOpacity) {
        point.opacity = Math.min(
          maxOpacity,
          Math.max(minOpacity, point.opacity)
        );
        point.direction *= -1;
      }
    }

    buckets[Math.round(point.opacity * 20)]?.push(point);
  });

  buckets.forEach((bucket, index) => {
    if (bucket.length === 0) return;

    context.globalAlpha = index / 20;
    bucket.forEach((point) => {
      context.fillRect(point.x, point.y, dotSize, dotSize);
    });
  });
  context.globalAlpha = 1;
};

const stopDotCanvas = (state: DotCanvasState) => {
  if (!state.frame) return;

  window.cancelAnimationFrame(state.frame);
  state.frame = undefined;
};

const renderDotCanvas = (state: DotCanvasState, time: number) => {
  if (!state.visible) {
    stopDotCanvas(state);
    return;
  }

  if (time - state.lastPaint >= 1000 / state.fps) {
    paintDotCanvas(state, true);
    state.lastPaint = time;
  }

  state.frame = window.requestAnimationFrame((nextTime) =>
    renderDotCanvas(state, nextTime)
  );
};

const startDotCanvas = (state: DotCanvasState) => {
  if (state.reducedMotion) {
    paintDotCanvas(state, false);
    return;
  }

  if (state.frame) return;

  state.frame = window.requestAnimationFrame((time) =>
    renderDotCanvas(state, time)
  );
};

const destroyDotCanvas = (state: DotCanvasState) => {
  stopDotCanvas(state);
  state.resizeObserver?.disconnect();
  state.visibilityObserver?.disconnect();
  dotCanvasStateByCanvas.delete(state.canvas);
  activeDotCanvasStates.delete(state);
  delete state.canvas.dataset.dotCanvasReady;
};

const bindDotCanvas = (canvas: HTMLCanvasElement) => {
  if (
    dotCanvasStateByCanvas.has(canvas) ||
    canvas.dataset.dotCanvasReady === "true"
  ) {
    return;
  }

  const context = canvas.getContext("2d", { alpha: true });

  if (!context) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const state: DotCanvasState = {
    buckets: Array.from({ length: 21 }, () => []),
    canvas,
    color: canvas.dataset.dotColor || "#111827",
    context,
    dotSize: 1,
    fps: 24,
    height: 1,
    lastPaint: 0,
    maxOpacity: 0.48,
    minOpacity: 0.04,
    points: [],
    reducedMotion,
    speed: 0.006,
    visible: false,
    width: 1,
  };

  canvas.dataset.dotCanvasReady = "true";
  dotCanvasStateByCanvas.set(canvas, state);
  activeDotCanvasStates.add(state);
  resizeDotCanvas(state);
  paintDotCanvas(state, false);

  state.resizeObserver = new ResizeObserver(() => {
    resizeDotCanvas(state);
    paintDotCanvas(state, false);
  });
  state.resizeObserver.observe(canvas);

  const setVisible = (visible: boolean) => {
    state.visible = visible;

    if (visible) {
      startDotCanvas(state);
    } else {
      stopDotCanvas(state);
    }
  };

  if ("IntersectionObserver" in window) {
    state.visibilityObserver = new IntersectionObserver(
      (entries) => setVisible(entries[0]?.isIntersecting ?? false),
      { rootMargin: "80px 0px" }
    );
    state.visibilityObserver.observe(canvas);
  } else {
    setVisible(true);
  }
};

const initDotCanvases = () => {
  document
    .querySelectorAll<HTMLCanvasElement>("canvas[data-dot-canvas]")
    .forEach(bindDotCanvas);
};

const resetDotCanvases = () => {
  Array.from(activeDotCanvasStates).forEach(destroyDotCanvas);
};

initDotCanvases();

if (windowWithDotCanvas.__wuiDotCanvasLifecycleReady !== true) {
  windowWithDotCanvas.__wuiDotCanvasLifecycleReady = true;
  document.addEventListener("astro:before-swap", resetDotCanvases);
  document.addEventListener("astro:page-load", initDotCanvases);
}
