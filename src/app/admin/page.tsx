import { AdminDashboard } from "@/components/admin/AdminDashboard";
import {
  getProfile,
  getProjects,
  getSkills,
  getSocials,
  parseTags,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [profile, projects, skills, socials] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
    getSocials(),
  ]);

  return (
    <AdminDashboard
      profile={{
        name: profile.name,
        headline: profile.headline,
        bio: profile.bio,
        location: profile.location,
        email: profile.email,
        avatarUrl: profile.avatarUrl,
        resumeUrl: profile.resumeUrl,
        available: profile.available,
      }}
      projects={projects.map((p) => ({
        id: p.id,
        title: p.title,
        summary: p.summary,
        description: p.description,
        coverImage: p.coverImage,
        tags: parseTags(p.tags).join(", "),
        liveUrl: p.liveUrl,
        repoUrl: p.repoUrl,
        status: p.status,
        featured: p.featured,
        order: p.order,
      }))}
      skills={skills.map((s) => ({
        id: s.id,
        name: s.name,
        category: s.category,
        level: s.level,
        icon: s.icon,
        order: s.order,
      }))}
      socials={socials.map((s) => ({
        id: s.id,
        platform: s.platform,
        url: s.url,
        handle: s.handle,
        order: s.order,
      }))}
    />
  );
}
