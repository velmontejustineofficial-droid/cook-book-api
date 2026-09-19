import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

console.log(
    "DATABASE_URL:",
    process.env.DATABASE_URL ? "LOADED" : "NOT LOADED"
);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

export default pool;