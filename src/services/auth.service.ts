import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { comparePassword, hashPassword } from "../utils/auth.utils";
import { prisma } from "../config/prisma";
import { HttpError } from "@/utils/http-error";

function resolveJwtExpiresIn(): SignOptions["expiresIn"] {
  const raw = process.env.JWT_EXPIRES_IN?.trim();

  if (!raw) {
    return "24h";
  }

  // jsonwebtoken treats numeric strings as milliseconds, so convert plain digits to number (seconds).
  if (/^\d+$/.test(raw)) {
    return Number(raw);
  }

  return raw as SignOptions["expiresIn"];
}

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new HttpError(401, "Invalid credentials");

  const isValid = await comparePassword(password, user.password);

  if (!isValid) throw new HttpError(401, "Invalid credentials");

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: resolveJwtExpiresIn(),
    },
  );

  // const token = jwt.sign(
  //   { userId: user.id },
  //   process.env.JWT_SECRET!,
  //   { expiresIn: process.env.JWT_EXPIRES_IN }
  // );

  return { token };
};

export const registerUser = async (data: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  currency?: "USD" | "EUR" | "MAD" | "GBP" | "CAD" | "AED";
}) => {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    throw new HttpError(409, "Email is already in use");
  }

  const hashedPassword = await hashPassword(data.password);

  return prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      imageUrl: data.imageUrl,
      currency: data.currency,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      imageUrl: true,
      currency: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
