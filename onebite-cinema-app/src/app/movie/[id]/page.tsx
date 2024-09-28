import style from "./page.module.css";
import { MovieData } from "@/types";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
      { cache: "force-cache" }
    );
    if (!response.ok) {
      throw new Error("오류가 발생했습니다...");
    }

    const movies: MovieData[] = await response.json();

    return movies.map(({ id }) => ({
      id: id.toString(),
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  // 영화 상세페이지의 데이터는 변경되지 않기 때문에 "force-cache" 적용
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${params.id}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }
  const movie = await response.json();

  const {
    id,
    title,
    subTitle,
    company,
    runtime,
    description,
    posterImgUrl,
    releaseDate,
    genres,
  } = movie;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} />
      </div>
      <div className={style.info_container}>
        <div>
          <h2>{title}</h2>
          <div>
            {releaseDate} / {genres.join(", ")} / {runtime}분
          </div>
          <div>{company}</div>
        </div>
        <div>
          <div className={style.subTitle}>{subTitle}</div>
          <div className={style.description}>{description}</div>
        </div>
      </div>
    </div>
  );
}
