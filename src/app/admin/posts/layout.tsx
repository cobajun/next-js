import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理画面：記事一覧 | Blog",
  description: "管理画面：記事一覧です。",
};

export default function AdminPostsLayout({ children }: LayoutProps<"/admin/posts">) {
  return <>{children}</>;
}
