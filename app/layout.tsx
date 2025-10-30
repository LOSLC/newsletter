import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Join the LOSL-C Community Newsletter",
  description:
    "Stay connected with LOSL-C — get updates on tech events, learning resources, community projects, and opportunities shaping Africa’s next generation of creators and innovators.",
  keywords: [
    "LOSL-C",
    "newsletter",
    "tech community",
    "developers",
    "Africa",
    "innovation",
    "cybersecurity",
    "software development",
    "learning resources",
    "community events",
  ],
  openGraph: {
    title: "Join the LOSL-C Community Newsletter",
    description:
      "Be part of the LOSL-C movement — receive the latest updates, opportunities, and stories from Africa’s most ambitious tech community.",
    url: "https://loslc.tech",
    siteName: "LOSL-C",
    images: [
      {
        url: "https://loslc.tech/cover.png",
        width: 1200,
        height: 630,
        alt: "LOSL-C Community",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the LOSL-C Community Newsletter",
    description:
      "Connect with Africa’s next generation of builders, creators, and innovators through the LOSL-C newsletter.",
    images: ["https://loslc.tech/cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
