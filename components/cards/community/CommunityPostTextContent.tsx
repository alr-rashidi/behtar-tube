"use client";
import { useState } from "react";

const CommunityPostTextContent = ({ content }: { content: string }) => {
  const [showFullTextContent, setShowFullTextContent] =
    useState<boolean>(false);

  return (
    <>
      <div className={`${!showFullTextContent && "text-trim text-lines-2"}`}>
        {content}
      </div>
      {content.length >= 200 ? (
        <button
          className="text-subtitle-color"
          onClick={() => setShowFullTextContent((v) => !v)}
        >
          {!showFullTextContent ? "More..." : "Less..."}
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default CommunityPostTextContent;
