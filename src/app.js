import express from "express";
import cors from "cors";
import apiRoutes from "./core/routes/index.js";

const app = express();

// 1. CORS Configuration
const corsOptions = {
  origin: "*", // O pwede mong ilagay ang exact origin kung kailangan
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  credentials: true,
  optionsSuccessStatus: 200 // Ilang lumang browsers/tools ang nagha-hang sa 204
};

// 2. UNANG ILAGAY ANG CORS (Bago ang express.json() o routes)
app.use(cors(corsOptions));

// 3. Catch-all handler para sa Lahat ng OPTIONS / Preflight requests
app.options("*", cors(corsOptions));

app.use(express.json());
app.use("/api", apiRoutes);

export default app;