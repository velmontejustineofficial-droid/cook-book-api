import { Router } from "express";
import pool from "../config/database.js";

import createRecipeRoute from "../../features/recipes/create-recipe/route.js";

const router = Router();


router.use("/recipes", createRecipeRoute);

/*
|--------------------------------------------------------------------------
| Health
|--------------------------------------------------------------------------
*/

router.get("/health", (req, res) => {
    res.json({
        status: "ok",
        message: "CookBook API is running",
    });
});

/*
|--------------------------------------------------------------------------
| Database Health
|--------------------------------------------------------------------------
*/

router.get(
    "/health/db",
    async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW() AS time");

        res.json({
            status: "ok",
            database: "connected",
            time: result.rows[0].time,
        });
    } catch (error) {
        console.error("DATABASE ERROR:");
        console.error(error);

        res.status(500).json({
            status: "error",
            database: "disconnected",
            message: error.message,
        });
        }
    },
);

export default router;