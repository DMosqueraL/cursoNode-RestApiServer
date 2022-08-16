import { response } from "express";

const adminRol = (req, resp = response, next) => {
  if (!req.usuario) {
    return resp.status(500).json({
      msg: "Se quiere verificar el rol sin validar el token primero",
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROL") {
    return resp.status(401).json({
      msg: `${nombre} no es Administrador - No tiene permitido esta acción.`,
    });
  }

  next();
};

const soloRoles = ( ...roles) => {
  return (req, res = response, next) => {
    if (!req.usuario) {
      return resp.status(500).json({
        msg: "Se quiere verificar el rol sin validar el token primero",
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `Este servicio requiere alguno de estos roles: ${roles}`,
      });
    }

    next();
  };
};

export { adminRol, soloRoles };
