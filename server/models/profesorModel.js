import { Schema, model } from "mongoose";

const profesor = new Schema({
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
  grado: {
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

export default model("Profesor", profesor);
