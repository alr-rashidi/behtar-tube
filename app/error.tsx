"use client";

import { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  const router = useRouter();

  const refresh = () => {
    router.refresh();
    reset();
  }

  return (
    <div className="w-full h-[86vh] overflow-hidden relative">
      <div className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-1/2">
        <div className="mb-2 text-3xl font-extrabold">Error!</div>
        <div className="mb-4 text-lg">{error.message}</div>
        <button className="customButton w-max" onClick={() => reset()}>
          Try again
        </button>
        <p>Or</p>
        <button className="customButton w-max" onClick={() => window.location.reload()}>
          Reload page
        </button>
      </div>
    </div>
  );
}
