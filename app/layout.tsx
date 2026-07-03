import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://meritschoolofeducation.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Merit School of Education Rampura | Admission Open 2025-26",
    template: "%s | Merit School of Education Rampura"
  },
  description:
    "Merit School of Education Rampura is a premium English and Hindi medium school in Rampura, Sirali, District Harda with admission open for Play Group to 10th Class.",
  alternates: {
    canonical: "/"
  },
  keywords: [
    "Merit School Rampura",
    "Merit School of Education Rampura",
    "School in Rampura",
    "School in Sirali",
    "School in Harda",
    "Private school in Harda",
    "Admission Open 2025-26",
    "English Hindi Medium School",
    "Play Group to 10th Class"
  ],
  openGraph: {
    title: "Merit School of Education Rampura | Admission Open 2025-26",
    description:
      "Quality education at Merit School of Education Rampura. Admissions open for Play Group to 10th Class.",
    url: siteUrl,
    siteName: "Merit School of Education Rampura",
    images: ["/assets/logo.png"],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Merit School of Education Rampura",
    description:
      "Admissions open for Play Group to 10th Class in Rampura, Sirali, Harda.",
    images: ["/assets/logo.png"]
  },
  icons: {
    icon: [{ url: "/assets/logo.png", type: "image/png" }],
    shortcut: ["/assets/logo.png"],
    apple: [{ url: "/assets/logo.png", type: "image/png" }]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1c2f78"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
