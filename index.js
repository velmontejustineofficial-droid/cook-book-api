import express from "express";
import { env } from "./src/core/config/env.js";
import { notFound } from "./src/core/http/middleware/notFound.js";
import routes from "./src/core/routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use(notFound);

app.listen(env.port, () => {
    console.log(`CookBook API running on port ${env.port}`);
});

export default app;