import { NextFunction, Request, Response } from "express"
import { createTeachersService, deleteTeacherService, getTeacherService, getTeachersService, updateTeacherService } from "../services/teachers"
import { CreateTeacherDto } from "../dtos/createTeacher.dto"
import { TeacherParams } from "../types/teachers.params"


export const createTeachers = async (req: Request<{}, {}, CreateTeacherDto>, res: Response, next: NextFunction) => {
    try {
        const teacher = await createTeachersService(req.body)
        res.status(201).json(teacher)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const getTeacher = async (req: Request<TeacherParams>, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        const teacher = await getTeacherService(id)
        res.status(200).json(teacher)
    } catch (error) {
        return next(error)
    }
}

export const getTeachers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teachers = await getTeachersService()
        res.status(200).json(teachers)
    } catch (error) {
        return next(error)
    }
}

export const updateTeacher = async (req: Request<TeacherParams, {}, CreateTeacherDto>, res: Response, next: NextFunction) => {
    const { id } = req.params 
    const data = req.body
    try {
        const teacher = await updateTeacherService(id, data) 
        return res.status(201).json(teacher)
    } catch (error) {
        return res.status(403).json(error)
    }
}

export const deleteTeacher = async (req: Request<TeacherParams>, res: Response, next: NextFunction) => {
    const { id } = req.params 
    try {
        const teacher = await deleteTeacherService(id)
        res.status(202).json(teacher)
    } catch (error) {
        return next(error)
    }
}