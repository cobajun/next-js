"use client"
import styles from './page.module.css';
import { ArticleMeta } from '@/app/_components/ArticleMeta';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { PostShowResponse } from '@/app/api/posts/[id]/route';
import Image from 'next/image';

export default function ArticleDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [post, setPost] = useState<PostShowResponse['post'] | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) {
          throw new Error();
        }
        const {post} = await res.json();
        setPost(post);
      } catch {
        setError('記事の取得に失敗しました。');
      } finally {
        setIsLoading(false);
      }
    };
    getPost();
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
        <ArticleMeta createdAt={post.createdAt} categories={post.postCategories.map(pc => pc.category)} />
        <div className={styles.body}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.contents}>
            <p>
              { post.content}
            </p>
          </div>
        </div>
        <div className={styles.main}>
          <Image src={post.thumbnailUrl} alt="" width={800} height={800} />
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