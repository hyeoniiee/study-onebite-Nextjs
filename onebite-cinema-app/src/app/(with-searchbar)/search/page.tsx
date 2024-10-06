import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";
import { Suspense } from "react";
import { Metadata } from "next";

async function SearchResult({ q }: { q: string }) {
  // 같은 영화 정보를 검색할 경우 다시 데이터를 불러오지 않기 위해서 "force-cache" 적용
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다....</div>;
  }

  const movies: MovieData[] = await response.json();

  return movies.map((movie) => <MovieItem key={movie.id} {...movie} />);
}

type Props = {
  searchParams: {
    q?: string;
  };
};

export function generateMetadata({ searchParams }: Props): Metadata {
  return {
    title: `${searchParams.q} : 한입시네마 검색`,
    description: `${searchParams.q} 검색 결과입니다`,
    openGraph: {
      title: `${searchParams.q} : 한입시네마 검색`,
      description: `${searchParams.q} 검색 결과입니다`,
      images: ["/thumbnail.png"],
    },
  };
}

export default async function Page({ searchParams }: Props) {
  return (
    <div className={style.container}>
      <Suspense
        key={searchParams.q || ""}
        fallback={<MovieListSkeleton count={15} />}
      >
        <SearchResult q={searchParams.q || ""} />
      </Suspense>
    </div>
  );
}
