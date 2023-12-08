import mongoose from "mongoose";

const modeloCuestionario = new mongoose.Schema({
  pregunta: {
    type: String,
  },
  opciones: {
    type: Array,
  },
});

export default mongoose.model("cuestionario", modeloCuestionario);
