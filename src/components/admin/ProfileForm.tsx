"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";
import { saveProfile } from "@/app/admin/actions";

export type ProfileData = {
  name: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  avatarUrl: string;
  resumeUrl: string;
  available: boolean;
};

export function ProfileForm({ profile }: { profile: ProfileData }) {
  const [saving, setSaving] = useState(false);

  return (
    <form
      action={async (fd) => {
        setSaving(true);
        try {
          await saveProfile(fd);
          toast.success("Profile saved");
        } catch {
          toast.error("Could not save profile");
        } finally {
          setSaving(false);
        }
      }}
      className="rounded-2xl glass p-6 space-y-5 max-w-2xl"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" name="name" defaultValue={profile.name} />
        <Field
          label="Location"
          name="location"
          defaultValue={profile.location}
          placeholder="City, Country"
        />
      </div>

      <Field
        label="Headline"
        name="headline"
        defaultValue={profile.headline}
        placeholder="Full-Stack Developer"
      />

      <div>
        <label className="text-sm text-[var(--color-muted)]">Bio</label>
        <textarea
          name="bio"
          defaultValue={profile.bio}
          rows={5}
          className="field mt-1.5 resize-y"
          placeholder="Tell visitors about yourself…"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="Contact email"
          name="email"
          type="email"
          defaultValue={profile.email}
        />
        <Field
          label="Résumé URL"
          name="resumeUrl"
          defaultValue={profile.resumeUrl}
          placeholder="https://…/resume.pdf"
        />
      </div>

      <ImageUpload
        name="avatarUrl"
        defaultValue={profile.avatarUrl}
        label="Profile photo"
      />

      <label className="flex items-center gap-2.5 text-sm cursor-pointer select-none">
        <input
          type="checkbox"
          name="available"
          defaultChecked={profile.available}
          className="w-4 h-4 accent-[var(--color-accent)]"
        />
        Show &ldquo;Available for opportunities&rdquo; badge
      </label>

      <button
        type="submit"
        disabled={saving}
        className="btn btn-primary disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save profile"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm text-[var(--color-muted)]">{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="field mt-1.5"
      />
    </div>
  );
}
