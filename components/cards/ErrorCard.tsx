"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "../ui/Button";

type PropsType = {
  title?: string;
  body?: string;
  tryBtn?: boolean;
};
const ErrorCard = ({ title, body, tryBtn }: PropsType) => {
  const router = useRouter();

  const handleClick = () => {
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="text-3xl font-bold">{title || "Error!"}</div>
      <div>{body}</div>
      {tryBtn != false
        ? <Button onClick={handleClick}>Try again</Button>
        : null}
    </div>
  );
};

export default ErrorCard;
