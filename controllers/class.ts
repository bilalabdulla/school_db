import { NextFunction, Request, Response } from "express";
import { createClassService, deleteClassService, getClassesService, updateClassesService } from "../services/class";
import { ClassDto } from "../dtos/createClass.dto";
import { ClassParams } from "../types/class.params";


export const createClass = async (req: Request<{}, {}, ClassDto>, res: Response, next: NextFunction) => {
    const data = req.body
    try {
        const classes = await createClassService(data)
        res.status(201).json(classes)
    } catch (error) {
        return next(error)
    }
}       

export const getClasses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classes = await getClassesService()
        res.status(200).json(classes)
    } catch (error) {
        return next(error)
    }
}

export const updateClasses = async (req: Request<ClassParams, {}, ClassDto>, res: Response, next: NextFunction) => {
    const { classId } = req.params
    const data = req.body
    try {
        const classes = await updateClassesService(data, classId)  
        res.status(202).json(classes)
    } catch (error) {
        return next(error)
    }
}

export const deleteClass = async (req: Request<ClassParams>, res: Response, next: NextFunction) => {
    const { classId } = req.params 
    try {
        const classes = await deleteClassService(classId)
        res.status(203).json(classes)
    } catch (error) {
        return next(error)
    }
}