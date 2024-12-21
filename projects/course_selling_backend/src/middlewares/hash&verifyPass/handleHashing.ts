import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { ResponseStatusCode } from '../../statusCodes/responseStatuscode';
import { userModel } from '../../db';

declare global {
    namespace Express {
        interface Request {
            verifiedUser?: any;
        }
    }
}


async function hashPassword(req: Request, res: Response, next: NextFunction) {

    try {
        const { password } = req.body;

        if (!password) res.status(ResponseStatusCode.BAD_REQUEST).json({
            error: "Password is required"
        })

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hashedPassword = await bcrypt.hash(password, salt)

        req.body.password = hashedPassword;

        next();
    } catch (error: any) {
        console.error(`Error during password hashing:${error.message}`);
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            error: "Error Occured: please wait ..."
        })
    }

}


async function verifyPassword(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;

        if (!email || !password) res.status(ResponseStatusCode.BAD_REQUEST).json({
            error: "Both password and email is required"
        })

        const user = await userModel.findOne({ email });

        if (!user) {
            res.status(ResponseStatusCode.NOT_FOUND).json({
                error: "User does not Exists"
            });
        } else {
            const match = await bcrypt.compare(password, user.password)

            if (!match) res.status(ResponseStatusCode.BAD_REQUEST).json({
                error: "Invalid Password"
            })

            req.verifiedUser = user;

            next();
        }
    } catch (error: any) {
        console.error(`Error during verifying password:${error.message}`);
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            error: "Error Occured: please wait ..."
        })
    }
}


export {
    hashPassword,
    verifyPassword
}