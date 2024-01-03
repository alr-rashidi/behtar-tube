"use client";

import CommentCard from "@/components/cards/CommentCard";
import { getCommentsData } from "@/api/getData";
import numberCounter from "@/utils/numberCounter";
import { CommentsType, DetailedVideoType } from "@/types";
import React, { useEffect, useState } from "react";

const Comments = ({ data: propData }: { data: DetailedVideoType }) => {
  type dataType = {
    loading: boolean;
    error: boolean;
    data: CommentsType | null;
  };

  const [state, setState] = useState<dataType>({
    loading: true,
    error: false,
    data: null,
  });

  useEffect(() => {
    setState({
      loading: true,
      error: false,
      data: null,
    });
    const { signal, abort } = new AbortController();

    const getData = async () => {
      let newData = await getCommentsData(propData.videoId, signal);

      setState({ loading: false, error: false, data: newData });
    };
    getData();

    return () => {
      abort;
    };
  }, [propData]);

  if (state.loading) {
    return "Loading...";
  }
  if (state.error) {
    return "Error!";
  }

  if (state.data != null) {
    let data = state.data;
    return (
      <div className="flex flex-col">
        <div className="text-lg font-bold">
          {numberCounter(data.commentCount ? data.commentCount : 0)} Comments
        </div>
        <div>
          {data.comments.map(comment => (
            <CommentCard key={comment.commentId} comment={comment} />
          ))}
          {/* <InfiniteScroll videoId={propData.videoId} /> */}
        </div>
      </div>
    );
  }
};

export default Comments;
