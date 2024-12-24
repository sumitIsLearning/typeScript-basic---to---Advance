import { Router, Request, Response } from 'express';
import dotenv from 'dotenv'
import { ResponseStatusCode } from '../../statusCodes/responseStatuscode';
import { courseModel, purchaseModel, userModel } from '../../db';
import { hashPassword, verifyPassword } from '../../middlewares/hash&verifyPass/handleHashing';
import { generateToken } from '../../utils/token';
import userVerification from '../../middlewares/hash&verifyPass/authentication/userVerification';
import mongoose, { Types } from 'mongoose';

dotenv.config();
const JwtSecret: string = process.env.JWT_USER_SECRET || "";

const userRouter = Router();

userRouter.post('/signUp', hashPassword, async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!email || !password || !firstname) {
            res.status(ResponseStatusCode.BAD_REQUEST).json({
                Error: "Except lastname all other fields are required"
            });
            return;
        }

        //fetch all the user from database
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            res.status(ResponseStatusCode.BAD_REQUEST).json({
                Error: "User already exists"
            })
            return;
        }

        const savedUser = await userModel.create({
            firstname,
            lastname: lastname || '',
            email,
            password
        })

        res.status(ResponseStatusCode.CREATED).json({
            message: "User Created Successfully",
            data: savedUser
        })

    } catch (error: any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error: please wait`
        })
        console.error(`Error user signUp: ${error.message}`)
        return;
    }
})

userRouter.post('/signIn', verifyPassword, (req: Request, res: Response) => {
    try {
        const user = req.verifiedUser;

        if (!user) {
            res.status(ResponseStatusCode.NOT_FOUND).json({
                message: "user does not exist"
            })
            return;
        }

        const payload: Record<string, any> = {
            id: user.id,
            timestamp: Date.now()
        }

        const token = generateToken(payload, JwtSecret);

        res.status(ResponseStatusCode.OK).json({
            message: "Successfully Signed In",
            token: token
        })


    } catch (error: any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error: please wait`
        })
        console.error(`Error user signIn: ${error.message}`)
        return;
    }
})

userRouter.use(userVerification);

userRouter.get('/courses', async (req: Request, res: Response) => {
    try {
        const userId = req.userId;

        const purchases = await purchaseModel.find({userId});

        if(purchases.length === 0) {
            res.status(ResponseStatusCode.NOT_FOUND).json({
                message:"No purchases found for this user"
            });
            return;
        }

        const purchasedCourses = await Promise.all (purchases.map(async purchase => await courseModel.findOne({_id: purchase.courseId})))

        
        res.status(ResponseStatusCode.OK).json({
            message:"User purchases retrived successfully",
            courses:purchasedCourses,
        })


    } catch (error: any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error: please wait`
        })
        console.error(`Error retriving user courses: ${error.message}`)
        return;
    }
})

userRouter.get('/purchase/course/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const courseId = req.params.id;

        if(!userId) {
            res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
                error:"Error userId is undefined"       
            });
            return;
        }

        if(!mongoose.Types.ObjectId.isValid(courseId)){
            res.status(ResponseStatusCode.UNAUTHORIZED).json({
                error:"Invalid Course id"
            })
            return;
        }

        const foundCourse = await courseModel.findOne({_id:courseId})

        if(!foundCourse) {
            res.status(ResponseStatusCode.UNAUTHORIZED).json({
                error:"Course not Found"
            })
            return;
        }

        await purchaseModel.create({
            courseId:courseId,
            userId:userId
        })

        res.status(ResponseStatusCode.CREATED).json({
            message:"Thanks for the purchase"
        })

    } catch (error: any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error: please wait`
        })
        console.error(`Error user purchasing course: ${error.message}`)
        return;
    }
})


export default userRouter;