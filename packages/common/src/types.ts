import {z} from "zod"

export const signinSchema = z.object({
    "username": z.string(),
    "passowrd": z.string(),
    "name": z.string()
})

export const signupSchema = z.object({
     "username": z.string(),
    "passowrd": z.string()
})

export const roomSchema = z.object({
    "name": z.string()
})