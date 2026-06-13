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

  return (
    <section id="skills" className="max-w-5xl mx-auto px-6 py-24 scroll-mt-20">
      <SectionHeading
        eyebrow="Toolbox"
        title="Skills & technologies"
        subtitle="The stack I reach for to design and ship products."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {Object.entries(grouped).map(([category, items], gi) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            className="rounded-2xl glass p-6"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)]">
              {category}
            </h3>
            <div className="mt-4 space-y-4">
              {items.map((s) => (
                <div key={s.id}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span>{s.name}</span>
                    <span className="text-[var(--color-muted)]">{s.level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--color-bg-soft)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {skills.length === 0 && (
        <p className="mt-12 text-center text-[var(--color-muted)]">
          No skills yet. Add some from the admin dashboard.
        </p>
      )}
    </section>
  );
}
