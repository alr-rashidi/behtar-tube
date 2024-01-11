'use client'

import Button from "@/components/ui/Button";

type PropType = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: PropType) {
  return (
    <div className="w-full h-[86vh] overflow-hidden relative">
      <div className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-1/2">
        <div className="mb-2 text-3xl font-extrabold">Error!</div>
        <div className="mb-4 text-lg">{error.message}</div>
        <Button className="h-max p-2" onClick={reset}>
          Try again
        </Button>
        <p>Or</p>
        <Button className="h-max p-2" onClick={() => window.location.reload()}>
          Reload page
        </Button>
      </div>
    </div>
  );
}
