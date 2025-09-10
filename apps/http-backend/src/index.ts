import express from "express"
import { middleware } from "./middleware"
import jwt from "jsonwebtoken"
import  { JWT_SECRET }  from "@repo/common-backend/config"
import { signinSchema, signupSchema, roomSchema } from "@repo/common/types"
const app = express()

app.post('/signup', (req, res)=>{
    const data = signupSchema.safeParse(req.body)
    if(!data.success){
         res.json({
            "msg":"Invalid Inputs"
        })
        return
    }
})
app.post('/signin', middleware , (req, res)=>{
    const data = signinSchema.safeParse(req.body)
    if(!data.success){
         res.json({
            "msg":"Invalid Inputs"
        })
        return
    }
    const userId = "1" as string
    const token = jwt.sign(userId, JWT_SECRET)
    res.json (token)

})
app.post('/room', middleware  ,(req, res)=>{
    //db call

    const data = roomSchema.safeParse(req.body)
    if(!data.success){
         res.json({
            "msg":"Invalid Inputs"
        })
        return
    }
    res.json({
        "roomId":"123"
    })
})


app.listen(3001)