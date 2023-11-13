"use client";
import React, { useEffect } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "../components/Footer";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { MovieProvider } from "../context/MovieContext";
import { Movie } from "../types";
import "./globals.css";

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "The Movie App",
  description: "A webapp for movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const existingRatedMovies = localStorage.getItem("ratedMovies");

    let initialRatedMovies: Movie[] = [];
    if (existingRatedMovies) {
      try {
        const parsedRatedMovies = JSON.parse(existingRatedMovies);
        if (Array.isArray(parsedRatedMovies)) {
          initialRatedMovies = parsedRatedMovies;
        }
      } catch (error) {
        console.error("Error parsing existing ratedMovies:", error);
      }
    }
    localStorage.setItem("ratedMovies", JSON.stringify(initialRatedMovies));
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>The Movie App</title>
        <meta
          property="og:title"
          content={metadata.title! as string}
          key="title"
        />
        <meta
          property="og:description"
          content={metadata.description!}
          key="description"
        />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </Head>
      {/* <body className="flex flex-col h-screen justify-between"> */}
      <body>
        <NavBar />
        <MovieProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </MovieProvider>
        <Footer />
      </body>
    </html>
  );
}
