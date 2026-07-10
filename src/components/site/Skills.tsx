"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/Projects";
import { SkillLogo } from "@/components/ui/SkillLogo";

export type SkillItem = {
  id: string;
  name: string;
  category: string;
  level: number;
};

export function Skills({ skills }: { skills: SkillItem[] }) {
  const grouped = skills.reduce<Record<string, SkillItem[]>>((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  const entries = Object.entries(grouped);

  return (
    <section id="skills" className="container-x py-20 sm:py-28 scroll-mt-16">
      <SectionHeading no="03" label="Toolbox" title="Skills & tools" />

      {skills.length === 0 ? (
        <p className="mt-12 text-[var(--color-muted)]">
          No skills yet — add some from the admin dashboard.
        </p>
      ) : (
        <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {entries.map(([category, items], gi) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: gi * 0.06 }}
              className="border-t border-[var(--color-border)] pt-5"
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                {category}
              </h3>
              <div className="mt-6 flex flex-wrap gap-x-7 gap-y-9 pb-2">
                {items.map((s) => (
                  <div
                    key={s.id}
                    title={s.name}
                    aria-label={s.name}
                    className="group relative flex items-center justify-center"
                  >
                    <SkillLogo
                      name={s.name}
                      className="w-8 h-8 sm:w-9 sm:h-9 text-[var(--color-muted)] group-hover:text-[var(--color-accent)] group-hover:-translate-y-0.5 transition-all duration-300"
                    />
                    <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
