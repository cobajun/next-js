"use client"
import styles from './Header.module.css';
import Link from "next/link";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.siteId}>
          <Link href="/">Blog</Link>
        </div>
        <div className={styles.contact}>
          <Link href="/contact">お問い合わせ</Link>
        </div>
      </div>
    </header>
  );
}