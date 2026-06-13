import Link from "next/link";

export function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="container-x py-8 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-[var(--color-muted)]">
        <span>
          © {new Date().getFullYear()} {name}
        </span>
        <span className="hidden sm:block">Designed &amp; built from scratch</span>
        <Link href="/admin" className="hover:text-[var(--color-accent)] transition-colors">
          Admin →
        </Link>
      </div>
    </footer>
  );
}
