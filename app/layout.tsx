import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar/Sidebar";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import AuthProvider from "@/providers/AuthProvider";
import Player from "@/components/player/Player";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify clone",
  description: "Music platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProvider>
          <Sidebar>
            <ToasterProvider />
            <ModalProvider />
            {children}
          </Sidebar>
          <Player />
        </AuthProvider>
      </body>
    </html>
  );
}
