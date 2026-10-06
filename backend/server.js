import cors from "cors";
import express from "express";
import { dashboardData } from "./data.js";

const app = express();
const port = Number(process.env.PORT) || 3001;
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
}));

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/api/dashboard", (_request, response) => {
  response.json(dashboardData);
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: "Internal server error" });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Sales dashboard API listening on port ${port}`);
});
