import express from "express";
import morgan from "morgan";
import "./database/";
import routerAdmin from "./router/adminRouter";
import routerProfesor from "./router/profesorRouter";
import routerEstudiante from "./router/estudianteRouter";
import routerCurso from "./router/cursoRouter";
import { Middleware } from "./middlewares/tokenMiddleware";
const app = express();

app.set("puertoServer", process.env.SERVER_PUERTO);
app.use(morgan("dev"));
app.use(express.json());
const middleware = new Middleware();
app.use("/admin", routerAdmin);
app.use("/profesor", middleware.token, routerProfesor);
app.use("/estudiante", middleware.token, routerEstudiante);
app.use("/curso", middleware.token, routerCurso);
app.listen(app.get("puertoServer"), function () {
  console.log(`Servidor en el puerto: ${app.get("puertoServer")}`);
});
