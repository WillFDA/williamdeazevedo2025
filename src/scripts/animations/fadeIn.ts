const observerByDocument = new WeakMap<Document, IntersectionObserver>();

export function initFadeInAnimations(root: Document) {
    if (!("IntersectionObserver" in window)) {
        root.querySelectorAll<HTMLElement>("[data-reveal-on-scroll]").forEach(
            (element) => element.classList.add("is-visible"),
        );
        return;
    }

    let observer = observerByDocument.get(root);

    if (!observer) {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const element = entry.target as HTMLElement;
                    element.classList.add("is-visible");
                    observer?.unobserve(element);
                });
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
        );

        observerByDocument.set(root, observer);
    }

    root.querySelectorAll<HTMLElement>(
        '[data-reveal-on-scroll]:not(.is-visible)',
    ).forEach((element) => observer.observe(element));
}
