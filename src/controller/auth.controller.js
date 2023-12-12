// crearemos una funcion que nos permitira procesar peticiones "Registrar y login"

import userModel from "../models/user.model.js"; //importamos el modelo delusuario
// import jwt from "jsonwebtoken"; //toekn pra los usuarios
import { crearAccesoToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";

// configuracion de la ruta de registrar
export const registrar = async (req, res) => {
  console.log(req.body); //son los datos que el cliente envie
  const { nombre, base, Nempleado } = req.body;

  const numeroERepetido = await userModel.findOne({ Nempleado });
  if (numeroERepetido)
    return res
      .status(400)
      .json(["El numero de empleado ya se encuestra registrado"]);
  try {
    //   instanciamos el objeto antes de guardarlo

    const nuevoUsuario = new userModel({
      nombre,
      base,
      Nempleado,
    });

    const dataFront = await nuevoUsuario.save(); //guarda los datos en la base de datos

    const token = await crearAccesoToken({ id: dataFront._id }); //pasamos los parametros que queremos guardar

    console.log(token);
    // res.cookie("token", token); //guardamos en una cookie

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
    });
    // res.json({
    //   message: "Usuario creado ",
    // });
    //manda un mensaje al front
    res.json({
      id: dataFront._id,
      nombre: dataFront.nombre,
      Nempleado: dataFront.Nempleado,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error); //muestra si existio un error al guardar
  }
};

// configuracion de la ruta de login
export const login = async (req, res) => {
  console.log(req.body); //son los datos que el cliente envie
  const { Nempleado } = req.body;

  try {
    // comprobamos que el usuario exista
    const nEconsulta = await userModel.findOne({ Nempleado });
    console.log(nEconsulta);

    // condicional para decir que no se encontro el usuario
    if (!nEconsulta) return res.status(400).json(["Usuario no encontrado"]);
    var acceso = false;
    // comparamos los numeros de empleados
    if (nEconsulta.Nempleado == Nempleado) {
      acceso = true;
      console.log("entro");
    }

    console.log(acceso);
    //verificamos el acceso si no es correcto mandamos mensaje
    if (!acceso)
      return res.status(400).json({ message: "Credenciales invalidaas" });

    const token = await crearAccesoToken({ id: nEconsulta._id }); //tomamos el id del usuario y creamos el token

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
    });
    // res.cookie("token", token); //guardamos en una cookie
    // res.json({
    //   message: "Usuario creado ",
    // });
    //manda un mensaje al front
    res.json({
      id: nEconsulta._id,
      nombre: nEconsulta.nombre,
      Nempleado: nEconsulta.Nempleado,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error); //muestra si existio un error al guardar
  }
};

//borrar el token
export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });

  return res.sendStatus(200);
};

//consultar calificasion
export const consultaCalifi = async (req, res) => {
  //buscamos al usuario en la base de datos
  const userEncontrado = await userModel.findById(req.user.id);

  if (!userEncontrado)
    return res.status(400).json({ message: "Usuario no encontrado" });

  // retornamos la info necesaria
  return res.json({
    id: userEncontrado.id,
    nombre: userEncontrado.nombre,
    base: userEncontrado.base,
  });
};

export const verificarToken = async (req, res) => {
  const { token } = req.cookies;
  console.log(token);

  if (!token) return res.status(401).json({ message: "no autorizado" });

  jwt.verify(token, "secret123", async (err, user) => {
    if (err) return res.status(401).json({ message: "No autorizado" });

    const usuarioEncontrado = await userModel.findById(user.id);
    if (!usuarioEncontrado)
      return res.status(401).json({ message: "No autorizado" });

    // respondemos si salio todo bien
    return res.json({
      id: usuarioEncontrado.id,
      nombre: usuarioEncontrado.nombre,
      Nempleado: usuarioEncontrado.Nempleado,
    });
  });
};
