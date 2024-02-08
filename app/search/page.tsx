import { getSearchData } from "@/api/getYTData";
import { ErrorCard } from "@/components/cards/";
import { searchDataType } from "@/types";
import { Metadata } from "next";
import React from "react";
import InfiniteScroll from "./InfiniteScroll";
import MapSearchData from "./MapSearchData";

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
    <div className="container flex flex-col gap-6 px-4">
      {data?.[0]
        ? (
          <>
            <MapSearchData data={data} />
            <InfiniteScroll key={query} query={query} />
          </>
        )
        : <ErrorCard />}
    </div>
  );
};

export default page;
