import { validationResult } from "express-validator";

const validarCampos = (req, res, next) => {

  //Validación de campos en función de errorres
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json(errores);
  }

  next();
};

export { validarCampos };
