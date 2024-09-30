import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);

  // 같은 영화 정보를 검색할 경우 다시 데이터를 불러오지 않기 위해서 "force-cache" 적용
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다....</div>;
  }

  const movies: MovieData[] = await response.json();
  // return (
  //   <div className={style.container}>
  //     {movies.map((movie) => (
  //       <MovieItem key={movie.id} {...movie} />
  //     ))}
  //   </div>
  // );
  return movies.map((movie) => <MovieItem key={movie.id} {...movie} />);
}

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}) {
  return (
    <div className={style.container}>
      <Suspense
        key={searchParams.q || ""}
        fallback={<MovieListSkeleton count={3} />}
      >
        <SearchResult q={searchParams.q || ""} />
      </Suspense>
    </div>
  );
}
