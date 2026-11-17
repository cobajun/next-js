import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理画面：新規記事作成 | Blog",
  description: "管理画面：新規記事作成ページです。",
};

export default function AdminPostNewLayout({ children }: LayoutProps<"/admin/posts/new">) {
  return (
    <>
    {children}
    </>
  );
}
