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
  metadataBase: new URL("https://test.kyronixia.com"), // Basic metadata
  title: "Kyro Hub - Coming soon",
  description:
    "Transform ideas into digital experiences with Kyro Hub. All-in-one SaaS platform featuring chatbot creation, marketing automation, SEO tools, and analytics. Custom web development, mobile apps, and cloud solutions for SMEs.",

  // Metadata for better SEO
  keywords: [
    // Core product keywords
    "Kyro Hub",
    "all-in-one business platform",
    "SaaS business solutions",
    "marketing automation platform",
    "chatbot builder",
    "SEO assistant tool",

    // Service-based keywords
    "custom web development",
    "bespoke mobile app development",
    "cloud solutions provider",
    "digital transformation services",
    "business automation software",
    "workflow automation tools",

    // Feature-specific keywords
    "AI chatbot creation",
    "multichannel marketing campaigns",
    "SEO optimization tools",
    "business analytics dashboard",
    "API integration platform",
    "custom software development",

    // Target audience keywords
    "SME digital solutions",
    "small business technology",
    "enterprise-level solutions for SMEs",
    "scalable business tools",

    // Location-based (if relevant)
    "UK digital agency",
    "business solutions UK",

    // Action-oriented keywords
    "automate business processes",
    "streamline operations",
    "drive business growth",
  ],

  authors: [{ name: "Kyro" }, { name: "Kyro Team" }],
  creator: "Kyro",
  publisher: "Kyro",

  // OpenGraph metadata
  openGraph: {
    type: "website",
    title: "Kyro - All-in-One Digital Innovation Platform",
    description:
      "Design, automate, and manage every part of your digital workflow from one powerful platform. Chatbots, marketing automation, SEO tools, and custom development solutions for growing businesses.",
    siteName: "Kyro",
    url: "https://kyronixia.com", // Update with actual domain
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Kyro - The Future of Digital Innovation",
      },
    ],
    locale: "en_GB",
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Kyro - All-in-One Business Platform | Digital Innovation",
    description:
      "Transform your business with Kyro Hub. Chatbots, marketing automation, SEO tools, and custom development solutions in one platform.",
    images: ["/twitter-card.jpg"],
    creator: "@kyro", // Update with actual Twitter handle
    site: "@kyro",
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification tokens for search engines
  verification: {
    google: "your-google-verification-token",
    // yandex: "your-yandex-verification-token",
    // bing: "your-bing-verification-token",
  },

  // Category for better classification
  category: "Technology",

  // Icons configuration

  // Manifest file for PWA support
  manifest: "/site.webmanifest",

  // Additional metadata
  alternates: {
    canonical: "https://kyronixia.com", // Update with actual domain
  },
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
