"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
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
    <section id="contact" className="max-w-5xl mx-auto px-6 py-24 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl glass p-10 sm:p-14 text-center overflow-hidden"
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[var(--color-accent)]/30 blur-3xl pointer-events-none" />
        <span className="text-sm font-medium uppercase tracking-wider gradient-text">
          Get in touch
        </span>
        <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight">
          Let&apos;s build something.
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-[var(--color-muted)]">
          Have a project, a role, or just want to say hi? My inbox is always open.
        </p>

        {email && (
          <a
            href={`mailto:${email}`}
            className="btn btn-primary mt-8 mx-auto"
          >
            <Mail size={16} /> {email} <ArrowUpRight size={16} />
          </a>
        )}

        {socials.length > 0 && (
          <div className="mt-8 flex justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.platform}
                className="grid place-items-center w-11 h-11 rounded-xl glass text-[var(--color-muted)] hover:text-[var(--color-text)] card-hover"
              >
                <SocialIcon platform={s.platform} className="w-5 h-5" />
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
