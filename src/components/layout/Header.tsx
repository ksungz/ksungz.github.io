"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/products", label: "Products" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/engineering", label: "Engineering" },
  { href: "/career", label: "Career" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = (href: string) =>
    cn(
      "flex min-h-[44px] items-center text-sm whitespace-nowrap transition-colors hover:text-[var(--color-foreground)]",
      pathname === href || (pathname.startsWith(href + "/") && href !== "/")
        ? "font-medium text-[var(--color-foreground)]"
        : "text-[var(--color-muted)]"
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight whitespace-nowrap shrink-0 min-h-[44px] flex items-center">
          ksungz
        </Link>
        <nav className="hidden items-center gap-6 sm:flex">
          {nav.map(({ href, label }) => (
            <Link key={href} href={href} className={navLinkClass(href)}>
              {label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setIsOpen((open) => !open)}
          className="flex size-11 items-center justify-center text-[var(--color-foreground)] sm:hidden"
        >
          {isOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>
      {isOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-[var(--color-border)] bg-white px-4 py-2 sm:hidden"
        >
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-x-4">
            {nav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={navLinkClass(href)}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
