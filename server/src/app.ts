import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { authRoutes } from "./routes/auth.routes.js";
import { tripRoutes } from "./routes/trip.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

export const app = express();

app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.send("OK");
});

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

app.use(errorMiddleware);
