import pg from "pg";
import { env } from "../config/env.js";

const { Pool } = pg;

console.log(
    "DATABASE_URL loaded:",
    Boolean(env.databaseUrl)
);

const pool = new Pool({
    connectionString: env.databaseUrl,

    ssl: {
        rejectUnauthorized: false,
    },
});

export default pool;