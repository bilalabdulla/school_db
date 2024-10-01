import { sign, verify } from 'jsonwebtoken' 
import { AdminAttributes } from '../types/admin'
import { NextFunction, Request, Response } from 'express-serve-static-core'
// import { Authenticated } from './custom'

export const createTokens = (admin: AdminAttributes) => {
    const accessToken = sign({ email: admin.email}, "jwtSecret")
    return accessToken 
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    // const accessToken = req.cookies["access-token"]

    // if (!accessToken) {
    //     return res.status(400).json({ error: "User not authenticated"})
    // }
    // try {
    //     const validToken = verify(accessToken, 'jwtSecret')
    //     if (validToken) {
    //         req.body.authenticated = true 
    //         return next()
    //     }
    // } catch (error) {
    //     return res.status(400).json(error)
    // }

    let authHeader = req.headers.authorization || req.headers.Authorization 
    if (!authHeader || !authHeader.toString().startsWith('Bearer ')) {
        throw new Error('Invalid Authentication')
    } 
    const token = authHeader.toString().split(' ')[1]

    try {
        const payload = verify(token, 'jwtSecret')
        if (payload) {
            return next()
        }
    } catch (error) {
        return res.status(400).json(error)
    }
} 

