import { NextFunction, Request, Response } from "express";
import { createSubjectTeachersService, deleteSubjectTeacherService, getSubjectTeacherService, getSubjectTeachersService, updateSubjectTeachersService } from "../services/subjectteachers";
import { SubjectTeachersParams } from "../types/subjectTeachers.params";
import { SubjectTeacherDto } from "../dtos/createSubjectTeacher.dto";


export const createSubjectTeachers = async (req: Request<SubjectTeachersParams, {}, SubjectTeacherDto>, res: Response, next: NextFunction) => {
    const data = req.body
    try {
        const subjectTeacher = await createSubjectTeachersService(data) 
        res.status(201).json(subjectTeacher)
    } catch (error) {
        return next(error)
    } 
}

export const getSubjectTeacher = async (req: Request<SubjectTeachersParams>, res: Response, next: NextFunction) => {
    const params =  req.params 
    try {
        const subjectTeacher = await getSubjectTeacherService(params)
        res.status(200).json(subjectTeacher)
    } catch (error) {
        return next(error)
    }
}

export const getSubjectTeachers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjectTeachers = await getSubjectTeachersService()
        res.status(200).json(subjectTeachers) 
    } catch (error) {     
        return error
    }
}

export const updateSubjectTeachers = async (req: Request<SubjectTeachersParams, {}, SubjectTeacherDto>, res: Response, next: NextFunction) => {
    const data = req.body 
    const params = req.params
    try {
        const subjectTeachers = await updateSubjectTeachersService(data, params)
        res.status(202).json(subjectTeachers)
    } catch (error) {
        return next(error)
    }
}

export const deleteSubjectTeacher = async (req: Request<SubjectTeachersParams>, res: Response, next: NextFunction) => {
    const params = req.params 
    try {
        const subjectTeacher = await deleteSubjectTeacherService(params)
        res.status(203).json(subjectTeacher)
    } catch (error) {
        return next(error)
    }
}

