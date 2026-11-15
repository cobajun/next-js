import styles from './layout.module.css';

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <>
      <nav className={styles.adminsnav}>
        <ul>
          <li><a href="/admin/posts">記事一覧</a></li>
          <li><a href="/admin/categories">カテゴリ一覧</a></li>
        </ul>
      </nav>
      {children}
    </>
  );
}
