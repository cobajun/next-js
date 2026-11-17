"use client"
import styles from '@/app/admin/_styles/form.module.css';

type Props = {
  name: string;
  setName: (name: string) => void;
  isSubmit: boolean;
  errors: {[key: string]: string};
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  handleDelete?: () => void;
  submitLabel: string;
}

export const CategoryForm = ({name, setName, isSubmit, errors, handleSubmit, handleDelete, submitLabel}: Props) => {
  return (
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
            {submitLabel}
          </button>
          {handleDelete && (
            <button type="button" disabled={isSubmit} className={styles.deleteBtn} onClick={handleDelete}>
              削 除
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
