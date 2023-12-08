import mongoose from "mongoose";

// especificamos que guardaremos
const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true, //limpia los espacios para que no los guarde
    },
    base: {
      type: String,
      required: true,
      trim: true, //limpia los espacios para que no los guarde
    },
    Nempleado: {
      type: String, //tipo de dato
      required: true, // es obligatorio
      trim: true, //limpia los espacios para que no los guarde
      unique: true, //es unico
    },
  },
  {
    timestamps: true, //muestra la fecha en la que se creo
  }
);

export default mongoose.model("Usuarios", userSchema); //interactuamos con la base de datos
