import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitHub Insights",
  description: "A modern GitHub repository Explorer built with Next.js, TanStack Query, and shadcn/ui.",
  icons: {
    icon: "/git-hub-repo-search.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
