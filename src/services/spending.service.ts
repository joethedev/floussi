import { prisma } from "@/config/prisma";
import { HttpError } from "@/utils/http-error";

const spendingSelect = {
  id: true,
  budgetId: true,
  amount: true,
  spendingDate: true,
  note: true,
  createdAt: true,
} as const;

async function assertUserOwnsBudget(userId: string, budgetId: string) {
  const budget = await prisma.budget.findFirst({
    where: {
      id: budgetId,
      trackingPeriod: { userId },
    },
  });

  if (!budget) {
    throw new HttpError(400, "Budget is invalid for this user");
  }
}

export async function createSpending(
  userId: string,
  data: {
    budgetId: string;
    amount: number;
    spendingDate: Date;
    note?: string;
  },
) {
  await assertUserOwnsBudget(userId, data.budgetId);

  return prisma.spending.create({
    data,
    select: spendingSelect,
  });
}

export function listSpendings(userId: string) {
  return prisma.spending.findMany({
    where: {
      budget: {
        trackingPeriod: { userId },
      },
    },
    select: spendingSelect,
    orderBy: { createdAt: "desc" },
  });
}

export async function getSpendingById(userId: string, id: string) {
  const spending = await prisma.spending.findFirst({
    where: {
      id,
      budget: {
        trackingPeriod: { userId },
      },
    },
    select: spendingSelect,
  });

  if (!spending) {
    throw new HttpError(404, "Spending not found");
  }

  return spending;
}

export async function updateSpendingById(
  userId: string,
  id: string,
  data: {
    amount?: number;
    spendingDate?: Date;
    note?: string | null;
  },
) {
  await getSpendingById(userId, id);

  return prisma.spending.update({
    where: { id },
    data,
    select: spendingSelect,
  });
}

export async function deleteSpendingById(userId: string, id: string) {
  await getSpendingById(userId, id);
  await prisma.spending.delete({ where: { id } });
  return { success: true };
}
