import jwt from "jsonwebtoken";
const JWT_SECRETO = process.env.JWT_SECRET;

export const verificarToken = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRETO);
    req.user = decoded; // agrega info del usuario a la request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
