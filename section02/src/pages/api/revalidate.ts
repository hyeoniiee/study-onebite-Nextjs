import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/"); // 인덱스 페이지를 재생성할꺼라서 인덱스 페이지 경로 작성
    return res.json({ revalidate: true });
  } catch (error) {
    res.status(500).send("Revalidation Failed");
  }
}
