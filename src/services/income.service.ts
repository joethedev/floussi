import { prisma } from "@/config/prisma";
import { HttpError } from "@/utils/http-error";

const incomeSelect = {
  id: true,
  userId: true,
  name: true,
  type: true,
  amount: true,
  frequency: true,
  receivedAt: true,
  notes: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;

export function createIncome(
  userId: string,
  data: {
    name: string;
    type: string;
    amount: number;
    frequency:
      | "once"
      | "weekly"
      | "bi_weekly"
      | "monthly"
      | "quarterly"
      | "yearly";
    receivedAt?: Date;
    notes?: string;
    isActive?: boolean;
  },
) {
  return prisma.income.create({
    data: {
      userId,
      ...data,
    },
    select: incomeSelect,
  });
}

export function listIncomes(userId: string) {
  return prisma.income.findMany({
    where: { userId },
    select: incomeSelect,
    orderBy: { createdAt: "desc" },
  });
}

export async function getIncomeById(userId: string, id: string) {
  const income = await prisma.income.findFirst({
    where: { id, userId },
    select: incomeSelect,
  });

  if (!income) {
    throw new HttpError(404, "Income not found");
  }

  return income;
}

export async function updateIncomeById(
  userId: string,
  id: string,
  data: {
    name?: string;
    type?: string;
    amount?: number;
    frequency?:
      | "once"
      | "weekly"
      | "bi_weekly"
      | "monthly"
      | "quarterly"
      | "yearly";
    receivedAt?: Date | null;
    notes?: string | null;
    isActive?: boolean;
  },
) {
  await getIncomeById(userId, id);

  return prisma.income.update({
    where: { id },
    data,
    select: incomeSelect,
  });
}

export async function deleteIncomeById(userId: string, id: string) {
  await getIncomeById(userId, id);
  await prisma.income.delete({ where: { id } });
  return { success: true };
}
