"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify, stringifyTags } from "@/lib/data";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin");
}

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

function num(fd: FormData, key: string, fallback = 0): number {
  const n = Number(fd.get(key));
  return Number.isFinite(n) ? n : fallback;
}

function bool(fd: FormData, key: string): boolean {
  const v = fd.get(key);
  return v === "on" || v === "true" || v === "1";
}

/* ---------------- Profile ---------------- */

export async function saveProfile(fd: FormData) {
  await requireAuth();
  const data = {
    name: str(fd, "name") || "Your Name",
    headline: str(fd, "headline"),
    bio: str(fd, "bio"),
    location: str(fd, "location"),
    email: str(fd, "email"),
    avatarUrl: str(fd, "avatarUrl"),
    resumeUrl: str(fd, "resumeUrl"),
    available: bool(fd, "available"),
  };
  await prisma.profile.upsert({
    where: { id: "profile" },
    update: data,
    create: { id: "profile", ...data },
  });
  refresh();
}

/* ---------------- Projects ---------------- */

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  const root = slugify(base) || "project";
  let slug = root;
  let i = 1;
  // ensure uniqueness
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${root}-${i++}`;
  }
}

export async function saveProject(fd: FormData) {
  await requireAuth();
  const id = str(fd, "id");
  const title = str(fd, "title") || "Untitled";
  const data = {
    title,
    summary: str(fd, "summary"),
    description: str(fd, "description"),
    coverImage: str(fd, "coverImage"),
    tags: stringifyTags(str(fd, "tags")),
    liveUrl: str(fd, "liveUrl"),
    repoUrl: str(fd, "repoUrl"),
    status: str(fd, "status") || "completed",
    featured: bool(fd, "featured"),
    order: num(fd, "order"),
  };

  if (id) {
    const slug = await uniqueSlug(title, id);
    await prisma.project.update({ where: { id }, data: { ...data, slug } });
  } else {
    const slug = await uniqueSlug(title);
    await prisma.project.create({ data: { ...data, slug } });
  }
  refresh();
}

export async function deleteProject(fd: FormData) {
  await requireAuth();
  const id = str(fd, "id");
  if (id) await prisma.project.delete({ where: { id } });
  refresh();
}

/* ---------------- Skills ---------------- */

export async function saveSkill(fd: FormData) {
  await requireAuth();
  const id = str(fd, "id");
  const data = {
    name: str(fd, "name") || "Skill",
    category: str(fd, "category") || "Other",
    level: Math.min(100, Math.max(0, num(fd, "level", 80))),
    icon: str(fd, "icon"),
    order: num(fd, "order"),
  };
  if (id) {
    await prisma.skill.update({ where: { id }, data });
  } else {
    await prisma.skill.create({ data });
  }
  refresh();
}

export async function deleteSkill(fd: FormData) {
  await requireAuth();
  const id = str(fd, "id");
  if (id) await prisma.skill.delete({ where: { id } });
  refresh();
}

/* ---------------- Socials ---------------- */

export async function saveSocial(fd: FormData) {
  await requireAuth();
  const id = str(fd, "id");
  const data = {
    platform: str(fd, "platform") || "Website",
    url: str(fd, "url"),
    handle: str(fd, "handle"),
    order: num(fd, "order"),
  };
  if (id) {
    await prisma.socialLink.update({ where: { id }, data });
  } else {
    await prisma.socialLink.create({ data });
  }
  refresh();
}

export async function deleteSocial(fd: FormData) {
  await requireAuth();
  const id = str(fd, "id");
  if (id) await prisma.socialLink.delete({ where: { id } });
  refresh();
}

/* ---------------- Auth ---------------- */

export async function logout() {
  await signOut({ redirect: false });
  redirect("/login");
}
