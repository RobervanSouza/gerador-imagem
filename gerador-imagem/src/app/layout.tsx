import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "@/components/providers/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gerador imagem",
  description: "Gerador de imagem com IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="pt-br">
        <Provider>
        <body className={inter.className}>{children}</body>
        </Provider>
      </html>
    </ClerkProvider>
  );
}
