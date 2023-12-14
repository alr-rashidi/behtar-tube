'use client'
import { useState } from "react";

const CommunityPostTextContent = ({ content }: { content: string }) => {
  const [showFullTextContent, setShowFullTextContent] = useState<boolean>(false);

  return (
    <>
      <div className={`${!showFullTextContent && "text-trim text-lines-2"}`}>
        {content}
      </div>
      {content.length >= 300 && !showFullTextContent ? (
        <button
          className="text-subtitle-color"
          onClick={() => setShowFullTextContent((v) => !v)}
        >
          Show all
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default CommunityPostTextContent;
