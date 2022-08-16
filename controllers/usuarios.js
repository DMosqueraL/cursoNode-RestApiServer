import { response, request } from "express";
import bcryptjs from "bcryptjs";

import Usuario from "../models/usuario.js";

const usuariosGet = async (req = request, res = response) => {
  const { limite, desde } = req.query;
  const query = { estado: true };

  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const total = await Usuario.countDocuments(query);

  const [Total, Usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    Total,
    Usuarios,
  });
};

const usuariosPut = async (req, res) => {
  const { id } = req.params; // const id = req.params.id;
  const { _id, password, google, correo, ...resto } = req.body;

  // if (id) {
  // }

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json(usuario);
};

const usuariosPost = async (req, res) => {
  //Creación de un usuario
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en DB
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPatch = (req, res) => {
  res.json({
    mensaje: "patch API - Controlador",
  });
};

const usuariosDelete = async (req, res) => {

  const {id} = req.params;

  //Borrado físico de la base de datos
  //const usuario = await Usuario.findByIdAndDelete(id);

  //Borrado - cambio estado del usuario
  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, { new: true })

  //const usuarioAutenticado = req.usuario;

  res.json({    
    usuario,
    //usuarioAutenticado
  });
};

export {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
};
