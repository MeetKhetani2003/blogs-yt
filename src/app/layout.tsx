import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, Fraunces } from "next/font/google";
import "./globals.css";
import ClientHeader from "@/components/ClientHeader";
import ClientFooter from "@/components/ClientFooter";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://technicalrahul.com"),
  title: {
    default: "Technical Rahul Pandey — Technology Simplified",
    template: "%s | Technical Rahul Pandey",
  },
  description: "Discover simplified engineering breakdowns, hands-on tutorials, cutting-edge AI architecture guides, and modern software reviews curated specifically for the modern builder.",
  keywords: ["Software Engineering", "AI Architecture", "Next.js 16", "React", "Local LLMs", "Web Development", "Developer Workflows"],
  authors: [{ name: "Rahul Pandey", url: "https://technicalrahul.com" }],
  creator: "Rahul Pandey",
  publisher: "Technical Rahul Pandey",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Technical Rahul Pandey",
    title: "Technical Rahul Pandey — Technology Simplified",
    description: "Discover simplified engineering breakdowns, hands-on tutorials, and AI architecture guides.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Technical Rahul Pandey Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Rahul Pandey — Technology Simplified",
    description: "Discover simplified engineering breakdowns, hands-on tutorials, and AI architecture guides.",
    creator: "@rahulpandey",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code", // REPLACE with actual code from GSC
  },
  category: "Technology",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", type: "image/png" }
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

import { Toaster } from 'sonner';

import { auth } from '@/auth';

import Providers from '@/components/Providers';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  // Enterprise JSON-LD Organization Schema for Knowledge Graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Technical Rahul Pandey",
    url: "https://technicalrahul.com",
    logo: "https://technicalrahul.com/logo.png",
    founder: {
      "@type": "Person",
      name: "Rahul Pandey",
      jobTitle: "Chief Content Architect",
    },
    sameAs: [
      "https://twitter.com/rahulpandey",
      "https://youtube.com/c/technicalrahulpandey",
      "https://linkedin.com/in/rahulpandey",
    ],
  };

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${fraunces.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col selection:bg-gold-500 selection:text-white overflow-x-hidden">
        <Providers>
          {/* Custom Animated Cursor Elements (Hidden on mobile) */}
          <div id="cursor-dot" className="custom-cursor hidden md:block" aria-hidden="true"></div>
          <div id="cursor-glow" className="custom-cursor-glow hidden md:block" aria-hidden="true"></div>
          <ClientHeader />
          
          {children}
          <Toaster position="top-center" richColors theme="light" />
          <ClientFooter />
        </Providers>
      </body>
    </html>
  );
}
