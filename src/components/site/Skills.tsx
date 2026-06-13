"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/Projects";

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
        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
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
              <ul className="mt-4 flex flex-col">
                {items.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-baseline gap-3 py-2 text-lg"
                  >
                    <span className="text-[var(--color-accent)] text-xs">
                      ◆
                    </span>
                    {s.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
