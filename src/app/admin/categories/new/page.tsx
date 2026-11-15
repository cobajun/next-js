"use client"
import styles from '@/app/admin/_styles/form.module.css';
import { useState } from 'react';

type Errors = {
  [key: string]: string;
}


export default function CreateCategory() {
  const [name, setName] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

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
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name})
      });
      if (!res.ok) {
          throw new Error('作成に失敗しました。時間をおいて再度お試しください。');
      }
      alert('カテゴリを作成しました！');
      setName('');
      setErrors({});
    } catch {
      alert('作成に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsSubmit(false);
    }
  };


  return (
    <>
      <h1 className="pagetitle">カテゴリ作成</h1>
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
              作 成
            </button>
          </div>
        </form>
      </section>
    </>

  );
};