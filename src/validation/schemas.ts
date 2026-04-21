import { z } from "zod";

const cuidSchema = z.string().trim().min(1);
const hexColorSchema = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color");
const amountSchema = z.coerce.number().positive();
const dateSchema = z.coerce.date();

export const userRoleSchema = z.enum(["user", "admin"]);
export const currencySchema = z.enum([
  "USD",
  "EUR",
  "MAD",
  "GBP",
  "CAD",
  "AED",
]);
export const trackingPeriodTypeSchema = z.enum(["MONTHLY", "WEEKLY", "CUSTOM"]);
export const incomeFrequencySchema = z.enum([
  "once",
  "weekly",
  "bi_weekly",
  "monthly",
  "quarterly",
  "yearly",
]);

export const idParamSchema = z.object({
  id: cuidSchema,
});

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().trim().min(1).optional(),
  lastName: z.string().trim().min(1).optional(),
  imageUrl: z.url().optional(),
  currency: currencySchema.optional(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

export const createUserSchema = registerSchema;

export const updateUserSchema = z
  .object({
    firstName: z.string().trim().min(1).optional(),
    lastName: z.string().trim().min(1).optional(),
    imageUrl: z.url().optional(),
    currency: currencySchema.optional(),
    role: userRoleSchema.optional(),
    password: z.string().min(6).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  });

export const categoryListQuerySchema = z.object({
  includeArchived: z
    .enum(["true", "false"])
    .optional()
    .transform((val) => val === "true"),
  sortBy: z.enum(["createdAt", "name"]).optional().default("createdAt"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
});

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  description: z.string().trim().max(500).optional(),
  icon: z.string().trim().max(100).optional(),
  color: hexColorSchema.optional(),
});

export const updateCategorySchema = z
  .object({
    name: z.string().trim().min(1).max(100).optional(),
    description: z.string().trim().max(500).nullable().optional(),
    icon: z.string().trim().max(100).nullable().optional(),
    color: hexColorSchema.nullable().optional(),
    isArchived: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  });

export const createTrackingPeriodSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    type: trackingPeriodTypeSchema,
    startDate: dateSchema,
    endDate: dateSchema,
  })
  .refine((value) => value.endDate > value.startDate, {
    message: "endDate must be after startDate",
    path: ["endDate"],
  });

export const updateTrackingPeriodSchema = z
  .object({
    name: z.string().trim().min(1).max(100).optional(),
    type: trackingPeriodTypeSchema.optional(),
    startDate: dateSchema.optional(),
    endDate: dateSchema.optional(),
    isClosed: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  });

export const createBudgetSchema = z.object({
  trackingPeriodId: cuidSchema,
  categoryId: cuidSchema,
  maxAmount: amountSchema,
  isRecurrent: z.boolean().optional(),
});

export const updateBudgetSchema = z
  .object({
    maxAmount: amountSchema.optional(),
    isRecurrent: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  });

export const createSpendingSchema = z.object({
  budgetId: cuidSchema,
  amount: amountSchema,
  spendingDate: dateSchema,
  note: z.string().trim().max(1000).optional(),
});

export const updateSpendingSchema = z
  .object({
    amount: amountSchema.optional(),
    spendingDate: dateSchema.optional(),
    note: z.string().trim().max(1000).nullable().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  });

export const createIncomeSchema = z.object({
  name: z.string().trim().min(1).max(100),
  type: z.string().trim().min(1).max(50),
  amount: amountSchema,
  frequency: incomeFrequencySchema,
  receivedAt: dateSchema.optional(),
  notes: z.string().trim().max(1000).optional(),
  isActive: z.boolean().optional(),
});

export const updateIncomeSchema = z
  .object({
    name: z.string().trim().min(1).max(100).optional(),
    type: z.string().trim().min(1).max(50).optional(),
    amount: amountSchema.optional(),
    frequency: incomeFrequencySchema.optional(),
    receivedAt: dateSchema.nullable().optional(),
    notes: z.string().trim().max(1000).nullable().optional(),
    isActive: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  });
