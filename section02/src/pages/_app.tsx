import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const onClickButton = () => {
    router.push("/test");
  };

  useEffect(() => {
    router.prefetch("/test");
  }, []);
  // 프로그래메틱하게 이동시키는 페이지에 대해서도 프리패칭을 시키고 싶다면 router 객체의 prefetch 메서드를 통해 특정 페이지를 명시적으로 프리패칭하도록 설정할 수 있다.

  return (
    <>
      <header>
        <Link href={"/"}>index</Link>
        &nbsp;
        <Link href={"/search"} prefetch={false}>
          search
        </Link>
        {/* prefetch의 값을 flase 로 설정하면 프리패칭을 명시적으로 해제할 수 있다. */}
        &nbsp;
        <Link href={"/book/1"}>book/1</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
