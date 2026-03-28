import express, { json } from "express";
import supabase from "../services/supabase.js";
import loginLimiter from "../middlewares/loginLimiter.js";

const router = express.Router();

router.post("/register", loginLimiter, async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
        return res.status(400).json({error: error.message});
    }
    
    if (data.user?.identities?.length === 0) {
    return res.status(400).json({ message: "Este email já está cadastrado." });
  }

    res.json({message: "usuário criado com sucesso! você já pode aproveitar o Denar.", user: data.user});
});

router.post("/onboarding", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  const { userName, userIncome } = req.body;

  const { data, error } = await supabase.from("accounts").insert({
    user_id: user.id,
    name: userName,
    income: userIncome
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: "Onboarding concluído!" });
});

router.post("/login", loginLimiter, async (req, res) => {
    const { email, password } = req.body;

    const {data, error} = await supabase.auth.signInWithPassword({email, password});

    if (error) {
        return res.status(400).json({error: error.message});
    }
    res.json({token: data.session.access_token, user: data.user});
});

router.post("/logout", async(req, res) => {
    const { error } = await supabase.auth.signOut()

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  res.clearCookie("userToken")
  res.json({ message: "você foi deslogado!" })
});


router.get("/verify", async(req, res) => {
  const token = req.cookies.userToken

  if(!token) {
    return res.status(401).json({ error: "Não autorizado" })
  }
  const { data: { user }, error } = await supabase.auth.getUser(token);

    if(error) {
        return  res.status(400).json({error: error.message});
    }

    res.json({message: "Token válido!"})
})

router.post("/session", async (req, res) => {
    const {token} = req.body;
    res.cookie("userToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax"
    })

    res.json({message: "token salvo com sucesso!"})
})


export default router;