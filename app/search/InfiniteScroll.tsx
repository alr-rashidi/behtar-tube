"use client";

import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { useInView } from "react-intersection-observer";
import { searchDataType } from "@/types";
import { getSearchData } from "@/api/getData";
import MapSearchData from "./MapSearchData";
import ErrorCard from "@/components/cards/ErrorCard";

type PropsType = {
  query: string;
};

let page = 2;

const InfiniteScroll = ({ query }: PropsType) => {
  const [data, setData] = useState<searchDataType | null>(null);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      const controller = new AbortController();
      const getNewData = async () => {
        let newData = await getSearchData(query, page, controller.signal);
        page++;
        if (data) {
          setData([...data, ...newData] as searchDataType);
        } else {
          setData(newData);
        }
      };
      getNewData();
      return () => {
        controller.abort();
      };
    }
  }),
    [inView];

  return (
    <>
      {data?.[0] ? (
        <MapSearchData data={data} />
        // Not showing ErrorCard in first load that data is null
      ) : page == 3 ? (
        <ErrorCard />
      ) : null}
      <div ref={ref} className="p-10">
        <Loading />
      </div>
    </>
  );
};

export default InfiniteScroll;
