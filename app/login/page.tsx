"use client";
import { themeContext } from "@/contexts/themeContext";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useContext, useState } from "react";

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const { theme } = useContext(themeContext);

  const tabNames = ["Email Login", "Magic Link login"];

  return (
    <div className="p-2">
      <div>
        <nav className="relative z-0 flex">
          {tabNames.map((item, index) => (
            <button
              key={item + "-tab"}
              onClick={() => setSelectedTab(index + 1)}
              className={`${
                selectedTab == index + 1
                  ? "text-red-500 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 border-red-300 dark:border-red-700"
                  : "text-zinc-500 hover:text-zinc-800 border-zinc-300 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              } transition flex-1 border-b-2 py-4 px-4 text-sm font-medium text-center overflow-hidden`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
      <Auth
        view="sign_in"
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: { container: { display: selectedTab == 1 ? "flex" : "none" } },
          variables: {
            default: {
              colors: {
                brand: "#aa0000",
                brandAccent: "darkred",
              },
            },
          },
        }}
        theme={theme}
        providers={["github", "google"]}
        redirectTo="http://localhost:3000/auth/callback"
      />
      <Auth
        view="magic_link"
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: { container: { display: selectedTab == 2 ? "flex" : "none" }},
          variables: {
            default: {
              colors: {
                brand: "#aa0000",
                brandAccent: "darkred",
              },
            },
          },
        }}
        theme={theme}
        providers={[]}
        showLinks={false}
        redirectTo="http://localhost:3000/auth/callback"
      />
    </div>
  );
}
