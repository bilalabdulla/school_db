import { NextFunction, Request, Response } from "express";
import { createClassService, deleteClassService, getClassesService, updateClassesService } from "../services/class";
import { ClassDto } from "../dtos/createClass.dto";
import { ClassParams } from "../types/class.params";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request";


export const createClass = async (req: Request<{}, {}, ClassDto>, res: Response, next: NextFunction) => {
    const data = req.body 
    const { Grade, Division} = data

    if (!Grade || !Division) {
        throw new BadRequestError('Please provide all the details of the class')
    }

    const classes = await createClassService(data)
    res.status(StatusCodes.CREATED).json(classes)
}       

export const getClasses = async (req: Request, res: Response, next: NextFunction) => {
    const classes = await getClassesService()
    res.status(StatusCodes.OK).json(classes)
}

export const updateClasses = async (req: Request<ClassParams, {}, ClassDto>, res: Response, next: NextFunction) => {
    const { classId } = req.params 
    const data = req.body
    const classes = await updateClassesService(data, classId)  
    res.status(StatusCodes.CREATED).json(classes)
}

export const deleteClass = async (req: Request<ClassParams>, res: Response, next: NextFunction) => {
    const { classId } = req.params 
    const classes = await deleteClassService(classId)
    res.status(StatusCodes.OK).json(classes)
}