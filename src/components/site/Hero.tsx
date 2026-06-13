"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcon";

type Social = { id: string; platform: string; url: string };

const ease = [0.16, 1, 0.3, 1] as const;

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
      className="container-x min-h-[92vh] flex flex-col justify-center pt-28 pb-16"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-8"
      >
        <span className="eyebrow">{location || "Portfolio"}</span>
        {available && (
          <>
            <span className="rule max-w-10" />
            <span className="flex items-center gap-2 font-mono text-xs text-[var(--color-muted)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              </span>
              Available for work
            </span>
          </>
        )}
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_auto] gap-y-10 gap-x-16 items-end">
        <div>
          <h1 className="serif font-medium tracking-[-0.02em] leading-[0.95] text-[clamp(2.75rem,9vw,7rem)]">
            {name}
          </h1>
          <p className="mt-5 max-w-xl text-[clamp(1.05rem,2.5vw,1.4rem)] leading-snug text-[var(--color-text)]">
            {headline}
          </p>
        </div>

        {/* meta column */}
        <div className="lg:text-right lg:max-w-[16rem]">
          {bio && (
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              {bio}
            </p>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease }}
        className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5"
      >
        <div className="flex flex-wrap gap-3">
          <a href="#work" className="btn btn-primary">
            View work <ArrowDownRight size={16} />
          </a>
          <a href="#contact" className="btn btn-ghost">
            Get in touch
          </a>
          {resumeUrl && (
            <a href={resumeUrl} target="_blank" className="btn btn-ghost">
              Résumé
            </a>
          )}
        </div>

        {socials.length > 0 && (
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.platform}
                className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
              >
                <SocialIcon platform={s.platform} className="w-[18px] h-[18px]" />
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
