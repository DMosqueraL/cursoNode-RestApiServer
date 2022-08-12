import mongoose from "mongoose";

const { Schema, model } = mongoose;

const RolSchema = new Schema({
    rol: {
        type: String,
        required: [true, "El rol es un campo obligatorio"]
    }
});

export default model("Role", RolSchema );