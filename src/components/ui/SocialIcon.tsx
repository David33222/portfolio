import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  Instagram,
  Youtube,
  Dribbble,
  Figma,
  Link as LinkIcon,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  mail: Mail,
  email: Mail,
  website: Globe,
  web: Globe,
  portfolio: Globe,
  instagram: Instagram,
  youtube: Youtube,
  dribbble: Dribbble,
  figma: Figma,
};

export function SocialIcon({
  platform,
  className,
}: {
  platform: string;
  className?: string;
}) {
  const Icon = MAP[platform.trim().toLowerCase()] ?? LinkIcon;
  return <Icon className={className} />;
}
