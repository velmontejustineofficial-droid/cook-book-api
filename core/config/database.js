// pg may not ship type declarations in the current dependency setup.
// @ts-expect-error -- runtime dependency is provided by the application environment.
import pg from "pg";
import { env } from "./env.js";

const { Pool } = pg;

const pool = new Pool({
    connectionString: env.databaseUrl,

    ssl: {
        rejectUnauthorized: false,
    },
});

export default pool;