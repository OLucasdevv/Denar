import supabase from "../services/supabase"

const AuthMiddleware = async (req, res, next) => {

    const token = req.cookies.userToken

    if (!token) {
  return res.status(401).json({ error: "Não autorizado" })
}

const { data: { user }, error } = await supabase.auth.getUser(token);

    if(error) {
        return  res.status(400).json({error: error.message});
    }

next();
};
export default AuthMiddleware;