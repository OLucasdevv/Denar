import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import supabase from "./src/services/supabase.js";
import authRoutes from "./src/routes/auth.js";
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
app.set('trust proxy', 1);

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5, 
  message: { error: "Houveram muitas tentativas, tente novamente mais tarde." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());
app.use(express.json()); // primeiro
app.use("/auth", loginLimiter, authRoutes); // depois

app.get("/", async(req, res) => {
  const { data, error } = await supabase.from("transactions").select("*");

  if (error) {
    return res.status(500).json({error: error.message});
  }

  res.json ({message: "conexão com o supabase Pronta", data})
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});