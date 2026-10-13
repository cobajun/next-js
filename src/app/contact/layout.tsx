import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | Blog",
  description: "お問い合わせページです。",
};

export default function ContactLayout({ children }: LayoutProps<"/contact">) {
  return (
    <>
    {children}
    </>
  );
}
