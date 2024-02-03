import  express  from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from './routes/categoryRoutes.js'
import cors from 'cors';

dotenv.config();

// database cnd

connectDb();


// rest object
const app= express();


// middlewarre
app.use(cors());
app.use(express.json());


// port

const PORT= process.env.PORT||8080;

// console command
app.listen( PORT, ()=>{
    console.log(`The server is running on ${PORT}`.bgCyan.white);
})


// routes

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);

// rest api
app.get("/",(req,res)=>{
    res.send(
        "<h1>welcome to the ecommerce app</h1>"
    )
})
