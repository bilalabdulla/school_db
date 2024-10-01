import db from "../models"
import bcrypt from 'bcryptjs'
import { AdminAttributes } from "../types/admin"
import { createTokens } from "../src/JWT"


export const RegisterService = async (data: AdminAttributes) => {
    const { email, password } = data 
    try {
        const hashed = await bcrypt.hash(password, 10)
        const admin = await db.Admin.create({
            email: email,
            password: hashed 
        })
        return admin 
    } catch (error) {    
        return error 
    }
}     

export const LoginService = async (data: AdminAttributes) => {
    const { email, password } = data

    try {
        const admin = await db.Admin.findOne({
            where: {email}  
        })           
             
        if (!admin) {
            return "Admin doesnt exist"
        }     

        const dbPassword = admin.password
        const isPasswordMatch = await bcrypt.compare(password, dbPassword)
        if (!isPasswordMatch) {
            return {statusCode: 400, data: "Wrong email and password combination"}
        } else {
            const accessToken = createTokens(admin)
            return {data: admin, accessToken, statusCode: 201}
        }
    } catch (error) {
        return error
    }
} 