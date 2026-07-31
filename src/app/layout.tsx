import type { Metadata } from "next";
import { Poppins, Cairo } from "next.font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BURGER HOUSE | Premium Menu",
  description: "Fresh. Grilled. Premium. Explore the official restaurant menu of BURGER HOUSE.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${cairo.variable}`}>
      <body className="bg-[#0F0F0F] text-[#FFFFFF] antialiased selection:bg-[#D4A017]/30 selection:text-[#FFFFFF]">
        {children}
      </body>
    </html>
  );
}
