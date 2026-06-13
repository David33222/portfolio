import { put } from "@vercel/blob";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Uploads a file and returns a public URL.
 * - Production / when BLOB_READ_WRITE_TOKEN is set: uses Vercel Blob.
 * - Local dev (no token): saves to /public/uploads so it works immediately.
 */
export async function uploadFile(file: File): Promise<string> {
  const safeName = sanitize(file.name) || "file";
  const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`portfolio/${key}`, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return blob.url;
  }

  // Local fallback
  const bytes = Buffer.from(await file.arrayBuffer());
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, key), bytes);
  return `/uploads/${key}`;
}

function sanitize(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}
