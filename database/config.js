import mongoose from "mongoose";


export const dbConnection = async() => {

    try {
        mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,            
        });

        console.log("Base de datos Online");
    }
    catch (err) {
        console.log(err);
        throw new Error("Error al iniciar la base de datos");
    }
}