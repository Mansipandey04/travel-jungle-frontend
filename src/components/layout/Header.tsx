"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand } from "@/lib/brand";

const nav = [
  { href: "/", label: "Home" },
  { href: "/explore-india", label: "Explore India" },
  { href: "/events", label: "Events" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={`absolute inset-x-0 top-0 z-40 ${
        isHome ? "text-sand" : "border-b border-jungle/10 bg-sand/95 text-jungle backdrop-blur-md"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl px-5 py-5 md:px-8 ${
          isHome
            ? "flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
            : "items-center justify-between"
        }`}
      >
        <Link
          href="/"
          className={`font-display text-xl tracking-tight md:text-2xl ${
            isHome ? "text-sand" : "text-jungle"
          }`}
        >
          {brand.name}
        </Link>

        {isHome ? (
          <nav className="flex flex-wrap items-center gap-2" aria-label="Primary">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={active}
                  className="nav-btn nav-btn-home inline-flex items-center justify-center border border-sand/55 px-3 py-1.5 font-sans text-xs text-sand sm:text-sm"
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        ) : (
          <Link
            href="/"
            className="border border-jungle/40 bg-sand px-3 py-1.5 font-sans text-xs text-jungle transition hover:border-jungle hover:bg-jungle hover:text-sand sm:text-sm"
          >
            Home
          </Link>
        )}
      </div>
    </header>
  );
}
