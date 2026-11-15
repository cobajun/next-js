import { prisma } from '@/app/_libs/prisma';
import { NextRequest, NextResponse } from 'next/server'

export type PostShowResponse = {
  post: {
    id: number;
    title: string;
    content: string;
    thumbnailUrl: string;
    createdAt: Date;
    updatedAt: Date;
    postCategories: {
      category: {
        id: number;
        name: string;
      }
    }[]
  }
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        postCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        }
      },
    });
    if (!post) {
      return NextResponse.json({ message: '記事が見つかりませんでした。' }, { status: 404 });
    }
    return NextResponse.json<PostShowResponse>({ post }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return NextResponse.json({ message: '記事の取得に失敗しました。' }, { status: 400 });
  }
}