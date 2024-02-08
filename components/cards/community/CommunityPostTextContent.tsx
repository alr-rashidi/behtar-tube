"use client";
import Button from "@/components/ui/Button";
import { useState } from "react";

const CommunityPostTextContent = ({ content }: { content: string }) => {
  const [showFullTextContent, setShowFullTextContent] = useState<boolean>(false);

  return (
    <>
      <div className={`${!showFullTextContent && "text-trim text-lines-2"}`}>
        {content}
      </div>
      {content.length >= 200
        ? (
          <Button
            className="text-subtitle-color"
            onClick={() => setShowFullTextContent((v) => !v)}
          >
            {!showFullTextContent ? "More..." : "Less..."}
          </Button>
        )
        : (
          ""
        )}
    </>
  );
};

export default CommunityPostTextContent;
