import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理画面：記事編集/削除 | Blog",
  description: "管理画面：記事編集/削除ページです。",
};

export default function AdminPostEditLayout({ children }: LayoutProps<"/admin/posts/[id]">) {
  return (
    <>
    {children}
    </>
  );
}
