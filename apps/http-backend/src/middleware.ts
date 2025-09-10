import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config";
import { Request, Response, NextFunction } from "express";



export function middleware(req: Request, res: Response, next: NextFunction){
    //@ts-ignore
    const token = req.headers["authorization"] ?? "" 
    const verified = jwt.verify(token, JWT_SECRET)
    if(verified){
        // req.userId = verified.userId
        next()
        
    }
    else{
        res.status(403).json({
            message: "Unauthorized"
        })
    }
    

}