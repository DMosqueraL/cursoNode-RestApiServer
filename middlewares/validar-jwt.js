import jwt from 'jsonwebtoken';

import { request, response } from "express";

import Usuario from "../models/usuario.js";

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            message: 'No hay token'
        });
    }

    try{
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Leer el usuario correspondiente al uid
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({

            });
        }

        //Verificar si el uid tiene estado TRUE
        if(!usuario.estado){
            return res.status(401).json({
                mensaje: "Token no válido - Usuario no existe en la Base de Datos"
            });
        }
        
        req.usuario = usuario;

        next();
    }catch(err){
        console.log(err);
        res.status(401).json({
            message: 'Token no válido.'
        });
    }
    

}

export {
    validarJWT
}