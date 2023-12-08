import { Router } from "express";
import { autRequerida } from "../middlewares/validarToken.js";
import {
  getPreguntasC,
  getPreguntasM,
  postCalificacionM,
  postCalificacionesUser,
  putCalificacionesUserUpdate,
  consultaMobileye,
  consultaCipia,
} from "../controller/operaciones.js";

const router = Router();

router.get("/preguntasM", autRequerida, getPreguntasM);
router.get("/preguntasC", autRequerida, getPreguntasC);

router.get("/respuestas", autRequerida, (req, res) => res.send("preguntas"));

router.get("/calificaciones", autRequerida, postCalificacionesUser);
router.post("/newCalificacion", autRequerida, postCalificacionM);
router.put(
  "/updateCalificacion/:id",
  autRequerida,
  putCalificacionesUserUpdate
);

// consultar si existe una calificacion mobileye
router.get("/calificacionesMobileye", autRequerida, consultaMobileye);

// consultar si existe una calificacion cipia
router.get("/calificacionesCipia", autRequerida, consultaCipia);

export default router;
