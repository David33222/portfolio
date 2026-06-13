import { prisma } from "@/lib/prisma";

export const DEFAULT_PROFILE = {
  id: "profile",
  name: "Your Name",
  headline: "Building things for the web",
  bio: "",
  location: "",
  email: "",
  avatarUrl: "",
  resumeUrl: "",
  available: true,
};

export async function getProfile() {
  const profile = await prisma.profile.findUnique({ where: { id: "profile" } });
  return profile ?? DEFAULT_PROFILE;
}

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getSkills() {
  return prisma.skill.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
}

export async function getSocials() {
  return prisma.socialLink.findMany({ orderBy: { order: "asc" } });
}

export function parseTags(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
    // fall back to comma-separated
    return raw.split(",").map((t) => t.trim()).filter(Boolean);
  }
  return [];
}

export function stringifyTags(input: string | string[]): string {
  const arr = Array.isArray(input)
    ? input
    : input.split(",").map((t) => t.trim());
  return JSON.stringify(arr.filter(Boolean));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
