import styles from './layout.module.css';
import Link from 'next/link';

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <>
      <nav className={styles.adminsnav}>
        <ul>
          <li><Link href="/admin/posts">記事一覧</Link></li>
          <li><Link href="/admin/categories">カテゴリ一覧</Link></li>
        </ul>
      </nav>
      {children}
    </>
  );
}
