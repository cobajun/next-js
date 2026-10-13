import type { Post } from '@/app/_types/posts';

export const getPost = async (id: string): Promise<Post | null> => {
  try {
  const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
  if (!res.ok) {
    throw new Error('データの取得に失敗しました。');
  }
  const data = await res.json();
  return data.post;
  } catch {
    return null;
  }
}