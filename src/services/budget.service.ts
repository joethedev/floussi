import { prisma } from "@/config/prisma";
import { HttpError } from "@/utils/http-error";

const budgetSelect = {
  id: true,
  trackingPeriodId: true,
  categoryId: true,
  maxAmount: true,
  isRecurrent: true,
  createdAt: true,
} as const;

async function assertUserOwnsRelatedData(
  userId: string,
  trackingPeriodId: string,
  categoryId: string,
) {
  const [trackingPeriod, category] = await Promise.all([
    prisma.trackingPeriod.findFirst({
      where: { id: trackingPeriodId, userId },
    }),
    prisma.category.findFirst({ where: { id: categoryId, userId } }),
  ]);

  if (!trackingPeriod || !category) {
    throw new HttpError(
      400,
      "Tracking period or category is invalid for this user",
    );
  }
}

export async function createBudget(
  userId: string,
  data: {
    trackingPeriodId: string;
    categoryId: string;
    maxAmount: number;
    isRecurrent?: boolean;
  },
) {
  await assertUserOwnsRelatedData(
    userId,
    data.trackingPeriodId,
    data.categoryId,
  );

  return prisma.budget.create({
    data,
    select: budgetSelect,
  });
}

export function listBudgets(userId: string) {
  return prisma.budget.findMany({
    where: {
      trackingPeriod: { userId },
    },
    select: budgetSelect,
    orderBy: { createdAt: "desc" },
  });
}

export async function getBudgetById(userId: string, id: string) {
  const budget = await prisma.budget.findFirst({
    where: {
      id,
      trackingPeriod: { userId },
    },
    select: budgetSelect,
  });

  if (!budget) {
    throw new HttpError(404, "Budget not found");
  }

  return budget;
}

export async function updateBudgetById(
  userId: string,
  id: string,
  data: {
    maxAmount?: number;
    isRecurrent?: boolean;
  },
) {
  await getBudgetById(userId, id);

  return prisma.budget.update({
    where: { id },
    data,
    select: budgetSelect,
  });
}

export async function deleteBudgetById(userId: string, id: string) {
  await getBudgetById(userId, id);
  await prisma.budget.delete({ where: { id } });
  return { success: true };
}
