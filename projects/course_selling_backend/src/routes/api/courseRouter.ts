import {Request , Response, Router} from 'express';

import { ResponseStatusCode } from '../../statusCodes/responseStatuscode';

const courseRouter = Router();


courseRouter.get('/', (req:Request , res:Response) => {
    try{
        
    } catch(error:any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error:${error.message}`
        })
    }
}) 
courseRouter.post('/purchase/:id', (req:Request , res:Response) => {
    try{
        
    } catch(error:any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error:${error.message}`
        })
    }
}) 







export default courseRouter;