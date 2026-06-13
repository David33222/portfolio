"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#work", label: "Work", no: "01" },
  { href: "#about", label: "About", no: "02" },
  { href: "#skills", label: "Skills", no: "03" },
  { href: "#contact", label: "Contact", no: "04" },
];

export function Navbar({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const first = name.split(" ")[0] || name;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_88%,transparent)] backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16">
        <a href="#top" className="serif text-xl tracking-tight">
          {first}
          <span className="text-[var(--color-accent)]">.</span>
        </a>

        {/* desktop */}
        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group flex items-baseline gap-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <span className="font-mono text-[10px] text-[var(--color-faint)] group-hover:text-[var(--color-accent)] transition-colors">
                {l.no}
              </span>
              {l.label}
            </a>
          ))}
        </nav>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden grid place-items-center w-10 h-10 -mr-2 text-[var(--color-text)]"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]"
          >
            <div className="container-x py-4 flex flex-col">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-3 py-3 border-b border-[var(--color-border)] last:border-0 text-lg"
                >
                  <span className="font-mono text-xs text-[var(--color-accent)]">
                    {l.no}
                  </span>
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
