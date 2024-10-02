// import {Request} from 'express'
//     export interface Authenticated extends Request {
//         authenticated: true 
//     }


declare namespace Express {
    export interface Request {
       authenticated?: boolean
    }
 } 