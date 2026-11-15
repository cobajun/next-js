"use client"
import styles from './ArticleList.module.css';
import { ArticleMeta } from '@/app/_components/ArticleMeta';
import Link from "next/link";
import type { PostsIndexResponse } from '@/app/api/posts/route';
import Image from 'next/image';

type Props = {
  post: PostsIndexResponse['posts'][0];
}

export const ArticleList = ({ post }: Props) => {
  return (
    <article>
      <Link href={`/posts/${post.id}`} className={styles.link}>
        <div className={styles.thumb}><Image src={post.thumbnailUrl} alt="" width={240} height={240} /></div>
        <div className={styles.body}>
            <ArticleMeta createdAt={post.createdAt} categories={post.postCategories.map(pc => pc.category)} />
            <h2 className={styles.title}>{post.title}</h2>
            <div className={styles.excerpt}>
              <p>{post.content}</p>
            </div>
          </div>
        </Link>
    </article>
  );
}