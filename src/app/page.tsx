import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Projects } from "@/components/site/Projects";
import { Skills } from "@/components/site/Skills";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { getProfile, getProjects, getSkills, getSocials, parseTags } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, projects, skills, socials] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
    getSocials(),
  ]);

  const projectItems = projects.map((p) => ({
    id: p.id,
    title: p.title,
    summary: p.summary,
    coverImage: p.coverImage,
    tags: parseTags(p.tags),
    liveUrl: p.liveUrl,
    repoUrl: p.repoUrl,
    status: p.status,
    featured: p.featured,
  }));

  const completed = projects.filter((p) => p.status === "completed").length;
  const inProgress = projects.filter((p) => p.status === "in-progress").length;

  const stats = [
    { label: "Projects", value: `${projects.length}` },
    { label: "Shipped", value: `${completed}` },
    { label: "Building", value: `${inProgress}` },
  ];

  return (
    <>
      <Navbar name={profile.name} />

      <main>
        <Hero
          name={profile.name}
          headline={profile.headline}
          location={profile.location}
          available={profile.available}
          resumeUrl={profile.resumeUrl}
          avatarUrl={profile.avatarUrl}
          socials={socials.map((s) => ({
            id: s.id,
            platform: s.platform,
            url: s.url,
          }))}
        />

        <About bio={profile.bio} stats={stats} />

        <Projects projects={projectItems} />

        <Skills
          skills={skills.map((s) => ({
            id: s.id,
            name: s.name,
            category: s.category,
            level: s.level,
          }))}
        />

        <Contact
          email={profile.email}
          socials={socials.map((s) => ({
            id: s.id,
            platform: s.platform,
            url: s.url,
            handle: s.handle,
          }))}
        />
      </main>

      <Footer name={profile.name} />
    </>
  );
}
