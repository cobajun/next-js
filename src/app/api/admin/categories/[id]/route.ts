import { prisma } from '@/app/_libs/prisma';
import { NextRequest, NextResponse } from 'next/server'

export type AdminCategoryShowResponse = {
  category: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!category) {
      return NextResponse.json({ message: 'カテゴリーが見つかりませんでした。' }, { status: 404 });
    }
    return NextResponse.json<AdminCategoryShowResponse>({ category }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return NextResponse.json({ message: 'カテゴリーの取得に失敗しました。' }, { status: 400 });
  }
}


export type AdminUpdateCategoryRequest = {
  name: string;
};

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body: AdminUpdateCategoryRequest = await request.json();
    const { name } = body;
    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
    });
    
    return NextResponse.json({ id: category.id }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return NextResponse.json({ message: 'カテゴリーの更新に失敗しました。' }, { status: 400 });
  }
}


export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!category) {
      return NextResponse.json({ message: 'カテゴリーが見つかりませんでした。' }, { status: 404 });
    }
    await prisma.category.delete({
      where: {
        id: category.id,
      },
    });
    return NextResponse.json({ message: 'カテゴリーが削除されました。' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return NextResponse.json({ message: 'カテゴリーの削除に失敗しました。' }, { status: 400 });
  }
}
