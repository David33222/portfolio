"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/Projects";

export function About({
  bio,
  stats,
}: {
  bio: string;
  stats: { label: string; value: string }[];
}) {
  return (
    <section id="about" className="container-x py-20 sm:py-28 scroll-mt-16">
      <SectionHeading no="02" label="About" title="A little about me" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-14 max-w-3xl"
      >
        <p className="serif text-2xl sm:text-3xl leading-[1.35] tracking-tight text-[var(--color-text)] whitespace-pre-line">
          {bio || "Add your bio from the admin dashboard."}
        </p>

        {stats.length > 0 && (
          <div className="mt-12 grid grid-cols-3 border-t border-[var(--color-border)]">
            {stats.map((s) => (
              <div
                key={s.label}
                className="py-5 pr-4 border-r border-[var(--color-border)] last:border-r-0"
              >
                <div className="serif text-3xl sm:text-4xl text-[var(--color-accent)]">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[var(--color-muted)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
