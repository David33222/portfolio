import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { auth } from "@/lib/auth";
import { logout } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 glass border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] text-white font-bold">
              A
            </span>
            <div className="leading-tight">
              <div className="font-semibold">Admin Studio</div>
              <div className="text-xs text-[var(--color-muted)]">
                {session?.user?.email}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="btn btn-ghost text-sm">
              <ExternalLink size={15} /> View site
            </Link>
            <form action={logout}>
              <button className="btn btn-ghost text-sm" type="submit">
                <LogOut size={15} /> Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
