import jwt from "jsonwebtoken";
export class Middleware {
  token(req, res, next) {
    const llave = req.header("x-access-key");
    if (!llave) {
      return res
        .status(401)
        .json("Necesita una llave de accesso administrador para ingresar");
    }
    try {
      const decode = jwt.verify(llave, process.env.JWT_SECRET);
      req.adminPayload = decode.payload;
      next();
    } catch (error) {
      switch (error.message) {
        case "jwt malformed":
          return res.status(401).json("Este no es una llave valida.");
        case "invalid signature":
          return res.status(401).json("Este llave no es correcta.");
        case "jwt expired":
          return res.status(401).json("Esta llave ya expiró.");
        default:
          return res.status(401).json(error.message);
      }
    }
  }
}
