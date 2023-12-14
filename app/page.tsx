import React, { Suspense } from "react";
import Loading from "./Loading";
import { VideoType } from "@/types";
import { PageProps } from "@/.next/types/app/layout";
import { getTrendVideos } from "@/components/getData";
import { VideoCard } from "@/components/cards";

const RootPage = async ({ params, searchParams }: PageProps) => {
  const category = searchParams["category"] || "trending";

  let data: VideoType[] | null = await getTrendVideos(category);

  return (
    <div>
      <Suspense key={category} fallback={<Loading />}>
        <section className="grid grid-cols-1 gap-6 px-4 py-4 xl:px-8 place-content-around sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data!.map((video) => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </section>
      </Suspense>
    </div>
  );
};

export default RootPage;
