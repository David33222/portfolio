import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@example.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe!2026";
  const name = process.env.ADMIN_NAME ?? "Admin";

  // --- Admin user ---
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name },
  });
  console.log(`✓ Admin user ready: ${email}`);

  // --- Profile (singleton) ---
  await prisma.profile.upsert({
    where: { id: "profile" },
    update: {},
    create: {
      id: "profile",
      name: name,
      headline: "Full-Stack Developer & Creative Technologist",
      bio: "I design and build modern web experiences — from sleek front-ends to robust back-ends. Welcome to my corner of the internet, where I showcase the things I've built and the things I'm building next.",
      location: "Nigeria",
      email: email,
      available: true,
    },
  });
  console.log("✓ Profile ready");

  // --- Sample socials ---
  const socialCount = await prisma.socialLink.count();
  if (socialCount === 0) {
    await prisma.socialLink.createMany({
      data: [
        { platform: "GitHub", url: "https://github.com/David33222", handle: "David33222", order: 0 },
        { platform: "Email", url: `mailto:${email}`, handle: email, order: 1 },
        { platform: "LinkedIn", url: "https://linkedin.com/in/your-handle", handle: "your-handle", order: 2 },
        { platform: "Twitter", url: "https://twitter.com/your-handle", handle: "@your-handle", order: 3 },
      ],
    });
    console.log("✓ Sample social links added");
  }

  // --- Sample skills ---
  const skillCount = await prisma.skill.count();
  if (skillCount === 0) {
    await prisma.skill.createMany({
      data: [
        { name: "TypeScript", category: "Frontend", level: 90, order: 0 },
        { name: "React / Next.js", category: "Frontend", level: 92, order: 1 },
        { name: "Tailwind CSS", category: "Frontend", level: 88, order: 2 },
        { name: "Node.js", category: "Backend", level: 85, order: 3 },
        { name: "Prisma / SQL", category: "Backend", level: 80, order: 4 },
        { name: "UI / UX Design", category: "Design", level: 78, order: 5 },
        { name: "Git & GitHub", category: "Tools", level: 88, order: 6 },
      ],
    });
    console.log("✓ Sample skills added");
  }

  // --- Sample projects ---
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: "This Portfolio",
          slug: "this-portfolio",
          summary: "A dynamic portfolio with a private admin dashboard.",
          description:
            "A full-stack portfolio built with Next.js, Tailwind, Framer Motion and Prisma. Everything you see is editable from a private admin space — projects, skills, socials and profile — with image uploads to cloud storage.",
          tags: JSON.stringify(["Next.js", "TypeScript", "Tailwind", "Prisma"]),
          repoUrl: "https://github.com/David33222",
          status: "in-progress",
          featured: true,
          order: 0,
        },
        {
          title: "Sample Project",
          slug: "sample-project",
          summary: "Replace me from the admin dashboard.",
          description:
            "This is a placeholder project. Log into /admin to edit it, upload a cover image, add tags and links, or delete it entirely.",
          tags: JSON.stringify(["Demo", "Edit me"]),
          status: "completed",
          featured: true,
          order: 1,
        },
      ],
    });
    console.log("✓ Sample projects added");
  }

  console.log("\n🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
