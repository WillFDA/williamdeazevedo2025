export default function Header({ pathName }: { pathName: string }) {
  const navItems = [
    { href: "/", id: "home", label: "Accueil" },
    { href: "/projets", id: "projects", label: "Projets" },
    { href: "/about", id: "about", label: "À propos" },
    { href: "/blog", id: "blog", label: "Blog" },
    { href: "/vault", id: "vault", label: "La grotte" },
  ];

  const currentPath = pathName.replace(/\/$/, "") || "/";
  const isActive = (path: string) => currentPath === path;

  return (
    <header className="w-full p-4 mb-12">
      <nav className="max-w-5xl mx-auto p-4">
        <ul className="relative flex gap-4 justify-center items-center font-light">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <a
                  aria-current={active ? "page" : undefined}
                  className="relative block px-5 py-3"
                  href={item.href}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-gray-100"
                      style={{ viewTransitionName: "nav-active-indicator" }}
                    />
                  )}
                  <span
                    className="relative z-10"
                    style={{ viewTransitionName: `nav-label-${item.id}` }}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
