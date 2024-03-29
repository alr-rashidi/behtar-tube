"use client";

import Button from "@/components/ui/Button";
import React, { useState } from "react";

const Description = ({ description }: { description: string }) => {
  const [showFullText, setShowFullText] = useState<boolean>(false);

  const handleClick = () => {
    setShowFullText(v => !v);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className={`${!showFullText && "text-trim text-lines-3"}`}>
        <div className="default-links" dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
      {description.length >= 300
        ? <Button className="p-2" onClick={handleClick}>Show {!showFullText ? "More..." : "Less..."}</Button>
        : null}
    </div>
  );
};

export default Description;
