import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../utils/auth.utils";
import { prisma } from "../config/prisma";

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("Invalid credentials");

  const isValid = await comparePassword(password, user.password);

  if (!isValid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: parseInt(process.env.JWT_EXPIRES_IN as string) },
  );

  // const token = jwt.sign(
  //   { userId: user.id },
  //   process.env.JWT_SECRET!,
  //   { expiresIn: process.env.JWT_EXPIRES_IN }
  // );

  return { token };
};

export const registerUser = async (email: string, password: string) => {
  if (!password) {
    throw new Error("Password is required");
  }

  const hashedPassword = await hashPassword(password);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
};
