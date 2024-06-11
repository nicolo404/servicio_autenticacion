import { Router } from "express";
import { newUser, login, getUsers } from "../Controllers/UserController.js";
import { verificarToken } from "../Middleware/Auth.js";
const rutas = Router();

rutas.post("/newUser", newUser);
rutas.post("/login", login);
rutas.get("/getUsers", verificarToken, getUsers);

export default rutas;
