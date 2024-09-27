import MovieItem from "@/components/movie-item";
import movies from "@/mock/dummy.json";
import style from "./page.module.css";
import { MovieData } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  // 같은 영화 정보를 검색할 경우 다시 데이터를 불러오지 않기 위해서 "force-cache" 적용
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${searchParams.q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다....</div>;
  }
  const movies: MovieData[] = await response.json();
  return (
    <div className={style.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
