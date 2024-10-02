import { NextFunction, Request, Response } from "express";
import { LoginService, RegisterService } from "../services/auth";
import BadRequestError from "../errors/bad-request";


export const Register = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body
    
    if (!email || !password) {
        throw new BadRequestError('please provide all the details')
    }
       
    const admin: any = await RegisterService(req.body) 
    res.status(admin.statusCode).json(admin.data)  
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body 

    if (!email || !password) {
        throw new BadRequestError('Please provide all the details')
    }
    
    const admin: any = await LoginService(req.body, res)
    res.cookie('access-token', admin.accessToken, {
        maxAge: 60*60*24*30*1000,
        httpOnly: false
    })
    res.status(admin.statusCode).json({data: admin.data, token: admin.accessToken}) 
}