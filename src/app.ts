import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import trackingPeriodRoutes from "./routes/tracking-period.routes";
import budgetRoutes from "./routes/budget.routes";
import spendingRoutes from "./routes/spending.routes";
import incomeRoutes from "./routes/income.routes";
import userRoutes from "./routes/user.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

// CORS configuration to allow Authorization header
app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tracking-periods", trackingPeriodRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/spendings", spendingRoutes);
app.use("/api/incomes", incomeRoutes);

app.use(errorMiddleware);

export default app;
