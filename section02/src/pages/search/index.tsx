import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { q } = router.query;

  return <h1>Search {q}</h1>;
}

// 폴더로 관리하고 싶으면 폴더하위에 index.tsx로 작성해야 한다.
// pages/search.tsx (O)
// pages/search/search.tsx (X) -> pages/search/index.tsx (O)
