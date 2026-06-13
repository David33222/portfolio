"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Star, ExternalLink, Github } from "lucide-react";
import { Modal } from "./Modal";
import { ImageUpload } from "./ImageUpload";
import { saveProject, deleteProject } from "@/app/admin/actions";

export type ProjectData = {
  id: string;
  title: string;
  summary: string;
  description: string;
  coverImage: string;
  tags: string; // comma-separated for the input
  liveUrl: string;
  repoUrl: string;
  status: string;
  featured: boolean;
  order: number;
};

const EMPTY: ProjectData = {
  id: "",
  title: "",
  summary: "",
  description: "",
  coverImage: "",
  tags: "",
  liveUrl: "",
  repoUrl: "",
  status: "completed",
  featured: false,
  order: 0,
};

const STATUS_LABEL: Record<string, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  planned: "Planned",
};

export function ProjectsManager({ projects }: { projects: ProjectData[] }) {
  const [editing, setEditing] = useState<ProjectData | null>(null);

  return (
    <div>
      <Header
        title="Projects"
        subtitle="Showcase your work — shipped products and things you're building."
        onAdd={() => setEditing(EMPTY)}
      />

      {projects.length === 0 ? (
        <Empty label="No projects yet. Add your first one." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((p) => (
            <div
              key={p.id}
              className="rounded-xl glass p-4 flex gap-4 items-start"
            >
              <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-[var(--color-bg-soft)] grid place-items-center">
                {p.coverImage ? (
                  <Image src={p.coverImage} alt="" fill className="object-cover" />
                ) : (
                  <span className="text-xl font-bold gradient-text">
                    {p.title.charAt(0) || "?"}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-semibold truncate">{p.title}</h4>
                  {p.featured && (
                    <Star size={13} className="text-[var(--color-accent-2)] fill-current shrink-0" />
                  )}
                </div>
                <span className="text-xs text-[var(--color-muted)]">
                  {STATUS_LABEL[p.status] ?? p.status}
                </span>
                <p className="text-xs text-[var(--color-muted)] truncate mt-0.5">
                  {p.summary}
                </p>
                <div className="flex items-center gap-2 mt-2 text-[var(--color-muted)]">
                  {p.liveUrl && <ExternalLink size={13} />}
                  {p.repoUrl && <Github size={13} />}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setEditing(p)}
                  className="grid place-items-center w-8 h-8 rounded-lg hover:bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-text)]"
                  aria-label="Edit"
                >
                  <Pencil size={15} />
                </button>
                <DeleteButton id={p.id} />
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? "Edit project" : "New project"}
      >
        {editing && (
          <ProjectForm
            data={editing}
            onDone={() => setEditing(null)}
          />
        )}
      </Modal>
    </div>
  );
}

function ProjectForm({
  data,
  onDone,
}: {
  data: ProjectData;
  onDone: () => void;
}) {
  const [saving, setSaving] = useState(false);

  return (
    <form
      action={async (fd) => {
        setSaving(true);
        try {
          await saveProject(fd);
          toast.success("Project saved");
          onDone();
        } catch {
          toast.error("Could not save project");
          setSaving(false);
        }
      }}
      className="space-y-4"
    >
      <input type="hidden" name="id" defaultValue={data.id} />

      <Input label="Title" name="title" defaultValue={data.title} required />
      <Input
        label="Short summary"
        name="summary"
        defaultValue={data.summary}
        placeholder="One line shown on the card"
      />

      <div>
        <label className="text-sm text-[var(--color-muted)]">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={data.description}
          rows={4}
          className="field mt-1.5 resize-y"
          placeholder="Full details about the project…"
        />
      </div>

      <ImageUpload name="coverImage" defaultValue={data.coverImage} label="Cover image" />

      <Input
        label="Tags (comma separated)"
        name="tags"
        defaultValue={data.tags}
        placeholder="Next.js, TypeScript, Design"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input label="Live URL" name="liveUrl" defaultValue={data.liveUrl} />
        <Input label="Repo URL" name="repoUrl" defaultValue={data.repoUrl} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-[var(--color-muted)]">Status</label>
          <select
            name="status"
            defaultValue={data.status}
            className="field mt-1.5"
          >
            <option value="completed">Completed</option>
            <option value="in-progress">In progress</option>
            <option value="planned">Planned</option>
          </select>
        </div>
        <Input
          label="Display order"
          name="order"
          type="number"
          defaultValue={String(data.order)}
        />
      </div>

      <label className="flex items-center gap-2.5 text-sm cursor-pointer select-none">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={data.featured}
          className="w-4 h-4 accent-[var(--color-accent)]"
        />
        Featured project
      </label>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save project"}
        </button>
        <button type="button" onClick={onDone} className="btn btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}

function DeleteButton({ id }: { id: string }) {
  return (
    <form
      action={async (fd) => {
        await deleteProject(fd);
        toast.success("Project deleted");
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="grid place-items-center w-8 h-8 rounded-lg hover:bg-red-500/15 text-[var(--color-muted)] hover:text-red-400"
        aria-label="Delete"
        onClick={(e) => {
          if (!confirm("Delete this project? This cannot be undone.")) {
            e.preventDefault();
          }
        }}
      >
        <Trash2 size={15} />
      </button>
    </form>
  );
}

/* shared bits reused by other managers */

export function Header({
  title,
  subtitle,
  onAdd,
}: {
  title: string;
  subtitle: string;
  onAdd: () => void;
}) {
  return (
    <div className="flex items-end justify-between mb-5 gap-4">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-[var(--color-muted)]">{subtitle}</p>
      </div>
      <button onClick={onAdd} className="btn btn-primary shrink-0">
        <Plus size={16} /> Add
      </button>
    </div>
  );
}

export function Empty({ label }: { label: string }) {
  return (
    <div className="rounded-xl glass p-10 text-center text-[var(--color-muted)]">
      {label}
    </div>
  );
}

export function Input({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm text-[var(--color-muted)]">{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="field mt-1.5"
      />
    </div>
  );
}
