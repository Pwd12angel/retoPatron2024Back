// englobara todas las rutas de autenticacion
//crearemos un enrutador
import { Router } from "express";
// traemos las 2 funciones login y registrar
import {
  login,
  registrar,
  logout,
  consultaCalifi,
  verificarToken,
} from "../controller/auth.controller.js";
import { autRequerida } from "../middlewares/validarToken.js";
const route = Router();

route.post("/registrar", registrar);
route.post("/login", login);
route.post("/logout", logout);

route.get("/verificar", verificarToken);

// validamos el el token antes de ir a la ruta
route.get("/calificacion/:id", autRequerida, consultaCalifi);

export default route; //para añadir a la app de express
