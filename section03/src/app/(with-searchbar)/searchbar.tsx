"use client";
// 이 파일 안에 있는 searchbar 컴포넌트가 이제는 클라이언트 컴포넌트로서 설정이 되도록 추가해야 함
import { useState } from "react";

export default function Searchbar() {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input value={search} onChange={onChangeSearch} />
      <button>검색</button>
    </div>
  );
}
