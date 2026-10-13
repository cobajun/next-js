import type { MicroCmsPost } from '@/app/_types/posts';

export const getPost = async (id: string): Promise<MicroCmsPost | null> => {
  try {
  const res = await fetch(`https://subacoba.microcms.io/api/v1/posts/${id}`, {
    headers: {
      'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY || '',
    },
  });
  if (!res.ok) {
    throw new Error('データの取得に失敗しました。');
  }
  const data = await res.json();
  return data;
  } catch {
    return null;
  }
}