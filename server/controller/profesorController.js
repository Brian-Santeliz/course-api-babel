import profesorModel from "../models/profesorModel";
import { Functions } from "../utils/";
const methods = new Functions();
class Profesor {
  async agregarProfesor(req, res) {
    const { nombre, cedula, apellido, grado } = req.body;
    if (!nombre || !cedula || !apellido || !grado) {
      return res.status(400).json("Todos los datos son necesarios");
    }
    try {
      const response = await methods.encontrarProfesor(cedula);
      if (response.length > 0) {
        return res
          .status(500)
          .json(`El profesor con cedula ${cedula} se encuentra registrado`);
      }
      const profesor = new profesorModel({
        nombre,
        cedula,
        apellido,
        grado,
      });
      await profesor.save();
      res.status(201).json("Profesor Agregado correctamente");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async listarProfesor(req, res) {
    try {
      const profesores = await profesorModel.find();
      if (profesores.length > 0) {
        res.status(200).json(profesores);
      } else {
        res
          .status(200)
          .json(
            "Profesores no registrados. Empieza agregando en /profesor POST"
          );
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async eliminarProfesor(req, res) {
    const { _id } = req.params;
    try {
      const comprobarEliminado = await profesorModel.findByIdAndRemove({
        _id,
      });
      if (comprobarEliminado) {
        res.status(200).json("Profesor Eliminado correctamente");
      } else {
        res
          .status(400)
          .json("El Profesor no se pudo eliminar, verifica el ID ");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async listatUnicoProfesor(req, res) {
    const { _id } = req.params;
    try {
      const profesor = await profesorModel.findById({ _id });
      if (!profesor) {
        res.status(400).json("Este profesor no se encuentra");
      } else {
        res.status(200).json(profesor);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async actualizarProfesor(req, res) {
    const { _id } = req.params;
    const { nombre, cedula, apellido, grado } = req.body;
    if (!nombre || !cedula || !apellido || !grado) {
      return res.status(400).json("Todos los datos son necesarios");
    }
    try {
      const response = await profesorModel.findByIdAndUpdate(
        { _id },
        { nombre, cedula, apellido, grado }
      );
      if (!response) {
        return res.status(400).json("No se pudo actualizar, verifica el ID");
      }
      res.status(200).json("Profesor Actualizado");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
export default Profesor;
