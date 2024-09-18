import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";

export default function Page() {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

// 폴더로 관리하고 싶으면 폴더하위에 index.tsx로 작성해야 한다.
// pages/search.tsx (O)
// pages/search/search.tsx (X) -> pages/search/index.tsx (O)
