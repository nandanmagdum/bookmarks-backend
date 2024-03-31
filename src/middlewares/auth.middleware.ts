import jwt, { JsonWebTokenError, Jwt } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
const screat_key = process.env.JWT_SCREAT_KEY;
if (!screat_key) {
    process.exit(1);
}

const authenticationMiddleWare = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

    // check if token is present
    if (!token) {
        return res.status(401).json({ "Authentication Error": "User is not authenticated" });
    }

    // if present verify the token
    const verfication = await jwt.verify(token, screat_key, (err, decoded) => {
        if (err) {
            console.log(err);

            res.status(401).json({ "Authentication Error": "The token is invalid !" });
        }
        else {
            if (decoded) {
                // req.user = decoded;
                next();
            } else {
                res.status(401).json({ "Authentication Error": "Unknown auth error" });
            }
        }
    });


    // if(!verfication){
    //     return res.status(401).json({"Authentication Error": "User is not authenticated"});

    // } else {
    //     next();
    // }

}

export default authenticationMiddleWare;