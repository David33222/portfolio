"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

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

const STATUS_LABEL: Record<string, string> = {
  completed: "Shipped",
  "in-progress": "In progress",
  planned: "Planned",
};

export function Projects({ projects }: { projects: ProjectItem[] }) {
  const featured = projects.filter((p) => p.featured);
  const rest = featured.length ? projects.filter((p) => !p.featured) : projects;

  return (
    <section id="work" className="container-x py-20 sm:py-28 scroll-mt-16">
      <SectionHeading no="01" label="Selected work" title="Things I've built" />

      {projects.length === 0 && (
        <p className="mt-12 text-[var(--color-muted)]">
          No projects yet — add some from the admin dashboard.
        </p>
      )}

      {featured.length > 0 && (
        <div className="mt-14 flex flex-col gap-16 sm:gap-24">
          {featured.map((p, i) => (
            <FeatureBlock key={p.id} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <div className="mt-20">
          {featured.length > 0 && (
            <h3 className="eyebrow mb-2">More work</h3>
          )}
          <ul>
            {rest.map((p, i) => (
              <IndexRow key={p.id} project={p} index={i + 1} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function FeatureBlock({
  project,
  flip,
}: {
  project: ProjectItem;
  flip: boolean;
}) {
  const href = project.liveUrl || project.repoUrl || undefined;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="grid md:grid-cols-2 gap-7 md:gap-12 items-center"
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`group relative block aspect-[4/3] overflow-hidden border border-[var(--color-border)] ${
          flip ? "md:order-2" : ""
        }`}
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-[var(--color-bg-soft)]">
            <span className="serif text-6xl text-[var(--color-faint)]">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </a>

      <div className={flip ? "md:order-1" : ""}>
        <div className="flex items-center gap-3 font-mono text-xs text-[var(--color-muted)]">
          <span className="text-[var(--color-accent)]">
            {STATUS_LABEL[project.status] ?? project.status}
          </span>
        </div>
        <h3 className="serif text-3xl sm:text-4xl mt-3 tracking-tight">
          {project.title}
        </h3>
        <p className="mt-4 text-[var(--color-muted)] leading-relaxed max-w-md">
          {project.summary}
        </p>

        {project.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-xs text-[var(--color-faint)]">
            {project.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}

        <div className="mt-7 flex items-center gap-5 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 link-underline"
            >
              Visit live <ArrowUpRight size={15} />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <Github size={15} /> Source
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function IndexRow({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const href = project.liveUrl || project.repoUrl || undefined;
  return (
    <li>
      <a
        href={href}
        target={href ? "_blank" : undefined}
        rel="noreferrer"
        className="group flex items-center gap-4 sm:gap-6 py-5 border-t border-[var(--color-border)] transition-[padding] duration-300 hover:pl-2"
      >
        <span className="font-mono text-xs text-[var(--color-faint)] w-7 shrink-0">
          {String(index).padStart(2, "0")}
        </span>
        <span className="serif text-xl sm:text-2xl group-hover:text-[var(--color-accent)] transition-colors">
          {project.title}
        </span>
        <span className="hidden sm:flex ml-auto items-center gap-x-4 font-mono text-xs text-[var(--color-faint)]">
          {project.tags.slice(0, 3).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </span>
        <ArrowUpRight
          size={18}
          className="sm:ml-0 ml-auto text-[var(--color-muted)] group-hover:text-[var(--color-accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform shrink-0"
        />
      </a>
    </li>
  );
}

export function SectionHeading({
  no,
  label,
  title,
  subtitle,
}: {
  no: string;
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[var(--color-accent)]">
          ({no})
        </span>
        <span className="eyebrow">{label}</span>
        <span className="rule flex-1" />
      </div>
      <h2 className="serif text-4xl sm:text-5xl tracking-tight mt-6">{title}</h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-[var(--color-muted)]">{subtitle}</p>
      )}
    </motion.div>
  );
}
