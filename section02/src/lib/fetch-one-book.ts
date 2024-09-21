import { BookData } from "@/types";

export default async function fetchOneBook(
  id: number
): Promise<BookData | null> {
  const url = `https://onebite-books-server-main-inky.vercel.app/book/${id}`;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
