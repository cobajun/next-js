"use client"
import styles from './page.module.css';
import { ArticleList } from '@/app/_components/ArticleList'; 
import { useEffect, useState } from 'react';
import type { MicroCmsPost } from '@/app/_types/posts';

export default function Home() {
  const [posts, setPosts] = useState<MicroCmsPost[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
 useEffect(() => {
     const getData = async () => {
      try {
        const res = await fetch('https://subacoba.microcms.io/api/v1/posts', {
          headers: {
            'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY || '',
          },
        });
        if (!res.ok) {
          throw new Error('データの取得に失敗しました。');
        }
        const { contents } = await res.json();
        setPosts(contents);
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
      <section className={styles.list}>
        {sorted.map(elem =>
          <ArticleList post={elem} key={elem.id} />
        )}
      </section>
    </>
  );
};
