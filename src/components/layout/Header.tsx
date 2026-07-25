"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/engineering", label: "Engineering" },
  { href: "/career", label: "Career" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight whitespace-nowrap shrink-0 min-h-[44px] flex items-center">
          ksungz
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-hide">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm whitespace-nowrap transition-colors hover:text-[var(--color-foreground)] min-h-[44px] flex items-center",
                pathname === href ||
                (pathname.startsWith(href + "/") && href !== "/")
                  ? "font-medium text-[var(--color-foreground)]"
                  : "text-[var(--color-muted)]"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}