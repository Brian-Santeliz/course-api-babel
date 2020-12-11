import { Router } from "express";
import Curso from "../controller/cursoController";
const router = Router();
const ctrl = new Curso();

router.post("/", ctrl.agregarCurso);
router.get("/", ctrl.listarCurso);
router.get("/:_id", ctrl.listatUnicoCurso);
router.delete("/:_id", ctrl.eliminarCurso);
router.put("/:_id", ctrl.actualizarCurso);

export default router;
