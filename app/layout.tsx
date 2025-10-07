import { ReactNode } from "react";
import { Metadata } from "next";
// import Head from "next/head";

import AppProviders from "@/providers/AppProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Feature-Rich App",
  description: "full-featured Next.js app with auth and roles",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 flex min-h-screen">
        <AppProviders>
          <main className="flex-1 md:overflow-x-visible overflow-x-hidden">
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
