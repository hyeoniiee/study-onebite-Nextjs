import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

async function AllMovies() {
  await delay(1500);

  // 전체 영화 데이터는 새로운 영화가 추가되거나 삭제되지 않으므로 "force-cache" 적용
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }

  const allMovies: MovieData[] = await response.json();
  // return (
  //   <div className={style.all_container}>
  //     {allMovies.map((movie) => (
  //       <MovieItem key={`all-${movie.id}`} {...movie} />
  //     ))}
  //   </div>
  // );
  return allMovies.map((movie) => <MovieItem key={movie.id} {...movie} />);
}

async function RecoMovies() {
  await delay(3000);

  // 랜덤으로 제공되는 데이터이므로 추천 영화를 변경하기 위해 "revalidate" 적용
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 3 } }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recoMovies: MovieData[] = await response.json();
  // return (
  //   <div className={style.reco_container}>
  //     {recoMovies.map((movie) => (
  //       <MovieItem key={`reco-${movie.id}`} {...movie} />
  //     ))}
  //   </div>
  // );
  return recoMovies.map((movie) => <MovieItem key={movie.id} {...movie} />);
}

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.reco_container}>
          <Suspense fallback={<MovieListSkeleton count={3} />}>
            <RecoMovies />
          </Suspense>
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.all_container}>
          <Suspense fallback={<MovieListSkeleton count={20} />}>
            <AllMovies />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
