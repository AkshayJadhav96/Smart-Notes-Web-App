// import pkg from "pg";

// const { Pool } = pkg;

// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "",
//     password: "",
//     port: 5432
// })

// export default pool;

import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

export default pool;
