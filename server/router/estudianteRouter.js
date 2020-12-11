import { Router } from "express";
import Estudiante from "../controller/estudianteController";
const router = Router();
const ctrl = new Estudiante();

router.get("/", ctrl.listarEstudiante);
router.post("/", ctrl.agregarEstudiante);
router.get("/:_id", ctrl.listatUnicoEstudiante);
router.delete("/:_id", ctrl.eliminarEstudiante);
router.put("/:_id", ctrl.actualizarEstudiante);

export default router;
