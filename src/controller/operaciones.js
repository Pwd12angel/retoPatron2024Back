import caliModel from "../models/calificaciones.js";
import cuestModel from "../models/cuestionario.js";

// funcion para trae [reguntas]
export const getPreguntasM = async (req, res) => {
  const preguntas = await cuestModel.find();
  res.json(preguntas);
};

export const getPreguntasC = async (req, res) => {};

// ruta para insertar calificaciones por usuario
export const postCalificacionM = async (req, res) => {
  // console.log(req.body);
  const { titulo, calificacion, intento, date } = req.body;

  const newCalificacion = new caliModel({
    titulo,
    calificacion,
    intento,
    date,
    user: req.user.id,
  });

  console.log(newCalificacion);
  const guardarCali = await newCalificacion.save();
  res.json(guardarCali);
};

// consulta las calificaciones por usuario
export const postCalificacionesUser = async (req, res) => {
  const usuarioCalificacion = await caliModel.find({
    user: req.user.id,
  });

  res.json(usuarioCalificacion);
};

// consultar calificaciones mobilye si existe
export const consultaMobileye = async (req, res) => {
  try {
    const respuesta = (req.body.titulo = "Mobileye");

    const calificacionUsuarioMobileye = await caliModel.find({
      user: req.user.id,
      titulo: respuesta,
    });

    console.log(calificacionUsuarioMobileye.length);
    if (calificacionUsuarioMobileye.length === 0) {
      return res.send("No encontrado");
    }
    console.log("objeto mobileye " + calificacionUsuarioMobileye);
    res.json(calificacionUsuarioMobileye);
  } catch (error) {
    console.error(error);
  }
};

// consultar calificaciones Cipia si existe
export const consultaCipia = async (req, res) => {
  try {
    const respuesta = (req.body.titulo = "Cipia");
    const calificacionUsuarioCipia = await caliModel.find({
      user: req.user.id,
      titulo: respuesta,
    });

    if (calificacionUsuarioCipia.length === 0) {
      return res.send("No encontrado");
    }
    res.json(calificacionUsuarioCipia);
  } catch (error) {
    res.send(error);
  }
};

// Actualizar calificacion
export const putCalificacionesUserUpdate = async (req, res) => {
  try {
    // console.log(req.query.id);
    console.log(req.params.id);
    console.log(req.body.calificacion);
    const usuarioCalificacionUpdate = await caliModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!usuarioCalificacionUpdate)
      return res
        .status(400)
        .json({ message: "Registro de calificacion no encontrado" });
    console.log(usuarioCalificacionUpdate);
    res.json(usuarioCalificacionUpdate);
  } catch (error) {
    console.error(error);
  }
};
