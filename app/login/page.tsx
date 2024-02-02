"use client";
import { themeContext } from "@/contexts/themeContext";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useContext } from "react";

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();
  const { theme } = useContext(themeContext);

  return (
    <div className="p-2">
      <Auth
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
    </div>
  );
}
