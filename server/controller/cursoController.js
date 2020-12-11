import cursoModel from "../models/cursoModel";
import { Functions } from "../utils/";
const methods = new Functions();
class Curso {
  async agregarCurso(req, res) {
    const {
      descripcion,
      fechas,
      estudiantes,
      definitivas,
      profesor,
    } = req.body;
    if (!descripcion || !fechas || !estudiantes || !definitivas || !profesor) {
      return res.status(400).json("Todos los datos son necesarios");
    }
    try {
      const response = await methods.encontrarCurso(descripcion);
      if (response.length > 0) {
        return res
          .status(500)
          .json(
            `El curso con despcrion ${descripcion} se encuentra registrado`
          );
      }
      const curso = new cursoModel({
        descripcion,
        fechas,
        definitivas,
        profesor,
      });
      curso.profesor = await methods.buscarProfesoresCurso(profesor);
      const estudianteId = await methods.buscarEstudiantesCurso(estudiantes);
      curso.estudiantes = estudianteId;
      curso.definitivas = methods.definitivasEstudiante(
        definitivas,
        estudiantes,
        estudianteId
      );
      await curso.save();
      res.status(201).json({ mensaje: "Curso creado correctamente", curso });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  async listarCurso(req, res) {
    try {
      const response = await cursoModel
        .find()
        .populate("profesor")
        .populate("estudiantes")
        .populate("definitivas.estudiante")
        .exec();
      if (response.length === 0) {
        return res.status(200).json("No existen cursos");
      }
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async listatUnicoCurso(req, res) {
    const { _id } = req.params;
    try {
      const curso = await cursoModel
        .findById({ _id })
        .populate("profesor")
        .populate("estudiantes")
        .populate("definitivas.estudiante");
      if (!curso) {
        return res.status(400).json("Este curso no existe");
      }
      res.status(200).json(curso);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async eliminarCurso(req, res) {
    const { _id } = req.params;
    try {
      const cursoElimiando = await cursoModel.findByIdAndDelete({ _id });
      if (!cursoElimiando) {
        return res
          .status(400)
          .json("Este curso no existe, no pudo ser eliminado");
      }
      res.status(200).json("Curso eliminado de la base de datos");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
export default Curso;
