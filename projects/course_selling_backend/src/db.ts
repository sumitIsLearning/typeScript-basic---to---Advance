import { Schema, model,Types , connect } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

async function connectDB() {
    try{
        const dbURL:string = process.env.DB_URL || "";
        await connect(dbURL) 
        console.log(`database is connected`)
    } catch(error:any) {
        console.error(`failed to connect with database: ${error.message}`);
        process.exit(1);
    }
}

interface IUser {
    firstname: string,
    lastname?: string,
    email: string,
    password: string
}
type IAdmin = IUser;

interface ICourse {
    title:string,
    description:string,
    price:number,
    imageUrl:string,
    creatorId:Types.ObjectId
}
interface IPurchase {
    courseId:Types.ObjectId,
    userId:Types.ObjectId,
}

const userSchema = new Schema<IUser>(
    {
        firstname: { type: String, required: true },
        lastname: { type: String },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true
    }
)
const adminSchema = new Schema<IAdmin>(
    {
        firstname: { type: String, required: true },
        lastname: { type: String },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true
    }
)
const courseSchema = new Schema<ICourse>(
    {
        title: { type: String, required: true },
        description: { type: String , required:true },
        imageUrl: { type: String, required: true },
        price: { type: Number, required: true },
        creatorId:{type:Schema.Types.ObjectId , ref:'Admin' , required:true}
    },
    {
        timestamps: true
    }
)
const purchaseSchema = new Schema<IPurchase>(
    {
        courseId:{type:Schema.Types.ObjectId , ref:'Course' , required:true},
        userId:{type:Schema.Types.ObjectId , ref:'User', required:true}
    },
    {
        timestamps:true
    }
)


const userModel = model<IUser>('User' , userSchema);
const adminModel = model<IAdmin>('Admin', adminSchema);
const courseModel = model<ICourse>('Course', courseSchema);
const purchaseModel = model<IPurchase>('Purchase', purchaseSchema);


export {
    userModel ,
    adminModel,
    courseModel,
    purchaseModel,
    connectDB
}
