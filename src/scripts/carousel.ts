import EmblaCarousel from "embla-carousel";

type CarouselState = {
    cleanup: Array<() => void>;
    destroyed: boolean;
    started: boolean;
    wrapperNode: HTMLElement;
};

const windowWithCarousel = window as Window & {
    __wuiCarouselLifecycleReady?: boolean;
    __wuiCarouselStates?: Set<CarouselState>;
};
const activeCarouselStates =
    windowWithCarousel.__wuiCarouselStates ?? new Set<CarouselState>();

windowWithCarousel.__wuiCarouselStates = activeCarouselStates;

const carouselStateByRoot = new WeakMap<HTMLElement, CarouselState>();

const pauseVideo = (video: HTMLVideoElement) => {
    video.dataset.carouselActive = "false";
    video.pause();
    video.currentTime = 0;
    video.preload = "none";
};

export function resetCarousels() {
    Array.from(activeCarouselStates).forEach(destroyCarousel);
}

function destroyCarousel(state: CarouselState) {
    if (state.destroyed) return;

    state.destroyed = true;
    state.cleanup.splice(0).forEach((cleanup) => cleanup());
    state.wrapperNode
        .querySelectorAll<HTMLVideoElement>("video")
        .forEach(pauseVideo);
    state.wrapperNode
        .querySelector<HTMLElement>(".embla__viewport")
        ?.classList.remove("is-ready");
    delete state.wrapperNode.dataset.initialized;
    delete state.wrapperNode.dataset.carouselAutoplayVisible;
    carouselStateByRoot.delete(state.wrapperNode);
    activeCarouselStates.delete(state);
}

