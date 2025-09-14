import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config";
import { Request, Response, NextFunction } from "express";



export function middleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"] ?? "" 
    try{
         const verified = jwt.verify(token, JWT_SECRET)
         if(verified){
        //@ts-ignore
        req.userId = verified.userId
        next()
    }
    }catch(e){
        res.status(403).json({
            message: "Unauthorized"
        })
    }

}

