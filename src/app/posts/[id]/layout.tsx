import type { Metadata } from "next";
import { getPost } from "@/app/posts/[id]/_lib/getPost";

export async function generateMetadata({ params }: LayoutProps<"/posts/[id]">): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  return {
    title: post ? `${post.title} | Blog` : "記事が見つかりませんでした | Blog",
    description: "お知らせ詳細ページです。",
  };
}

export default function PostLayout({ children }: LayoutProps<"/posts/[id]">) {
  return (
    <>
    {children}
    </>
  );
}
