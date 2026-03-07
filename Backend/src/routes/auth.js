import express from "express";
import supabase from "../services/supabase.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
        return res.status(400).json({error: error.message});
    }
    res.json({message: "usuário criado com sucesso! você já pode aproveitar o Denar.", user: data.user});
});

router.post("/login", async (req, res) => {
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
        return res.status(400).json({error: error.message});

    };
    res.json({message: "você foi deslogado!"})
})


export default router;