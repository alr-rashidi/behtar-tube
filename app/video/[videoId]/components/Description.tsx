"use client";

import React, { useState } from "react";

const Description = ({ description }: { description: string }) => {
  const [showFullText, setShowFullText] = useState<boolean>(false)

  const handleClick = () => {
    setShowFullText(v => !v)
  }

  return (
    <div className="flex flex-col">
      <div className={`${!showFullText && "text-trim text-lines-3"}`}>
        <div className="default-links" dangerouslySetInnerHTML={{__html: description}}></div>
      </div>
      <button onClick={handleClick}>{!showFullText ? 'More...' : 'Less...'}</button>
    </div>
  );
};

export default Description;
