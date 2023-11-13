import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "../components/Footer";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Movie App",
  description: "A webapp for movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>The Movie App</title>
        <meta property="og:title" content={metadata.title as string} key="title" />
        <meta
          property="og:description"
          content={metadata.description as string}
          key="description"
        />
      </Head>
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
