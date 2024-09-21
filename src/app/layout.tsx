import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Shadertoy to Three.js",
  description: "Shadertoy to Three.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
