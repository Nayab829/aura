import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Aura Sentiments | Pakistan's No.1 Brand in Non-Alcoholic Attars",
  description: "Shop Aura Sentiments' premium non-alcoholic attars at affordable prices with premium packaging and 7-day easy return policy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased font-sans`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
