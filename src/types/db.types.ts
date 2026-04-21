import type { Prisma } from "@prisma/client";

export type Decimal = Prisma.Decimal;

export type Currency = "USD" | "EUR" | "MAD" | "GBP" | "CAD" | "AED";
export type UserRole = "user" | "admin";
export type TrackingPeriodType = "MONTHLY" | "WEEKLY" | "CUSTOM";
export type IncomeFrequency =
  | "once"
  | "weekly"
  | "bi_weekly"
  | "monthly"
  | "quarterly"
  | "yearly";

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  currency: Currency;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  isArchived: boolean;
  createdAt: Date;
}

export interface TrackingPeriod {
  id: string;
  userId: string;
  name: string;
  type: TrackingPeriodType;
  startDate: Date;
  endDate: Date;
  isClosed: boolean;
  createdAt: Date;
}

export interface Budget {
  id: string;
  trackingPeriodId: string;
  categoryId: string;
  maxAmount: Decimal;
  isRecurrent: boolean;
  createdAt: Date;
}

export interface Spending {
  id: string;
  budgetId: string;
  amount: Decimal;
  spendingDate: Date;
  note: string | null;
  createdAt: Date;
}

export interface Income {
  id: string;
  userId: string;
  name: string;
  type: string;
  amount: Decimal;
  frequency: IncomeFrequency;
  receivedAt: Date | null;
  notes: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserInput = Pick<User, "email" | "password"> &
  Partial<
    Pick<User, "firstName" | "lastName" | "imageUrl" | "currency" | "role">
  >;

export type UpdateUserInput = Partial<
  Pick<User, "firstName" | "lastName" | "imageUrl" | "currency" | "role">
>;

export type CreateCategoryInput = Pick<Category, "userId" | "name"> &
  Partial<Pick<Category, "description" | "icon" | "color">>;

export type UpdateCategoryInput = Partial<
  Pick<Category, "name" | "description" | "icon" | "color" | "isArchived">
>;

export type CreateTrackingPeriodInput = Pick<
  TrackingPeriod,
  "userId" | "name" | "type" | "startDate" | "endDate"
>;

export type UpdateTrackingPeriodInput = Partial<
  Pick<TrackingPeriod, "name" | "type" | "startDate" | "endDate" | "isClosed">
>;

export type CreateBudgetInput = Pick<
  Budget,
  "trackingPeriodId" | "categoryId" | "maxAmount"
> &
  Partial<Pick<Budget, "isRecurrent">>;

export type UpdateBudgetInput = Partial<
  Pick<Budget, "maxAmount" | "isRecurrent">
>;

export type CreateSpendingInput = Pick<
  Spending,
  "budgetId" | "amount" | "spendingDate"
> &
  Partial<Pick<Spending, "note">>;

export type UpdateSpendingInput = Partial<
  Pick<Spending, "amount" | "spendingDate" | "note">
>;

export type CreateIncomeInput = Pick<
  Income,
  "userId" | "name" | "type" | "amount" | "frequency"
> &
  Partial<Pick<Income, "receivedAt" | "notes" | "isActive">>;

export type UpdateIncomeInput = Partial<
  Pick<
    Income,
    | "name"
    | "type"
    | "amount"
    | "frequency"
    | "receivedAt"
    | "notes"
    | "isActive"
  >
>;
