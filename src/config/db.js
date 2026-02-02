import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "hauth",
    password: "MypublicPass",
    port: 5433,
});

export default pool;