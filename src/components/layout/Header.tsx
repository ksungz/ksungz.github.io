"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/career", label: "Career" },
  { href: "/tech", label: "Tech" },
  { href: "/tech/digest", label: "Digest" },
  { href: "/life", label: "Life" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          ksungz
        </Link>
        <nav className="flex items-center gap-6">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm transition-colors hover:text-[var(--color-foreground)]",
                pathname === href ||
                (pathname.startsWith(href + "/") && !(href === "/tech" && pathname.startsWith("/tech/digest")))
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
