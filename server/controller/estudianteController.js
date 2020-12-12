import estudianteModel from "../models/estudianteModel";
import { Functions } from "../utils/";
const methods = new Functions();
class Estudiante {
  async agregarEstudiante(req, res) {
    const { nombre, cedula, apellido } = req.body;
    if (!nombre || !cedula || !apellido) {
      return res.status(400).json("Todos los datos son necesarios");
    }
    try {
      const response = await methods.encontrarEstudiante(cedula);
      if (response.length > 0) {
        return res
          .status(500)
          .json(`El estudiante con cedula ${cedula} se encuentra registrado`);
      }
      const estudiante = new estudianteModel({
        nombre,
        cedula,
        apellido,
      });
      await estudiante.save();
      res.status(201).json("Estudiante Agregado correctamente");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async listarEstudiante(req, res) {
    try {
      const estudiantes = await estudianteModel.find();
      if (estudiantes.length > 0) {
        res.status(200).json(estudiantes);
      } else {
        res
          .status(200)
          .json(
            "Estudiantes no registrados. Empieza agregando en /estudiante POST"
          );
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async eliminarEstudiante(req, res) {
    const { _id } = req.params;
    try {
      const comprobarEliminado = await estudianteModel.findByIdAndRemove({
        _id,
      });
      if (comprobarEliminado) {
        res.status(200).json("Estudiante Eliminado correctamente");
      } else {
        res
          .status(400)
          .json("El Estudiante no se pudo eliminar, verifica el ID ");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async listatUnicoEstudiante(req, res) {
    const { _id } = req.params;
    try {
      const estudiante = await estudianteModel.findById({ _id });
      if (!estudiante) {
        res.status(400).json("Este estudiante no se encuentra, verifica el ID");
      } else {
        res.status(200).json(estudiante);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async actualizarEstudiante(req, res) {
    const { _id } = req.params;
    const { nombre, cedula, apellido } = req.body;
    if (!nombre || !cedula || !apellido) {
      return res.status(400).json("Todos los datos son necesarios");
    }
    try {
      const response = await estudianteModel.findByIdAndUpdate(
        { _id },
        { nombre, cedula, apellido }
      );
      if (!response) {
        return res.status(400).json("No se pudo actualizar, verifica el ID");
      }
      res.status(200).json("Estudiante Actualizado");
    } catch (error) {
      if (error.codeName === "DuplicateKey") {
        return res
          .status(500)
          .json(
            `Este intentando actualizar el estudiante con cedula: ${cedula}, que ya existe.`
          );
      }
      res.status(500).json(error);
    }
  }
}
export default Estudiante;
