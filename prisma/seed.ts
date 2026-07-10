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
      headline: "Full-Stack Developer & AI Builder",
      bio: "I'm a full-stack developer who ships complete websites and apps end-to-end — building fast with Supabase, Vercel and Google Antigravity. I design workflow automations in n8n, have a foundation in cybersecurity (and I'm always learning more), and I'm currently building Ecom AI, an AI agent for e-commerce.",
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
        { name: "Full-Stack Development", category: "Frontend", level: 88, order: 0 },
        { name: "TypeScript", category: "Frontend", level: 90, order: 1 },
        { name: "React / Next.js", category: "Frontend", level: 90, order: 2 },
        { name: "Tailwind CSS", category: "Frontend", level: 88, order: 3 },
        { name: "Node.js", category: "Backend", level: 85, order: 4 },
        { name: "Supabase", category: "Backend", level: 85, order: 5 },
        { name: "Vercel", category: "Tools", level: 88, order: 6 },
        { name: "n8n Automation", category: "Tools", level: 82, order: 7 },
        { name: "Git & GitHub", category: "Tools", level: 86, order: 8 },
        { name: "AI Agents", category: "AI", level: 80, order: 9 },
        { name: "Google Antigravity", category: "AI", level: 78, order: 10 },
        { name: "Cybersecurity", category: "Security", level: 65, order: 11 },
        { name: "Figma", category: "Design", level: 82, order: 12 },
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
          title: "Artvera",
          slug: "artvera",
          summary:
            "An art marketplace where people can browse and buy artwork online, with secure Paystack checkout.",
          description:
            "Artvera is an e-commerce platform for art. Visitors can explore artworks and purchase them through an integrated Paystack payment flow. Built as a fast single-page app with React + Vite and deployed on Vercel.",
          tags: JSON.stringify(["React", "Vite", "Paystack", "E-commerce", "Vercel"]),
          liveUrl: "https://new-art-two.vercel.app/",
          status: "completed",
          featured: true,
          order: 1,
        },
        {
          title: "Ecom AI",
          slug: "ecom-ai",
          summary:
            "An AI agent for e-commerce — automating store workflows and customer interactions.",
          description:
            "Ecom AI is an AI agent I'm building for e-commerce: it automates store operations and customer-facing workflows, combining LLM reasoning with tools like n8n and Supabase. Currently in active development.",
          tags: JSON.stringify(["AI Agent", "n8n", "Supabase", "Automation"]),
          status: "in-progress",
          featured: true,
          order: -2,
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
