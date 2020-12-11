import { Schema, model } from "mongoose";

const estudiante = new Schema({
  nombre: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  cedula: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

export default model("Estudiante", estudiante);
