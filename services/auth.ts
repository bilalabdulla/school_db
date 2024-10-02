import db from "../models"
import bcrypt from 'bcryptjs'
import { AdminAttributes } from "../types/admin"
import { createTokens } from "../src/JWT"
import { StatusCodes } from "http-status-codes"
import UnauthenticatedError from "../errors/unauthenticated"
import { Response } from "express"
import BadRequestError from "../errors/bad-request"


export const RegisterService = async (data: AdminAttributes) => {
    const { email, password } = data 

    const oldAdmin = await db.Admin.findOne({
        where: {email}  
    })           

    if (oldAdmin) {
        throw new BadRequestError("User already exists")
    }

    const hashed = await bcrypt.hash(password, 10)
    const admin = await db.Admin.create({
        email: email, 
        password: hashed 
    })
    return {statusCode: StatusCodes.CREATED, data: admin} 
}     

export const LoginService = async (data: AdminAttributes, res: Response) => {
    const { email, password } = data

        const admin = await db.Admin.findOne({
            where: {email}  
        })           
             
        if (!admin) {
            throw new UnauthenticatedError("Invalid credentials")
        }     

        const dbPassword = admin.password
        const isPasswordMatch = await bcrypt.compare(password, dbPassword)

        if (!isPasswordMatch) {
            throw new UnauthenticatedError("Incorrect Password")
        }

        const accessToken = createTokens(admin)
        return {data: admin, accessToken, statusCode: 201}
} 