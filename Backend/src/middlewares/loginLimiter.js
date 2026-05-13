import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: { error: "Muitas tentativas, tente novamente mais tarde." },
  standardHeaders: true,
  legacyHeaders: false,
});

export default loginLimiter;