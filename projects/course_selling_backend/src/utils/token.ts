import jwt, { JwtPayload } from 'jsonwebtoken';


function generateToken(payload: Record<string , any>, secrect: string) : string | null{
    try {
        const token = jwt.sign(payload, secrect, { expiresIn: '1h' });

        if (!token) {
            console.error('failed to create token');
            return null;
        }

        return token;
    } catch (error: any) {
        console.error(`Error generating token: ${error.message}`);
        return null;
    }

}

function verifyToken(secrect: string, token: string):JwtPayload | null | string{
    try {
        const payload = jwt.verify(token, secrect);
        return payload;
    } catch (error: any) {
        console.error(`Error verifying token: ${error.message}`);
        return null;
    }

}


export {
    generateToken , 
    verifyToken
}