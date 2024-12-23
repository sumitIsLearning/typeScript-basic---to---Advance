//dependencies
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';


//routes
import userRouter from './routes/api/userRouter';
import adminRouter from './routes/api/adminRouter';
import courseRouter from './routes/api/courseRouter';
import { connectDB } from './db';

// configs
dotenv.config();
const app = express();
const port = process.env.PORT;

// external middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// routes handlers
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/course', courseRouter);


async function startServer() {
    try{
        // connection to db
        await connectDB();
        //if success
        app.listen(port , () => {
            console.log(`server running on: http://localhost:${port}`);
        })
    } catch(error:any) {
        // if failed
        console.error(`Error starting the server: ${error.message}`);
        process.exit(1);
    }
}

startServer();
