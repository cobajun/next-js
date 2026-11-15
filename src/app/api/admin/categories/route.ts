import { prisma } from '@/app/_libs/prisma';
import {  NextRequest, NextResponse } from 'next/server'

export type AdminCategoriesIndexResponse = {
  categories: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[]
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
    return NextResponse.json<AdminCategoriesIndexResponse>({ categories }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return NextResponse.json({ message: 'カテゴリーの取得に失敗しました。' }, { status: 400 });
  }
}

export type AdminCreateCategoryRequest = {
  name: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: AdminCreateCategoryRequest = await request.json();
    const { name } = body;
    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    return NextResponse.json({ id: category.id }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return NextResponse.json({ message: 'カテゴリーの作成に失敗しました。' }, { status: 400 });
  }
}