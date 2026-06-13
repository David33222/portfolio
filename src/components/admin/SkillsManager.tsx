"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { Modal } from "./Modal";
import { Header, Empty, Input } from "./ProjectsManager";
import { saveSkill, deleteSkill } from "@/app/admin/actions";

export type SkillData = {
  id: string;
  name: string;
  category: string;
  level: number;
  icon: string;
  order: number;
};

const EMPTY: SkillData = {
  id: "",
  name: "",
  category: "Frontend",
  level: 80,
  icon: "",
  order: 0,
};

const CATEGORIES = ["Frontend", "Backend", "Design", "Tools", "Other"];

export function SkillsManager({ skills }: { skills: SkillData[] }) {
  const [editing, setEditing] = useState<SkillData | null>(null);

  return (
    <div>
      <Header
        title="Skills"
        subtitle="The technologies and tools you work with."
        onAdd={() => setEditing(EMPTY)}
      />

      {skills.length === 0 ? (
        <Empty label="No skills yet. Add your first one." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => (
            <div
              key={s.id}
              className="rounded-xl glass p-4 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="font-medium truncate">{s.name}</div>
                <div className="text-xs text-[var(--color-muted)]">
                  {s.category} · {s.level}%
                </div>
                <div className="h-1 mt-2 rounded-full bg-[var(--color-bg-soft)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 shrink-0">
                <button
                  onClick={() => setEditing(s)}
                  className="grid place-items-center w-8 h-8 rounded-lg hover:bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-text)]"
                  aria-label="Edit"
                >
                  <Pencil size={15} />
                </button>
                <DeleteSkill id={s.id} />
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? "Edit skill" : "New skill"}
      >
        {editing && <SkillForm data={editing} onDone={() => setEditing(null)} />}
      </Modal>
    </div>
  );
}

function SkillForm({ data, onDone }: { data: SkillData; onDone: () => void }) {
  const [saving, setSaving] = useState(false);
  const [level, setLevel] = useState(data.level);

  return (
    <form
      action={async (fd) => {
        setSaving(true);
        try {
          await saveSkill(fd);
          toast.success("Skill saved");
          onDone();
        } catch {
          toast.error("Could not save skill");
          setSaving(false);
        }
      }}
      className="space-y-4"
    >
      <input type="hidden" name="id" defaultValue={data.id} />
      <Input label="Name" name="name" defaultValue={data.name} required />

      <div>
        <label className="text-sm text-[var(--color-muted)]">Category</label>
        <select
          name="category"
          defaultValue={data.category}
          className="field mt-1.5"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm text-[var(--color-muted)] flex justify-between">
          <span>Proficiency</span>
          <span>{level}%</span>
        </label>
        <input
          name="level"
          type="range"
          min={0}
          max={100}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="w-full mt-2 accent-[var(--color-accent)]"
        />
      </div>

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
          {saving ? "Saving…" : "Save skill"}
        </button>
        <button type="button" onClick={onDone} className="btn btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}

function DeleteSkill({ id }: { id: string }) {
  return (
    <form
      action={async (fd) => {
        await deleteSkill(fd);
        toast.success("Skill deleted");
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="grid place-items-center w-8 h-8 rounded-lg hover:bg-red-500/15 text-[var(--color-muted)] hover:text-red-400"
        aria-label="Delete"
        onClick={(e) => {
          if (!confirm("Delete this skill?")) e.preventDefault();
        }}
      >
        <Trash2 size={15} />
      </button>
    </form>
  );
}
