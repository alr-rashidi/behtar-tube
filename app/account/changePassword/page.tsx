"use client";

import { changePassword } from "@/api/supabase";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const textInputLabelClassName = "text-sm text-neutral-500 dark:text-neutral-400";

const Page = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");

  const handleChangePassword = () => {
    if (password == passwordTwo) {
      changePassword(password)
        .then(() => {
          alert("Your password has been changed!");
          router.push("/account")
        })
        .catch(err => alert(`Change password failed: ${JSON.stringify(err)}`));
    } else {
      alert("The entered passwords do not match");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl font-bold">Set New Password</h1>
      <div className="flex flex-col w-full gap-1">
        <label className={textInputLabelClassName} htmlFor="password">
          New password
        </label>
        <TextInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="flex flex-col w-full gap-1">
        <label className={textInputLabelClassName} htmlFor="password">
          Repeat password
        </label>
        <TextInput id="password" value={passwordTwo} onChange={(e) => setPasswordTwo(e.target.value)} />
      </div>
      <Button Theme="red" className="w-20 p-2" disabled={password != passwordTwo || password == ''} onClick={handleChangePassword}>
        Save
      </Button>
    </div>
  );
};

export default Page;
