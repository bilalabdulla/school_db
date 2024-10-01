import { NextFunction, Request, Response } from "express-serve-static-core";
import { createSubjectEnrollmentService, deleteSubjectEnrollmentsService, getSubjectEnrollmentService, getSubjectEnrollmentsService, updateSubjectEnrollmentsService } from "../services/subjectenrollments";
import { SubjectEnrollmentDto } from "../dtos/createSubjectEnrollment.dto";
import { SubjectEnrollmentParams } from "../types/subjectenrollments.params";



export const createSubjectEnrollments = async (req: Request<SubjectEnrollmentParams, {}, SubjectEnrollmentDto>, res: Response, next: NextFunction) => {
    const data = req.body    
    try {
        const enrollment = await createSubjectEnrollmentService(data) 
         res.status(201).json(enrollment)
    } catch (error) {
        return next(error)
    }
}

export const getSubjectEnrollment = async ( req: Request<SubjectEnrollmentParams>, res: Response, next: NextFunction) => {
    const params = req.params
    try {
        const enrollment = await getSubjectEnrollmentService(params) 
        res.status(200).json(enrollment)
    } catch (error) {
        return next(error) 
    }   
}

export const getSubjectEnrollments = async ( req: Request, res: Response, next: NextFunction) => {
    try {
        const enrollments = await getSubjectEnrollmentsService()
        res.status(200).json(enrollments)
    } catch (error) {
        return next(error)
    }
}                      

export const updateSubjectEnrollments = async ( req: Request<SubjectEnrollmentParams, {}, SubjectEnrollmentDto>, res: Response, next: NextFunction) => {
    const data = req.body 
    const params = req.params 
    try {
        const enrollment = await updateSubjectEnrollmentsService(data, params)
        res.status(202).json(enrollment)
    } catch (error) {
        return next(error)
    }    
}

export const deleteSubjectEnrollments = async ( req: Request<SubjectEnrollmentParams>, res: Response, next: NextFunction) => {
    const params = req.params
    try {
        const enrollment = await deleteSubjectEnrollmentsService(params)
        return res.status(202).json(enrollment)
    } catch (error) {
        return res.status(404).json(error)
    }
}

