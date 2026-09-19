import { env } from "./src/core/config/env.js";
import app from "./src/app.js";

app.listen(env.port, () => {
    console.log(`CookBook API running on port ${env.port}`);
});

export default app;