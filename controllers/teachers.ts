import { NextFunction, Request, Response } from "express"
import { createTeachersService, deleteTeacherService, getTeacherService, getTeachersService, updateTeacherService } from "../services/teachers"
import { CreateTeacherDto } from "../dtos/createTeacher.dto"
import { TeacherParams } from "../types/teachers.params"
import BadRequestError from "../errors/bad-request"
import { StatusCodes } from "http-status-codes"


export const createTeachers = async (req: Request<{}, {}, CreateTeacherDto>, res: Response, next: NextFunction) => {
        const { firstName, lastName } = req.body
        if (!firstName || !lastName) {
            throw new BadRequestError('Please provide all details of the teacher')
        }
        const teacher = await createTeachersService(req.body)
        res.status(StatusCodes.CREATED).json(teacher)
}

export const getTeacher = async (req: Request<TeacherParams>, res: Response, next: NextFunction) => {
    const { id } = req.params
    const teacher = await getTeacherService(id)
    res.status(StatusCodes.OK).json(teacher)
}

export const getTeachers = async (req: Request, res: Response, next: NextFunction) => {  
    const teachers = await getTeachersService()
    res.status(StatusCodes.OK).json(teachers)
}

export const updateTeacher = async (req: Request<TeacherParams, {}, CreateTeacherDto>, res: Response, next: NextFunction) => {
    const { id } = req.params 
    const data = req.body
    const teacher = await updateTeacherService(id, data) 
    res.status(StatusCodes.CREATED).json(teacher)
}

export const deleteTeacher = async (req: Request<TeacherParams>, res: Response, next: NextFunction) => {
    const { id } = req.params 
    const teacher = await deleteTeacherService(id)
    res.status(StatusCodes.OK).json(teacher)
}