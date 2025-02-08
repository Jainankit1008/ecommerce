import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/Providers";
import { getServerSession } from "next-auth";
import SessionProviderWrapper from "../components/SessionProviderWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import 'svgmap/dist/svgMap.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AB Electro - Your Electronics Store",
  description: "Find the best electronics and gadgets at AB Electro",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen antialiased flex flex-col`}>
        <SessionProviderWrapper session={session}>
          <Providers>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </Providers>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
