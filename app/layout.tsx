import React from "react";
import "./global.css";
import { getUserData } from "@/api/supabaseServer";
import Header from "@/components/layouts/header/Header";
import Sidebar from "@/components/layouts/Sidebar";
import { SidebarToggleProvider } from "@/contexts/sidebarToggleContext";
import { ThemeProvider } from "@/contexts/themeContext";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from "next/headers";

const supabase = createServerComponentClient<Database>({ cookies });
export const metadata: Metadata = {
  title: "Behtar Tube",
  description: "Unofficial Youtube Client",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { user: userAuth },
  } = await supabase.auth.getUser();

  let userInfo: Database["public"]["Tables"]["profiles"]["Row"] | undefined;
  if (userAuth) {
    userInfo = await getUserData(userAuth!.id);
  }

  return (
    <html dir="ltr">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="font-[Arial]">
        <ThemeProvider>
          <SidebarToggleProvider>
            <div className="overflow-scroll text-black transition bg-white dark:bg-darkBG dark:text-white">
              <Header user={userInfo!} />
              <div className="flex flex-col min-h-screen pt-8 md:pt-14 md:ltr:pl-64 md:rtl:pr-64">
                <Sidebar userAuth={userAuth} />
                <div className="container pt-4 mx-auto cursor-default">
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
