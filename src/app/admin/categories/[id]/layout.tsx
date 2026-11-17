import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理画面：カテゴリ編集 | Blog",
  description: "管理画面：カテゴリ編集ページです。",
};

export default function AdminCategoryEditLayout({ children }: LayoutProps<"/admin/categories/[id]">) {
  return (
    <>
    {children}
    </>
  );
}
