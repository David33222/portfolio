import {
  siTypescript,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siNodedotjs,
  siSupabase,
  siVercel,
  siN8n,
  siGithub,
  type SimpleIcon,
} from "simple-icons";
import { ShieldCheck, Bot, Layers, Sparkle, type LucideIcon } from "lucide-react";

// Skill name (keyword match) -> official brand mark, rendered in its brand color.
const BRANDS: { match: string[]; icon: SimpleIcon }[] = [
  { match: ["typescript"], icon: siTypescript },
  { match: ["next"], icon: siNextdotjs },
  { match: ["react"], icon: siReact },
  { match: ["tailwind"], icon: siTailwindcss },
  { match: ["node"], icon: siNodedotjs },
  { match: ["supabase"], icon: siSupabase },
  { match: ["vercel"], icon: siVercel },
  { match: ["n8n"], icon: siN8n },
  { match: ["git"], icon: siGithub },
];

// Skills/concepts with no official logo -> tasteful generic icon.
const FALLBACKS: { match: string[]; icon: LucideIcon }[] = [
  { match: ["cyber", "security"], icon: ShieldCheck },
  { match: ["agent", "ai "], icon: Bot },
  { match: ["full", "stack", "developer"], icon: Layers },
];

// Google Antigravity's real logo (not in simple-icons). Rendered as-is so it
// keeps its colors; injected via innerHTML to avoid JSX attribute conversion.
const ANTIGRAVITY_SVG = `<svg width="100%" height="100%" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="ag_mask" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="15"><path d="M14.0777 13.984C14.945 14.6345 16.2458 14.2008 15.0533 13.0084C11.476 9.53949 12.2349 0 7.79033 0C3.34579 0 4.10461 9.53949 0.527295 13.0084C-0.773543 14.3092 0.635692 14.6345 1.50293 13.984C4.86344 11.7076 4.64663 7.69664 7.79033 7.69664C10.934 7.69664 10.7172 11.7076 14.0777 13.984Z" fill="black"/></mask><g mask="url(#ag_mask)"><rect x="-2" y="-7" width="12" height="9" fill="#FFE432"/><rect x="8" y="-3" width="14" height="12" fill="#FC413D"/><rect x="-9" y="-2" width="16" height="12" fill="#00B95C"/><rect x="5" y="10" width="13" height="12" fill="#3186FF"/><rect x="1" y="-10" width="14" height="12" fill="#FBBC04"/></g></svg>`;

function AntigravityLogo({ className }: { className?: string }) {
  return (
    <span
      className={className}
      style={{ display: "inline-block" }}
      dangerouslySetInnerHTML={{ __html: ANTIGRAVITY_SVG }}
    />
  );
}

export function SkillLogo({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const n = ` ${name.toLowerCase()} `;

  if (n.includes("antigravity")) return <AntigravityLogo className={className} />;

  const brand = BRANDS.find((b) => b.match.some((m) => n.includes(m)));
  if (brand) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        fill={`#${brand.icon.hex}`}
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
