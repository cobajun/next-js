import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import { Header } from '@/app/_components/Header';

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-zen-kaku",
});

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog Reactの練習用サイトです。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={zenKaku.variable}>
      <body>
        <Header />
        <main className="main">
          <div className="inner">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
