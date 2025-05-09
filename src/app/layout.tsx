/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Suspense } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppNavbar from "@/components/app-navbar";
import { FooterComp } from "@/components/footer";
import Providers from "@/components/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Oto Rehber",
  description: "Otomobiller hakkında her şey.",
};
export const dynamic = "force-dynamic";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/direksiyon.png" />
      </head>
      <body>
        <Providers>
          <AppNavbar />
          <ToastContainer />
          <main className="flex-grow overflow-auto bg-slate-200">
            <Suspense>{children}</Suspense>
            <FooterComp />
          </main>
        </Providers>
      </body>
    </html>
  );
}
