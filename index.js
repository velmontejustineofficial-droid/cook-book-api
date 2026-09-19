import express from "express";
import { env } from "./core/config/env.js";
import routes from "./core/routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(env.port, () => {
    console.log(`CookBook API running on port ${env.port}`);
});

export default app;