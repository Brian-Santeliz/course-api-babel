"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

_dotenv["default"].config({
  path: "variables.env"
});

app.set("puertoServer", process.env.SERVER_PUERTO);
app.use(_express["default"].json());
app.use((0, _morgan["default"])("tiny"));
app.listen(app.get("puertoServer"), function () {
  console.log("Servidor en el puerto: ".concat(app.get("puertoServer")));
});