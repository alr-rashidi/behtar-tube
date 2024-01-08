"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "../ui/Button";

type PropsType = {
  errorText?: string;
};
const ErrorCard = ({ errorText }: PropsType) => {
  const router = useRouter();

  const handleClick = () => {
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="text-3xl font-bold">{errorText || "Error!"}</div>
      <Button onClick={handleClick}>Try again</Button>
    </div>
  );
};

export default ErrorCard;
