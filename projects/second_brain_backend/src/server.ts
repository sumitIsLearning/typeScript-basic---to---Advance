import dotenv from 'dotenv';
import express from 'express';
import cors from  'cors';
import jwt from 'jsonwebtoken';


const app = express();
const port = process.env.PORT;


app.use(cors());
dotenv.config();

app.get('/api/v1/user')







app.listen(port , () => {
    console.log(`server is running on: http://localhost:${port}`);
    
})