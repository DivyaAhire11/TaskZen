import mongoose from "mongoose";
import { config } from "dotenv"
config()

const connectdb = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DataBase Connected");

    } catch (error) {
        console.log(error)
    }
}

export default connectdb 