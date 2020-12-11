import { Schema, model } from "mongoose";

const curso = new Schema({
  descripcion: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  profesor: {
    type: Schema.Types.ObjectId,
    ref: "Profesor",
  },
  fechas: [
    {
      empieza: {
        trim: true,
        required: true,
        type: String,
      },
      termina: {
        trim: true,
        required: true,
        type: String,
      },
    },
  ],
  definitivas: [
    {
      nota: {
        required: true,
        type: Number,
      },
      estudiante: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Estudiante",
      },
    },
  ],
  estudiantes: [
    {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Estudiante",
    },
  ],
  modificado: {
    type: String,
  },
});

export default model("Curso", curso);
