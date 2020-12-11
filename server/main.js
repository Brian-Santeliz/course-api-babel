import express from "express";
import morgan from "morgan";
import "./database/";
import routerAdmin from "./router/adminRouter";
import routerProfesor from "./router/profesorRouter";
import routerEstudiante from "./router/estudianteRouter";
import routerCurso from "./router/cursoRouter";
const app = express();

app.set("puertoServer", process.env.SERVER_PUERTO);
app.use(morgan("dev"));
app.use(express.json());

app.use("/admin", routerAdmin);
app.use("/profesor", routerProfesor);
app.use("/estudiante", routerEstudiante);
app.use("/curso", routerCurso);
app.listen(app.get("puertoServer"), function () {
  console.log(`Servidor en el puerto: ${app.get("puertoServer")}`);
});
