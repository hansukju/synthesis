import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SYNTHESIS",
  description: "Explore the culture behind fashion and music.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US">
      <body className="flex min-h-screen flex-col bg-background font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
