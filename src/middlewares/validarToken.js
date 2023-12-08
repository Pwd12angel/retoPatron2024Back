import jwt from "jsonwebtoken";

export const autRequerida = (req, res, next) => {
  //extraemos el token
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Acceso denegado" });

  //   validamos la palabra de verificasion
  jwt.verify(token, "secret123", (err, user) => {
    if (err) return res.status(401).json({ message: "token invalido" });

    // guardamos todos los datos del usuario en requser para todas las rutas
    req.user = user;

    console.log(user);
    next();
  });
};
