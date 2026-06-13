import Link from "next/link";

export function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-[var(--color-border)] mt-12">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[var(--color-muted)]">
        <span>
          © {new Date().getFullYear()} {name}. Built with Next.js.
        </span>
        <Link
          href="/admin"
          className="hover:text-[var(--color-text)] transition-colors"
        >
          Admin
        </Link>
      </div>
    </footer>
  );
}
