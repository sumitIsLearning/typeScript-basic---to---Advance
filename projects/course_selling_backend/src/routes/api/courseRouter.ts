import {Request , Response, Router} from 'express';

import { ResponseStatusCode } from '../../statusCodes/responseStatuscode';
import { courseModel } from '../../db';
import userVerification from '../../middlewares/hash&verifyPass/authentication/userVerification';

const courseRouter = Router();

courseRouter.use(userVerification);

courseRouter.get('/', async (req:Request , res:Response) => {
    try{
        const courses = await courseModel.find();

        if(courses.length === 0) {
            res.status(ResponseStatusCode.NOT_FOUND).json({
                message:"No courses present right now"
            })
            return;
        }

        res.status(ResponseStatusCode.FOUND).json({
            message:"courses that are present right now",
            courses:courses
        })

    } catch(error:any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error: please wait`
        })
        console.error(`Error retriving courses: ${error.message}`)
        return;
    }
}) 

courseRouter.post('/content/:id', (req:Request , res:Response) => {
    try{
        res.status(ResponseStatusCode.FORBIDDEN).json({
            Error:"This route is not available right now"
        })
    } catch(error:any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error: please wait`
        })
        console.error(`Error retriving content: ${error.message}`)
        return;
    }
}) 



export default courseRouter;