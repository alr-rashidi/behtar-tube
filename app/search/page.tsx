import React from "react";
import { Metadata } from "next";
import { searchDataType } from "@/types";
import { getSearchData } from "@/api/getData";
import InfiniteScroll from "./InfiniteScroll";
import MapSearchData from "./MapSearchData";
import ErrorCard from "@/components/cards/ErrorCard";

export function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  let q = searchParams["q"];
  return {
    title: `Search: ${q}`,
  } as Metadata;
}

const page = async ({ params, searchParams }: any) => {
  const query = searchParams["q"];

  const data: searchDataType | null = await getSearchData(query);

  return (
    <div className="container flex flex-col gap-6 p-4">
      {data?.[0] ? (
        <>
          <MapSearchData data={data} />
          <InfiniteScroll key={query} query={query} />
        </>
      ) : <ErrorCard />}
    </div>
  );
};

export default page;
