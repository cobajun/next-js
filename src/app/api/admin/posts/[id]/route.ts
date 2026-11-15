import { prisma } from '@/app/_libs/prisma';
import { NextRequest, NextResponse } from 'next/server'

export type AdminPostShowResponse = {
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
    return NextResponse.json<AdminPostShowResponse>({ post }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return NextResponse.json({ message: '記事の取得に失敗しました。' }, { status: 400 });
  }
}

export type AdminUpdatePostRequest = {
  title: string;
  content: string;
  thumbnailUrl: string;
  categories: {
    id: number;
  }[];
};

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body: AdminUpdatePostRequest = await request.json();
    const { title, content, thumbnailUrl, categories } = body;
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
        thumbnailUrl,
      },
    });

    await prisma.postCategory.deleteMany({
      where: {
        postId: post.id,
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
    return NextResponse.json({ message: '記事の更新に失敗しました。' }, { status: 400 });
  }
}


export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!post) {
      return NextResponse.json({ message: '記事が見つかりませんでした。' }, { status: 404 });
    }
    await prisma.post.delete({
      where: {
        id: post.id,
      },
    });
    return NextResponse.json({ message: '記事が削除されました。' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return NextResponse.json({ message: '記事の削除に失敗しました。' }, { status: 400 });
  }
}
