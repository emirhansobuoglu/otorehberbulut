/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable react/jsx-no-comment-textnodes */

export default function Providers({ children }: { children: ReactNode }) {
  const theme = {
    type: "light", // veya 'dark'
    theme: {
      colors: {
        primary: "#0070f3", // Bu, NextUI'nin varsayılan primary rengini değiştirir
        secondary: "#ff6347", // Özel renk
        success: "#28a745", // Yeşil renk
        // Diğer renkler ve stil özellikleri
      },
      space: {
        xs: "4px",
        sm: "8px",
        // Diğer spacing ayarları
      },
      fonts: {
        sans: "Arial, sans-serif", // Fontlar
      },
    },
  };

  const router = useRouter();
  return (
    <NextUIProvider
      theme={theme}
      //@ts-expect-error
      navigate={router.push}
      className="h-full w-full"
    >
      <NextThemesProvider attribute="class">{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
