import { GitBranch, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] py-6 sm:py-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 text-xs text-[var(--color-muted)] sm:flex-row sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} Sungjae Kim · AX Engineer</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ksungz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 transition-colors hover:text-[var(--color-foreground)]"
          >
            <GitBranch aria-hidden="true" size={14} />
            GitHub
          </a>
          <a
            href="mailto:k.suzkim@gmail.com"
            className="inline-flex min-h-11 items-center gap-1.5 transition-colors hover:text-[var(--color-foreground)]"
          >
            <Mail aria-hidden="true" size={14} />
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
