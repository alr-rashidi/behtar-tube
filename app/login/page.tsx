"use client";
import { createAccount, emailLogin, magicLinkLogin, OAuthLogin, sendResetPasswordRequest } from "@/api/supabase";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { Provider } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { MdInfo } from "react-icons/md";

export default function AuthForm() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState<PagesType>("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  type PagesType = "login" | "register" | "magicLink" | "resetPassword";

  const providerBtnClassName =
    "flex flex-row gap-2 items-center justify-center text-neutral-500 dark:text-neutral-200 bg-neutral-200 dark:bg-neutral-800 p-2 rounded hover:bg-neutral-100 hover:dark:bg-neutral-700 active:brightness-95 transition";
  const textInputLabelClassName = "text-sm text-neutral-500 dark:text-neutral-400";
  const anchorItemClassName = "text-sm underline text-neutral-500 dark:text-neutral-500";

  const redirectToHome = () => {
    window.location.href = "/account";
  };

  const OauthLoginHandler = (provider: Provider) => {
    OAuthLogin(provider)
      .then(redirectToHome)
      .catch(err => alert(`Login with ${provider} failed: ${JSON.stringify(err)}`));
  };

  const emailLoginHandler = () => {
    emailLogin(email, password)
      .then(() => {
        alert(`You logged in Successfully!`);
        redirectToHome();
      })
      .catch(err => alert(`Login failed: ${err}`));
  };

  const magicLinkLoginHandler = () => {
    magicLinkLogin(email)
      .then(() => {
        alert("The magicLink was successfully sent to your Email");
        redirectToHome();
      })
      .catch(err => alert(`MagicLink login failed: ${err}`));
  };

  const resetPassword = () => {
    sendResetPasswordRequest(email)
      .then(() => {
        alert("The reset password link was successfully sent to your Email");
      })
      .catch(err => alert(`Rest password request failed: ${err}`));
  };

  const signUpHandler = () => {
    createAccount(email, password)
      .then(() => alert(`Successfully!`))
      .catch(err => alert(`Register failed: ${err}`));
    setSelectedPage("login");
  };

  return (
    <div className="p-2">
      {selectedPage == "login"
        ? (
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-1">
              <button onClick={() => OauthLoginHandler("google")} className={providerBtnClassName}>
                <FaGoogle /> Login with Google
              </button>
              <button onClick={() => OauthLoginHandler("github")} className={providerBtnClassName}>
                <FaGithub /> Login with Github
              </button>
            </div>
            <div className="h-[1px] bg-neutral-300 dark:bg-neutral-700"></div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className={textInputLabelClassName} htmlFor="email">Email address</label>
                <TextInput id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <label className={textInputLabelClassName} htmlFor="password">
                  Your password
                </label>
                <TextInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <Button Theme="red" className="p-2" onClick={emailLoginHandler}>Login</Button>

            <div className="flex flex-col gap-1 items-center">
              {/* <button className={anchorItemClassName} onClick={() => setSelectedPage("magicLink")}>
                Login using magicLink (One-time password)
              </button> */}
              <button className={anchorItemClassName} onClick={() => setSelectedPage("resetPassword")}>
                Forgot your password?
              </button>
              <button className={anchorItemClassName} onClick={() => setSelectedPage("register")}>
                Don&apos;t have an account? Register new
              </button>
            </div>
          </div>
        )
        : null}
      {selectedPage == "register"
        ? (
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className={textInputLabelClassName} htmlFor="email">Email address</label>
                <TextInput id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <label className={textInputLabelClassName} htmlFor="password">
                  Create a password
                </label>
                <TextInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <Button Theme="red" className="p-2" onClick={signUpHandler}>Register</Button>

            <div className="flex flex-col gap-1 items-center">
              <button className={anchorItemClassName} onClick={() => setSelectedPage("login")}>
                Already have an account? Login
              </button>
            </div>
          </div>
        )
        : null}
      {selectedPage == "magicLink"
        ? (
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-row gap-2 p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
              <MdInfo className="w-14 h-10" />
              Magic links are a form of passwordless logins where users click on a link sent to their email address to
              log in to their accounts. Magic links only work with email addresses and are one-time use only
            </div>
            <div className="flex flex-col gap-1">
              <label className={textInputLabelClassName} htmlFor="email">Email address</label>
              <TextInput id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button Theme="red" className="p-2" onClick={magicLinkLoginHandler}>Send magic link</Button>
            <div className="flex flex-col gap-1 items-center">
              <button className={anchorItemClassName} onClick={() => setSelectedPage("login")}>
                Already have an account? Login
              </button>
            </div>
          </div>
        )
        : null}
      {selectedPage == "resetPassword"
        ? (
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1">
              <label className={textInputLabelClassName} htmlFor="email">Email address</label>
              <TextInput id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button Theme="red" className="p-2" onClick={() => resetPassword()}>Send reset password instructions</Button>
            <div className="flex flex-col gap-1 items-center">
              <button className={anchorItemClassName} onClick={() => setSelectedPage("login")}>
                Already have an account? Login
              </button>
            </div>
          </div>
        )
        : null}
    </div>
  );
}
