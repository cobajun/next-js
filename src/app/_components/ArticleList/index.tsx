"use client"
import styles from './ArticleList.module.css';
import { ArticleMeta } from '@/app/_components/ArticleMeta';
import Link from "next/link";
import type { MicroCmsPost } from '@/app/_types/posts';
import Image from 'next/image';

type Props = {
  post: MicroCmsPost;
}

export const ArticleList = ({ post }: Props) => {
  return (
    <article>
      <Link href={`/posts/${post.id}`} className={styles.link}>
        <div className={styles.thumb}><Image src={post.thumbnail.url} alt="" width={240} height={240} /></div>
        <div className={styles.body}>
            <ArticleMeta createdAt={post.createdAt} categories={post.categories} />
            <h2 className={styles.title}>{post.title}</h2>
            <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </Link>
    </article>
  );
}