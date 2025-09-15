import express from "express"
import { middleware } from "./middleware"
import jwt, { JwtPayload } from "jsonwebtoken"
import  { JWT_SECRET }  from "@repo/common-backend/config"
import { signinSchema, signupSchema, roomSchema } from "@repo/common/types"
import { prismaClient } from '@repo/db/client'
const app = express()
app.use(express.json());
app.post('/signup', async (req, res)=>{
    const parseddata = signupSchema.safeParse(req.body)
    console.log(parseddata.error)
    if(!parseddata.success){
         res.json({
            "msg":"Invalid Inputs"
        })
        return
    }
    try{
         const user = await prismaClient.user.create({
        data:{
            email:parseddata.data?.email,
            password: parseddata.data.password,
            name: parseddata.data.name
        }
    })
    res.json({
        userId: user.id
    })
    } catch(e){
        res.status(411).json({
            msg: "user already exists"
        })
    }
   
})
app.post('/signin' ,async (req, res)=>{
    const parseddata = signinSchema.safeParse(req.body)
    if(!parseddata.success){
         res.json({
            "msg":"Invalid Inputs"
        })
        return
    }
    const user = await prismaClient.user.findFirst({
        where:{
            email: parseddata.data.email,
            password: parseddata.data.password
        }
    })
    const token = jwt.sign({userId : user?.id}, JWT_SECRET) 
    res.json (token)

})



app.post('/room', middleware  , async(req, res)=>{

    const parseddata = roomSchema.safeParse(req.body)
    if(!parseddata.success){
         res.json({
            "msg":"Invalid Inputs"
        })
        return
    }
    //@ts-ignore
    const userId = req.userId
    const room = await prismaClient.room.create({
        data:{
            slug: parseddata.data.name,
            adminId: userId
        }
    })
    res.json({
        "roomId":room.id
    })
})

app.get('/chats/:roomId',async (req,res)=>{
    const roomId = Number(req.params.roomId)
    const message =  await prismaClient.room.findMany({
        where:{
            id : roomId 
        },
        orderBy:{
            id:'desc'
        },
        take:50
    })

    res.json({
        message
    })
})


app.get('/room/:slug',async (req,res)=>{
    const slug = req.params.slug
    const room =  await prismaClient.room.findFirst({
        where:{
            slug 
        }
    })

    res.json({
        room
    })
})


app.listen(3001)