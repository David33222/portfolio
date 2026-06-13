"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/Projects";

export function About({
  bio,
  avatarUrl,
  name,
  stats,
}: {
  bio: string;
  avatarUrl: string;
  name: string;
  stats: { label: string; value: string }[];
}) {
  return (
    <section id="about" className="container-x py-20 sm:py-28 scroll-mt-16">
      <SectionHeading no="02" label="About" title="A little about me" />

      <div className="mt-14 grid gap-10 md:gap-14 md:grid-cols-[1.5fr_1fr] items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative aspect-[4/5] w-full max-w-xs mx-auto md:mx-0 md:ml-auto overflow-hidden border border-[var(--color-border)]"
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 80vw, 320px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-[var(--color-bg-soft)]">
              <span className="serif text-7xl text-[var(--color-faint)]">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
