import { useEffect, useRef } from "react";
import { animate, spring, type JSAnimation } from "animejs";

export default function Header({ pathName }: { pathName: string }) {
  const navRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<JSAnimation | null>(null);
  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/about", label: "À propos" },
    { href: "/blog", label: "Blog" },
    { href: "/vault", label: "La grotte" },
  ];

  const isActive = (path: string) => pathName === path;

  useEffect(() => {
    const syncIndicator = () => {
      const nav = navRef.current;
      const indicator = indicatorRef.current;
      const activeLink = nav?.querySelector<HTMLAnchorElement>(
        'a[aria-current="page"]',
      );

      if (!nav || !indicator || !activeLink) return;

      const navBox = nav.getBoundingClientRect();
      const linkBox = activeLink.getBoundingClientRect();
      const next = {
        x: linkBox.left - navBox.left,
        y: linkBox.top - navBox.top,
        width: linkBox.width,
        height: linkBox.height,
      };

      animationRef.current?.cancel();

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        Object.assign(indicator.style, {
          height: `${next.height}px`,
          opacity: "1",
          transform: `translate3d(${next.x}px, ${next.y}px, 0)`,
          width: `${next.width}px`,
        });
        return;
      }

      animationRef.current = animate(indicator, {
        ...next,
        opacity: 1,
        ease: spring({ duration: 260, bounce: 0.18 }),
      });
    };

    const scheduleSync = () => requestAnimationFrame(syncIndicator);
    const frame = scheduleSync();

    document.addEventListener("astro:page-load", scheduleSync);
    window.addEventListener("resize", scheduleSync);

    return () => {
      cancelAnimationFrame(frame);
      animationRef.current?.cancel();
      document.removeEventListener("astro:page-load", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
    };
  }, [pathName]);

  return (
    <header className="w-full p-4 mb-12">
      <nav className="max-w-5xl mx-auto p-4">
        <ul
          ref={navRef}
          className="relative flex gap-4 justify-center items-center font-light"
        >
          <span
            ref={indicatorRef}
            aria-hidden="true"
            className="absolute left-0 top-0 z-0 rounded-full bg-gray-100 opacity-0"
          />
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                aria-current={isActive(item.href) ? "page" : undefined}
                className="relative z-10 block px-5 py-3"
                href={item.href}
              >
                <span className="relative z-10">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
