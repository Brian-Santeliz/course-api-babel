import { Router } from "express";
const router = Router();
import Curso from "../controller/cursoController";
const ctrl = new Curso();
router.post("/", ctrl.agregarCurso);
router.get("/", ctrl.listarCurso);
router.get("/:_id", ctrl.listatUnicoCurso);
router.delete("/:_id", ctrl.eliminarCurso);
// router.put("/:_id", ctrl.actualizarEstudiante);

export default router;
