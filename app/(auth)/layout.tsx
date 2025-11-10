import type { Metadata } from "next";
import { Inter } from "next/font/google";  
import "../globals.css";
import Header from "@/components/layout/header/rent/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Standard Home",
  description: "Find your perfect rental",
};

export default function RentLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}