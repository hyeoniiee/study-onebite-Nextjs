import style from "./[id].module.css";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";
import fetchOneMovie from "@/lib/fetch-one-movie";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
  const movies = await fetchMovies();
  return {
    paths: movies.map(({ id }) => ({
      params: { id: id.toString() },
    })),
    fallback: true,
  };
};

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return "로딩중입니다.";
  if (!movie) return "문제가 발생했습니다. 다시 시도해 주세요";
  const {
    id,
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} />
      </div>
      <h2 className={style.title}>{title}</h2>
      <div className={style.movie_info}>
        {releaseDate} / {genres} / {runtime}분
      </div>
      <div className={style.company}>{company}</div>
      <div className={style.sub_title}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
