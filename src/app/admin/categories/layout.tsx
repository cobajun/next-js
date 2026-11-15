import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理画面：カテゴリ一覧 | Blog",
  description: "管理画面：カテゴリ一覧です。",
};

export default function AdminCategoriesLayout({ children }: LayoutProps<"/admin/categories">) {
  return <>{children}</>;
}
