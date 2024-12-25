import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv'

import { ResponseStatusCode } from "../../statusCodes/responseStatuscode";
import { verifyToken } from "../../utils/token";
import { JwtPayload } from "jsonwebtoken";

dotenv.config();
const JwtSecret: string = process.env.JWT_USER_SECRET || "";

declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
}


function userVerification(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
        res.status(ResponseStatusCode.UNAUTHORIZED).json({
            error: "Token required"
        });
        return;
    }

    try {
        const payload = verifyToken(JwtSecret, token) as JwtPayload & { id: string };

        if (!payload) {
            res.status(ResponseStatusCode.FORBIDDEN).json({
                error: "Invalid or expired token"
            })
            return;
        }

        req.userId = payload.id;

        next();

    } catch (error: any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error:`Internal server error: please wait`
        })
        console.error(`Error Verifying user: ${error.message}`)
        return;
    }

}

export default userVerification;