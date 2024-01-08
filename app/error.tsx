"use client";

import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleReset = () => {
    setLoading(true);
    reset();
  };

  return (
    <div className="w-full h-[86vh] overflow-hidden relative">
      {loading
        ? (
          <div className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-1/2">
            <div className="mb-2 text-3xl font-extrabold">Error!</div>
            <div className="mb-4 text-lg">{error.message}</div>
            <Button className="h-max p-2" onClick={handleReset}>
              Try again
            </Button>
            <p>Or</p>
            <Button className="h-max p-2" onClick={() => window.location.reload()}>
              Reload page
            </Button>
          </div>
        )
        : (
          <div>
            <Loading />
          </div>
        )}
    </div>
  );
}
