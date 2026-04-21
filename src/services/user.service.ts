import { prisma } from "@/config/prisma";
import { hashPassword } from "@/utils/auth.utils";
import { HttpError } from "@/utils/http-error";

const userSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  imageUrl: true,
  currency: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as const;

export async function createUser(data: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  currency?: "USD" | "EUR" | "MAD" | "GBP" | "CAD" | "AED";
}) {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    throw new HttpError(409, "Email is already in use");
  }

  const password = await hashPassword(data.password);

  return prisma.user.create({
    data: {
      email: data.email,
      password,
      firstName: data.firstName,
      lastName: data.lastName,
      imageUrl: data.imageUrl,
      currency: data.currency,
    },
    select: userSelect,
  });
}

export function listUsers(userId: string) {
  return prisma.user.findMany({
    where: { id: userId },
    select: userSelect,
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return user;
}

export async function updateUserById(
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    currency?: "USD" | "EUR" | "MAD" | "GBP" | "CAD" | "AED";
    role?: "user" | "admin";
    password?: string;
  },
) {
  await getUserById(id);

  const updateData: {
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    currency?: "USD" | "EUR" | "MAD" | "GBP" | "CAD" | "AED";
    role?: "user" | "admin";
    password?: string;
  } = { ...data };

  if (data.password) {
    updateData.password = await hashPassword(data.password);
  }

  return prisma.user.update({
    where: { id },
    data: updateData,
    select: userSelect,
  });
}

export async function deleteUserById(id: string) {
  await getUserById(id);
  await prisma.user.delete({ where: { id } });
  return { success: true };
}
