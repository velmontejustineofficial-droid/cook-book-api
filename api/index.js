import app from "../src/app.js";
import { initializeDatabase } from "../src/core/config/initializeDatabase.js";

export default async function handler(req, res) {
    await initializeDatabase();
    return app(req, res);
}
