import { prisma } from "@/config/prisma";
import { HttpError } from "@/utils/http-error";

const categorySelect = {
  id: true,
  userId: true,
  name: true,
  description: true,
  icon: true,
  color: true,
  isArchived: true,
  createdAt: true,
} as const;

export async function createCategory({
  name,
  description,
  icon,
  color,
  userId,
}: {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  userId: string;
}) {
  const existing = await prisma.category.findFirst({
    where: { name, userId },
  });

  if (existing) throw new HttpError(409, "Category already exists");

  return prisma.category.create({
    data: { name, description, icon, color, userId },
    select: categorySelect,
  });
}

export async function listCategories({
  userId,
  includeArchived = false,
  sortBy = "createdAt",
  order = "desc",
}: {
  userId: string;
  includeArchived?: boolean;
  sortBy?: "createdAt" | "name";
  order?: "asc" | "desc";
}) {
  return prisma.category.findMany({
    where: {
      userId,
      ...(includeArchived ? {} : { isArchived: false }),
    },
    select: categorySelect,
    orderBy: {
      [sortBy]: order,
    },
  });
}

export async function getCategoryById(userId: string, id: string) {
  const category = await prisma.category.findFirst({
    where: { id, userId },
    select: categorySelect,
  });

  if (!category) {
    throw new HttpError(404, "Category not found");
  }

  return category;
}

export async function updateCategoryById(
  userId: string,
  id: string,
  data: {
    name?: string;
    description?: string | null;
    icon?: string | null;
    color?: string | null;
    isArchived?: boolean;
  },
) {
  await getCategoryById(userId, id);

  return prisma.category.update({
    where: { id },
    data,
    select: categorySelect,
  });
}

export async function deleteCategoryById(userId: string, id: string) {
  await getCategoryById(userId, id);

  await prisma.category.delete({ where: { id } });

  return { success: true };
}
