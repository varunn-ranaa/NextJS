import mongoose from "mongoose";

export async function connectionDB() {
    try {
        const mongoUrl = process.env.MONGO_URL
        if (!mongoUrl) {
            throw new Error("MONGO_URL is not defined in environment variables");
        }
        else {
            await mongoose.connect(mongoUrl)
        }

        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log("Connected with MongoDB ")
        })

        connection.on('error',(error)=>{
        console.log("Something wrong with MongoDB : " + error)
        process.exit(1)
        })
    }
    catch (error) {
        console.log("DB Error :", error)
    }
}

