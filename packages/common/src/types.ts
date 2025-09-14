import {z} from "zod"

export const signinSchema = z.object({
    "email": z.string(),
    "password": z.string(),
    "name": z.string()
})

export const signupSchema = z.object({
     "email": z.string(),
    "password": z.string(),
    "name": z.string()
})

export const roomSchema = z.object({
    "name": z.string(),
})