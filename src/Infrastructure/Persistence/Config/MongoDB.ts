import mongoose from "mongoose";

const MongoDB = async () : Promise<void> => 
    {
        try
        {
            await mongoose.connect("mongodb://localhost:27017/MicroservicioIntercambios");
            console.log("Se ha conectado a la base de datos");
        }
        catch (error: any)
        {
            console.log(error);
            process.exit(1);
        }
    };
export default MongoDB;