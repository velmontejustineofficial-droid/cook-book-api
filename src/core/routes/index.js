import { Router } from "express";
import pool from "../config/database.js";

import createRecipeRoute from "../../features/recipes/shared/route.js";
import getAllRecipeRoute from "../../features/recipes/shared/route.js";
import updateRecipeRoute from "../../features/recipes/shared/route.js";
import deleteRecipeRoute from "../../features/recipes/shared/route.js";

const router = Router();


router.use("/recipes", createRecipeRoute);
router.use("/recipes", getAllRecipeRoute);
router.use("/recipes", updateRecipeRoute);
router.use("/recipes", deleteRecipeRoute);

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