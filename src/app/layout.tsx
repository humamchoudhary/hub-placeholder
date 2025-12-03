import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const nullFont = localFont({
  src: "../fonts/Null.otf",
  variable: "--font-null",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Coming Soon - Kyro",
  description: "Something amazing is coming soon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${nullFont.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
