import { NextFunction, Request, Response } from "express";
import { createDepartmentService, getDepartmentsService } from "../services/departments";

export const createDepartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const department = await createDepartmentService(req.body)
        res.status(201).json(department)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const getDepartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const departments = await getDepartmentsService()
        res.status(200).json(departments)
    } catch (error) {
        res.status(404).json(error)
    }
}