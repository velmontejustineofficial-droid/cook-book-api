import app from "./core/app.js";
import { env } from "./core/config/env.js";

app.listen(env.port, () => {
    console.log(`CookBook API running on port ${env.port}`);
});