"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Wrench, CheckCircle2, Clock } from "lucide-react";

export type ProjectItem = {
  id: string;
  title: string;
  summary: string;
  coverImage: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
  status: string;
  featured: boolean;
};

const STATUS_META: Record<
  string,
  { label: string; icon: typeof CheckCircle2; color: string }
> = {
  completed: { label: "Completed", icon: CheckCircle2, color: "var(--color-accent-2)" },
  "in-progress": { label: "In progress", icon: Wrench, color: "var(--color-accent)" },
  planned: { label: "Planned", icon: Clock, color: "#f5a623" },
};

export function Projects({ projects }: { projects: ProjectItem[] }) {
  const filters = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).slice(0, 12)];
  }, [projects]);

  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(active));

  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-24 scroll-mt-20">
      <SectionHeading
        eyebrow="Selected work"
        title="Things I've built"
        subtitle="A mix of shipped products and experiments I'm actively working on."
      />

      {filters.length > 1 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-3.5 py-1.5 rounded-full text-sm transition-colors border ${
                active === f
                  ? "bg-[var(--color-accent)] text-white border-transparent"
                  : "glass text-[var(--color-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-[var(--color-muted)]">
          No projects yet. Add some from the admin dashboard.
        </p>
      )}
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  const status = STATUS_META[project.status] ?? STATUS_META.completed;
  const StatusIcon = status.icon;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-2xl glass overflow-hidden card-hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-bg-soft)]">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent-2)]/10">
            <span className="text-4xl font-bold gradient-text">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
        <span
          className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium glass"
          style={{ color: status.color }}
        >
          <StatusIcon size={13} /> {status.label}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-1.5 text-sm text-[var(--color-muted)] line-clamp-2">
          {project.summary}
        </p>

        {project.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-md bg-[var(--color-bg-soft)] px-2 py-0.5 text-[11px] text-[var(--color-muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 flex items-center gap-3 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium hover:text-[var(--color-accent)] transition-colors"
            >
              Live <ArrowUpRight size={15} />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <Github size={15} /> Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <span className="text-sm font-medium uppercase tracking-wider gradient-text">
        {eyebrow}
      </span>
      <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{subtitle}</p>
      )}
    </motion.div>
  );
}
