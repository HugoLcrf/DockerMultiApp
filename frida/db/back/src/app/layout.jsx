import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav/Nav";
import Header from "@/components/header/header";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  console.log({children})
  return (
    <html lang="fr">
      <body>
        <Header></Header>
        <Nav />
        <main>
          {children} 
        </main>
      </body>
    </html>
  );
}
