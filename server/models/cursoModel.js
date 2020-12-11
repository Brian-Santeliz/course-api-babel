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
        required: true,
        type: String,
        trim: true,
      },
      termina: {
        required: true,
        type: String,
        trim: true,
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
});

export default model("Curso", curso);
