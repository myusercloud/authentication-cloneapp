import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/user.model.js";

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
