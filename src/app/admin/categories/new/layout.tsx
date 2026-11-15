import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理画面：カテゴリ編集/削除 | Blog",
  description: "管理画面：カテゴリ編集/削除ページです。",
};

export default function AdminCategoryNewLayout({ children }: LayoutProps<"/admin/categories/new">) {
  return (
    <>
    {children}
    </>
  );
}
