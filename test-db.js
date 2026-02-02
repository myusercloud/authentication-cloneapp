import pool from "./src/config/db.js";

async function test() {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Database connection successful:', result.rows);
    } catch(err) {
        console.error('Database connection failed:', err);
    }
}

test();