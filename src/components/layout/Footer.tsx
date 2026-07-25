export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] py-6 sm:py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center text-xs text-[var(--color-muted)]">
        © {new Date().getFullYear()} Sungjae Kim · AX Engineer
      </div>
    </footer>
  );
}
