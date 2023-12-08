import mongoose from "mongoose";

const modeloCali = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    calificacion: {
      type: Number,
      required: true,
    },
    intento: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuarios",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("calificacion", modeloCali);
