import jwt from "jwt-simple";

const generateToken = (user) => {
  const payload = {
    sub: user,
    iat: Date.now(),
    exp: Date.now() + 60 * 60 * 1000, // 1 hora
  };
  const token = jwt.encode(payload, "your-secret-key");
  return token;
};

export default generateToken;
