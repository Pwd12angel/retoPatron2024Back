import jwt from "jsonwebtoken";

export function crearAccesoToken(datoAguardar) {
  return new Promise((resolve, reject) => {
    // configuracion del token
    jwt.sign(
      datoAguardar, //datos que se guardaran en el token
      "secret123",
      {
        expiresIn: "1d", //expira en 1 dia
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
