import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Estruturas Corrompidas",
    template: "%s - Estruturas Corrompidas",
  },
  description: "Contos sobre fraudes na construção civil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Header />
        <main className="w-full flex justify-center p-2 md:p-4 min-h-screen mb-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
