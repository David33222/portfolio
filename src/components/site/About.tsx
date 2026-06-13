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
    <section id="about" className="max-w-5xl mx-auto px-6 py-24 scroll-mt-20">
      <SectionHeading eyebrow="About" title="A little about me" />

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.4fr] items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-square rounded-2xl overflow-hidden glass"
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent-2)]/10">
              <span className="text-7xl font-bold gradient-text">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-lg leading-relaxed text-[var(--color-muted)] whitespace-pre-line">
            {bio || "Add your bio from the admin dashboard."}
          </p>

          {stats.length > 0 && (
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl glass p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="mt-1 text-xs text-[var(--color-muted)]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
