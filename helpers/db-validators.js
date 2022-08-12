import Role from "../models/role.js";
import Usuario from "../models/usuario.js";

export const rolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(
      `El rol ${rol} no está registrado en nuestra base de datos`
    );
  }
};

export const correoExistente = async (correo = "") => {
  //Verificar si el correo ya existe
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    throw new Error(
      `El correo: ${correo}, ya está registrado en nuestra base de datos`
    );
  }
};

export const existeUsuarioPorId = async (id) => {
  //Verificar si el Id ya existe
  const existeUsuarioPorId = await Usuario.findById( id );
  if (!existeUsuarioPorId) {
    throw new Error(
      `No existe un usuario con el ID: ${id}, en nuestra base de datos`
    );
  }
};