import { NextFunction, Request, Response } from "express"
import { createStudentsService, deleteStudentService, getStudentService, getStudentsService, updateStudentsService } from "../services/students"
import { studentParams } from "../types/students.params"
import { StudentAttributes } from "../types/student"

export const createStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const student = await createStudentsService(req.body)
        res.status(201).json(student)
    } catch (error) {
        res.status(404).json(error)                     
    }
}

export const getStudent = async (req: Request<studentParams>, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        const student = await getStudentService(id)
        res.status(201).json(student)
    } catch (error) {
        res.status(404).json(error)     
    }
}

 export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students = await getStudentsService()
        res.status(200).json(students)
    } catch (error) {
        return next(error)            
    }
 }

 export const updateStudents = async (req: Request<studentParams, {}, StudentAttributes>, res: Response, next: NextFunction) => {
    const { id } = req.params 
    const data = req.body

    try {
        const student = await updateStudentsService(id, data)
        return res.status(201).json(student)
    } catch (error) {
        return res.status(404).json(error)
    }
 }                           

 export const deleteStudents = async (req: Request<studentParams>, res: Response, next: NextFunction) => {
    const { id } = req.params 
    try {
        const student = await deleteStudentService(id)
        res.status(202).json(student)
    } catch (error) {                              
        return next(error)
    }  
 }

