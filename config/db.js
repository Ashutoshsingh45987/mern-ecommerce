import mongoose from "mongoose";
import colors from "colors";
const connectDb= async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connnected to Mongodb ${conn.connection.host}`.bgMagenta.white   );
    } catch (error) {
        console.log(`The error is ${error}`.bgRed.white);
    }

};

export default connectDb;