import Jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { UserModel } from "../Models/UserModel.js";
import { validarUsuario, validarLogin } from "../utils/validationUser.js";
import { jwtExpire, jwtSecret } from "../config.js";

export const newUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  const errores = validarUsuario(req.body);
  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }
  console.log(req.body);
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }
    const passwordHash = bcryptjs.hashSync(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: passwordHash,
    });
    newUser
      .save()
      .then(res.status(201).json({ msg: "Usuario creado correctamente: " }))
      .catch((error) => {
        res.status(400).json({ msg: "Error al crear el usuario" });
      });
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validate = validarLogin(req.body);
    if (validate.length > 0) {
      return res.status(400).json({ validate });
    }
    const info = await UserModel.findOne({ email: email });
    if (!info) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
    if (!(await bcryptjs.compare(password, info.password))) {
      return res.status(400).json({ msg: "La contraseña es incorrecta" });
    }
    //crear y firmar token
    const token = Jwt.sign({ id: info._id }, jwtSecret, {
      expiresIn: jwtExpire,
    });
    const user = {
      id: info._id,
      name: info.name,
      email: info.email,
      token: token,
    };
    return res
      .status(200)
      .json({ user: user, mensaje: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al loguear el usuario" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users || users.length === 0) {
      return res.status(400).json({ msg: "No hay usuarios" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al obtener los usuarios" });
  }
};
