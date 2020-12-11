import { Router } from "express";
import Admin from "../controller/adminController";
const ctrl = new Admin();
const router = Router();

router.post("/registrar", ctrl.registrarAdmin);
router.post("/iniciar", ctrl.iniciarAdmin);
router.get("/registro", ctrl.listarAdmin);

export default router;