export function initCarousel(wrapperNode: HTMLElement) {
    if (carouselStateByRoot.has(wrapperNode)) return;
    if (wrapperNode.dataset.initialized === "true") return;

    const viewportNode =
        wrapperNode.querySelector<HTMLElement>(".embla__viewport");
    const prevButtonNode = wrapperNode.querySelector(".embla__prev");
    const nextButtonNode = wrapperNode.querySelector(".embla__next");
    const autoplayButtonNode = wrapperNode.querySelector<HTMLButtonElement>(
        "[data-carousel-autoplay-toggle]",
    );
    const progressNode = wrapperNode.querySelector<HTMLElement>(
        "[data-carousel-progress]",
    );

    if (!viewportNode || !prevButtonNode || !nextButtonNode) return;

    const slides = wrapperNode.querySelectorAll<HTMLElement>(".embla__slide");
    const videos = wrapperNode.querySelectorAll<HTMLVideoElement>("video");

    wrapperNode.dataset.initialized = "true";
    const state: CarouselState = {
        cleanup: [],
        destroyed: false,
        started: true,
        wrapperNode,
    };

    carouselStateByRoot.set(wrapperNode, state);
    activeCarouselStates.add(state);

    const emblaApi = EmblaCarousel(viewportNode, {
        loop: true,
        align: "center",
    });
    state.cleanup.push(() => emblaApi.destroy());
    let lastDispatchedIndex = emblaApi.selectedScrollSnap();
    let isSettled = true;
    let canUpdateVideos = true;
    let scheduleAutoplay = () => {};
    let cancelAutoplay = () => {};

    const playVideo = (video: HTMLVideoElement) => {
        video.dataset.carouselActive = "true";
        video.preload = "auto";

        const play = () => {
            if (video.dataset.carouselActive !== "true") return;

            void video.play().catch(() => {});
        };

        if (video.readyState < 2 && video.dataset.carouselPlayQueued !== "true") {
            video.dataset.carouselPlayQueued = "true";
            video.addEventListener(
                "loadeddata",
                () => {
                    delete video.dataset.carouselPlayQueued;
                    play();
                },
                { once: true },
            );
            video.load();
        }

        window.requestAnimationFrame(play);
    };

    function dispatchSlideChange() {
        const activeIndex = emblaApi.selectedScrollSnap();

        if (activeIndex !== lastDispatchedIndex) {
            const previousIndex = emblaApi.previousScrollSnap();
            const snapCount = emblaApi.scrollSnapList().length;
            const delta = (activeIndex - previousIndex + snapCount) % snapCount;
            const direction = delta <= snapCount / 2 ? "next" : "prev";

            lastDispatchedIndex = activeIndex;
            wrapperNode.dispatchEvent(
                new CustomEvent("carousel:select", {
                    bubbles: true,
                    detail: { direction, index: activeIndex },
                }),
            );
        }
    }

    function updateVideos() {
        const activeSlide = slides[emblaApi.selectedScrollSnap()];

        videos.forEach((video) => {
            if (activeSlide?.contains(video)) {
                playVideo(video);
                return;
            }

            pauseVideo(video);
        });
    }

    emblaApi.on("select", () => {
        isSettled = false;
        dispatchSlideChange();
    });
    emblaApi.on("settle", () => {
        isSettled = true;
        if (canUpdateVideos) updateVideos();
        scheduleAutoplay();
    });

    emblaApi.on("init", () => viewportNode.classList.add("is-ready"));

    const shouldAutoplay =
        wrapperNode.dataset.carouselAutoplay === "true" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    canUpdateVideos = !shouldAutoplay;
    if (canUpdateVideos) updateVideos();

    const scrollPrev = () => {
        cancelAutoplay();
        emblaApi.scrollPrev();
    };
    const scrollNext = () => {
        cancelAutoplay();
        emblaApi.scrollNext();
    };

    prevButtonNode.addEventListener("click", scrollPrev);
    nextButtonNode.addEventListener("click", scrollNext);
    state.cleanup.push(() => {
        prevButtonNode.removeEventListener("click", scrollPrev);
        nextButtonNode.removeEventListener("click", scrollNext);
    });

    if (shouldAutoplay) {
        let isInAutoplayZone = false;
        let isPaused = false;
        let progressAnimation: Animation | undefined;
        let progressRun = 0;
        const delay = Number(wrapperNode.dataset.carouselAutoplayDelay) || 4500;

        const resetProgress = () => {
            progressRun += 1;
            progressAnimation?.cancel();
            progressAnimation = undefined;
            if (progressNode) progressNode.style.transform = "scaleX(0)";
        };

        const startProgress = () => {
            if (!progressNode || !isInAutoplayZone || isPaused) return;

            resetProgress();
            const currentRun = progressRun;

            progressAnimation = progressNode.animate(
                [
                    { transform: "scaleX(0)", offset: 0 },
                    { transform: "scaleX(1)", offset: 0.94 },
                    { transform: "scaleX(1)", offset: 1 },
                ],
                {
                    duration: delay,
                    easing: "linear",
                    fill: "forwards",
                },
            );

            progressAnimation.finished
                .then(() => {
                    if (
                        state.destroyed ||
                        currentRun !== progressRun ||
                        !document.contains(wrapperNode) ||
                        !isInAutoplayZone ||
                        isPaused
                    ) {
                        return;
                    }

                    progressNode.style.transform = "scaleX(1)";
                    emblaApi.scrollNext();
                })
                .catch(() => {});
        };

        const syncPausedUi = () => {
            autoplayButtonNode?.setAttribute("aria-pressed", String(isPaused));
            autoplayButtonNode?.setAttribute(
                "aria-label",
                isPaused ? "Relancer le carousel" : "Mettre le carousel en pause",
            );
        };

        const clearAutoplay = () => {
            resetProgress();
        };
        const toggleUserPaused = () => {
            isPaused = !isPaused;
            scheduleAutoplay();
        };

        scheduleAutoplay = () => {
            syncPausedUi();
            if (state.destroyed || !isInAutoplayZone || isPaused) {
                clearAutoplay();
                return;
            }

            startProgress();
        };
        cancelAutoplay = clearAutoplay;

        const autoplayObserver = new IntersectionObserver(
            (entries) => {
                const nextIsInAutoplayZone =
                    entries[0]?.isIntersecting ?? false;

                if (nextIsInAutoplayZone === isInAutoplayZone) return;

                isInAutoplayZone = nextIsInAutoplayZone;
                canUpdateVideos = isInAutoplayZone;
                wrapperNode.dataset.carouselAutoplayVisible =
                    String(isInAutoplayZone);

                if (isInAutoplayZone) {
                    updateVideos();
                    if (isSettled) scheduleAutoplay();
                } else {
                    clearAutoplay();
                    videos.forEach(pauseVideo);
                }
            },
            { threshold: 0.2 },
        );

        autoplayObserver.observe(wrapperNode);
        syncPausedUi();
        state.cleanup.push(() => {
            autoplayObserver.disconnect();
            resetProgress();
        });

        autoplayButtonNode?.addEventListener("click", toggleUserPaused);
        state.cleanup.push(() => {
            autoplayButtonNode?.removeEventListener("click", toggleUserPaused);
        });
    }
}

if (windowWithCarousel.__wuiCarouselLifecycleReady !== true) {
    windowWithCarousel.__wuiCarouselLifecycleReady = true;
    document.addEventListener("astro:before-swap", resetCarousels);
}
