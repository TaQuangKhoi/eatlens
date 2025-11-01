import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EatLens - AI Calorie Calculator",
  description: "Upload a food image and get AI-powered calorie estimates",
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
