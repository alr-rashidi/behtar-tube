"use client";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { themeContext } from "@/contexts/themeContext";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const { theme } = useContext(themeContext);

  const tabNames = ["Email Login", "Magic Link login"];

  const providerBtnClassName =
    "flex flex-row gap-2 items-center justify-center text-neutral-500 dark:text-neutral-200 bg-neutral-200 dark:bg-neutral-800 p-2 rounded hover:bg-neutral-100 hover:dark:bg-neutral-700 active:brightness-95 transition";
  const textInputLabelClassName = "text-sm text-neutral-500 dark:text-neutral-400";

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
      {selectedTab == 1
        ? (
          <Auth
            view="sign_in"
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
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
        )
        : null}
      {selectedTab == 2
        ? (
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-1">
              <button className={providerBtnClassName}>
                <FaGoogle /> Login with Google
              </button>
              <button className={providerBtnClassName}>
                <FaGithub /> Login with Github
              </button>
            </div>
            <div className="h-[1px] bg-neutral-300 dark:bg-neutral-700"></div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className={textInputLabelClassName} htmlFor="email">Email address</label>
                <TextInput id="email" ref={email} />
              </div>
              <div className="flex flex-col gap-1">
                <label className={textInputLabelClassName} htmlFor="password">
                  Your password
                </label>
                <TextInput id="password" ref={password} />
              </div>
            </div>
            <Button Theme="red" className="p-2">Login</Button>

            <div className="flex flex-col gap-1 items-center">
              <Link href="#" className="text-sm text-neutral-500 dark:text-neutral-500">
                Forgot your password?
              </Link>
              <Link href="#" className="text-sm text-neutral-500 dark:text-neutral-500">
                Don&apos;t have an account? Sign up
              </Link>
            </div>
          </div>
          // <div className="flex flex-col gap-4 pt-2">
          //   <div className="flex flex-row gap-2 p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
          //     <MdInfo className="w-14 h-10" />
          //     Magic links are a form of passwordless logins where users click on a link sent to their email address to
          //     log in to their accounts. Magic links only work with email addresses and are one-time use only
          //   </div>
          //   <Auth
          //     view="magic_link"
          //     supabaseClient={supabase}
          //     appearance={{
          //       theme: ThemeSupa,
          //       variables: {
          //         default: {
          //           colors: {
          //             brand: "#aa0000",
          //             brandAccent: "darkred",
          //           },
          //         },
          //       },
          //     }}
          //     theme={theme}
          //     providers={[]}
          //     showLinks={false}
          //     redirectTo="http://localhost:3000/auth/callback"
          //   />
          // </div>
        )
        : null}
    </div>
  );
}
