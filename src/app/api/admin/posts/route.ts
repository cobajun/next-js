import { prisma } from '@/app/_libs/prisma';
import {  NextRequest, NextResponse } from 'next/server'

export type AdminPostsIndexResponse = {
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
    return NextResponse.json<AdminPostsIndexResponse>({ posts }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return NextResponse.json({ message: '記事の取得に失敗しました。' }, { status: 400 });
  }
}

export type AdminCreatePostRequest = {
  title: string;
  content: string;
  thumbnailUrl: string;
  categories: {
    id: number;
  }[];
};

export async function POST(request: NextRequest) {
  try {
    const body: AdminCreatePostRequest = await request.json();
    const { title, content, thumbnailUrl, categories } = body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailUrl,
      },
    });
    for (const category of categories) {
      await prisma.postCategory.create({
        data: {
          postId: post.id,
          categoryId: category.id,
        },
      });
    }
    return NextResponse.json({ id: post.id }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return NextResponse.json({ message: '記事の作成に失敗しました。' }, { status: 400 });
  }
}