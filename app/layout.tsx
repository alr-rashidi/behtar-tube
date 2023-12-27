import React from "react";
import "./global.css";
import { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { ThemeProvider } from "@/contexts/themeContext";
import Header from "@/components/header/Header";
import Sidebar from "@/components/Sidebar";
import { SidebarToggleProvider } from "@/contexts/sidebarToggleContext";

export const metadata: Metadata = {
  title: "Behtar Tube",
  description: "Unofficial Youtube Client",
};

const lato = Vazirmatn({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="ltr">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={`rtl:${lato.className} font-[Arial]`}>
        <ThemeProvider>
          <SidebarToggleProvider>
            <div className="overflow-scroll text-black transition bg-white dark:bg-darkBG dark:text-white">
              <Header />
              <div className="flex flex-col min-h-screen pt-8 md:pt-14 md:ltr:pl-64 md:rtl:pr-64">
                <Sidebar />
                <div className="container pt-4 mx-auto cursor-default lg:px-6">
                  {children}
                </div>
              </div>
            </div>
          </SidebarToggleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
