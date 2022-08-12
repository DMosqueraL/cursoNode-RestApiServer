import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import {
  rolValido,
  correoExistente,
  existeUsuarioPorId,
} from "../helpers/db-validators.js";

import {
  usuariosDelete,
  usuariosGet,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
} from "../controllers/usuarios.js";

export const router = Router();

router.get(
  "/",
  [
    check("limite", "El valor del límite debe ser un número")
      .optional()
      .isNumeric(),
    check("desde", "El valor de desde deber ser un número")
      .optional()
      .isNumeric(),
  ],
  usuariosGet
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(rolValido),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password es obligatorio y más de 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(correoExistente),
    //check("rol", "El rol no es válido").isIn(["ADMIN_ROL", "USUARIO_ROL"]),--> Validación del rol contra un arreglo
    check("rol").custom(rolValido),
    validarCampos,
  ],
  usuariosPost
);

router.patch("/", usuariosPatch);

router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);
