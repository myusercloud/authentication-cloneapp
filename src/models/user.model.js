import pool from "../config/db.js";


// Create new user
export const createUser = async (email, hashedPassword) => {
  const query = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id, email, created_at
  `;
  const { rows } = await pool.query(query, [email, hashedPassword]);
  return rows[0];
};


// Find user by email
export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};
