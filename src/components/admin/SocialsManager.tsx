"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { Modal } from "./Modal";
import { Header, Empty, Input } from "./ProjectsManager";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { saveSocial, deleteSocial } from "@/app/admin/actions";

export type SocialData = {
  id: string;
  platform: string;
  url: string;
  handle: string;
  order: number;
};

const EMPTY: SocialData = {
  id: "",
  platform: "GitHub",
  url: "",
  handle: "",
  order: 0,
};

const PLATFORMS = [
  "GitHub",
  "LinkedIn",
  "Twitter",
  "Instagram",
  "YouTube",
  "Dribbble",
  "Figma",
  "Email",
  "Website",
];

export function SocialsManager({ socials }: { socials: SocialData[] }) {
  const [editing, setEditing] = useState<SocialData | null>(null);

  return (
    <div>
      <Header
        title="Social & links"
        subtitle="Your accounts and links shown across the site."
        onAdd={() => setEditing(EMPTY)}
      />

      {socials.length === 0 ? (
        <Empty label="No links yet. Add your socials." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {socials.map((s) => (
            <div
              key={s.id}
              className="rounded-xl glass p-4 flex items-center gap-3"
            >
              <div className="grid place-items-center w-10 h-10 rounded-lg bg-[var(--color-bg-soft)] text-[var(--color-muted)]">
                <SocialIcon platform={s.platform} className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium">{s.platform}</div>
                <div className="text-xs text-[var(--color-muted)] truncate">
                  {s.handle || s.url}
                </div>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setEditing(s)}
                  className="grid place-items-center w-8 h-8 rounded-lg hover:bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-text)]"
                  aria-label="Edit"
                >
                  <Pencil size={15} />
                </button>
                <DeleteSocial id={s.id} />
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? "Edit link" : "New link"}
      >
        {editing && <SocialForm data={editing} onDone={() => setEditing(null)} />}
      </Modal>
    </div>
  );
}

function SocialForm({ data, onDone }: { data: SocialData; onDone: () => void }) {
  const [saving, setSaving] = useState(false);

  return (
    <form
      action={async (fd) => {
        setSaving(true);
        try {
          await saveSocial(fd);
          toast.success("Link saved");
          onDone();
        } catch {
          toast.error("Could not save link");
          setSaving(false);
        }
      }}
      className="space-y-4"
    >
      <input type="hidden" name="id" defaultValue={data.id} />

      <div>
        <label className="text-sm text-[var(--color-muted)]">Platform</label>
        <select
          name="platform"
          defaultValue={data.platform}
          className="field mt-1.5"
        >
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="URL"
        name="url"
        defaultValue={data.url}
        placeholder="https://… (or mailto:you@example.com)"
        required
      />
      <Input
        label="Handle / label (optional)"
        name="handle"
        defaultValue={data.handle}
        placeholder="@yourname"
      />
      <Input
        label="Display order"
        name="order"
        type="number"
        defaultValue={String(data.order)}
      />

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save link"}
        </button>
        <button type="button" onClick={onDone} className="btn btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}

function DeleteSocial({ id }: { id: string }) {
  return (
    <form
      action={async (fd) => {
        await deleteSocial(fd);
        toast.success("Link deleted");
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="grid place-items-center w-8 h-8 rounded-lg hover:bg-red-500/15 text-[var(--color-muted)] hover:text-red-400"
        aria-label="Delete"
        onClick={(e) => {
          if (!confirm("Delete this link?")) e.preventDefault();
        }}
      >
        <Trash2 size={15} />
      </button>
    </form>
  );
}
