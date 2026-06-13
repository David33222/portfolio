"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, FolderGit2, Sparkles, Link2 } from "lucide-react";
import { ProfileForm, type ProfileData } from "./ProfileForm";
import { ProjectsManager, type ProjectData } from "./ProjectsManager";
import { SkillsManager, type SkillData } from "./SkillsManager";
import { SocialsManager, type SocialData } from "./SocialsManager";

type Tab = "profile" | "projects" | "skills" | "socials";

const TABS: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "socials", label: "Links", icon: Link2 },
];

export function AdminDashboard({
  profile,
  projects,
  skills,
  socials,
}: {
  profile: ProfileData;
  projects: ProjectData[];
  skills: SkillData[];
  socials: SocialData[];
}) {
  const [tab, setTab] = useState<Tab>("profile");

  const counts = {
    profile: 0,
    projects: projects.length,
    skills: skills.length,
    socials: socials.length,
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-[var(--color-muted)]">
          Everything on your portfolio, editable in one place.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "text-white"
                  : "glass text-[var(--color-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <Icon size={16} />
                {t.label}
                {t.id !== "profile" && (
                  <span
                    className={`text-xs px-1.5 rounded-full ${
                      active ? "bg-white/25" : "bg-[var(--color-bg-soft)]"
                    }`}
                  >
                    {counts[t.id]}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {tab === "profile" && <ProfileForm profile={profile} />}
        {tab === "projects" && <ProjectsManager projects={projects} />}
        {tab === "skills" && <SkillsManager skills={skills} />}
        {tab === "socials" && <SocialsManager socials={socials} />}
      </motion.div>
    </div>
  );
}
