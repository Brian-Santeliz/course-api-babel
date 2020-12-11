import { Router } from "express";
import profesorController from "../controller/profesorController";
const ctrl = new profesorController();
const router = Router();

router.get("/", ctrl.listarProfesor);
router.get("/:_id", ctrl.listatUnicoProfesor);
router.post("/", ctrl.agregarProfesor);
router.put("/:_id", ctrl.actualizarProfesor);
router.delete("/:_id", ctrl.eliminarProfesor);
export default router;
