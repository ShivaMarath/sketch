import {WebSocketServer} from "ws"
import jwt, { JwtPayload } from "jsonwebtoken";
import  { JWT_SECRET } from "@repo/common-backend/config";

const wss = new WebSocketServer({port:8080})

wss.on("connection", (socket, request)=>{
    const url = request.url
    if(!url){
        return
    }
    const queryParams = new URLSearchParams(url.split('?')[1])
    const token = queryParams.get('token') || ""
    const decoded = jwt.verify(token, JWT_SECRET)

    if(!decoded || !(decoded as JwtPayload).userid){
        socket.close()
        return
    }





    socket.on('message', (data)=>{
         socket.send("hello")
    })
   
})
