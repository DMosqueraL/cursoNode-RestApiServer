import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es un campo obligatorio"]
    },
    correo: {
        type: String,
        required: [true, "El correo es un campo obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    imagen: {
        type: String,
    }, 
    rol: {
        type: String,
        required: true,
        enum: ["ADMIN_ROL", "USUARIO_ROL"]
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function(){
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default model('Usuario', UsuarioSchema)