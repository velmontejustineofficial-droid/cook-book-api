import express from "express";
import { notFound } from "./core/http/middleware/notFound.js";
import routes from "./core/routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use(notFound);

export default app;
