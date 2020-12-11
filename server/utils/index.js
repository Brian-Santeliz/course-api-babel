import bcrypt from "bcrypt";
import adminModel from "../models/adminModel";
import profesorModel from "../models/profesorModel";
import estudianteModel from "../models/estudianteModel";
import cursoModel from "../models/cursoModel";
import jwt from "jsonwebtoken";

export class Functions {
  async encontrarAdmin(usuario) {
    try {
      const resultado = await adminModel.find({ usuario });
      return resultado;
    } catch (error) {
      throw new Error("Error Encontrando el usuario", error);
    }
  }
  async encryptarPassword(password) {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error("Error Hasheando la contraseña", error);
    }
  }
  async compararPassword(password, passwordHash) {
    try {
      return await bcrypt.compare(password, passwordHash);
    } catch (error) {
      throw new Error("Error Hasheando la contraseña", error);
    }
  }

  loginCorrecto(payload) {
    const secret = process.env.JWT_SECRET;
    try {
      return jwt.sign({ payload }, secret, {
        expiresIn: 60 * 60 * 24,
      });
    } catch (error) {
      throw new Error("Error creando el token", error);
    }
  }
  async encontrarProfesor(cedula) {
    try {
      return await profesorModel.find({ cedula });
    } catch (error) {
      throw new Error("Error Encontrando el profesor", error);
    }
  }
  async encontrarEstudiante(cedula) {
    try {
      return await estudianteModel.find({ cedula });
    } catch (error) {
      throw new Error("Error Encontrando el estudiante", error);
    }
  }
  async encontrarCurso(descripcion) {
    try {
      return await cursoModel.find({ descripcion });
    } catch (error) {
      throw new Error("Error Encontrando el curso", error);
    }
  }
  async buscarProfesoresCurso(cedulaProfesor) {
    try {
      const [profesorId] = await profesorModel.find({ cedula: cedulaProfesor });
      const { _id } = profesorId;
      return _id;
    } catch (error) {
      throw new Error("Error Buscando el profesor para el curso", error);
    }
  }
  async buscarEstudiantesCurso(cedulaEstudiantes) {
    try {
      const estudiantesId = [];
      const estudianteRegistrados = await estudianteModel.find({
        cedula: cedulaEstudiantes,
      });
      for (let i = 0; i < estudianteRegistrados.length; i++) {
        estudiantesId.push(estudianteRegistrados[i]._id);
      }
      return estudiantesId;
    } catch (error) {
      throw new Error("Error Buscando los estudiantes para el curso", error);
    }
  }
  definitivasEstudiante(
    definitivasArray,
    estudiantesArray,
    estudiantesIdArray
  ) {
    return definitivasArray.filter((definitiva, i) =>
      definitiva.estudiante == estudiantesArray[i]
        ? (definitiva.estudiante = estudiantesIdArray[i])
        : definitiva
    );
  }
  async buscarAdminModificado(_id) {
    try {
      const { usuario } = await adminModel.findById(_id);
      return usuario;
    } catch (error) {
      throw new Error("Error Buscando el admin que modifica los cursos", error);
    }
  }
}
