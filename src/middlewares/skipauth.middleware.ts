import { Request, Response, NextFunction } from "express";
import authenticationMiddleWare from "./auth.middleware";

export const skipAuth = (req:Request, res:Response, next:NextFunction) => {
    console.log(req.path);
    if(req.path === "/api/v1/auth/login" || req.path === "/api/v1/auth/signup"){
        next();
    } else {
        authenticationMiddleWare(req, res, next);
    }
}