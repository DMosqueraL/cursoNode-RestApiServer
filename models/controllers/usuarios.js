import { response } from "express";

const usuariosGet = (req, res = response) => {
  const {q, nombre, apikey} = req.query;
  res.json({
    mensaje: "get API - Controlador",
    q,
    nombre,
    apikey,
  });
};

const usuariosPut = (req, res) => {
  const id = req.params.id; // const {id} = req.params;
  res.json({    
    mensaje: "put API - Controlador",
    id
  });
};

const usuariosPost = (req, res) => {

  const body = req.body;

  res.json({
    mensaje: "post API - Controlador",
    body
  });
};

const usuariosPatch = (req, res) => {
    res.json({
    mensaje: "patch API - Controlador",
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    mensaje: "delete API - Controlador",
  });
};

export { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
};
