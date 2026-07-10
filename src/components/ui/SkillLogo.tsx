import {
  siTypescript,
  siReact,
  siTailwindcss,
  siNodedotjs,
  siSupabase,
  siVercel,
  siN8n,
  siGithub,
  type SimpleIcon,
} from "simple-icons";
import {
  ShieldCheck,
  Bot,
  Layers,
  Sparkles,
  Sparkle,
  type LucideIcon,
} from "lucide-react";

// Map a skill name (keyword match) to an official brand mark…
const BRANDS: { match: string[]; icon: SimpleIcon }[] = [
  { match: ["typescript"], icon: siTypescript },
  { match: ["react", "next"], icon: siReact },
  { match: ["tailwind"], icon: siTailwindcss },
  { match: ["node"], icon: siNodedotjs },
  { match: ["supabase"], icon: siSupabase },
  { match: ["vercel"], icon: siVercel },
  { match: ["n8n"], icon: siN8n },
  { match: ["git"], icon: siGithub },
];

// …or a tasteful generic icon for skills with no brand logo.
const FALLBACKS: { match: string[]; icon: LucideIcon }[] = [
  { match: ["cyber", "security"], icon: ShieldCheck },
  { match: ["agent", "ai "], icon: Bot },
  { match: ["antigravity", "google"], icon: Sparkles },
  { match: ["full", "stack", "developer"], icon: Layers },
];

export function SkillLogo({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const n = ` ${name.toLowerCase()} `;

  const brand = BRANDS.find((b) => b.match.some((m) => n.includes(m)));
  if (brand) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={className}
      >
        <path d={brand.icon.path} />
      </svg>
    );
  }

  const fallback = FALLBACKS.find((f) => f.match.some((m) => n.includes(m)));
  const Icon = fallback?.icon ?? Sparkle;
  return <Icon className={className} aria-hidden="true" />;
}
