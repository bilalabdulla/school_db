import { NextFunction, Request, Response } from "express";
import { createSubjectsService, deleteSubjectService, getSubjectService, getSubjectsService, updateSubjectsService } from "../services/subjects";
import { CreateSubjectDto } from "../dtos/createSubject.dto";
import { SubjectParams } from "../types/subjects.params";


export const createSubjects = async (req: Request<{}, {}, CreateSubjectDto>, res: Response, next: NextFunction) => {

    try {
        const subject = await createSubjectsService(req.body)
        res.status(201).json(subject)
    } catch (error) {
        res.status(404).json(error)
    }       
}

export const getSubject = async (req: Request<SubjectParams>, res: Response, next: NextFunction) => {
    const { id } = req.params 
    try {
        const subject = await getSubjectService(id) 
        res.status(201).json(subject)
    } catch (error) {
        return next(error)
    }
}

export const getSubjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjects = await getSubjectsService()
        res.json(subjects)
    } catch (error) {
        return next(error)
    }
}

export const updateSubjects = async (req: Request<SubjectParams, {}, CreateSubjectDto>, res: Response, next: NextFunction) => {
    const { id } = req.params
    const data = req.body 

    try {
        const subject = await updateSubjectsService(id, data) 
        return res.status(201).json(subject)
    } catch (error) {
        return res.status(403).json(error)
    }
}

export const deleteSubject = async (req: Request<SubjectParams>, res: Response, next: NextFunction) => {
    const { id } = req.params 
    try {
        const subject = await deleteSubjectService(id)
        res.status(202).json(subject)
    } catch (error) {
        return next(error)
    }
}
