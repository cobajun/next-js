"use client"
import styles from './page.module.css';
import { ArticleMeta } from '@/app/_components/ArticleMeta';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Post } from '@/app/_types/posts';
import Image from 'next/image';

export default function ArticleDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
        if (!res.ok) {
          throw new Error();
        }
        const data = await res.json();
        setPost(data.post);
      } catch {
        setError('記事の取得に失敗しました。');
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [id]);

  if (isLoading) {
    return <p>読み込み中...</p>
  }

  if (error) {
    return (
      <>
        <p>{error}</p>
        <div className={styles.back}>
          <Link href="/" className={styles.btn}>
            記事一覧へ戻る
          </Link>
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <p>記事が見つかりませんでした。</p>
        <div className={styles.back}>
          <Link href="/" className={styles.btn}>
            記事一覧へ戻る
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <article className={styles.detail}>
        <div className={styles.main}>
          <Image src={post.thumbnailUrl} alt="" width={800} height={400} />
        </div>
        <ArticleMeta createdAt={post.createdAt} categories={post.categories} />
        <div className={styles.body}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        <div className={styles.back}>
          <Link href="/" className={styles.btn}>
            記事一覧へ戻る
          </Link>
        </div>
      </article>
    </>
  );
};