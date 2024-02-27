"use client";

import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import React, { useState } from "react";

const textInputLabelClassName = "text-sm text-neutral-500 dark:text-neutral-400";

const Page = () => {
  const [password, setPassword] = useState<string>();
  const [passwordTwo, setPasswordTwo] = useState<string>();

  return (
    <div>
      <h1>Set New Password</h1>
      <div className="flex flex-col gap-1">
        <label className={textInputLabelClassName} htmlFor="password">
          Your password
        </label>
        <TextInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="flex flex-col gap-1">
        <label className={textInputLabelClassName} htmlFor="password">
          Repeat your password
        </label>
        <TextInput id="password" value={passwordTwo} onChange={(e) => setPasswordTwo(e.target.value)} />
      </div>
      <Button Theme="red" className="p-2">Login</Button>
    </div>
  );
};

export default Page;
