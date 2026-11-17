import { prisma } from '@/app/_libs/prisma';

export const getPost = async (id: string) => {
  try {
    return await prisma.post.findUnique({
      where: { id: Number(id) },
    });
  } catch {
    return null;
  }
};