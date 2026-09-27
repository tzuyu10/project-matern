import type { Metadata } from "next";
import { Footer, Header } from "@/components/navigation";
import { BackToTop } from "@/components/back-to-top";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Project M.A.T.E.R.N. | Together, through motherhood",
    template: "%s | Project M.A.T.E.R.N.",
  },
  description:
    "Filipino maternal health guides for pregnancy, childbirth, recovery, family planning, and the days that follow.",
  // Replace these files to change the browser tab and phone home-screen icons.
  icons: {
    icon: "/favicon-clean.png",
    apple: "/apple-touch-icon-clean.png",
  },
};

const themeInitializer = `
  (() => {
    let saved;
    try { saved = localStorage.getItem("matern-theme"); } catch {}
    const dark = saved === "dark" ||
      (saved !== "light" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Run while parsing the document, before the themed body is painted. */}
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
