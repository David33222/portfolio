"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcon";

type Social = { id: string; platform: string; url: string; handle: string };

export function Contact({
  email,
  socials,
}: {
  email: string;
  socials: Social[];
}) {
  return (
    <section id="contact" className="container-x py-20 sm:py-32 scroll-mt-16">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[var(--color-accent)]">(04)</span>
        <span className="eyebrow">Contact</span>
        <span className="rule flex-1" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mt-10"
      >
        <p className="serif text-[clamp(2rem,7vw,4.5rem)] leading-[1.05] tracking-tight max-w-3xl">
          Let&apos;s build something good together.
        </p>

        {email && (
          <a
            href={`mailto:${email}`}
            className="group inline-flex items-center gap-3 mt-10 serif text-2xl sm:text-3xl link-underline"
          >
            {email}
            <ArrowUpRight
              size={26}
              className="text-[var(--color-accent)] group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"
            />
          </a>
        )}

        {socials.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-sm">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                <SocialIcon
                  platform={s.platform}
                  className="w-4 h-4 text-[var(--color-faint)] group-hover:text-[var(--color-accent)] transition-colors"
                />
                {s.platform}
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
