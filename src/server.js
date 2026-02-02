import express from "express";
import authRouter from "./routes/auth.routes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/auth", authRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});