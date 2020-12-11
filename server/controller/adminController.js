import adminModel from "../models/adminModel";
import { Functions } from "../utils/";
const methods = new Functions();
class Admin {
  async registrarAdmin(req, res) {
    const { usuario, contraseña } = req.body;
    if (!usuario || !contraseña) {
      return res.status(401).json("Usuario y contraseña son requridos");
    }
    try {
      const resul = await methods.encontrarAdmin(usuario);
      if (resul.length > 0) {
        return res
          .status(500)
          .json(`EL Admin con usuario ${usuario} encuentra registrado`);
      }
      const admin = new adminModel({
        usuario,
      });
      admin.contraseña = await methods.encryptarPassword(contraseña);
      await admin.save();
      res.status(201).json("Admin creado, inicia sesion para generar el token");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async iniciarAdmin(req, res) {
    const { usuario, contraseña } = req.body;
    if (!usuario || !contraseña) {
      return res.status(401).json("Usuario y contraseña son requridos");
    }
    try {
      const result = await methods.encontrarAdmin(usuario);
      if (result.length <= 0) {
        return res
          .status(401)
          .json(`El admin con usuario ${usuario} no esta registrado.`);
      }
      const contraseñaHash = result[0].contraseña;
      const idPayload = result[0].id;
      const response = await methods.compararPassword(
        contraseña,
        contraseñaHash
      );
      if (!response) {
        return res.status(401).json("La password no coinciden");
      }
      const llave = methods.loginCorrecto(idPayload);
      res
        .status(200)
        .json({ Admin: `Has iniciado sesión Admin ${usuario}`, llave });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async listarAdmin(req, res) {
    try {
      const resultado = await adminModel.find();
      if (resultado.length === 0) {
        return res.status(200).json("No hay administradores registrados");
      }
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
export default Admin;
