import { NextFunction, Request, Response } from "express"
import { createStudentsService, deleteStudentService, getStudentService, getStudentsService, updateStudentsService } from "../services/students"
import { studentParams } from "../types/students.params"
import { StudentAttributes } from "../types/student"
import { StudentDto } from "../dtos/createStudent.dto"
import BadRequestError from "../errors/bad-request"
import { StatusCodes } from "http-status-codes"

export const createStudents = async (req: Request<{}, {}, StudentDto>, res: Response, next: NextFunction) => {
    const { firstName, lastName, performance, grade, enrolled_year } = req.body
    if (!firstName || !lastName || !performance || !grade || !enrolled_year) {
        throw new BadRequestError('Please provide all the details of the student')
    }
    const student = await createStudentsService(req.body)
    res.status(StatusCodes.CREATED).json(student)
}

export const getStudent = async (req: Request<studentParams>, res: Response, next: NextFunction) => {
    const { id } = req.params 
    const student = await getStudentService(id)
    res.status(StatusCodes.OK).json(student)
}

 export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
        const students = await getStudentsService()
        res.status(StatusCodes.OK).json(students)
 }

 export const updateStudents = async (req: Request<studentParams, {}, StudentAttributes>, res: Response, next: NextFunction) => {
    const { id } = req.params 
    const data = req.body
    
    const student = await updateStudentsService(id, data)
    return res.status(StatusCodes.CREATED).json(student)
 }                           

 export const deleteStudents = async (req: Request<studentParams>, res: Response, next: NextFunction) => {
    const { id } = req.params 
    const student = await deleteStudentService(id)
    res.status(StatusCodes.OK).json(student)
 }

