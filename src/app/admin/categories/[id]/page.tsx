"use client"
import styles from '@/app/admin/_styles/form.module.css';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { AdminCategoryShowResponse } from '@/app/api/admin/categories/[id]/route';

type Errors = {
  [key: string]: string;
}


export default function ModifyCategory() {
  const { id } = useParams();
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await fetch(`/api/admin/categories/${id}`);
        if (!res.ok) {
          throw new Error('カテゴリの取得に失敗しました。');
        }
        const { category }: AdminCategoryShowResponse = await res.json();
        setName(category.name);
      } catch {
        alert('カテゴリの取得に失敗しました。時間をおいて再度お試しください。');
      }
    };
    getCategory();
  }, [id]);

  const validate = () => {
    const validateErrs: Errors = {};

    if (!name) {
      validateErrs.name = "カテゴリ名を入力してください。";
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
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name})
      });
      if (!res.ok) {
          throw new Error('更新に失敗しました。時間をおいて再度お試しください。');
      }
      alert('カテゴリを更新しました！');
      setErrors({});
    } catch {
      alert('更新に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsSubmit(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('本当に削除しますか？')) return;

    setIsSubmit(true);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
          throw new Error('削除に失敗しました。時間をおいて再度お試しください。');
      }
      alert('カテゴリを削除しました！');
      router.push('/admin/categories');
    } catch {
      alert('削除に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsSubmit(false);
    }
  };


  return (
    <>
      <h1 className="pagetitle">カテゴリ編集/削除</h1>
      <section className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.item}>
            <label htmlFor="name" className={styles.label}>カテゴリ名</label>
            <div>
              <input type="text"  name="name" id="name" placeholder="カテゴリ名を入力してください" value={name} onChange={e => setName(e.target.value)} disabled={isSubmit} />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
          </div>

          <div className={styles.btn}>
            <button type="submit" disabled={isSubmit}>
              更 新
            </button>
            <button type="button" disabled={isSubmit} className={styles.deleteBtn} onClick={handleDelete}>
              削 除
            </button>
          </div>
        </form>
      </section>
    </>

  );
};