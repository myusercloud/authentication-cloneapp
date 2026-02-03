import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/user.model.js";
import db from "../config/db.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const existing = await findUserByEmail(email);
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await createUser(email, hashed);

    return res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ 
        success: false,
        message: "Email and password required" 
      });

    const result =await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    const user = result.rows[0];

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id : user.id,
        name: user.name,
        email: user.email,
      },
    });


    } catch (error) {
      console.error('Login Error:', error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });

  }
};
