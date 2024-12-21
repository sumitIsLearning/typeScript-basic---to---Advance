import {Request , Response, Router} from 'express';
import jwt from 'jsonwebtoken';
import { ResponseStatusCode } from '../../statusCodes/responseStatuscode';

const adminRouter = Router();


adminRouter.post('/signUp', (req:Request , res:Response) => {
    try{
        
    } catch(error:any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error:${error.message}`
        })
    }
}) 
adminRouter.post('/signIn', (req:Request , res:Response) => {
    try{
        
    } catch(error:any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error:${error.message}`
        })
    }
}) 

// admin purchased courses
adminRouter.get('/purchase', (req:Request , res:Response) => {
    try{
        
    } catch(error:any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error:${error.message}`
        })
    }
}) 
adminRouter.get('/purchase/:id', (req:Request , res:Response) => {
    try{
        
    } catch(error:any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error:${error.message}`
        })
    }
}) 

//admin can create, read , update and delete course
adminRouter.post('/create-course', (req:Request , res:Response) => {
    try{
        
    } catch(error:any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error:${error.message}`
        })
    }
}) 
adminRouter.get('/course', (req:Request , res:Response) => {
    try{
        
    } catch(error:any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error:${error.message}`
        })
    }
}) 
adminRouter.get('/course/:id', (req:Request , res:Response) => {
    try{
        
    } catch(error:any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error:${error.message}`
        })
    }
}) 
adminRouter.put('/course/:id', (req:Request , res:Response) => {
    try{
        
    } catch(error:any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error:${error.message}`
        })
    }
}) 
adminRouter.delete('/course/:id', (req:Request , res:Response) => {
    try{
        
    } catch(error:any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error:${error.message}`
        })
    }
}) 







export default adminRouter;