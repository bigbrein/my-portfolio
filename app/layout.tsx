import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

import Link from "next/link";

import Footer from "@/components/custom_ui/footer";
import MatrixRain from "@/components/custom_ui/matrix-rain";
import MatrixScrollbar from "@/components/custom_ui/matrix-scrollbar";
import MobileNav from "@/components/custom_ui/mobile-nav";
import Navbar from "@/components/custom_ui/navbar";
import ScrollProgress from "@/components/custom_ui/scroll-progress";
import { ThemeProvider } from "@/components/custom_ui/theme-provider";
import ThemeToggle from "@/components/custom_ui/theme-toggle";

import { Analytics } from "@vercel/analytics/next";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "./Samuel",
  description: "Hi! I'm Samuel. Let's build something amazing together.",
  manifest: "/favicon/default/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistMono.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col pr-0 md:pr-5">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            {/* <GridBackground /> */}
            <MatrixRain />
            <MatrixScrollbar />

            <header className="flex items-center justify-between p-2 fixed w-full bg-background z-30 border-0 md:border-b">
              <Link href="/">
                <h1 className="font-mono">./Samuel</h1>
              </Link>

              <Navbar />

              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              <ScrollProgress />
            </header>

            {children}

            <Footer />

            <MobileNav />

            <Analytics />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
