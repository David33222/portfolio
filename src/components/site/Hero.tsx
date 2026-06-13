"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles, MapPin } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcon";

type Social = { id: string; platform: string; url: string };

export function Hero({
  name,
  headline,
  bio,
  location,
  available,
  socials,
  resumeUrl,
}: {
  name: string;
  headline: string;
  bio: string;
  location: string;
  available: boolean;
  socials: Social[];
  resumeUrl: string;
}) {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center max-w-5xl mx-auto px-6 pt-28 pb-20"
    >
      {available && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 self-start glass rounded-full px-3.5 py-1.5 text-xs text-[var(--color-muted)] mb-7"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent-2)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-2)]" />
          </span>
          Available for new opportunities
        </motion.div>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05]"
      >
        Hi, I&apos;m <span className="gradient-text">{name}</span>.
        <br />
        {headline}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="mt-7 max-w-2xl text-lg text-[var(--color-muted)] leading-relaxed"
      >
        {bio}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.22 }}
        className="mt-9 flex flex-wrap items-center gap-3"
      >
        <a href="#projects" className="btn btn-primary">
          <Sparkles size={16} /> View my work
        </a>
        <a href="#contact" className="btn btn-ghost">
          Get in touch
        </a>
        {resumeUrl && (
          <a href={resumeUrl} target="_blank" className="btn btn-ghost">
            Résumé
          </a>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mt-10 flex items-center gap-5"
      >
        {location && (
          <span className="flex items-center gap-1.5 text-sm text-[var(--color-muted)]">
            <MapPin size={15} /> {location}
          </span>
        )}
        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              aria-label={s.platform}
              className="grid place-items-center w-9 h-9 rounded-lg glass text-[var(--color-muted)] hover:text-[var(--color-text)] card-hover"
            >
              <SocialIcon platform={s.platform} className="w-[18px] h-[18px]" />
            </a>
          ))}
        </div>
      </motion.div>

      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--color-muted)]"
        aria-label="Scroll down"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="block"
        >
          <ArrowDown size={20} />
        </motion.span>
      </motion.a>
    </section>
  );
}
