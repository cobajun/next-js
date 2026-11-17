"use client"
import styles from '@/app/admin/_styles/list.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { AdminCategoriesIndexResponse } from '@/app/api/admin/categories/route';

export default function AdminCategoriesIndex() {
  const [categories, setCategories] = useState<AdminCategoriesIndexResponse['categories']>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
 useEffect(() => {
     const getData = async () => {
      try {
        const res = await fetch('/api/admin/categories');
        if (!res.ok) {
          throw new Error('データの取得に失敗しました。');
        }
        const { categories } = await res.json();
        setCategories(categories);
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

   if (categories.length === 0) {
    return <p>カテゴリが見つかりませんでした。</p>
   }
  
  
  return (
    <>
      <h1 className="pagetitle">管理画面：カテゴリ一覧</h1>
      <Link href="/admin/categories/new" className={styles.newbtn} aria-label="新規カテゴリ作成">＋</Link>
      <section className={styles.list}>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/admin/categories/${category.id}`}>
                    <p className={styles.title}>{category.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
