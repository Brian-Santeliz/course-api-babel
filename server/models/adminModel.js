import { Schema, model } from "mongoose";

const admin = new Schema({
  usuario: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  contraseña: {
    type: String,
    required: true,
    trim: true,
  },
});

export default model("Admin", admin);
