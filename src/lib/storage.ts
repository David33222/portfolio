import { createClient } from "@supabase/supabase-js";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Uploads a file and returns a public URL.
 * - When Supabase Storage is configured (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY):
 *   uploads to a public bucket and returns its permanent public URL.
 * - Otherwise (local dev with no keys): saves to /public/uploads.
 *
 * This module is server-only (it uses node:fs and the service-role key) and must
 * never be imported into client components.
 */
export async function uploadFile(file: File): Promise<string> {
  const safeName = sanitize(file.name) || "file";
  const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_BUCKET || "portfolio";

  if (supabaseUrl && serviceKey) {
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });
    const bytes = new Uint8Array(await file.arrayBuffer());

    const { error } = await supabase.storage.from(bucket).upload(key, bytes, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });
    if (error) throw new Error(`Supabase upload failed: ${error.message}`);

    const { data } = supabase.storage.from(bucket).getPublicUrl(key);
    return data.publicUrl;
  }

  // Local fallback (development)
  const buffer = Buffer.from(await file.arrayBuffer());
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, key), buffer);
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
