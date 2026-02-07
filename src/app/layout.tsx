import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Know Your Rights | Legal Rights Guide",
  description: "Interactive guide to understanding your legal rights in various scenarios. Educational resource for traffic stops, workplace issues, housing, and more.",
  keywords: ["legal rights", "know your rights", "law", "civil rights", "legal guide"],
  authors: [{ name: "Know Your Rights App" }],
  openGraph: {
    title: "Know Your Rights | Legal Rights Guide",
    description: "Interactive guide to understanding your legal rights in various scenarios.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Header />
        <main className="min-h-screen pb-24">
          {children}
        </main>
      </body>
    </html>
  );
}
