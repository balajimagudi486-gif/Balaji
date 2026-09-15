import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "M. Balaji — AI Developer",
  description:
    "Portfolio of M. Balaji, an AI Developer and B.Tech Artificial Intelligence & Data Science student building intelligent digital solutions.",
  keywords: [
    "M. Balaji",
    "AI Developer",
    "Machine Learning",
    "Data Science",
    "Full Stack",
    "SSM Institute of Engineering and Technology",
    "SSMIET",
    "Portfolio",
  ],
  authors: [{ name: "M. Balaji" }],
  openGraph: {
    title: "M. Balaji — AI Developer",
    description:
      "Portfolio of M. Balaji, an AI Developer and B.Tech Artificial Intelligence & Data Science student building intelligent digital solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "M. Balaji — AI Developer",
    description:
      "Portfolio of M. Balaji, an AI Developer and B.Tech Artificial Intelligence & Data Science student building intelligent digital solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0a0a0a] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
