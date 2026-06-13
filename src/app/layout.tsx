import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "David — Portfolio",
  description:
    "Developer & creative technologist. Projects, skills, and everything I'm building.",
  openGraph: {
    title: "David — Portfolio",
    description:
      "Developer & creative technologist. Projects, skills, and everything I'm building.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster theme="dark" position="bottom-right" richColors />
      </body>
    </html>
  );
}
