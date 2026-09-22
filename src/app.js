import express from "express";
import cors from "cors";
import apiRoutes from "./core/routes/index.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api", apiRoutes);

export default app; // PAALALA: Wag mag-app.listen() dito para sa Vercel serverless