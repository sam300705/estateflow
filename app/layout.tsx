import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EstateFlow | Real-estate lead CRM",
  description: "A focused CRM for real-estate sales teams to manage leads, follow-ups and pipeline stages.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
