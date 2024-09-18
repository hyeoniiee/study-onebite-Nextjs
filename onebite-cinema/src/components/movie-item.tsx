import { MovieData } from "@/types";
import Link from "next/link";
import style from "./movie-item.module.css";

export default function MovieItem({ id, title, posterImgUrl }: MovieData) {
  return (
    <Link href={`/movie/${id}`}>
      <div className={style.img_container}>
        <img src={posterImgUrl} alt={title} />
      </div>
    </Link>
  );
}
