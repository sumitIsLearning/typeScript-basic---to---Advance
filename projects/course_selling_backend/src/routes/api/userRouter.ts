import  {Router , Request , Response} from 'express';
import jwt from 'jsonwebtoken';
import { ResponseStatusCode } from '../../statusCodes/responseStatuscode';
import { userModel } from '../../db';
import { hashPassword, verifyPassword } from '../../middlewares/hash&verifyPass/handleHashing';

const userRouter = Router();

userRouter.post('/signUp' , hashPassword , async (req:Request , res:Response) => {
    try{
        const {firstname , lastname , email , password} = req.body;

        //fetch all the user from database
        const existingUser = await userModel.findOne({email})

        if(existingUser) {
            res.status(ResponseStatusCode.BAD_REQUEST).json({
                Error:"User already Exists"
            })
        }

        const savedUser = await userModel.create({
            firstname,
            lastname,
            email,
            password
        })

        res.status(ResponseStatusCode.CREATED).json({
            message:"User Created Successfully",
            data: savedUser
        })

    } catch(error:any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error:${error.message}`
        })
    }
})
userRouter.post('/signIn' , verifyPassword ,  (req:Request , res:Response) => {
    try{
        
    } catch(error:any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error:${error.message}`
        })
    }
})
userRouter.get('/purchase' , (req:Request , res:Response) => {
    try{
        
    } catch(error:any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error:${error.message}`
        })
    }
})
userRouter.get('/purchase/:id' , (req:Request , res:Response) => {
    try{
       
    } catch(error:any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error:${error.message}`
        })
    }
})


export default userRouter;