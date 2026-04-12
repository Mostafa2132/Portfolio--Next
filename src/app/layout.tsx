import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mostafa Ebrahem | Full-Stack Creative Developer",
  description: "Innovative Full-Stack Developer creating high-performance, accessible, and stunning web experiences with Next.js and GSAP.",
  keywords: ["Mostafa Ebrahem", "Frontend Developer", "Full-Stack Developer", "Next.js Portfolio", "GSAP Animations", "Egypt Web Developer"],
  authors: [{ name: "Mostafa Ebrahem" }],
  openGraph: {
    title: "Mostafa Ebrahem | Creative Developer",
    description: "Creative developer portfolio featuring high-end animations and accessible design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="hide-scroll">
      <body className={`${inter.className} antialiased bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300`}>
        {children}
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
    </html>
  );
}