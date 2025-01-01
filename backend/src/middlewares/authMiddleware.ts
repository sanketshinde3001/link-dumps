import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

// Extend Request to include user property with a more specific type
declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload | string;
    }
}

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const accessToken: string | undefined = req.cookies?.accessToken;

        if (!accessToken) {
            res.status(401).json({ message: 'Unauthorized - No Access Token' });
            return;
        }

        jwt.verify(
            accessToken,
            JWT_SECRET,
            (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
                if (err) {
                    console.error('JWT Verification Error:', err.message);
                    res.status(403).json({ message: 'Invalid or Expired Token' });
                    return;
                }

                if (decoded) {
                    req.user = decoded;
                    next();  // Continue to next middleware
                } else {
                    res.status(403).json({ message: 'Token Verification Failed' });
                }
            }
        );
    } catch (error) {
        console.error('Token Authentication Error:', error);
        res.status(500).json({ message: 'Internal Server Error during token verification' });
    }
};
