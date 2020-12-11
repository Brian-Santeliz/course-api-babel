import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "variables.env" });
const URI = process.env.MONGO_URI || "";
(() => {
  mongoose
    .connect(URI, {
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("Conexión establecida con la BD"))
    .catch((e) => {
      console.error(e);
    });
})();
