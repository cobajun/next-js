"use client"
import styles from '@/app/admin/_styles/list.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { AdminPostsIndexResponse } from '@/app/api/admin/posts/route';
import Image from 'next/image';

export default function AdminPostsIndex() {
  const [posts, setPosts] = useState<AdminPostsIndexResponse['posts']>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
 useEffect(() => {
     const getData = async () => {
      try {
        const res = await fetch('/api/admin/posts');
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
      <h1 className="pagetitle">管理画面：記事一覧</h1>
      <Link href="/admin/posts/new" className={styles.newbtn} aria-label="新規記事作成">＋</Link>
      <section className={styles.list}>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/admin/posts/${post.id}`}>
                <div><Image src={post.thumbnailUrl} alt="" width={180} height={180} /></div>
                <div className={styles.body}>
                    <ul className={styles.category}>
                      {post.postCategories.map((pc) => (
                        <li key={pc.category.id}>{pc.category.name}</li>
                      ))}
                    </ul>
                    <p className={styles.title}>{post.title}</p>
                    
                    <div className={styles.excerpt}>{post.content}</div>
                    <p className={styles.date}>created：{new Date(post.createdAt).toLocaleDateString('ja-JP')}　updated：{new Date(post.updatedAt).toLocaleDateString('ja-JP')}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
