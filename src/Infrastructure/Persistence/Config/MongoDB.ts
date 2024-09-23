import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;
if(!URI)
    {
        throw new Error("Please add the URI")
    };
const MongoDB = async (): Promise<void> => 
    {
        try
        {
            await mongoose.connect(URI, {                
                serverSelectionTimeoutMS: 5000 // Adjust the timeout as needed
            });
            console.log("Se ha conectado la base de datos");
        }
        catch (error: any)
        {   
            console.error("MongoDB connection failed:", error.message);
            process.exit(1);
        }
    }
export default MongoDB;