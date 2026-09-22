import { env } from "./src/core/config/env.js";
import app from "./src/app.js";
import { initializeDatabase } from "./src/core/config/databaseInitializer.js";

initializeDatabase()
    .then(() => {
        app.listen(env.port, () => {
            console.log(`CookBook API running on port http://localhost:${env.port}`);
        });
    })
    .catch((error) => {
        console.error("Database initialization failed:", error.message);
        process.exit(1);
    });

export default app;