"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Mail, LogIn, ArrowLeft } from "lucide-react";
import { authenticate } from "./actions";

export default function LoginPage() {
  const [errorMessage, formAction] = useActionState(authenticate, undefined);

  return (
    <main className="min-h-screen grid place-items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm rounded-2xl glass p-8"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          <ArrowLeft size={15} /> Back to site
        </Link>

        <h1 className="mt-6 text-2xl font-bold">Admin sign in</h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          This area is private — only you can edit the portfolio.
        </p>

        <form action={formAction} className="mt-7 space-y-4">
          <div>
            <label className="text-sm text-[var(--color-muted)]">Email</label>
            <div className="relative mt-1.5">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="field pl-9"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-[var(--color-muted)]">Password</label>
            <div className="relative mt-1.5">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
              />
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="field pl-9"
              />
            </div>
          </div>

          {errorMessage && (
            <p className="text-sm text-red-400">{errorMessage}</p>
          )}

          <SubmitButton />
        </form>
      </motion.div>
    </main>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-primary w-full disabled:opacity-60"
    >
      <LogIn size={16} /> {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}
