import type { Metadata } from "next";
import { Inter, Poppins, Roboto } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";

import "./globals.css";
import Navbar from "./ui/Navbar"
import Footer from "./ui/Footer";


const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({weight: "500", subsets: ["latin"]})
const roboto = Roboto({ weight: "400", style: "normal", subsets: ["cyrillic"] })

export const metadata: Metadata = {
  title: "StockBuddy",
  description: "Your investment buddy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={poppins.className}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar/>
        {children}
        <Footer/>
      </ThemeProvider>
      </body>
    </html>
  );
}
