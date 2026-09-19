import app from "../src/app.js";
import { initializeDatabase } from "../src/core/config/initializeDatabase.js";

let databaseReady;

export default async function handler(req, res) {
    try {
        databaseReady ??= initializeDatabase();
        await databaseReady;

        return app(req, res);
    } catch (error) {
        console.error("Database initialization failed:", error);

        return res.status(500).json({
            success: false,
            message: "Database initialization failed",
        });
    }
}
