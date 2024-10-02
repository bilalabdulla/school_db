import { NextFunction, Request, Response } from "express";
import { createSubjectsService, deleteSubjectService, getSubjectService, getSubjectsService, updateSubjectsService } from "../services/subjects";
import { CreateSubjectDto } from "../dtos/createSubject.dto";
import { SubjectParams } from "../types/subjects.params";
import BadRequestError from "../errors/bad-request";
import { StatusCodes } from "http-status-codes";


export const createSubjects = async (req: Request<{}, {}, CreateSubjectDto>, res: Response, next: NextFunction) => {
    const { grade, isOptional, title } = req.body
    if (!grade || !isOptional || !title) {
        throw new BadRequestError('Please provide all the details for subject')
    }
    const subject = await createSubjectsService(req.body)
    res.status(StatusCodes.CREATED).json(subject)  
}

export const getSubject = async (req: Request<SubjectParams>, res: Response, next: NextFunction) => {
    const { id } = req.params 
    const subject = await getSubjectService(id) 
    res.status(201).json(subject)
}

export const getSubjects = async (req: Request, res: Response, next: NextFunction) => {
    const subjects = await getSubjectsService()
    res.json(subjects)
}

export const updateSubjects = async (req: Request<SubjectParams, {}, CreateSubjectDto>, res: Response, next: NextFunction) => {
    const { id } = req.params
    const data = req.body 
    const subject = await updateSubjectsService(id, data) 
    return res.status(201).json(subject)
}

export const deleteSubject = async (req: Request<SubjectParams>, res: Response, next: NextFunction) => {
    const { id } = req.params 
    const subject = await deleteSubjectService(id)
    res.status(202).json(subject)
}
