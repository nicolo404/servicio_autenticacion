import mongoose from "mongoose";
import { uri } from "../src/config.js";

const dbMongoDB = async () => {
  try {
    await mongoose.connect(uri, {});
    console.log("Conectado a la base de datos de MongoDB");
  } catch (error) {
    console.log("Error al conectar a la base de datos de MongoDB");
    console.log(error);
  }
};

export { dbMongoDB };
