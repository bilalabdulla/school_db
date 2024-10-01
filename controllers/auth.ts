import { Request, Response } from "express";
import { LoginService, RegisterService } from "../services/auth";


export const Register = async (req: Request, res: Response) => {
    const data = req.body 
    try {
        const admin = await RegisterService(data) 
        res.status(201).json(admin)
    } catch (error) {
        res.status(404).json(error)
    }      
}    

export const login = async (req: Request, res: Response) => {
    const data = req.body
    const { email, password } = req.body 
    try {
        if (!email || !password) {
            return res.status(400).json("Please enter your email and password")
        }
        const admin: any = await LoginService(data)
        res.cookie('access-token', admin.accessToken, {
            maxAge: 60*60*24*30*1000,
            httpOnly: false
        })
        res.status(admin.statusCode).json({data: admin.data, token: admin.accessToken})
    } catch (error) {  
        res.status(401).json(error)      
    }
}  

