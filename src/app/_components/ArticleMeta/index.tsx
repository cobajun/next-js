"use client"
import styles from './ArticleMeta.module.css';

type Props = {
  createdAt: string;
  categories: string[];
}

export const ArticleMeta = ({ createdAt, categories }: Props) => {
  const date = new Date(createdAt);
  return (
    <div className={styles.meta}>
      <div className={styles.date}>{`${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`}</div>
      <ul className={styles.category}>
        {categories.map(category =>
          <li key={category}>{category}</li>
        )}
      </ul>
    </div>
  );
}