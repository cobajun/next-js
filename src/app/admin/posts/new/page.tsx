"use client"
import styles from '@/app/admin/_styles/form.module.css';
import { useEffect, useState } from 'react';
import type { AdminCategoriesIndexResponse } from '@/app/api/admin/categories/route';

type Errors = {
  [key: string]: string;
}


export default function CreatePost() {
  const [title, setTitle] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [categories, setCategories] = useState<AdminCategoriesIndexResponse['categories']>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("/api/admin/categories");
        if (!res.ok) {
          throw new Error('カテゴリの取得に失敗しました。');
        }
        const { categories } = await res.json();
        setCategories(categories);
      } catch {
        alert('カテゴリの取得に失敗しました。時間をおいて再度お試しください。');
      }
    };
    getCategories();
  }, []);

  const validate = () => {
    const validateErrs: Errors = {};

    if (!title) {
      validateErrs.title = "タイトルを入力してください。";
    } else if (title.length > 100) {
      validateErrs.title = "タイトルは100文字以内で入力してください。";
    }
    if (!thumbnailUrl) {
      validateErrs.thumbnailUrl = "サムネイルURLを入力してください。";
    }
    if (!content) {
      validateErrs.content = "内容を入力してください。";
    }
    if (selectedCategoryIds.length === 0) {
      validateErrs.selectedCategoryIds = "カテゴリを1つ以上選択してください。";
    }

    setErrors(validateErrs);
    return Object.keys(validateErrs).length === 0;
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();
    
    if (!isValid) return;
    
    setIsSubmit(true);
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          thumbnailUrl,
          content,
          categories: selectedCategoryIds.map(id => ({ id })), //({ id: id }))
        })
      });
      if (!res.ok) {
          throw new Error('作成に失敗しました。時間をおいて再度お試しください。');
      }
      alert('記事を作成しました！');
      setTitle('');
      setThumbnailUrl('');
      setContent('');
      setSelectedCategoryIds([])
      setErrors({});
    } catch {
      alert('作成に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsSubmit(false);
    }
  };


  return (
    <>
      <h1 className="pagetitle">新規記事作成</h1>
      <section className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.item}>
            <label htmlFor="title" className={styles.label}>タイトル</label>
            <div>
              <input type="text"  name="title" id="title" placeholder="タイトルを入力してください" value={title} onChange={e => setTitle(e.target.value)} disabled={isSubmit} />
              {errors.title && <p className={styles.error}>{errors.title}</p>}
            </div>
          </div>
          <div className={styles.item}>
            <label htmlFor="thumbnailUrl" className={styles.label}>サムネイルURL</label>
            <div>
              <input type="text"  name="thumbnailUrl" id="thumbnailUrl" placeholder="サムネイルURLを入力してください" value={thumbnailUrl} onChange={e => setThumbnailUrl(e.target.value)} disabled={isSubmit} />
              {errors.thumbnailUrl && <p className={styles.error}>{errors.thumbnailUrl}</p>}
            </div>
          </div>
          
          <div className={styles.item}>
            <label htmlFor="content" className={styles.label}>内容</label>
            <div>
              <textarea  name="content" id="content" placeholder="内容を入力してください" value={content} onChange={e => setContent(e.target.value)} disabled={isSubmit} />
              {errors.content && <p className={styles.error}>{errors.content}</p>}
            </div>
          </div>

          <div className={styles.item} role="group" aria-labelledby="category-label">
            <p id="category-label" className={styles.label}>カテゴリー</p>
            <div>
              <div className={styles.checkboxGroup}>
                {categories.map((category) => (
                  <label key={category.id}>
                    <input
                    type="checkbox"
                    value={category.id}
                    checked={selectedCategoryIds.includes(category.id)}
                    onChange={e => {
                      if (e.target.checked) {
                        setSelectedCategoryIds([...selectedCategoryIds, category.id]);
                      } else {
                        setSelectedCategoryIds(selectedCategoryIds.filter(id => id !== category.id));
                      }
                    }}
                    disabled={isSubmit} />
                    {category.name}
                  </label>
                ))}
              </div>
              {errors.selectedCategoryIds && <p className={styles.error}>{errors.selectedCategoryIds}</p>}
            </div>
          </div>

          <div className={styles.btn}>
            <button type="submit" disabled={isSubmit}>
              作 成
            </button>
          </div>
        </form>
      </section>
    </>

  );
};