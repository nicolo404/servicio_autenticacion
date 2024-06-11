import { Router } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config.js";

export const verificarToken = Router();

verificarToken.use((req, res, next) => {
  let token = req.header("x-auth-token") || req.header("authorization");
  if (!token) {
    return res.status(401).json({ msg: "No hay token, permiso no válido" });
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  try {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token no válido" });
      }
      req.user = decoded.user;
    });
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no válido" });
  }
});
