"use client"
import styles from '@/app/admin/_styles/form.module.css';
import type { AdminCategoriesIndexResponse } from '@/app/api/admin/categories/route';

type Props = {
  title: string;
  setTitle: (title: string) => void;
  thumbnailUrl: string;
  setThumbnailUrl: (thumbnailUrl: string) => void;
  content: string;
  setContent: (content: string) => void;
  categories: AdminCategoriesIndexResponse['categories'];
  selectedCategoryIds: number[];
  setSelectedCategoryIds: (selectedCategoryIds: number[]) => void;
  errors: { [key: string]: string };
  isSubmit: boolean;
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  handleDelete?: () => void;
  submitLabel: string;
}

export const PostForm = ({title, setTitle, thumbnailUrl, setThumbnailUrl, content, setContent, categories, selectedCategoryIds, setSelectedCategoryIds, errors, isSubmit, handleSubmit, handleDelete, submitLabel}: Props) => {
  return (
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
