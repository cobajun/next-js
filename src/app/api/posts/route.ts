import { prisma } from '@/app/_libs/prisma';
import { NextResponse } from 'next/server'

export type PostsIndexResponse = {
  posts: {
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
  }[]
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
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
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json<PostsIndexResponse>({ posts }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return NextResponse.json({ message: '記事の取得に失敗しました。' }, { status: 400 });
  }
}