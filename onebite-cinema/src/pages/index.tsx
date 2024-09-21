import MovieItem from "@/components/movie-item";
import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import style from "./index.module.css";
import { InferGetStaticPropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-movie";
import Head from "next/head";

export const getStaticProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      allMovies,
      recoMovies,
    },
    revalidate: 3,
  };
};

export default function Home({
  allMovies,
  recoMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입 시네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 시네마" />
        <meta
          property="og:description"
          content="한입 시네마에 등록된 다양한 영화들을 만나보세요"
        />
      </Head>
      <div className={style.conatiner}>
        <section>
          <h3>지금 가장 추천하는 영화</h3>
          <div className={style.reco_conatiner}>
            {recoMovies.map((movie) => (
              <MovieItem key={`recomovie-${movie.id}`} {...movie} />
            ))}
          </div>
        </section>
        <section>
          <h3>등록된 모든 영화</h3>
          <div className={style.all_container}>
            {allMovies.map((movie) => (
              <MovieItem key={`allmovie-${movie.id}`} {...movie} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
