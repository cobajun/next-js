"use client"
import { ArticleList } from '@/app/_components/ArticleList'; 
import { useEffect, useState } from 'react';
import type { Post } from '@/app/_types/posts';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
 useEffect(() => {
     const getData = async () => {
      try {
        const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts");
        if (!res.ok) {
          throw new Error('データの取得に失敗しました。');
        }
        const data = await res.json();
        setPosts(data.posts);
      } catch {
        setError('データの取得に失敗しました。');
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  if (isLoading) {
    return <p>読み込み中...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

   if (posts.length === 0) {
    return <p>記事が見つかりませんでした。</p>
   }
  
  const sorted = [...posts].sort(
    (m, n) => new Date(n.createdAt).getTime() - new Date(m.createdAt).getTime()
  );
  
  return (
    <>
      <h1 className="pagetitle">記事一覧</h1>
      <section>
        {sorted.map(elem =>
          <ArticleList post={elem} key={elem.id} />
        )}
      </section>
    </>
  );
};
