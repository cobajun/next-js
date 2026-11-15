"use client"
import styles from './page.module.css';
import { ArticleList } from '@/app/_components/ArticleList'; 
import { useEffect, useState } from 'react';
import type { PostsIndexResponse } from '@/app/api/posts/route';

export default function Home() {
  const [posts, setPosts] = useState<PostsIndexResponse['posts']>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
 useEffect(() => {
     const getData = async () => {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) {
          throw new Error('データの取得に失敗しました。');
        }
        const { posts } = await res.json();
        setPosts(posts);
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
  
  
  return (
    <>
      <h1 className="pagetitle">記事一覧</h1>
      <section className={styles.list}>
        {posts.map(elem =>
          <ArticleList post={elem} key={elem.id} />
        )}
      </section>
    </>
  );
};
