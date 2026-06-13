"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ImageUpload({
  name,
  defaultValue = "",
  label = "Image",
}: {
  name: string;
  defaultValue?: string;
  label?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setUrl(data.url);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <label className="text-sm text-[var(--color-muted)]">{label}</label>
      <input type="hidden" name={name} value={url} />

      <div className="mt-1.5 flex items-center gap-4">
        <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden glass grid place-items-center">
          {url ? (
            <Image src={url} alt="preview" fill className="object-cover" />
          ) : (
            <UploadCloud size={22} className="text-[var(--color-muted)]" />
          )}
          {busy && (
            <div className="absolute inset-0 grid place-items-center bg-black/50">
              <Loader2 size={20} className="animate-spin" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="btn btn-ghost text-sm"
              disabled={busy}
            >
              <UploadCloud size={15} /> Upload
            </button>
            {url && (
              <button
                type="button"
                onClick={() => setUrl("")}
                className="btn btn-danger text-sm"
              >
                <X size={15} /> Remove
              </button>
            )}
          </div>
          <input
            type="url"
            placeholder="…or paste an image URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="field text-xs w-64 max-w-full"
          />
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
