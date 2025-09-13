import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "SolhaMedia - Digital Solutions for Your Business",
  description: "Leading digital transformation partner providing web development, mobile apps, e-commerce solutions, and digital marketing services.",
  keywords: "web development, mobile apps, digital marketing, e-commerce, cloud solutions, Indonesia",
  authors: [{ name: "SolhaMedia Team" }],
  openGraph: {
    title: "SolhaMedia - Digital Solutions for Your Business",
    description: "Leading digital transformation partner providing innovative technology solutions.",
    url: "https://solhamedia.com",
    siteName: "SolhaMedia",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-white dark:bg-gray-900 min-h-screen">
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}