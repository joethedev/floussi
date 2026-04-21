import { prisma } from "@/config/prisma";
import { HttpError } from "@/utils/http-error";

const trackingPeriodSelect = {
  id: true,
  userId: true,
  name: true,
  type: true,
  startDate: true,
  endDate: true,
  isClosed: true,
  createdAt: true,
} as const;

export function createTrackingPeriod(
  userId: string,
  data: {
    name: string;
    type: "MONTHLY" | "WEEKLY" | "CUSTOM";
    startDate: Date;
    endDate: Date;
  },
) {
  return prisma.trackingPeriod.create({
    data: {
      ...data,
      userId,
    },
    select: trackingPeriodSelect,
  });
}

export function listTrackingPeriods(userId: string) {
  return prisma.trackingPeriod.findMany({
    where: { userId },
    select: trackingPeriodSelect,
    orderBy: { createdAt: "desc" },
  });
}

export async function getTrackingPeriodById(userId: string, id: string) {
  const trackingPeriod = await prisma.trackingPeriod.findFirst({
    where: { id, userId },
    select: trackingPeriodSelect,
  });

  if (!trackingPeriod) {
    throw new HttpError(404, "Tracking period not found");
  }

  return trackingPeriod;
}

export async function updateTrackingPeriodById(
  userId: string,
  id: string,
  data: {
    name?: string;
    type?: "MONTHLY" | "WEEKLY" | "CUSTOM";
    startDate?: Date;
    endDate?: Date;
    isClosed?: boolean;
  },
) {
  await getTrackingPeriodById(userId, id);

  return prisma.trackingPeriod.update({
    where: { id },
    data,
    select: trackingPeriodSelect,
  });
}

export async function deleteTrackingPeriodById(userId: string, id: string) {
  await getTrackingPeriodById(userId, id);
  await prisma.trackingPeriod.delete({ where: { id } });
  return { success: true };
}
