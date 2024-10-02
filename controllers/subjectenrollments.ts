import { NextFunction, Request, Response } from "express-serve-static-core";
import { createSubjectEnrollmentService, deleteSubjectEnrollmentsService, getSubjectEnrollmentService, getSubjectEnrollmentsService, updateSubjectEnrollmentsService } from "../services/subjectenrollments";
import { SubjectEnrollmentDto } from "../dtos/createSubjectEnrollment.dto";
import { SubjectEnrollmentParams } from "../types/subjectenrollments.params";
import BadRequestError from "../errors/bad-request";
import { StatusCodes } from "http-status-codes";



export const createSubjectEnrollments = async (req: Request<SubjectEnrollmentParams, {}, SubjectEnrollmentDto>, res: Response, next: NextFunction) => {
    const data = req.body   
    const { StudentId, SubjectId } = data
    if (!StudentId || !SubjectId) {
        throw new BadRequestError('Please provide all the details for enrollment')
    }
    const enrollment = await createSubjectEnrollmentService(data) 
    res.status(StatusCodes.CREATED).json(enrollment)
}

export const getSubjectEnrollment = async ( req: Request<SubjectEnrollmentParams>, res: Response, next: NextFunction) => {
    const params = req.params
    const enrollment = await getSubjectEnrollmentService(params) 
    res.status(StatusCodes.OK).json(enrollment)
}

export const getSubjectEnrollments = async ( req: Request, res: Response, next: NextFunction) => {
    const enrollments = await getSubjectEnrollmentsService()
    res.status(StatusCodes.OK).json(enrollments)
}                      

export const updateSubjectEnrollments = async ( req: Request<SubjectEnrollmentParams, {}, SubjectEnrollmentDto>, res: Response, next: NextFunction) => {
    const data = req.body 
    const params = req.params 
    const enrollment = await updateSubjectEnrollmentsService(data, params)
    res.status(StatusCodes.CREATED).json(enrollment) 
}

export const deleteSubjectEnrollments = async ( req: Request<SubjectEnrollmentParams>, res: Response, next: NextFunction) => {
    const params = req.params
    const enrollment = await deleteSubjectEnrollmentsService(params)
    return res.status(StatusCodes.OK).json(enrollment)
}

