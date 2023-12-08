// configuracion para conectar la base de datos
import mongoose from "mongoose";

export const conectarDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Pwd12angel:Sistemas12345@cluster0.jwtbqa7.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(">> DB Conectado ");
  } catch (error) {
    console.log(error);
  }
};
