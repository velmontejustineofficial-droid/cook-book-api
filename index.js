import { env } from "./src/core/config/env.js";
import { initializeDatabase } from "./src/core/config/initializeDatabase.js";
import app from "./src/app.js";

// await initializeDatabase();

app.listen(env.port, () => {
    console.log(`CookBook API running on port ${env.port}`);
});

export default app;