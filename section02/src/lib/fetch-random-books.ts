import { BookData } from "@/types";

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const url = `https://onebite-books-server-main-inky.vercel.app/book/random`;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
