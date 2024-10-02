import { NextFunction, Request, Response } from "express";
import { createSubjectTeachersService, deleteSubjectTeacherService, getSubjectTeacherService, getSubjectTeachersService, updateSubjectTeachersService } from "../services/subjectteachers";
import { SubjectTeachersParams } from "../types/subjectTeachers.params";
import { SubjectTeacherDto } from "../dtos/createSubjectTeacher.dto";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request";


export const createSubjectTeachers = async (req: Request<SubjectTeachersParams, {}, SubjectTeacherDto>, res: Response, next: NextFunction) => {
    const data = req.body
    const { SubjectId, TeacherId } = data
    if (!SubjectId || !TeacherId) {
        throw new BadRequestError('Please provide all the details')
    }

    const subjectTeacher = await createSubjectTeachersService(data) 
    res.status(StatusCodes.CREATED).json(subjectTeacher)
}

export const getSubjectTeacher = async (req: Request<SubjectTeachersParams>, res: Response, next: NextFunction) => {
    const params =  req.params 
    const subjectTeacher = await getSubjectTeacherService(params)
    res.status(StatusCodes.OK).json(subjectTeacher)
}

export const getSubjectTeachers = async (req: Request, res: Response, next: NextFunction) => {
    const subjectTeachers = await getSubjectTeachersService()
    res.status(StatusCodes.OK).json(subjectTeachers) 
}

export const updateSubjectTeachers = async (req: Request<SubjectTeachersParams, {}, SubjectTeacherDto>, res: Response, next: NextFunction) => {
    const data = req.body 
    const params = req.params
    const subjectTeachers = await updateSubjectTeachersService(data, params)
    res.status(StatusCodes.CREATED).json(subjectTeachers)
}

export const deleteSubjectTeacher = async (req: Request<SubjectTeachersParams>, res: Response, next: NextFunction) => {
    const params = req.params 
    const subjectTeacher = await deleteSubjectTeacherService(params)
    res.status(StatusCodes.OK).json(subjectTeacher) 
}

